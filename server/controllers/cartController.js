const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc Get current user's cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) return res.json({ items: [] });
  res.json(cart);
};

// @desc Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity, rentalDays } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const subtotal = product.pricePerDay * quantity * rentalDays;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ product: productId, quantity, rentalDays, subtotal }]
    });
  } else {
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.rentalDays = rentalDays;
      existingItem.subtotal = product.pricePerDay * existingItem.quantity * existingItem.rentalDays;
    } else {
      cart.items.push({ product: productId, quantity, rentalDays, subtotal });
    }
  }

  const updatedCart = await cart.save();
  res.status(201).json(updatedCart);
};

// @desc Update cart item
const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity, rentalDays } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ message: 'Cart item not found' });

  const product = await Product.findById(item.product);
  item.quantity = quantity;
  item.rentalDays = rentalDays;
  item.subtotal = product.pricePerDay * quantity * rentalDays;

  const updatedCart = await cart.save();
  res.json(updatedCart);
};

// @desc Remove cart item
const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => item._id.toString() !== itemId);

  const updatedCart = await cart.save();
  res.json(updatedCart);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
};
