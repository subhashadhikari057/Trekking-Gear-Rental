const express = require('express');
const router = express.Router();
const {
  verifyKhaltiPayment,
  initiateKhaltiPayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/payment/verify — for verifying payment using token (used in older flow)
router.post('/verify', protect, verifyKhaltiPayment);

// POST /api/payment/initiate — for initiating Web Checkout (KPG-2)
router.post('/initiate', protect, initiateKhaltiPayment);

module.exports = router;
