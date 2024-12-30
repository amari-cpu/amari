// import { useState, useEffect } from 'react';
// import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
// import { URL } from '../url';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'
// import { PaystackButton } from 'react-paystack';
// import Navbar from '../components/Navbar';



// export default function CartPage() {
//   const {user} = useAuth() 
//   const { id: cartId } = useParams()
//   const [cartItems, setCartItems] = useState([]);
//   const [lgarea, setLGArea] = useState([]);
//   const [isLoading, setIsLoading] = useState(false)
//   const [loading, setLoading] = useState(false);
//   const [deliveryChargeLoading, setDeliveryChargeLoading] = useState(true);
//   const [deliveryChargeError, setDeliveryChargeError] = useState(null);


//   const [cartTotals, setCartTotals] = useState({
//     subtotal: 0,
//     vat: 0,
//     deliveryCharge: 0,
//     totalAmount: 0
//   });

//   const email = user?.email;
//   const fname = user?.fname;
//   const location = user?.lga;
//   console.log("lga", location)
//   const userId = user?.id;
//   console.log("userId", userId)
//   const address = user?.address;

//     // Fetch Delivery Rates
//     const fetchLGA = async () => {
//       try {
//         setDeliveryChargeLoading(true);
//         const res = await axios.get(`${URL}/api/deliveryrates`);
//         setLGArea(res.data);
        
//         // Calculate initial delivery charge
//         const initialDeliveryCharge = getDeliveryCharge(location);
//         setCartTotals(prev => ({
//           ...prev,
//           deliveryCharge: initialDeliveryCharge
//         }));
//       } catch (error) {
//         console.error('Error fetching delivery rates:', error);
//         setDeliveryChargeError(error);
//       } finally {
//         setDeliveryChargeLoading(false);
//       }
//     };
  

//   // get delivery charge based on users LGA
//   const getDeliveryCharge = (userLga) => {
//     if (!userLga || !lgarea?.length) return 0;
    
//     const deliveryArea = lgarea.find(area => 
//       area?.lga?.toLowerCase() === userLga?.toLowerCase()
//     );
    
//     return deliveryArea?.deliveryCharge || 0;
//   };

//     const fetchCartItems = async () => {
//       setIsLoading(true)
//       try {
//         const res = await axios.get(`${URL}/api/cart/user/${userId}`)
//         setCartItems(res.data.cartItems)
//       } catch (err) {
//         console.error(err)
//         // toast.error('Failed to load product details')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     useEffect(() =>{
//       if (userId){
//     fetchCartItems();
//       }
//   }, [userId])

//   useEffect(() => {
//     if (user?.lga) {
//       fetchLGA();
//     }
//   }, [user]);

// // Update delivery charge when location or LGA data changes
// useEffect(() => {
//   if (!deliveryChargeLoading && location && lgarea.length > 0) {
//     const deliveryCharge = getDeliveryCharge(location);
//     setCartTotals(prev => ({
//       ...prev,
//       deliveryCharge
//     }));
//   }
// }, [location, lgarea, deliveryChargeLoading]);

// // Calculate totals when cart items or delivery charge changes
// useEffect(() => {
//   if (!deliveryChargeLoading) {
//     const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
//     const vat = subtotal * 0.15;
//     const totalAmount = subtotal + vat + (cartTotals.deliveryCharge || 0);

//     setCartTotals(prev => ({
//       ...prev,
//       subtotal,
//       vat,
//       totalAmount
//     }));
//   }
// }, [cartItems, cartTotals.deliveryCharge, deliveryChargeLoading]);


//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     setCartItems(cartItems.map(item => {
//       if (item.id === itemId) {
//         const price = item.discount || item.price;
//         return {
//           ...item,
//           quantity: newQuantity,
//           totalPrice: price * newQuantity
//         };
//       }
//       return item;
//     }));
//   };
  
