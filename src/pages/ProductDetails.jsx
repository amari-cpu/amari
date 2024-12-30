// import React, { useState, useEffect, useContext } from 'react'
// import gallery from '../assets/grocery.jpg'
// import Navbar from '../components/Navbar'
// import { FaStar } from "react-icons/fa";
// import { FiMinus, FiPlus } from "react-icons/fi";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { URL } from '../url';
// import axios from 'axios';
// import { CartContext } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { GoStar } from "react-icons/go";
// import toast, { Toaster } from "react-hot-toast";
// import { AiFillAndroid } from "react-icons/ai";

// const StarRating = ({ rating, onRatingChange }) => {
//     const [hover, setHover] = useState(null);
  
//     return (
//       <div className="flex gap-x-2 mt-2">
//         {[...Array(5)].map((star, index) => {
//           const ratingValue = index + 1;
  
//           return (
//             <label key={index}>
//               <input
//                 type="radio"
//                 name="rating"
//                 value={ratingValue}
//                 onClick={() => onRatingChange(ratingValue)}
//                 className="hidden"
//               />
//               <div
//                 className="cursor-pointer"
//                 onMouseEnter={() => setHover(ratingValue)}
//                 onMouseLeave={() => setHover(null)}
//               >
//                 {ratingValue <= (hover || rating) ? (
//                   <FaStar color="orange" size={20} />
//                 ) : (
//                   <GoStar size={20} />
//                 )}
//               </div>
//             </label>
//           );
//         })}
//       </div>
//     );
//   };

// const ProductDetails = () => {
// const {user, logout} = useAuth();
// const productId = useParams().id
// const { addToCart } = useContext(CartContext);
// const navigate = useNavigate()
// const [isLoading, setIsLoading] = useState(true)
// const [isLoading2, setIsLoading2] = useState(false)
// const [quantity, setQuantity] = useState(1)
// const [title, setTitle] = useState('')
// const [imageUrl, setImageUrl] = useState('')
// const [description, setDescription] = useState('')
// const [price, setPrice] = useState('')
// const [discount, setDiscount] = useState('')
// const [size, setSize]= useState('')
// const [color, setColor]= useState('')
// const [product, setProduct] = useState({});

// const [rating, setRating] = useState(0);
// const [comment, setComment] = useState('');
// const [hover, setHover] = useState(null);
// const [message, setMessage] = useState('');

// const [first, setFirst] = useState(false)
// const [second, setSecond] = useState(false)
// const [third, setThird] = useState(false)
// const [fourth, setFourth] = useState(false)
// const [fifth, setFifth] = useState(false)


// const handleFirst = () => {
//     setFirst(true)
//     setSecond(false)
//     setThird(false)
//     setFourth(false)
//     setFifth(false)
//     setRating(1)
// }
// const handleSecond = () => {
//     setSecond(true)
//     setFirst(false)
//     setThird(false)
//     setFourth(false)
//     setFifth(false)
//     setRating(2)
// }
// const handleThird = () => {
//     setThird(true)
//     setFirst(false)
//     setSecond(false)
//     setFourth(false)
//     setFifth(false)
//     setRating(3)
// }
// const handleFourth = () => {
//     setFourth(true)
//     setFirst(false)
//     setSecond(false)
//     setThird(false)
//     setFifth(false)
//     setRating(4)
// }
// const handleFifth = () => {
//     setFifth(true)
//     setFirst(false)
//     setSecond(false)
//     setThird(false)
//     setFourth(false)
//     setRating(5)
// }

// const toastStyles = {
//   success: {

//     duration: 10000,
//     // style: {
//     //   background: '#4CAF50',
//     //   color: 'white',
//     //   fontWeight: 'bold',
//     // },
//     iconTheme: {
//       primary: 'white',
//       secondary: '#4CAF50',
//     },
//       style: {

