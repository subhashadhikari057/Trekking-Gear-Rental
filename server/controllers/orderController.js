const Order = require('../models/order');
const Cart = require('../models/Cart');

// @desc Create a new order
const createOrder = async (req, res) => {
  try {
    const { name, address, phone, paymentMethod } = req.body;

    if (!name || !address || !phone || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalPrice,
      name,
      address,
      phone,
      paymentMethod,
      isPaid: paymentMethod === 'Khalti',
      status: 'Pending'
    });

    await Cart.deleteOne({ user: req.user._id });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Order creation failed', error: err.message });
  }
};

// @desc Get all orders (Admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

// @desc Get logged-in user's own orders
const getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(myOrders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your orders' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getMyOrders
};
