import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items || []);
    } catch (err) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalInPaisa = totalPrice * 100;

  const handleKhaltiPayment = async () => {
    if (!name || !address || !phone) {
      toast.error('Please fill in all user details');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const payload = {
        return_url: 'http://localhost:3000/khalti-success',
        purchase_order_id: 'order_' + new Date().getTime(),
        purchase_order_name: 'Trekking Gear Rental',
        amount: totalInPaisa,
        customer_info: {
          name,
          email: 'test@example.com',
          phone
        }
      };

      const { data } = await axios.post(
        'http://localhost:3001/api/payment/initiate',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem('checkout_user_info', JSON.stringify({ name, address, phone }));

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Failed to generate Khalti payment link');
      }
    } catch (err) {
      console.error('❌ Khalti Error:', err.response?.data || err.message);
      toast.error('Something went wrong with Khalti');
    }
  };

  const handleCashOnDelivery = async () => {
    if (!name || !address || !phone) {
      toast.error('Please fill in all user details');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/orders',
        {
          name,
          address,
          phone,
          paymentMethod: 'Cash on Delivery',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('✅ Order placed successfully!');
      navigate('/success');
    } catch (err) {
      console.error('❌ Cash Order Error:', err.response?.data || err.message);
      toast.error('Order failed');
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Delivery address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="9800000000"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded shadow flex items-center gap-4"
              >
                <img
                  src={item.product?.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.product?.name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold text-[#4f45e4]">{item.product?.name}</h2>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Rental Days: {item.rentalDays}</p>
                  <p className="text-sm text-gray-700 font-medium">Subtotal: Rs. {item.subtotal}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <h2 className="text-xl font-semibold">Total Price: Rs. {totalPrice}</h2>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleKhaltiPayment}
                className="bg-[#4f45e4] text-white px-6 py-2 rounded hover:bg-[#3a35cc]"
              >
                Pay with Khalti
              </button>
              <button
                onClick={handleCashOnDelivery}
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
              >
                Cash on Delivery
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
