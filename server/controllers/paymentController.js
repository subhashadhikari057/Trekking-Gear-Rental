const axios = require('axios');

const verifyKhaltiPayment = async (req, res) => {
  const { token, amount } = req.body;

  if (!token || !amount) {
    return res.status(400).json({ message: 'Token and amount required' });
  }

  try {
    const response = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      {
        token,
        amount, // amount in paisa
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (response.data && response.data.idx) {
      res.status(200).json({
        message: '✅ Payment verified successfully',
        data: response.data,
      });
    } else {
      res.status(400).json({ message: '⚠️ Payment verification failed' });
    }

  } catch (error) {
    console.error('❌ Khalti Verification Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Server error during verification' });
  }
};
const initiateKhaltiPayment = async (req, res) => {
  const {
    return_url,
    purchase_order_id,
    purchase_order_name,
    amount,
    customer_info
  } = req.body;

  try {
    const response = await axios.post(
      'https://dev.khalti.com/api/v2/epayment/initiate/',
      {
        return_url,
        website_url: 'http://localhost:3000',
        amount,
        purchase_order_id,
        purchase_order_name,
        customer_info
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Initiation Error:', error.response?.data || error.message);
    res.status(400).json({ message: 'Something went wrong with Khalti', error: error.response?.data || error.message });
  }
};

module.exports = {
  verifyKhaltiPayment,
  initiateKhaltiPayment
};
