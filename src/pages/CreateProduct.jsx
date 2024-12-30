// import React,{useEffect, useState} from "react";
// import { URL } from '../url'
// import axios from 'axios'
// import {Link, useNavigate, useParams } from 'react-router-dom'

  

// const CreateProduct = () => {
//   const navigate = useNavigate()

//     const [title,setTitle]=useState("")
//     const [file, setFile] = useState(null)
//     const [imageUrl,setImageUrl]=useState(null)
//     const [price,setPrice]=useState("")
//     const [description,setDescription]=useState("")
//     const [color,setColor]=useState("")
//     const [size,setSize]=useState("")
//     const [selectedCategoryId, setSelectedCategoryId]=useState([])
//     const [category, setCategory]=useState([])
//     const [isLoading, setIsLoading] = useState(false)

//   const fetchCategories = async () => {
//     const res = await axios.get(`${URL}/api/categories`)
//     console.log(res.data)
//     setCategory(res.data)
//   }

//   useEffect(() => {
//     fetchCategories()
//   },[])
//     const handleCategoryId = (e) => {       
//         setSelectedCategoryId(e.target.value);
//     };

//     const handleProduct = async (e) => {
//     e.preventDefault();

//     setIsLoading(true)
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('price', price);
//     formData.append('description', description);
//     formData.append('color', color);
//     formData.append('size', size);
//     formData.append('categoryId', selectedCategoryId);
//     if (file) {
//       formData.append('imageUrl', file);
//     }


//     const res = await axios.post(`${URL}/api/products/create`, formData, {
//       headers:{
//         'Content-Type':'multipart/form-data'
//       }
//     });
//     if (res){
//       navigate('/producttable')
//       setIsLoading(false)
//     }
  
//   }



      
   

    
//   return (
//     <div className="w-full">
    
//       <div className="items-center h-[100vh] justify-center flex w-full">
//  <div className="flex flex-col gap-y-6">
//         <p className="text-2xl text-center">Create Product</p>
//           <input onChange={(e)=>setTitle(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Title" />
//           <input onChange={(e)=>setPrice(e.target.value)} className="border border-black px-2 py-1" placeholder="Price" />
//           <input onChange={(e)=>setDescription(e.target.value)} className="border border-black px-2 py-1" placeholder="Description" />
//           <input onChange={(e)=>setColor(e.target.value)} className="border border-black px-2 py-1" placeholder="Color " />
//           <input onChange={(e)=>setSize(e.target.value)} className="border border-black px-2 py-1" placeholder="Size " />
//           <label className='cursor-pointer'>
//                   <input type="file" onChange={(e) => setFile(e.target.files[0])} />
               
//                 </label>
         
//           <select value={selectedCategoryId} onChange={handleCategoryId} className="border border-black px-2 py-1">
//             <option value="">Select Category:</option>
//             {category.map(item => (
//               <option key={item.id} value={item.id}>{item.name}</option>
//             ) )}
//           </select>


// <button onClick={handleProduct} className="bg-blue-500 text-white py-1">{isLoading ? <p>Creating ...</p> : <p>Create Product</p>}</button>

          
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;


import React, { useEffect, useState } from "react";
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    color: "",
    size: ""
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);
    submitData.append('color', formData.color);
    submitData.append('size', formData.size);
    submitData.append('categoryId', selectedCategoryId);
    if (file) {
      submitData.append('imageUrl', file);
    }

    try {
      const res = await axios.post(`${URL}/api/products/create`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        navigate('/producttable');
      }
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <IoArrowBack />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Create New Product</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter color"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter size"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Creating..." : "Create Product"}
              </button>
            </form>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {imagePreview ? "Product image preview" : "No image selected"}
                  </div>
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload product image</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;