import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, User, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';

const ViewPurchase = () => {
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id:purchaseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const res = await axios.get(`${URL}/api/purchases/${purchaseId}`);
        console.log('purchase', res.data)
        setPurchase(res.data);
      } catch (error) {
        console.error('Error fetching purchase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [purchaseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Purchases
          </button>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Order #{purchase?.id.slice(0, 8)}
          </h1>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Order Status</h2>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {purchase?.status || 'Completed'}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(purchase?.createdAt)}
            <Clock className="w-4 h-4 ml-4 mr-2" />
            {formatTime(purchase?.createdAt)}
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">Customer Details</span>
              </div>
              <p className="font-medium">{purchase?.fname}</p>
              <p className="text-gray-600">{purchase?.email}</p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">Delivery Address</span>
              </div>
              <p className="font-medium">{purchase?.lga}</p>
              <p className="text-gray-600">{purchase?.address}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="divide-y divide-gray-200">
            {purchase?.items?.map((item, index) => (
              <div key={index} className="py-4 flex items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-full h-full p-4 text-gray-400" />
                  )}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>Quantity: {item.quantity}</span>
                    <span className="mx-2">•</span>
                    <span>Size: {item.size}</span>
                    {item.color && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Color: {item.color}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-sm font-medium text-gray-900">
                  ₦{(item.price * item.quantity).toFixed(2)}
                  </p>
                  {item.discount && (
                    <p className="mt-1 text-sm text-gray-500 line-through">
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₦{purchase?.totalAmount ? (purchase.totalAmount * 0.85).toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT (15%)</span>
              <span>₦{purchase?.totalAmount ? (purchase.totalAmount * 0.15).toFixed(2) : '0.00'}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-medium text-gray-900">
              <span>Total</span>
              <span>₦{purchase?.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
            <span className="flex items-center text-sm text-gray-600">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Status: <span className="ml-1 text-green-600 font-medium">Paid</span>
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Transaction ID: {purchase?.transactionId || 'N/A'}</p>
            <p className="mt-1">Payment Method: Card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPurchase;