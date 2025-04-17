const express = require('express');
const router = express.Router();
const { getAdminSummary } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/summary', protect, isAdmin, getAdminSummary);

module.exports = router;
