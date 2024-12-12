const express = require('express');
const multer = require('multer');
const { protectRoute } = require('../middleware/protectRoute');
const { getMessages, sendMessage, updateMessage, deleteMessage } = require('../controllers/message.controller');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage });

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.array("filename"), sendMessage);
router.patch("/:id", protectRoute, updateMessage);
router.delete("/:id", protectRoute, deleteMessage);

module.exports = router;