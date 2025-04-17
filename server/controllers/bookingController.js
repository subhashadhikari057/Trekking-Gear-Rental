const Booking = require('../models/Booking');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc Place booking from cart
const placeBooking = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const bookedItems = cart.items.map(item => ({
    product: item.product._id,
    name: item.product.name,
    quantity: item.quantity,
    rentalDays: item.rentalDays,
    pricePerDay: item.product.pricePerDay,
    subtotal: item.subtotal
  }));

  const totalAmount = bookedItems.reduce((sum, item) => sum + item.subtotal, 0);

  const booking = new Booking({
    user: req.user._id,
    items: bookedItems,
    totalAmount
  });

  await booking.save();

  // Optionally clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({ message: 'Booking placed successfully', booking });
};

// @desc Get user's own bookings
const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
};

// @desc Admin: Get all bookings
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(bookings);
};

// @desc Admin: Update booking status
const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  booking.status = req.body.status || booking.status;
  const updated = await booking.save();

  res.json({ message: 'Status updated', booking: updated });
};

module.exports = {
  placeBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus
};
