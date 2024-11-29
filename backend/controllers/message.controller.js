const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../db/firebase");
const firebase = require("firebase-admin");

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

        res.status(200).json(conversationRef.data().messages);

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
    
        // Create new message
        const messageRef = db.collection("messages").doc();
        await messageRef.set({
            senderId: senderId,
            receiverId: receiverId,
            message: messageText
        });

        // Add new message into conversation
        await db.collection("conversations").doc(conversationRef.id).set({
            messages: firebase.firestore.FieldValue.arrayUnion(messageRef.id)
        }, { merge: true });
        
        res.status(200).json({ message: "Message send successfully" });

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { id: messageId } = req.params;
        
        const messageDoc = db.collection("messages").doc(messageId);
        const messageRef = await messageDoc.get();
        if (!messageRef.exists) {
            return res.status(400).json({ error: "Message not found" });
        }

        // Only person, which send message, can delete it
        if (senderId !== messageRef.data().senderId) {
            return res.status(403).json({ error: "You can't delete this message" });
        }

        const conversationSnapshot = await db.collection("conversations")
            .where("participants", 'array-contains', senderId)
            .get();
        
        const conversationDoc = conversationSnapshot.docs.find(doc => {
            const participants = doc.data().participants;
            return participants.includes(messageRef.data().receiverId)
        });

        if (!conversationDoc) {
            return res.status(400).json({ error: "Conversation not found" });
        }

        // Delete message from conversation and directly 
        await conversationDoc.ref.update({
            messages: FieldValue.arrayRemove(messageId)
        });
        await messageDoc.delete();
        
        res.status(200).json({ message: "Message deleted successfully" });
    
    } catch (error) {
        console.log("Error in 'deleteMessage' controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getMessages, sendMessage, deleteMessage };