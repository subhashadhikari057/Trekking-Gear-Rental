const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

const { protect } = require('../middleware/authMiddleware');

// All routes are protected (user must be logged in)
router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:itemId', protect, updateCartItem);
router.delete('/:itemId', protect, removeCartItem);

module.exports = router;
