const Message = require('../models/Message');

// @desc Get all messages (admin)
const getMessages = async (req, res) => {
  const messages = await Message.find().populate('sender', 'name email').sort({ createdAt: 1 });
  res.json(messages);
};

// @desc Save message
const saveMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Message content required' });
  }

  const message = new Message({
    sender: req.user._id,
    content
  });

  const saved = await message.save();
  res.status(201).json(saved);
};

module.exports = { getMessages, saveMessage };
