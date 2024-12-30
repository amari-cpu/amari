import React, { useState, useEffect } from 'react';
import { URL } from '../url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Sidebar from '../components/Sidebar'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductTable = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 4;

  const fetchProducts = async () => {

    const res = await axios.get(`${URL}/api/products`)
    console.log(res.data)
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  },[])

  // Filter products based on search, date range
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (search) {
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.Category.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(p => {
        const productDate = new Date(p.createdAt);
        return productDate >= new Date(startDate) && 
               productDate <= new Date(endDate);
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, startDate, endDate, products]);

  const handleDelete = async(itemId)=>{
    try{
      const res = await axios.delete(`${URL}/api/products/${itemId}`)
      setProducts((prevData) => prevData.filter(item => item.id !== itemId));
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }


  
  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

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
        <div className='flex-1 ml-[320px]'>
        <div className='p-9'>
        <p className='font-bold text-3xl text-blue-600'>Products</p>



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


        <Link to={'/createproduct'}><button className='bg-blue-500 text-white px-6 py-2 rounded-md'>Create Product</button></Link>
      </div>

 {/* Table */}
 <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full bg-white border text-left border-gray-200 rounded-md">
        <thead className='bg-blue-200 text-blue-700  rounded-md'>
          <tr >
            <th scope="col" className="py-4 px-6 ">image</th>
            <th scope="col" className="py-4 px-6 ">title</th>
            <th scope="col" className="py-4 px-6 ">price(₦)</th>
            <th scope="col" className="py-4 px-6 ">discount(₦)</th>
            {/* <th scope="col" className="py-4 px-6 ">color</th>
            <th scope="col" className="py-4 px-6 ">size</th> */}
            <th scope="col" className="py-4 px-6 ">category</th>
            <th scope="col" className="py-4 px-6 ">edit</th>
            <th scope="col" className="py-4 px-6 ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((p, index) => (
            <tr key={p.id} className=' border-b border-gray-300'>
              <td className="px-6"><img src={p?.imageUrl} alt='' className='object-cover w-9 h-9'/></td>
              <td className="px-6">{p?.title?.slice(0,7)+'...'}</td>
              <td className="px-6">{p?.price}</td>
              <td className="px-6">{p?.discount ? p.discount : 'none'}</td>
              {/* <td className="px-6">{p?.color ? p.color : 'none'}</td>
              <td className="px-6">{p?.size ? p.size : 'none'}</td> */}
              <td className="px-6">{p?.Category?.name.slice(0,6)+"..."}</td>
              <Link to={`/editproduct/${p.id}`}><td className="py-4 px-11 pt-[25px]"><GrEdit /></td></Link>
          <td className="py-4 px-11" onClick={() => handleDelete(p.id)}><RiDeleteBinLine className='text-red-600' /></td>
  
            </tr>
          ))}
        </tbody>
      </table>
      </div>

{/* Pagination */}
<div className="mt-6 flex justify-between items-center">
  <p className="text-sm text-gray-600">
    Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} entries
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
  )
}

export default ProductTable