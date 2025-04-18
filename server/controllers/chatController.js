const ChatRoom = require('../models/ChatRoom');

// @desc Get chat for the logged-in user
const getMyChat = async (req, res) => {
  try {
    let chat = await ChatRoom.findOne({ user: req.user._id });

    if (!chat) {
      chat = await ChatRoom.create({ user: req.user._id, messages: [] });
    }

    await chat.populate('messages.sender', 'name email role');
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chat', error: err.message });
  }
};

// @desc Save a message to the user's chat thread
const sendMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Message content is required' });
  }

  try {
    let chat = await ChatRoom.findOne({ user: req.user._id });

    if (!chat) {
      chat = await ChatRoom.create({ user: req.user._id, messages: [] });
    }

    const message = {
      sender: req.user._id,
      content,
    };

    chat.messages.push(message);
    await chat.save();

    await chat.populate('messages.sender', 'name email role');
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// @desc Admin: View all chat threads
const getAllChats = async (req, res) => {
  try {
    const chats = await ChatRoom.find().populate('user', 'name email').sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all chats', error: err.message });
  }
};

// @desc Admin: Send message to a specific user
const replyToUserChat = async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Message content is required' });
  }

  try {
    let chat = await ChatRoom.findOne({ user: userId });

    if (!chat) {
      chat = await ChatRoom.create({ user: userId, messages: [] });
    }

    const message = {
      sender: req.user._id, // admin sender
      content,
    };

    chat.messages.push(message);
    await chat.save();

    await chat.populate('messages.sender', 'name email role');
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to reply to user', error: err.message });
  }
};

module.exports = {
  getMyChat,
  sendMessage,
  getAllChats,
  replyToUserChat
};