//                background: "green",
//                color: "whitesmoke",
//                icon: <AiFillAndroid background-color="whitesmoke" color='green' />,
//              },
//   },
//   error: {
//     duration: 10000,
//     style: {
//       background: '#F44336',
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     iconTheme: {
//       primary: 'white',
//       secondary: '#F44336',
//     },
//   },
// };

// console.log("User details",user)

// const email = user?.email;

// const fname = user?.fname;

// const userId = user?.id;

// const handleIncrease = () => {
//      setQuantity(quantity + 1)
// }

// const handleDecrease = () => {
//     setQuantity(quantity > 1 ? quantity - 1 : 1)
// }

// const fetchProducts = async() => {
//     setIsLoading(true)
//     try {
//         const res = await axios.get(`${URL}/api/products/${productId}`)
//         console.log(res.data)
//         setTitle(res.data.title)
//         setDescription(res.data.description)
//         setImageUrl(res.data.imageUrl)
//         setPrice(res.data.price)
//         setDiscount(res.data.discount)
//         setSize(res.data.size)
//         setColor(res.data.color)
//         setProduct(res.data)
//     }
//     catch(err) {
//         console.log(err)
//     }
//     finally {
//         setIsLoading(false);
//     }
// }

// useEffect(() => {
//     fetchProducts()
// }, [productId]);

// const handleAddToCart = () => {
//     addToCart(product, quantity);
//     navigate('/cart');
// }

// const handleBuyNow = async () => {
//     setIsLoading2(true)

//     if (!product || !product.id || quantity <= 0) {
//         alert('Invalid product or quantity');
//         toast.error('Invalid product or quantity');
//         return;
//     }
//     try{
//         const totalPrice = product.price * quantity;

//         const res = await axios.post(`${URL}/api/purchases/create`,{
//             quantity: quantity,
//             productId:product.id,
//             // price: product.price,
//             // discount:product.discount,
//             title: product.title,
//             description: product.description,
//             imageUrl: product.imageUrl,
//             size: product.size,
//             color: product.color,
//             // totalPrice:totalPrice,
//             email:email,
//             fname:fname,
//             userId:userId,
//             // productId:productId
//         });
//         console.log("see purchase", res.data)
//         setIsLoading(false)
       
//         toast.success('Purchase is Successful', toastStyles.success)

//     } catch(error) {
//         console.error('Error creating purchase', error)
//         alert('Failed to complete purchase');
//         toast.error('Failed to complete purchase');

//     }
//     finally{
//         setIsLoading2(false)
//     }
// }

// const handleReview = async () => {
    
//     try{
//         const res = await axios.post(`${URL}/api/reviews/${productId}`, {
//             userId : userId,
//             rating,
//             comment,
//             productId:productId
//         });
//         console.log('review post',res.data)
//         toast.success('Review Submitted successfully!', toastStyles.success);
//         setMessage('Review Submitted successfully!');
//         setRating(0);
//         setComment('');
        


//     } catch (error) {
//         setMessage(error.res?.data?.message || 'You have to buy this product to review!');
//         toast.error(error.res?.data?.message || 'You have to buy this product to review!', toastStyles.error);
     
//     }
// }


//   return (
//     <>
//       <Navbar />

//       <div className="container mx-auto px-4 md:px-8 lg:px-16 font-light">
//         <Toaster
//           position="top-right"
//           reverseOrder={false}
//           gutter={8}
//           toastOptions={{
//             duration: 9000,
//             style: {
//               borderRadius: '8px',
//               boxShadow: '0 3px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.05)'
//             }
//           }}
//         />

//         <p onClick={() => { navigate(-1) }} className='flex items-center gap-x-2 text-gray-500 mt-4 md:mt-9 cursor-pointer'>
//           Home <MdOutlineKeyboardArrowRight /> Product details
//         </p>

//         {isLoading ? (
//           <p className='flex justify-center items-center h-screen'>Loading ...</p>
//         ) : (
//           <div className='flex flex-col md:flex-row justify-center gap-24 mt-6 md:mt-12'>
//             <img
//               src={imageUrl ? imageUrl : "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"}
//               className='object-cover w-full md:w-[700px] h-[300px] md:h-[400px] rounded-lg'
//               alt={title}
//             />

//             <div className='mt-6 md:mt-0'>
//               <p className='text-2xl md:text-3xl font-semibold'>{title}</p>

//               <div className='flex items-center gap-x-2 mt-2'>
//                 <FaStar color='orange' /> <FaStar color='orange' /> <FaStar color='orange' /> <FaStar color='orange' /> <FaStar color='orange' />
//                 <span className="text-sm md:text-base">4.6 (24 reviews)</span>
//               </div>

//               <p className='mt-4 md:mt-6 w-full md:max-w-[450px]'>{description}.</p>
//               <p className='mt-4 text-xl md:text-2xl'>Price: {discount ? <span className='font-bold'>{discount}</span> : <span className='font-bold'>{price}</span>}</p>
//               <p className='mt-4 text-xl md:text-2xl'>Select Size: <span className='font-normal'>{size}</span></p>

//               <div className='flex items-center gap-x-4 mt-4'>
//                 <p className='text-xl md:text-2xl'>Colors: </p>
//                 <div className='flex border px-4 py-1 gap-x-2 rounded-md'>
//                   <div className='rounded-full text-center h-8 w-8 md:h-9 md:w-9' style={{ backgroundColor: `${color}` }}></div>
//                 </div>
//               </div>

//               <div className='flex gap-x-4 mt-6'>
//                 <button onClick={handleDecrease} className='bg-gray-400 text-white rounded-md px-6 md:px-8 py-2'><FiMinus /></button>
//                 <button className='border text-gray-700 font-semibold rounded-md px-8 md:px-12 py-2'>{quantity}</button>
//                 <button onClick={handleIncrease} className='bg-gray-400 text-white font-semibold rounded-md px-6 md:px-8 py-2'><FiPlus /></button>
//               </div>

//               <div className='flex flex-col sm:flex-row gap-4 mt-6'>
//                 <button className='bg-blue-600 text-white rounded-md px-8 md:px-12 py-2 w-full sm:w-auto' onClick={handleBuyNow}>{isLoading2 ? "Loading . . ." : "Buy Now"}</button>
//                 <button className='border text-gray-700 font-semibold rounded-md px-8 md:px-12 py-2 w-full sm:w-auto' onClick={() => handleAddToCart(product, quantity)}>Add to Cart</button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className='mt-12 px-0 md:px-[118px]'>
//           <div className='text-xl font-bold'>Make a review</div>
//           <StarRating rating={rating} onRatingChange={setRating} />
//           {/* <div className='flex gap-x-4 mt-4'>
//             <div onClick={handleFirst} onChange={(e) => setRating(e.target.value)}>{first ? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
//             <div onClick={handleSecond} onChange={(e) => setRating(e.target.value)}>{second ? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
//             <div onClick={handleThird} onChange={(e) => setRating(e.target.value)}>{third ? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
//             <div onClick={handleFourth} onChange={(e) => setRating(e.target.value)}>{fourth ? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
//             <div onClick={handleFifth} onChange={(e) => setRating(e.target.value)}>{fifth ? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
//           </div> */}
//           <textarea
//             onChange={(e) => setComment(e.target.value)}
//             className='border px-2 py-2 h-[100px] rounded-md w-full md:w-[400px] text-gray-600 mt-4'
//             placeholder='Write a comment'
//           />

//           <div className='mt-4'>
//             <button onClick={handleReview} className='bg-black text-white rounded-md px-4 py-2 w-full sm:w-auto'>Send Review</button>
//           </div>
//           {message && <p className='text-green-600 mt-2'>{message}</p>}
//         </div>

//         <div className='mb-12'></div>
//       </div>
//     </>
//   )
// }

// export default ProductDetails

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdStar, MdStarBorder, MdRemove, MdAdd, MdFavoriteBorder, MdShoppingCart } from "react-icons/md"
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { URL } from '../url'
import Navbar from '../components/Navbar'
import { PaystackButton } from 'react-paystack';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => onRatingChange(value)}
          className={`text-2xl ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          {value <= rating ? <MdStar /> : <MdStarBorder />}
        </button>
      ))}
    </div>
  )
}

const ProductDetails = () => {
  const { user } = useAuth()
  const { id: productId } = useParams()
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${URL}/api/products/${productId}`)
        setProduct(res.data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load product details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount))
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success('Added to cart')
  }

  const handleBuyNow = async () => {
    setIsSubmitting(true)
    try {
      await axios.post(`${URL}/api/cart/create`, {
        quantity,
        productId: product.id,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        size: product.size,
        color: product.color,
        email: user?.email,
        fname: user?.fname,
        userId: user?.id,
      })
      navigate('/cart')
      // toast.success('Purchase successful')
    } catch (error) {
      console.error('Error creating purchase', error)
      toast.error('Failed to complete purchase')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReview = async () => {
    try {
      await axios.post(`${URL}/api/reviews/${productId}`, {
        userId: user?.id,
        rating,
        comment,
        productId
      })
      toast.success('Review submitted successfully!')
      setRating(0)
      setComment('')
      setMessage('Review submitted successfully!')
    } catch (error) {
      setMessage('You need to purchase this product to review it.')
      toast.error('Failed to submit review')
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <>
          <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src={product.imageUrl || "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MdStar key={star} className={star <= (product.rating || 0) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{product.reviews || 0} reviews</span>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">${product.discount || product.price}</span>
                {product.discount && (
                  <span className="text-lg text-gray-500 line-through">${product.price}</span>
                )}
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Size: {product.size}</p>
                <div className="flex space-x-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      className={`px-3 py-1 border rounded ${product.size === size ? 'bg-gray-200' : 'bg-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Color:</p>
                <div className="flex space-x-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: product.color }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <MdRemove />
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded"
                  onClick={() => handleQuantityChange(1)}
                >
                  <MdAdd />
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={handleBuyNow}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Add To Cart'}
                </button>
              
                <button className="border border-gray-300 p-2 rounded hover:bg-gray-100">
                  <MdFavoriteBorder />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Rating</p>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
            <div>
              <label htmlFor="comment" className="font-semibold block mb-2">Your Review</label>
              <textarea
                id="comment"
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleReview}
            >
              Submit Review
            </button>
            {message && <p className="text-green-600 mt-2">{message}</p>}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetails