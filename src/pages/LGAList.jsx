import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';


export const LGAList = () => {
    const [lgas, setLGAs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchLGAs();
    }, []);
  
    const fetchLGAs = async () => {
      try {
        const response = await axios.get(`${URL}/api/deliveryrates`);
        setLGAs(response.data);
      } catch (error) {
        console.error('Error fetching LGAs:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this LGA?')) {
        try {
          await axios.delete(`${URL}/api/deliveryrates/${id}`);
          setLGAs(lgas.filter(lga => lga.id !== id));
        } catch (error) {
          console.error('Error deleting LGA:', error);
        }
      }
    };
  
    const filteredLGAs = lgas.filter(lga => 
      lga.lga.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">LGA Management</h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage Local Government Areas and delivery charges
              </p>
            </div>
            <Link
              to="/createlga"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New LGA
            </Link>
          </div>
  
          {/* Search Bar */}
          <div className="mt-6 relative">
            <input
              type="text"
              placeholder="Search LGA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
  
          {/* LGA Table */}
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LGA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Charge
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredLGAs.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      No LGAs found
                    </td>
                  </tr>
                ) : (
                  filteredLGAs.map((lga) => (
                    <tr key={lga.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lga.lga}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{lga.deliveryCharge.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/editlga/${lga.id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lga.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };