const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { createOrder, getOrders,getMyOrders,updateOrderStatus } = require('../controllers/orderController');

router.post('/', protect, createOrder); // Create order from cart
router.get('/', protect, isAdmin, getOrders); // Admin view all orders
router.get('/my', protect, getMyOrders);     // Customer: their own orders
// PUT /api/orders/:id/status - Admin: Update order status
router.put('/:id/status', protect, isAdmin, updateOrderStatus);


module.exports = router;
