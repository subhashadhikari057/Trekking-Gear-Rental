import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"

const FeaturedGear = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products")
        const allProducts = res.data
        const shuffled = allProducts.sort(() => 0.5 - Math.random())
        setProducts(shuffled.slice(0, 6))
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.h2
  initial={{ opacity: 0, y: 50, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.6 }} // ✅ animate only first time scrolling down
  transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
  className="text-5xl font-extrabold text-center mb-4 text-[#4f45e4] tracking-tight"
>
  Our <span className=" decoration-[#4f45e4]/40 underline-offset-4">Featured</span> Gear
</motion.h2>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.6 }} // ✅ animate only once downward
  transition={{ delay: 0.2, duration: 0.6 }}
  className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-base"
>
  Discover our most popular and highly-rated trekking gear — perfect for your next Himalayan adventure.
</motion.p>


      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link
                to={`/gear/${product._id}`}
                className="w-full max-w-[280px] h-[340px] flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                {/* Fixed image box */}
                <div className="h-48 w-full flex items-center justify-center bg-white rounded-t-xl overflow-hidden">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image'}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#4f45e4]">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-sm font-bold mt-2 text-black">Rs {product.pricePerDay} / day</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedGear
