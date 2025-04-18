import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BrowseGearPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/products');
        let data = res.data;

        if (selectedCategory) {
          data = data.filter(p => p.category === selectedCategory);
        }

        if (selectedAvailability) {
          const isAvailable = selectedAvailability === 'Available';
          data = data.filter(p => p.availability === isAvailable);
        }

        if (selectedSort === 'low') {
          data.sort((a, b) => a.pricePerDay - b.pricePerDay);
        } else if (selectedSort === 'high') {
          data.sort((a, b) => b.pricePerDay - a.pricePerDay);
        }

        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSort, selectedAvailability]);

  const getAvailabilityText = (status) => (status ? 'Available' : 'Out of Stock');
  const getAvailabilityColor = (status) => (status ? 'text-green-600' : 'text-red-600');

  return (
    <div className="min-h-screen px-4 md:px-10 py-6 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white p-4 rounded shadow shrink-0 h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">All</option>
              <option value="Tents">Tents</option>
              <option value="Backpacks">Backpacks</option>
              <option value="Sleeping Bags">Sleeping Bags</option>
              <option value="Hiking Poles">Hiking Poles</option>
              <option value="Cooking Equipment">Cooking Equipment</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sort by Price</label>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">None</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between w-full max-w-sm mx-auto"
              >
                {/* Image Wrapper */}
                <div className="w-full h-[180px] flex items-center justify-center overflow-hidden bg-gray-100 rounded mb-4">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image'}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-[#4f45e4] font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="font-semibold mt-1">Rs. {product.pricePerDay}/day</p>
                  <p className={`font-medium ${getAvailabilityColor(product.availability)}`}>
                    {getAvailabilityText(product.availability)}
                  </p>
                </div>

                {/* View Button */}
                <button
                  onClick={() => navigate(`/gear/${product._id}`)}
                  className="mt-4 w-full bg-[#4f45e4] text-white py-2 text-sm rounded hover:bg-[#3a35cc]"
                >
                  View
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default BrowseGearPage;
