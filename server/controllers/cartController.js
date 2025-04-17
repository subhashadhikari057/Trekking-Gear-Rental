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

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    const product = await Product.findById(item.product);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    item.quantity = quantity;
    item.rentalDays = rentalDays;
    item.subtotal = product.pricePerDay * quantity * rentalDays;

    await cart.save();
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: 'Failed to update item' });
  }
};

// @desc Remove cart item
const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json({ message: 'Item removed successfully' });
  } catch (err) {
    console.error('Remove error:', err.message);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
};
