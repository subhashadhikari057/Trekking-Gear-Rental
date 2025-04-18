const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');

// Middleware
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected user profile
router.get('/profile', protect, getProfile);

// Admin routes
router.get('/', protect, isAdmin, getAllUsers); // GET all users
router.put('/:id/role', protect, isAdmin, updateUserRole); // PUT update user role
router.delete('/:id', protect, isAdmin, deleteUser);       // DELETE user

module.exports = router;
