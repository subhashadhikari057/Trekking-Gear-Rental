const express = require('express');
const router = express.Router();
const { verifyKhaltiPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/verify', protect, verifyKhaltiPayment);

module.exports = router;
