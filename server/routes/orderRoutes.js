const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { createOrder, getOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder); // Create order from cart
router.get('/', protect, isAdmin, getOrders); // Admin view all orders

module.exports = router;
