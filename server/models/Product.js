// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
