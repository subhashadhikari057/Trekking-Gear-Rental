import { useEffect, useState } from 'react';
import { Eye, Package, ShoppingBag, Users, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: profile } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setRole(profile.role);

        const { data: myOrders } = await axios.get('/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(myOrders);
      } catch (err) {
        toast.error('Failed to load dashboard');
        navigate('/login');
      }
    };

    fetchProfileAndOrders();
  }, [navigate]);

  if (!role) return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {role === 'admin' && (
        <div className="bg-white rounded shadow mb-8">
          <div className="bg-[#4f45e4] text-white p-4 rounded-t">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6">
            <button
              onClick={() => navigate('/admin/orders')}
              className="bg-[#4f45e4] hover:bg-[#4338ca] text-white py-6 rounded flex flex-col items-center justify-center gap-2"
            >
              <Package className="w-6 h-6" />
              All Orders
            </button>
            <button
              onClick={() => navigate('/admin/users')}
              className="bg-[#4f45e4] hover:bg-[#4338ca] text-white py-6 rounded flex flex-col items-center justify-center gap-2"
            >
              <Users className="w-6 h-6" />
              All Users
            </button>
            <button
              onClick={() => navigate('/admin/products')}
              className="bg-[#4f45e4] hover:bg-[#4338ca] text-white py-6 rounded flex flex-col items-center justify-center gap-2"
            >
              <ShoppingBag className="w-6 h-6" />
              All Products
            </button>
            <button
              onClick={() => navigate('/admin/add-product')}
              className="bg-[#4f45e4] hover:bg-green-700 text-white py-6 rounded flex flex-col items-center justify-center gap-2"
            >
              <PlusCircle className="w-6 h-6" />
              Add Product
            </button>
            {/* <button
    onClick={() => navigate('/admin/chat')}
    className="bg-[#4f45e4] hover:bg-[#4338ca] text-white py-6 rounded flex flex-col items-center justify-center gap-2"
  >
    <FaComments className="w-6 h-6" />
    Chat Support
  </button> */}
          </div>
        </div>
      )}

      {/* Orders section (visible to all) */}
      <div className="bg-white rounded shadow">
        <div className="bg-[#4f45e4] text-white p-4 rounded-t">
          <h2 className="text-lg font-semibold">My Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Paid</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2 font-medium">{order._id.slice(0, 8)}</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">Rs. {order.totalPrice}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.isPaid ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Confirmed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline flex items-center gap-1 text-xs">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="p-4 text-center text-gray-500">No orders found.</p>}
        </div>
      </div>
    </div>
  );
}
