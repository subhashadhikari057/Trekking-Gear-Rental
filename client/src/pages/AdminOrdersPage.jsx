import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:3001/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (err) {
        toast.error('Failed to load orders');
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3001/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Status updated');
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">All Orders</h1>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Paid</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2 font-medium">{order._id.slice(0, 8)}</td>
                <td className="px-4 py-2">{order.name}</td>
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">{order.address}</td>
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
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-4 text-center text-gray-500">No orders found.</p>}
      </div>
    </div>
  );
}
