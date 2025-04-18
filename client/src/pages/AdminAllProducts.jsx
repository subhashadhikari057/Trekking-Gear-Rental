// src/pages/AdminAllProducts.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminAllProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/products');
      setProducts(data);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProduct({});
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/api/products/${editingId}`, editedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product updated successfully');
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async (productId) => {
    toast((t) => (
      <span>
        Are you sure?
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3001/api/products/${productId}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                toast.dismiss(t.id);
                toast.success('Product deleted');
                fetchProducts();
              } catch (err) {
                toast.dismiss(t.id);
                toast.error('Failed to delete product');
                console.error(err);
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded text-xs"
          >
            No
          </button>
        </div>
      </span>
    ), {
      duration: 8000,
      position: "top-center"
    });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-base text-left">
          <thead className="bg-[#4f45e4] text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price/Day</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <input
                      name="name"
                      value={editedProduct.name || ''}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <input
                      name="category"
                      value={editedProduct.category || ''}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <input
                      name="pricePerDay"
                      value={editedProduct.pricePerDay || ''}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    `Rs. ${product.pricePerDay}`
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <select
                      name="availability"
                      value={editedProduct.availability}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value={true}>Available</option>
                      <option value={false}>Out of Stock</option>
                    </select>
                  ) : (
                    product.availability ? 'Available' : 'Out of Stock'
                  )}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {editingId === product._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-black px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
