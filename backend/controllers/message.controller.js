const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../db/firebase");
const firebase = require("firebase-admin");
const uploadFile = require("../utils/fileUpload");
const { getReceiverSocketId, io } = require("../socket/socket");

const getMessages = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { id: receiverId } = req.params;

        const conversationSnapshot = await db.collection("conversations")
            .where("participants", "array-contains", senderId)
            .get();

        const conversationRef = conversationSnapshot.docs.find(doc => {
            const participants = doc.data().participants;
            return participants.includes(receiverId);
        });

        if (!conversationRef) {
            return res.status(200).json([]);
        }

        const messagePromises = conversationRef.data().messages.map(async (message) => {
            const messageRef = db.collection("messages").doc(message)
            const doc = await messageRef.get();
            return {...doc.data(), id: messageRef.id};
        });

        const messages = await Promise.all(messagePromises);

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { message: messageText } = req.body;
        const senderId = req.user.id;
        const receiverId = req.params.id;
        let fileUrl;

        if (!messageText && !req.file) {
            return res.status(400).json({ error: "You must provide message text or file" });
        }

        const conversationSnapshot = await db.collection("conversations")
            .where("participants", "array-contains", senderId)
            .get();
    
        // Search conversation in db
        let conversationRef = conversationSnapshot.docs.find(doc => {
            const participants = doc.data().participants;
            return participants.includes(receiverId);
        });
    
        // If conversation don't exist, create new
        if (!conversationRef) {
            conversationRef = db.collection("conversations").doc();
            await conversationRef.set({
                participants: [
                    senderId,
                    receiverId,
                ],
                messages: []
            });
        }

        let messageToPushInDb = [];
        let responseData = [];

        // Create new message with link url
        if (req.file) {
            fileUrl = await uploadFile(req.file);
            const dataObj = {
                senderId: senderId,
                receiverId: receiverId,
                link: fileUrl
            };
            const messageRef = db.collection("messages").doc();
            await messageRef.set(dataObj);

            messageToPushInDb.push(messageRef.id);
            responseData.push({...dataObj, id: messageRef.id});
        }

        // Create new message with message text
        if (messageText) {
            const dataObj = {
                senderId: senderId,
                receiverId: receiverId,
                message: messageText
            };
            const messageRef = db.collection("messages").doc();
            await messageRef.set(dataObj);

            messageToPushInDb.push(messageRef.id);
            responseData.push({...dataObj, id: messageRef.id});
        }

        // Add new message into conversation
        await db.collection("conversations").doc(conversationRef.id).set({
            messages: firebase.firestore.FieldValue.arrayUnion(...messageToPushInDb)
        }, { merge: true });

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            //send this message to user
            io.to(receiverSocketId).emit("newMessage", ...responseData);
        }
        
        res.status(200).json(responseData);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateMessage = async (req, res) => {
    try {
        const { message: newMessage } = req.body;
        const { id: messageId } = req.params;
        const senderId = req.user.id;

        if (!newMessage) return res.status(400).json({ error: "You must provide update message text" });

        const messageRef = db.collection("messages").doc(messageId);
        const message = await messageRef.get();
        if (!message.exists) {
            return res.status(400).json({ error: "Message not found" });
        }

        // Only sender can update message
        if (senderId !== message.data().senderId) {
            return res.status(403).json({ error: "You can't update this message" });
        }
        
        await messageRef.update({
            message: newMessage
        });

        io.emit("updateMessage", {messageId, newMessage});

        res.status(200).json({ message: "Message updated successfully" })

    } catch (error) {
        console.log("Error in updateMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { id: messageId } = req.params;
        
        const messageRef = db.collection("messages").doc(messageId);
        const message = await messageRef.get();
        if (!message.exists) {
            return res.status(400).json({ error: "Message not found" });
        }

        // Only person, which send message, can delete it
        if (senderId !== message.data().senderId) {
            return res.status(403).json({ error: "You can't delete this message" });
        }

        const conversationSnapshot = await db.collection("conversations")
            .where("participants", 'array-contains', senderId)
            .get();
        
        const conversationDoc = conversationSnapshot.docs.find(doc => {
            const participants = doc.data().participants;
            return participants.includes(message.data().receiverId)
        });

        if (!conversationDoc) {
            return res.status(400).json({ error: "Conversation not found" });
        }

        // Delete message from conversation and directly 
        await conversationDoc.ref.update({
            messages: FieldValue.arrayRemove(messageId)
        });
        await messageRef.delete();
        
        io.emit("deleteMessage", messageId);

        res.status(200).json({ message: "Message deleted successfully" });
    
    } catch (error) {
        console.log("Error in 'deleteMessage' controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getMessages, sendMessage, updateMessage, deleteMessage };