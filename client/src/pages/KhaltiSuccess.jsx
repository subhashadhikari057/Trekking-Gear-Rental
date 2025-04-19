import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const KhaltiSuccess = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false); // ✅ added to prevent double execution

  useEffect(() => {
    const placeOrder = async () => {
      if (hasRun.current) return; // ✅ skip if already run
      hasRun.current = true;

      const token = localStorage.getItem('token');
      const userInfo = JSON.parse(localStorage.getItem('checkout_user_info'));

      if (!userInfo) {
        toast.error('Missing user info');
        return;
      }

      try {
        await axios.post(
          'http://localhost:3001/api/orders',
          {
            ...userInfo,
            paymentMethod: 'Khalti',
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success('✅ Payment successful and order placed!');
        localStorage.removeItem('checkout_user_info');
        navigate('/success');
      } catch (err) {
        console.error('❌ Order save failed:', err.response?.data || err.message);
        toast.error('Failed to place order after payment');
      }
    };

    placeOrder();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-lg">Verifying payment and placing your order...</p>
    </div>
  );
};

export default KhaltiSuccess;
