const { bucket } = require('../db/firebase');

const uploadFile = async (file) => {
    try {
        const dateTime = new Date().toISOString();

        const filePath = `files/${file.originalname}_${dateTime}`;
        const fileRef = bucket.file(filePath);

        const metadata = {
            contentType: file.mimetype,
        };
    
        await fileRef.save(file.buffer, { metadata });  
        const [url] = await fileRef.getSignedUrl({
            action: 'read',
            expires: '12-31-2025'
        });
    
        return url;
    } catch (error) {
        console.log("Error in uploadFile function", error.message);
        return error.message;
    }
}

module.exports = uploadFile;