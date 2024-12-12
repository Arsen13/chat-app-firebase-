const { bucket } = require('../db/firebase');

const uploadFile = async (file) => {
    try {
        const fileName = `${Date.now()}` + file.originalname;
        var buffer = new Uint8Array(file.buffer);
        const url = await bucket
            .file(fileName)
            .getSignedUrl({
                action: "read",
                expires: "12-31-2025"
            });

        await bucket.file(fileName).save(buffer, { resumable: true });

        return url;
    } catch (error) {
        console.log("Error in uploadFile function", error.message);
        return error.message;
    }
}

module.exports = uploadFile;