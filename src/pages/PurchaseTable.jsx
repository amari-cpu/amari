import React, { useState, useEffect } from 'react';
import { URL } from '../url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { format } from 'date-fns';
import Sidebar from '../components/Sidebar';

const PurchaseTable = () => {
  const [search, setSearch] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 5;

  const fetchPurchases = async () => {
    try {
      const res = await axios.get(`${URL}/api/purchases`);
      setPurchases(res.data);
      setFilteredPurchases(res.data);
    } catch (err) {
      console.error('Error fetching purchases:', err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Filter purchases based on search, date range
  useEffect(() => {
    let filtered = [...purchases];

    // Search filter
    if (search) {
      filtered = filtered.filter(p => 
        p.fname?.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase()) ||
        p.status?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(p => {
        const purchaseDate = new Date(p.createdAt);
        return purchaseDate >= new Date(startDate) && 
               purchaseDate <= new Date(endDate);
      });
    }

    setFilteredPurchases(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, startDate, endDate, purchases]);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${URL}/api/purchases/${itemId}`);
      setPurchases(prevData => prevData.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting purchase:', err);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredPurchases.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div>
      <Sidebar />
      <div className='flex-1 ml-[300px]'>
        <div className='p-9'>
          <p className='font-bold text-3xl text-blue-600 mb-6'>Purchases</p>

          {/* Search and Filter Section */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-white border border-gray-200">
              <thead className='bg-blue-200 text-blue-700'>
                <tr>
                  <th className="py-4 px-6">First Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Discount</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">View</th>
                  <th className="py-4 px-6">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((p) => (
                  <tr key={p.id} className='border-b border-gray-300 hover:bg-gray-50'>
                    <td className="py-4 px-6">{p?.fname}</td>
                    <td className="py-4 px-6">{p?.email}</td>
                    <td className="py-4 px-6">{p?.discount ? 'Discounted' : 'None'}</td>
                    <td className="py-4 px-6">${p?.totalAmount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        p?.status === 'completed' ? 'bg-green-100 text-green-800' :
                        p?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {p?.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link to={`/viewpurchase/${p.id}`}>
                        <GrView className="hover:scale-110 transition-transform" />
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPurchases.length)} of {filteredPurchases.length} entries
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTable;