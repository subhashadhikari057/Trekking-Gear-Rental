const Review = require("../models/Review")

// POST /api/reviews
const addReview = async (req, res) => {
  try {
    const { name, rating, comment, productId } = req.body
    const review = new Review({ name, rating, comment, productId })
    const saved = await review.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ error: "Failed to add review" })
  }
}
const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 })
      res.json(reviews)
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch reviews" })
    }
  }

  module.exports = {
    addReview,
    getAllReviews,
  }
  
