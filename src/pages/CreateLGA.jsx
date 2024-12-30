import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

// CreateLGA.jsx
export const CreateLGA = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lga: '',
    deliveryCharge: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${URL}/api/deliveryrates/create`, {
        lga: formData.lga,
        deliveryCharge: Number(formData.deliveryCharge)
      });
      navigate('/lga');
    } catch (error) {
      console.error('Error creating LGA:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New LGA</h2>
            <p className="mt-1 text-sm text-gray-600">
              Add a new Local Government Area and its delivery charge
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LGA Name
              </label>
              <input
                type="text"
                required
                value={formData.lga}
                onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Charge (₦)
              </label>
              <input
                type="number"
                required
                min="0"
                step="100"
                value={formData.deliveryCharge}
                onChange={(e) => setFormData({ ...formData, deliveryCharge: e.target.value })}
                className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create LGA'}
              </button>
              <Link
                to="/admin/lga"
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};