//   const handleDelete = async (itemId) => {
//     try{
//      await axios.delete(`${URL}/api/cart/${itemId}`);
//       setCartItems((prevData) => prevData.filter(item => item.id !== itemId));
//     } catch(err){
//       console.error('Error deleting cart item:', err);
//     }
//   };

//   const handleDeleteAfterPurchase = async () => {
//     try{
//       await axios.delete(`${URL}/api/cart/user/${userId}`);
//     } catch(err){
//       console.error('Error clearing cart after purchase:', err);
//     }
//   }


// const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const purchaseData = {
//         email: email,
//         fname: fname,
//         address,
//         userId: userId,
//         totalAmount: cartTotals.totalAmount,
//         items: cartItems.map(item => ({
//           cartId: item.id,
//           title: item.title,
//           description: item.description || '',
//           price: item.discount || item.price,
//           discount: item.discount || null,
//           color: item.color || '',
//           size: item.size || '',
//           quantity: item.quantity,
//           totalPrice: item.totalPrice,
//         }))
//       };
  
//       const res = await axios.post(`${URL}/api/purchases/create`, purchaseData);
      
//       if (res.status === 200) {
//         await handleDeleteAfterPurchase();
//         navigate('/');
//         // Add success notification here
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error('Error creating purchase:', error);
//       // Add error notification here
//     }
//   };

//   const publicKey = "pk_test_885145b259720168f0ccfc346b9c4a6c5c4694e7";

//   const amount = cartTotals.totalAmount;


// const paymentProps = {

//     email: email,
//     fname: fname,
//     address:address,
//     userId: userId,
//     amount: amount * 100,
//     items: cartItems.map(item => ({
//       cartId: item.id,
//       title: item.title,
//       description: item.description || '',
//       price: item.discount * 100 || item.price * 100,
//       discount: item.discount * 100|| null,
//       color: item.color || '',
//       size: item.size || '',
//       quantity: item.quantity,
//       totalPrice: item.totalPrice * 100,
//     })),
  
//     publicKey,
//     text:"Proceed to Checkout",

//     onClose: () => alert("Are you sure you want to close"),
//     onSuccess: ({ reference }) => {
//       alert(
//         `Your purchase was successful! Transaction reference: ${reference}`
//       );
//       handleCheckout();
//       navigate('/')

//     },
//   }

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
//           <ShoppingCart className="w-6 h-6" />
//           Shopping Cart
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Cart Items Section */}
//           <div className="lg:w-2/3">
//             {cartItems.length === 0 ? (
//               <div className="bg-white rounded-lg p-8 text-center">
//                 <p className="text-gray-500">Your cart is empty</p>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-md">
//                 {cartItems?.map(item => (
//                   <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
//                     <img
//                       src={item.imageUrl}
//                       alt={item.title}
//                       className="w-20 h-20 object-cover rounded"
//                     />
//                     <div className="flex-1 ml-4">
//                       <h2 className="font-semibold text-lg">{item.title}</h2>
//                       <p className="text-gray-600 text-sm">
//                         {item.color} | Size: {item.size}
//                       </p>
//                       <div className="flex items-center mt-2">
//                         <span className="font-semibold">
//                           ${(item.discount || item.price).toFixed(2)}
//                         </span>
//                         {item.discount && (
//                           <span className="ml-2 text-sm text-gray-500 line-through">
//                             ${item.price.toFixed(2)}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center border rounded">
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           className="p-2 hover:bg-gray-100"
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <span className="px-4 py-2">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           className="p-2 hover:bg-gray-100"
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="p-2 text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Order Summary Section */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span>${cartTotals.subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">VAT (7.5%)</span>
//                   <span>${cartTotals.vat.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Delivery Charge</span>
//                   <span>${cartTotals.deliveryCharge.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-4">
//                   <div className="flex justify-between font-semibold">
//                     <span>Total</span>
//                     <span>${cartTotals.totalAmount.toFixed(2)}</span>
//                   </div>
//                 </div>
//                 {/* <button
//                   onClick={handleCheckout}
//                   disabled={loading}
//                   className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
//                 >
//                  {loading ? "processing ..." : "Proceed to Checkout"}
//                 </button> */}
//                   {user ? (
//             <PaystackButton 
//                 {...paymentProps} 
//                 disabled={loading} 
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6">
//                 {loading ? "processing ..." : "Proceed to Checkout"}
//             </PaystackButton>) :(
//                 <p>Log in first please</p>
//             )

