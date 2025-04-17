const User = require('../models/User');
const Product = require('../models/Product');
const Booking = require('../models/Booking');

const getAdminSummary = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Products
    const totalProducts = await Product.countDocuments();

    // Total Bookings
    const totalBookings = await Booking.countDocuments();

    // Booking Status Breakdown
    const bookingStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusSummary = {};
    bookingStatus.forEach(stat => {
      statusSummary[stat._id] = stat.count;
    });

    // Total Revenue (Confirmed Only)
    const revenueData = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // Products by Category
    const productCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const categorySummary = {};
    productCategory.forEach(cat => {
      categorySummary[cat._id] = cat.count;
    });

    res.json({
      users: totalUsers,
      products: totalProducts,
      bookings: totalBookings,
      revenue: totalRevenue,
      categories: categorySummary,
      bookingStatus: statusSummary
    });

  } catch (err) {
    console.error('Admin summary error:', err);
    res.status(500).json({ message: 'Failed to fetch admin summary' });
  }
};

module.exports = { getAdminSummary };
