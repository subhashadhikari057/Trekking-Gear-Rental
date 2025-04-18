// controllers/productController.js
const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
};

// Create new product
const createProduct = async (req, res) => {
  const { name, category, description, pricePerDay, imageUrl } = req.body;
  const product = new Product({
    name,
    category,
    description,
    pricePerDay,
    imageUrl,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update product
const updateProduct = async (req, res) => {
  const { name, category, description, pricePerDay, availability, imageUrl } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.pricePerDay = pricePerDay || product.pricePerDay;
    product.availability = availability ?? product.availability;
    product.imageUrl = imageUrl || product.imageUrl;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne(); // <-- use this instead of .remove()
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
