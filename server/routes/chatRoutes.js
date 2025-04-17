const express = require('express');
const router = express.Router();
const { getMessages, saveMessage } = require('../controllers/chatController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, getMessages); // Admin can view all
router.post('/', protect, saveMessage);         // Any user can send message

module.exports = router;
