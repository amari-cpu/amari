// import React from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

// const Contact = () => {
//   return (
//     <>
//        <Navbar />
//     <div className="bg-gray-100 p-9">
   

// {/* <div className='border border-gray-600 rounded-2xl px-48 pt-24 pb-12 flex flex-col'> */}

// <div className='px-4 md:px-64 '>
//         <div className='text-center text-2xl'>Have questions or need support? Reach out to us at amarisamour2@gmail.com or fill this form </div>

//      <p className='text-[#2A2B2B] text-3xl font-normal mt-12'>Name</p>
//       <input className='w-full px-2 py-3 bg-white border border-gray-200 rounded-lg mb-4' />

//       <p className='text-[#2A2B2B] mt-4 text-3xl font-normal'>Email </p>
//       <input className='w-full px-2 py-3 bg-white border border-gray-200 rounded-lg mb-4' />

//       <p className='text-[#2A2B2B] mt-4 text-3xl font-normal'>Message</p>
//       <textarea className='w-full px-2 py-3 bg-white border border-gray-200 rounded-lg mb-4' />

//     <button className='text-white text-3xl bg-blue-200 hover:bg-blue-600 py-4 px-6 w-full rounded-full mt-4' >Submit</button>

// {/* </div> */}

// </div>



//       </div>
//     <Footer/></>
//   )
// }

// export default Contact

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { IoMailOutline } from "react-icons/io5";
import { FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or need support? We're here to help.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <IoMailOutline className="text-blue-600 text-2xl mr-3" />
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <p className="text-gray-600">amarisamour2@gmail.com</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <FiPhone className="text-blue-600 text-2xl mr-3" />
                <h3 className="font-semibold text-gray-900">Phone</h3>
              </div>
              <p className="text-gray-600">+234 906 061 0890</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <FiMapPin className="text-blue-600 text-2xl mr-3" />
                <h3 className="font-semibold text-gray-900">Location</h3>
              </div>
              <p className="text-gray-600">Nigeria</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;