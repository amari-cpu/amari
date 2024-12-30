import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';


export const EditLGA = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
      lga: '',
      deliveryCharge: ''
    });
  
    useEffect(() => {
      fetchLGA();
    }, [id]);
  
    const fetchLGA = async () => {
      try {
        const response = await axios.get(`${URL}/api/deliveryrates/${id}`);
        setFormData({
          lga: response.data.lga,
          deliveryCharge: response.data.deliveryCharge
        });
      } catch (error) {
        console.error('Error fetching LGA:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.put(`${URL}/api/deliveryrates/${id}`, {
          lga: formData.lga,
          deliveryCharge: Number(formData.deliveryCharge)
        });
        navigate('/lga');
      } catch (error) {
        console.error('Error updating LGA:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Edit LGA</h2>
              <p className="mt-1 text-sm text-gray-600">
                Update LGA name and delivery charge
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update LGA'}
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