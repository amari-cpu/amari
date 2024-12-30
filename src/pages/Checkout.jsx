import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTruck, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import { PaystackButton } from 'react-paystack';
import { useAuth } from '../context/AuthContext';



const Checkout = () => {

const product = 4500;
const quantity = 4;



  const {user} = useAuth()
  const navigate = useNavigate();
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    phone: ''
  });
  
  const deliveryOptions = {
    standard: { price: 2000, time: '3-5 days' },
    express: { price: 5000, time: '1-2 days' }
  };

  const calculateTotal = () => {
    const subtotal = (product.discount || product.price) * quantity;
    const deliveryFee = deliveryOptions[selectedDelivery].price;
    return subtotal + deliveryFee;
  };

  // Paystack configuration
  const paymentProps = {
    email: user?.email,
    amount: calculateTotal() * 100, // Convert to kobo
    publicKey: 'your_paystack_public_key',
    text: "Proceed to Payment",
    onSuccess: () => {
      // Handle successful payment
      console.log("Payment successful");
    },
    onClose: () => {
      console.log("Payment cancelled");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <FaArrowLeft /> Back
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery and Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FaTruck className="text-[#5b3e31]" />
                <h2 className="text-xl font-semibold">Delivery Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-[#5b3e31]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={selectedDelivery === 'standard'}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="text-[#5b3e31]"
                    />
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-gray-500">Delivery in {deliveryOptions.standard.time}</p>
                    </div>
                  </div>
                  <span className="font-semibold">₦{deliveryOptions.standard.price}</span>
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-[#5b3e31]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={selectedDelivery === 'express'}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="text-[#5b3e31]"
                    />
                    <div>
                      <p className="font-medium">Express Delivery</p>
                      <p className="text-sm text-gray-500">Delivery in {deliveryOptions.express.time}</p>
                    </div>
                  </div>
                  <span className="font-semibold">₦{deliveryOptions.express.price}</span>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-[#5b3e31]" />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5b3e31] focus:border-[#5b3e31]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5b3e31] focus:border-[#5b3e31]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5b3e31] focus:border-[#5b3e31]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5b3e31] focus:border-[#5b3e31]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Product Details */}
              <div className="border-b pb-4 mb-4">
                <div className="flex gap-4">
                  <img 
                    src={product?.image} 
                    alt={product?.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{product?.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                    {product?.size && <p className="text-sm text-gray-500">Size: {product.size}</p>}
                    <p className="text-sm text-gray-500">Color: {product?.color}</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{(product?.discount || product?.price) * quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₦{deliveryOptions[selectedDelivery].price}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">₦{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="mt-6">
                <PaystackButton 
                  {...paymentProps}
                  className="w-full bg-[#5b3e31] hover:bg-[#4a3228] text-white font-medium py-3 rounded-full transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;