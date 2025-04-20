import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const FeaturedGear = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/products") // Adjust port if needed
        const allProducts = res.data

        // Shuffle and select 6
        const shuffled = allProducts.sort(() => 0.5 - Math.random())
        setProducts(shuffled.slice(0, 6))
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-black">
        Our Featured Gear
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {products.map((product) => (
            <Link
              to={`/gear/${product._id}`}
              key={product._id}
              className="w-full max-w-[250px] border rounded-lg p-4 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <img
                src={product.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image'}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-medium text-[#4f45e4]">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm font-semibold mt-1">Rs {product.pricePerDay} / day</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedGear
