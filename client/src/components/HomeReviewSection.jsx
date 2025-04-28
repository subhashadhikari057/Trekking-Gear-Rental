import { useState, useEffect } from "react"
import axios from "axios"
import { Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
}

const HomeReviewSection = () => {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/reviews")
        setReviews(res.data.slice(0, 6))
      } catch (err) {
        console.error("Error fetching reviews:", err)
      }
    }

    fetchReviews()

    const email = localStorage.getItem("email")
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")
    if (email && role && token) {
      setUser({ email, role })
    }
  }, [])

  const handleRating = (star) => {
    setNewReview({ ...newReview, rating: star })
    setErrors({ ...errors, rating: false })
  }

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validation = {
      name: !newReview.name.trim(),
      rating: newReview.rating === 0,
      comment: !newReview.comment.trim(),
    }

    if (validation.name || validation.rating || validation.comment) {
      setErrors(validation)
      return
    }

    try {
      setIsSubmitting(true)
      const token = localStorage.getItem("token")

      const res = await axios.post(
        "http://localhost:3001/api/reviews",
        {
          name: newReview.name,
          rating: newReview.rating,
          comment: newReview.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setReviews([res.data, ...reviews.slice(0, 2)])
      setNewReview({ name: "", rating: 0, comment: "" })
      setSuccessMsg("Thanks for your review!")
      setTimeout(() => setSuccessMsg(""), 3000)
    } catch (err) {
      console.error("Error submitting review:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto py-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <motion.h2 className="text-3xl font-bold text-[#4f45e4] mb-4 text-center">
        Customer Experiences
      </motion.h2>
      <motion.p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
        See what our customers are saying about their experiences with our trekking gear rental service. We pride
        ourselves on quality equipment and excellent service.
      </motion.p>

      {/* Reviews */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false,amount:0.5 }}
        variants={fadeUp}
      >
        {reviews.map((r, i) => (
          <motion.div
            key={r._id}
            className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col justify-between"
            custom={i}
            variants={fadeUp}
          >
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#4f45e4]/10 to-[#4f45e4]/5">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#4f45e4] text-white font-bold text-lg">
                {r.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(r.createdAt))} ago</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i <= r.rating ? "fill-[#4f45e4] text-[#4f45e4]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 text-sm text-gray-700 flex-1">{r.comment}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Submission Form */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow border"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>
        {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}

        {!user ? (
          <p className="text-sm text-gray-600">
            <span
              className="text-[#4f45e4] font-semibold cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>{" "}
            to write a review.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name *</label>
              <input
                name="name"
                value={newReview.name}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs">Please enter your name</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating *</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleRating(i)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i <= newReview.rating
                          ? "fill-[#4f45e4] text-[#4f45e4]"
                          : "text-gray-300 hover:text-[#4f45e4]/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="text-red-500 text-xs">Please select a rating</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Your Review *</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleChange}
                rows={4}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.comment ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Write about your trekking gear experience..."
              ></textarea>
              {errors.comment && <p className="text-red-500 text-xs">Please enter a review</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4f45e4] hover:bg-[#3d35c8] text-white px-6 py-2 rounded text-sm font-medium transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            
          </form>
        )}
      </motion.div>
      <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="mt-12 mx-auto block bg-[#B4B1EF] text-white px-5 py-2 rounded hover:bg-[#3a35cc] transition"
>
Scroll Up
</button>
    </motion.div>
  )
}

export default HomeReviewSection
