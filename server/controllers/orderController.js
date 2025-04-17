const Order = require('../models/order');
const Cart = require('../models/Cart');

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
      isPaid: paymentMethod === 'Khalti', // simulate payment for Khalti
      status: 'Pending'
    });

    // Clear cart after placing order
    await Cart.deleteOne({ user: req.user._id });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Order creation failed', error: err.message });
  }
};

const getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email') // only fetch user name and email
    .populate('items.product');
  res.json(orders);
};

module.exports = { createOrder, getOrders };
