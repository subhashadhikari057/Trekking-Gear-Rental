import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3001/api/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Role updated');
      fetchUsers();
    } catch (err) {
      toast.error('Role update failed');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const confirmDelete = (userId) => {
    toast.custom((t) => (
      <div className="bg-white rounded shadow-lg p-6 max-w-xs mx-auto text-center z-[9999]">
        <p className="text-base font-medium mb-4 text-gray-800">Are you sure you want to delete this user?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(userId);
            }}
            className="bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-4 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: 10000, // stay open until acted on
      position: 'top-center',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-base">
          <thead className="bg-[#4f45e4] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b text-[16px]">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border border-gray-300 px-3 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex gap-4 items-center">
                  <button
                    onClick={() => confirmDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800" title="Edit User">
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="p-6 text-center text-gray-500 text-lg">No users found.</p>
        )}
      </div>
    </div>
  );
}
