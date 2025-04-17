import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({ name: '', address: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // default: COD
  const [khaltiToken, setKhaltiToken] = useState('');

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

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    if (!userDetails.name || !userDetails.address || !userDetails.phone) {
      return toast.error('Please fill in all user details');
    }

    try {
      if (paymentMethod === 'khalti') {
        if (!khaltiToken) return toast.error('Missing Khalti token');
        const verifyRes = await axios.post(
          'http://localhost:3001/api/payment/verify',
          {
            token: khaltiToken,
            amount: totalPrice * 100, // Khalti requires paisa
          },
          { headers }
        );

        if (!verifyRes.data || !verifyRes.data.data) {
          return toast.error('Khalti verification failed');
        }

        toast.success('Khalti Payment Verified!');
      }

      // Place order
      await axios.post(
        'http://localhost:3001/api/orders',
        {
          userInfo: userDetails,
          isPaid: paymentMethod === 'khalti',
        },
        { headers }
      );

      toast.success('Order placed successfully!');
      window.location.href = '/'; // Redirect after placing order

    } catch (err) {
      toast.error('Order placement failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded shadow flex items-center gap-4">
                <img
                  src={item.product?.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.product?.name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold text-[#4f45e4]">{item.product?.name}</h2>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Rental Days: {item.rentalDays}</p>
                  <p className="text-sm text-gray-700 font-medium">Total: Rs. {item.subtotal}</p>
                </div>
              </div>
            ))}
          </div>

          {/* User Info Form */}
          <div className="mt-8 bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold mb-2">Enter Your Details</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="Address"
              value={userDetails.address}
              onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              className="w-full border rounded p-2"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={userDetails.phone}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              className="w-full border rounded p-2"
            />

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="font-semibold">Payment Method</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="khalti"
                    checked={paymentMethod === 'khalti'}
                    onChange={() => setPaymentMethod('khalti')}
                  />
                  Khalti
                </label>
              </div>

              {/* If Khalti, show token input for now */}
              {paymentMethod === 'khalti' && (
                <input
                  type="text"
                  placeholder="Khalti Token"
                  value={khaltiToken}
                  onChange={(e) => setKhaltiToken(e.target.value)}
                  className="w-full border rounded p-2"
                />
              )}
            </div>
          </div>

          {/* Confirm */}
          <div className="mt-8 text-right">
            <h2 className="text-xl font-semibold">Total Price: Rs. {totalPrice}</h2>
            <button
              onClick={handleConfirmOrder}
              className="mt-4 bg-[#4f45e4] text-white px-6 py-2 rounded hover:bg-[#3a35cc]"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