//                   }
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }



import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PaystackButton } from 'react-paystack';
import Navbar from '../components/Navbar';


export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id: cartId } = useParams();
  
  // State Management
  const [currency, setCurrency] = useState('NGN');
  const rate = currency === 'USD' ? 0.00073 : 1; //NGN to USD conversion rate
  const [cartItems, setCartItems] = useState([]);
  const [lgarea, setLGArea] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryChargeLoading, setDeliveryChargeLoading] = useState(true);
  const [deliveryChargeError, setDeliveryChargeError] = useState(null);

  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    vat: 0,
    deliveryCharge: 0,
    totalAmount: 0
  });

  const getCurrencySymbol = () => currency === 'NGN' ? '₦' : '$';
  const formatPrice = (price) => (price * (currency === 'USD' ? rate : 1)).toFixed(2);

  // User Information
  const email = user?.email;
  const fname = user?.fname;
  const location = user?.lga;
  const userId = user?.id;
  const address = user?.address;

  // Fetch Delivery Rates
  const fetchLGA = async () => {
    try {
      setDeliveryChargeLoading(true);
      const res = await axios.get(`${URL}/api/deliveryrates`);
      setLGArea(res.data);
      
      // Calculate initial delivery charge
      const initialDeliveryCharge = getDeliveryCharge(location);
      setCartTotals(prev => ({
        ...prev,
        deliveryCharge: initialDeliveryCharge
      }));
    } catch (error) {
      console.error('Error fetching delivery rates:', error);
      setDeliveryChargeError(error);
    } finally {
      setDeliveryChargeLoading(false);
    }
  };

  // Get Delivery Charge
  const getDeliveryCharge = (userLga) => {
    if (!userLga || !lgarea?.length) return 0;
    
    const deliveryArea = lgarea.find(area => 
      area?.lga?.toLowerCase() === userLga?.toLowerCase()
    );
    
    return deliveryArea?.deliveryCharge || 0;
  };

  // Fetch Cart Items
  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/api/cart/user/${userId}`);
      setCartItems(res.data.cartItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Data Loading
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  useEffect(() => {
    if (user?.lga) {
      fetchLGA();
    }
  }, [user]);


  console.log('looking at cartItems',cartItems)

  // Update delivery charge when location or LGA data changes
  useEffect(() => {
    if (!deliveryChargeLoading && location && lgarea.length > 0) {
      const deliveryCharge = getDeliveryCharge(location);
      setCartTotals(prev => ({
        ...prev,
        deliveryCharge
      }));
    }
  }, [location, lgarea, deliveryChargeLoading]);

  // Calculate totals when cart items or delivery charge changes
  useEffect(() => {
    if (!deliveryChargeLoading) {
      const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const vat = subtotal * 0.075;
      const totalAmount = subtotal + vat + (cartTotals.deliveryCharge || 0);

      setCartTotals(prev => ({
        ...prev,
        subtotal,
        vat,
        totalAmount
      }));
    }
  }, [cartItems, cartTotals.deliveryCharge, deliveryChargeLoading]);

  // Cart Item Operations
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const price = item.discount || item.price;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: price * newQuantity
        };
      }
      return item;
    }));
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${URL}/api/cart/${itemId}`);
      setCartItems((prevData) => prevData.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  };

  const handleDeleteAfterPurchase = async () => {
    try {
      await axios.delete(`${URL}/api/cart/user/${userId}`);
    } catch (err) {
      console.error('Error clearing cart after purchase:', err);
    }
  };



 // Add Flutterwave config
 const flutterwaveConfig = {
  public_key: "FLWPUBK_TEST-80afb17661b387657a1b862bf6d0ba2d-X",
  tx_ref: Date.now().toString(),
  amount: cartTotals.totalAmount,
  currency: currency,
  payment_options: "card,mobilemoney,ussd",
  customer: {
    email: email,
    name: fname,
    phone_number: user?.phone || "",
  },
  customizations: {
    title: "IROLAGOS",
    description: "Payment for items in cart",
    logo: "https://your-logo-url.png",
  },
};

