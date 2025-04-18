const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { createOrder, getOrders,getMyOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder); // Create order from cart
router.get('/', protect, isAdmin, getOrders); // Admin view all orders
router.get('/my', protect, getMyOrders);     // Customer: their own orders

module.exports = router;
