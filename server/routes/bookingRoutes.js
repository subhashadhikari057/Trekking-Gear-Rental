// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

const {
  placeBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/bookingController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, placeBooking);
router.get('/', protect, getUserBookings);

// Admin routes
router.get('/admin', protect, isAdmin, getAllBookings);
router.put('/:id', protect, isAdmin, updateBookingStatus);

module.exports = router;
