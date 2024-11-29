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

module.exports = { getMessages, sendMessage };