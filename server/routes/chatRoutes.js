const express = require('express');
const router = express.Router();
const {
  getMyChat,       // user gets their own chat thread
  sendMessage,     // user or admin sends a message
  getAllChats,     // admin sees all users and their chat threads
  replyToUserChat  // admin sends a message to specific user's thread
} = require('../controllers/chatController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// User: Get own chat history and send message
router.get('/my', protect, getMyChat);       // GET /api/chat/my
router.post('/my', protect, sendMessage);    // POST /api/chat/my

// Admin: View all chats and reply to any user
router.get('/all', protect, isAdmin, getAllChats);           // GET /api/chat/all
router.post('/:userId/reply', protect, isAdmin, replyToUserChat);  // POST /api/chat/:userId/reply

module.exports = router;
