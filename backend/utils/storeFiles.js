const { db } = require("../db/firebase");

const storeFiles = async (url, senderId, receiverId) => {
    const dataObj = {
        senderId,
        receiverId,
        link: url[0]
    };
    const messageRef = db.collection("messages").doc();
    await messageRef.set(dataObj);

    return {
        id: messageRef.id,
        responseData: {
            ...dataObj, 
            id: messageRef.id
        }
    }
};

module.exports = storeFiles;