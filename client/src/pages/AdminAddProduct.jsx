// src/pages/AdminAddProduct.jsx
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    pricePerDay: '',
    imageUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Product added!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('❌ Failed to add product');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Tents">Tents</option>
            <option value="Backpacks">Backpacks</option>
            <option value="Sleeping Bags">Sleeping Bags</option>
            <option value="Hiking Poles">Hiking Poles</option>
            <option value="Cooking Equipment">Cooking Equipment</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            className="bg-white"
            theme="snow"
          />
        </div>

        <div>
          <label className="block font-medium">Price Per Day (Rs)</label>
          <input
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-3 max-h-40 object-contain border rounded"
              onError={(e) => (e.target.style.display = 'none')}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#4f45e4] text-white py-2 rounded hover:bg-[#3a35cc]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
