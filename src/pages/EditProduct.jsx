// import React, { useEffect, useState } from "react";
// import { URL } from '../url'
// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom'

// const EditProduct = () => {
//   const navigate = useNavigate()
//   const { id: productId } = useParams()
//   const [product, setProduct] = useState({
//     title: "",
//     price: "",
//     discount:"",
//     description: "",
//     color: "",
//     size: "",
//     imageUrl: null,
//   })
//   const [file, setFile] = useState(null)
//   const [selectedCategoryId, setSelectedCategoryId] = useState("")
//   const [categories, setCategories] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const fetchCategories = async () => {
//     const res = await axios.get(`${URL}/api/categories`)
//     setCategories(res.data)
//   }

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${URL}/api/products/${productId}`)
//       setProduct(res.data)
//       setSelectedCategoryId(res.data.categoryId)
//     } catch (error) {
//       console.error("Failed to fetch product:", error)
//     }
//   }

//   useEffect(() => {
//     fetchCategories()
//     fetchProducts()
//   }, [productId])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const editProduct = async (e) => {
//     e.preventDefault();
//     setIsLoading(true)
//     setError("")

//     const updatedProduct = {
//       title: product.title,
//       price: parseFloat(product.price),
//       discount: parseFloat(product.discount),
//       description: product.description,
//       color: product.color,
//       size: product.size,
//       categoryId: selectedCategoryId
//     }

//     try {
//       const res = await axios.put(`${URL}/api/products/${productId}`, updatedProduct, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       if (res.data) {
//         navigate('/producttable')
//       }
//     } catch (error) {
//       console.error("failed to update product:", error)
//       setError("Failed to update product. Please try again")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const updateImage = async () => {
//     setIsLoading(true)
//     setError("")

//     const formData = new FormData()
//     if (file) {
//       formData.append('imageUrl', file)
//     } else {
//       setError("Please select an image to upload")
//       setIsLoading(false)
//       return
//     }

//     try {
//       const res = await axios.put(`${URL}/api/products/${productId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       if (res.data) {
//         setProduct(prev => ({ ...prev, imageUrl: res.data.imageUrl }))
//         setFile(null)
//       }
//     } catch (error) {
//       console.error("failed to update image:", error)
//       setError("Failed to update image. Please try again")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const removeImage = async () => {
//     setIsLoading(true)
//     setError("")

//     try {
//       const res = await axios.delete(`${URL}/api/products/${productId}/image`);
//       if (res.data) {
//         setProduct(prev => ({ ...prev, imageUrl: null }))
//       }
//     } catch (error) {
//       console.error("failed to remove image:", error)
//       setError("Failed to remove image. Please try again")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="w-full">
//       <div className="items-center h-[100vh] gap-x-9 justify-center flex w-full">
//         <form onSubmit={editProduct}>
//           <div className="flex flex-col gap-y-6">
//             <p className="text-2xl text-center">Edit Product</p>
//             {error && <p className="text-red-500">{error}</p>}
//             <input name="title" value={product.title} onChange={handleInputChange} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Title" />
//             <input name="price" value={product.price} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Price" />
//             <input name="discount" value={product.discount} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="discounted Price" />
//             <input name="description" value={product.description} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Description" />
//             <input name="color" value={product.color} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Color " />
//             <input name="size" value={product.size} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Size " />
//             <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} className="border border-black px-2 py-1">
//               <option value="">Select Category:</option>
//               {categories.map(item => (
//                 <option key={item.id} value={item.id}>{item.name}</option>
//               ))}
//             </select>
//             <button type="submit" disabled={isLoading} className="bg-blue-500 text-white py-1">{isLoading ? "Updating ..." : "Update Product Info"}</button>
//           </div>
//         </form>

//         <div className="mt-8">
//           <p className="text-xl mb-4">Update Image</p>
//           {product.imageUrl && (
//             <div>
//               <p>Current image:</p>
//               <img src={product.imageUrl} alt="Product" className="w-32 h-32 object-cover mb-2" />
//               {/* <button onClick={removeImage} className="bg-red-500 text-white px-3 py-1 rounded-md mb-4">Remove Image</button> */}
//             </div>
//           )}
//           <input type="file" onChange={handleFileChange} className="mb-2" />
//           <button onClick={updateImage} disabled={isLoading} className="bg-green-500 text-white px-3 py-1 rounded-md">
//             {isLoading ? "Updating..." : "Update Image"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;


import React, { useEffect, useState } from "react";
import { URL } from '../url';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
    color: "",
    size: "",
    imageUrl: null,
  });
  const [file, setFile] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${URL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to load categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/api/products/${productId}`);
      setProduct(res.data);
      setSelectedCategoryId(res.data.categoryId);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to load product details");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const updatedProduct = {
      title: product.title,
      price: parseFloat(product.price),
      discount: parseFloat(product.discount),
      description: product.description,
      color: product.color,
      size: product.size,
      categoryId: selectedCategoryId
    };

    try {
      const res = await axios.put(`${URL}/api/products/${productId}`, updatedProduct, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data) {
        navigate('/producttable');
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const updateImage = async () => {
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    if (file) {
      formData.append('imageUrl', file);
    } else {
      setError("Please select an image to upload");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.put(`${URL}/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setProduct(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
        setFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Failed to update image:", error);
      setError("Failed to update image. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.delete(`${URL}/api/products/${productId}/image`);
      if (res.data) {
        setProduct(prev => ({ ...prev, imageUrl: null }));
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Failed to remove image:", error);
      setError("Failed to remove image. Please try again");
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Edit Product</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={editProduct} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  name="title"
                  value={product.title}
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
                    value={product.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                  </label>
                  <input
                    name="discount"
                    type="number"
                    step="0.01"
                    value={product.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={product.description}
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
                    value={product.color}
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
                    value={product.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter size"
                  />
                </div>
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Updating..." : "Update Product Info"}
              </button>
            </form>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {(imagePreview || product.imageUrl) && (
                      <img
                        src={imagePreview || product.imageUrl}
                        alt="Product preview"
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.imageUrl ? "Current product image" : "No image uploaded"}
                  </div>
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a new image</span>
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

              {file && (
                <button
                  onClick={updateImage}
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Updating..." : "Update Image"}
                </button>
              )}

              {product.imageUrl && (
                <button
                  onClick={removeImage}
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Removing..." : "Remove Current Image"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;