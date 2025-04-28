import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Item removed');
      fetchCartItems();
    } catch (err) {
      toast.error('Error removing item');
    }
  };

  const handleUpdate = async (itemId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/api/cart/${itemId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    const item = cartItems.find((i) => i._id === itemId);
    if (item) {
      handleUpdate(itemId, {
        quantity,
        rentalDays: item.rentalDays,
      });
    }
  };

  const handleDaysChange = (itemId, rentalDays) => {
    if (rentalDays < 1) return;
    const item = cartItems.find((i) => i._id === itemId);
    if (item) {
      handleUpdate(itemId, {
        rentalDays,
        quantity: item.quantity,
      });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={item.product?.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.product?.name || 'Gear'}
                  className="w-32 h-32 object-contain rounded"
                />
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h2 className="text-xl font-semibold text-[#4f45e4]">{item.product?.name}</h2>
                  <p className="text-sm text-gray-600">Category: {item.product?.category}</p>
                  <p className="text-sm text-gray-600">Price/Day: Rs. {item.product?.pricePerDay}</p>

                  <div className="flex gap-4 justify-center sm:justify-start">
                    <div>
                      <label className="text-xs">Quantity:</label>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        className="border px-2 py-1 rounded w-20 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs">Rental Days:</label>
                      <input
                        type="number"
                        value={item.rentalDays}
                        min={1}
                        onChange={(e) => handleDaysChange(item._id, parseInt(e.target.value))}
                        className="border px-2 py-1 rounded w-24 text-sm"
                      />
                    </div>
                  </div>

                  <p className="font-medium mt-1 text-black">
                    Total: Rs. {item.subtotal}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 🚀 Proceed to Checkout Button */}
          <div className="mt-6 text-right">
            <button
              onClick={() => window.location.href = '/checkout'}
              className="bg-[#4f45e4] text-white px-6 py-2 rounded hover:bg-[#3a35cc]"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
