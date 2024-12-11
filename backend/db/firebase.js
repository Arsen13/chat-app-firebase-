const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../credentials.json');
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://chat-app-d07e6.firebasestorage.app',
})

const db = getFirestore();
const storage = getStorage();
const bucket = storage.bucket();

module.exports = { db, bucket };