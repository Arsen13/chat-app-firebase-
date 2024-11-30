const express = require('express');
const { protectRoute } = require('../middleware/protectRoute');
const { getMessages, sendMessage, updateMessage, deleteMessage } = require('../controllers/message.controller');

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.patch("/:id", protectRoute, updateMessage);
router.delete("/:id", protectRoute, deleteMessage);

module.exports = router;