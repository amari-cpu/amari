// import React from 'react'
// import { Link } from 'react-router-dom'
// import logo from '../assets/amarislogo.png'

// const Footer = () => {
//   return (
//     <div className='bg-white py-12'>

//         <div className='flex justify-around'>

//             <div className='flex flex-col gap-y-48'>
//             <div className='flex-shrink-0'>
//           <img src={logo} alt="Amaris Logo" className='h-12 w-auto' />
//         </div>
//             <p>Copyright © 2024 Amaris. All rights reserved.</p>
//             </div>


 

//             <div className='text-center'>
//             <div className='text-xl font-medium text-[#565656] text-left'>Categories</div>

//             <Link to={'/about'}><p className='mt-5 text-left'>Search</p></Link>
//             <Link to={'/contact'}><p className='mt-5 text-left'>Terms of Service</p></Link>
//             <Link to={'/blogs'}><p className='mt-5 text-left'>Refund Policy</p></Link>
   
//             </div>

//             <div className='text-center'>
//             <div className='text-xl font-medium text-[#565656] text-left'>Products</div>

//             <p className='mt-5 text-left'>Motivational Calender</p>
//             <p className='mt-5 text-left'>Self Care Cards</p>
//             <p className='mt-5 text-left'>Gratitude Journals</p>
//             <p className='mt-5 text-left'>Colouring Books</p>
//             </div>
     
//         </div>


//   <div className='mb-3'></div>
//     </div>
//   )
// }

// export default Footer

import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/amarislogo.png'
import { SiFacebook,SiInstagram,SiLinkedin } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className='bg-white py-8 md:py-12 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Main footer content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
          {/* Logo and copyright section */}
          <div className='flex flex-col justify-between'>
            <div className='mb-6 md:mb-0'>
              <img 
                src={logo} 
                alt="Amaris Logo" 
                className='h-12 w-auto'
              />
            </div>
            <p className='text-sm text-gray-600 mt-4 md:mt-0'>
              Copyright © 2024 Amaris. All rights reserved.
            </p>
          </div>

          {/* Categories section */}
          <div className='md:text-left'>
            <h3 className='text-lg font-medium text-[#565656] mb-4'>
              Categories
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/about' className='hover:text-gray-700'>
                  Search
                </Link>
              </li>
              <li>
                <Link to='/contact' className='hover:text-gray-700'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to='/blogs' className='hover:text-gray-700'>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Products section */}
          <div className='md:text-left'>
            <h3 className='text-lg font-medium text-[#565656] mb-4'>
              Products
            </h3>
            <ul className='space-y-3'>
              <li className='hover:text-gray-700 cursor-pointer'>
                Motivational Calendar
              </li>
              <li className='hover:text-gray-700 cursor-pointer'>
                Self Care Cards
              </li>
              <li className='hover:text-gray-700 cursor-pointer'>
                Gratitude Journals
              </li>
              <li className='hover:text-gray-700 cursor-pointer'>
                Colouring Books
              </li>
            </ul>
          </div>

          {/* Newsletter section - Optional addition */}
          <div className='md:text-left'>
            <h3 className='text-lg font-medium text-[#565656] mb-4'>
              Stay Connected
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className='flex flex-col sm:flex-row gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#565656]'
              />
              <button className='bg-[#565656] text-white px-4 py-2 rounded-md hover:bg-[#444444] transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links - Optional addition */}
        <div className='mt-8 pt-8 border-t border-gray-200'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <div className='flex space-x-9 mb-4 sm:mb-0'>
              <a href="#" className='text-gray-600 hover:text-gray-900'><SiFacebook size={25}/></a>
              <a href="https://www.instagram.com/amaris_amour_tranquil/" className='text-gray-600 hover:text-gray-900'><SiInstagram size={25}/></a>
              <a href="#" className='text-gray-600 hover:text-gray-900'><BsTwitterX size={25}/></a>
              <a href="https://www.linkedin.com/in/eluaguuzoamakaecommercestressmgtproducts/" className='text-gray-600 hover:text-gray-900'><SiLinkedin size={25}/></a>
            </div>
            <div className='text-sm text-gray-600'>
              <Link to="/privacy" className='hover:text-gray-900 mr-4'>Privacy Policy</Link>
              <Link to="/terms" className='hover:text-gray-900'>Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer