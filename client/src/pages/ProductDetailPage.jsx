import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleAddToCart = async () => {
    if (!startDate || !endDate || quantity < 1) {
      toast.error('Please select dates and valid quantity.');
      return;
    }

    const totalDays = getTotalDays();
    const rentalDays = totalDays;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/cart',
        {
          productId: product._id,
          quantity,
          rentalDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Item added to cart!');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Failed to add to cart.');
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen px-4 md:px-16 py-8 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6 grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name}
            className="max-h-80 object-contain w-full rounded"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#4f45e4]">{product.name}</h1>
          <p className="text-sm text-gray-600">Category: {product.category}</p>
          <p className={`text-sm font-medium ${product.availability ? 'text-green-600' : 'text-red-500'}`}>
            {product.availability ? 'Available' : 'Out of Stock'}
          </p>
          <p className="text-lg font-semibold">Rs. {product.pricePerDay}/day</p>
          <p className="text-gray-700">{product.description}</p>

          {/* Rental Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-2 max-w-[80px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded p-2 max-w-[80px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2 w-20"
              />
            </div>
          </div>

          {/* Rental Summary */}
          {startDate && endDate && (
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>Total Days: <span className="font-semibold">{getTotalDays()}</span></p>
              <p>Total Cost: <span className="font-semibold">Rs. {getTotalDays() * product.pricePerDay * quantity}</span></p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#4f45e4] text-white py-2 px-4 rounded hover:bg-[#3a35cc] transition"
              disabled={!product.availability}
            >
              Add to Cart
            </button>
            {/* <button
              className="w-full border border-[#4f45e4] text-[#4f45e4] py-2 px-4 rounded hover:bg-[#f0eeff] transition"
              disabled={!product.availability}
            >
              Rent Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