const handleFlutterPayment = useFlutterwave(flutterwaveConfig);




  // Checkout Operations
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const purchaseData = {
        email,
        fname,
        address,
        userId,
        totalAmount: cartTotals.totalAmount,
        items: cartItems.map(item => ({
          cartId: item.id,
          title: item.title,
          description: item.description || '',
          price: item.discount || item.price,
          discount: item.discount || null,
          color: item.color || '',
          size: item.size || '',
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }))
      };

      const res = await axios.post(`${URL}/api/purchases/create`, purchaseData);
      if (res.status === 200) {
        await handleDeleteAfterPurchase();
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating purchase:', error);
    } finally {
      setLoading(false);
    }
  };

  // Page loading state
  const isPageLoading = isLoading || deliveryChargeLoading;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-9">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Shopping Cart
          </h1>

          {isPageLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <span className="text-gray-500">Loading cart details...</span>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items Section */}
              <div className="lg:w-2/3">
                {cartItems.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md">
                    {cartItems?.map(item => (
                      <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
                        <img
                          src={item.imageUrl || item.Product?.imageUrl}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 ml-4">
                          <h2 className="font-semibold text-lg">{item.title}</h2>
                          <p className="text-gray-600 text-sm">
                            {item.color} | Size: {item.size}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="font-semibold">
                              {getCurrencySymbol()}{formatPrice(item.discount || item.price)}
                            </span>
                            {item.discount && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                {getCurrencySymbol()}{formatPrice(item.price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              

              {/* Order Summary Section */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                  >
                    <option value="NGN">NGN (₦)</option>
                    <option value="USD">USD ($)</option>
                  </select>





                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{getCurrencySymbol()}{formatPrice(cartTotals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT (7.5%)</span>
                      <span>{getCurrencySymbol()}{formatPrice(cartTotals.vat)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      {deliveryChargeLoading ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : deliveryChargeError ? (
                        <span className="text-red-500">Error loading delivery charge</span>
                      ) : (
                        <span>₦{cartTotals.deliveryCharge.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{getCurrencySymbol()}{formatPrice(cartTotals.totalAmount)}</span>
                      </div>
                    </div>
                    {/* <button
                      onClick={handleCheckout}
                      disabled={loading || deliveryChargeLoading || cartItems.length === 0}
                      className={`w-full py-3 rounded-lg transition-colors mt-6 ${
                        loading || deliveryChargeLoading || cartItems.length === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#5b3e31] hover:bg-blue-700 text-white'
                      }`}
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button> */}
                      <button
            onClick={() => {
              handleFlutterPayment({
                callback: async (response) => {
                  if (response.status === "successful") {
                    setLoading(true);
                    try {
                      await handleCheckout();
                      closePaymentModal();
                      navigate('/');
                    } catch (error) {
                      console.error('Error processing payment:', error);
                    } finally {
                      setLoading(false);
                    }
                  } else {
                    console.error('Payment not successful:', response);
                  }
                },
                onClose: () => {
                  console.log('Payment modal closed');
                },
              });
            }}
            disabled={loading || deliveryChargeLoading || cartItems.length === 0}
            className={`w-full py-3 rounded-lg transition-colors mt-6 ${
              loading || deliveryChargeLoading || cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#5b3e31] hover:bg-[#4a3228] text-white'
            }`}
          >
            {loading ? "Processing..." : "Pay with Flutterwave"}
          </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


