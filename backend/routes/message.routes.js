const express = require('express');
const { protectRoute } = require('../middleware/protectRoute');
const { getMessages, sendMessage } = require('../controllers/message.controller');

const router = express.Router();

// router.get("/id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;