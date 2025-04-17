const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rentalDays: {
    type: Number,
    required: true,
    default: 1
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  subtotal: {
    type: Number,
    required: true
  }
}); // ✅ don't disable _id!

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
