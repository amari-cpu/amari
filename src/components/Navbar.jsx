// import React, { useState, useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import logo from '../assets/amarislogo.png'
// import { PiShoppingCartSimple } from "react-icons/pi";
// import { GoPerson } from "react-icons/go";
// import { IoSearchOutline } from "react-icons/io5";
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {

//   const {user} = useAuth()
//   const userId = user?.id;

//   const name = user?.fname;
    
//   // You can use this in your header/navbar component to show the cart count
//   const [cartCount, setCartCount] = useState(0);

//   const fetchCartCount = async () => {
//     try {
//       const res = await axios.get(`${URL}/api/cart/count/${userId}`);
//       console.log("count",res.data.count)
//       setCartCount(res.data.count);
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//       return 0;
//     }
//   };


//   useEffect(() => {
//     if(userId){
//       fetchCartCount()
//     }
//   }, [userId])
  

//   return (
//     <div className='px-4 py-4 bg-white shadow-xl'>
//       <div className='max-w-[1500px] mx-auto flex justify-between items-center'>
//         {/* Logo */}
//         <div className='flex-shrink-0'>
//           <img src={logo} alt="Amaris Logo" className='h-12 w-auto' />
//         </div>

//         {/* Navigation Links */}
//         <div className='hidden md:flex space-x-8'>
//           <Link to='/' className='font-medium text-lg hover:text-gray-600'>Home</Link>
//           <Link to='/about' className='font-medium text-lg hover:text-gray-600'>About</Link>
//           <Link to='/products' className='font-medium text-lg hover:text-gray-600'>Self-Care Packages</Link>
//           <Link to='/products' className='font-medium text-lg hover:text-gray-600'>Stress Relief</Link>
         
//           <Link to='/blogs' className='font-medium text-lg hover:text-gray-600'>Blog</Link>
//           <Link to='/author' className='font-medium text-lg hover:text-gray-600'>Coaching Services</Link>
//           <Link to='/contact' className='font-medium text-lg hover:text-gray-600'>Contact</Link>
//           <Link to='/login' className='bg-black font-medium text-lg text-white px-4 rounded-md'>Login</Link>
//         </div>

//         {/* Icons */}
//         <div className='flex items-center space-x-6'>
//           <IoSearchOutline size={23} className='cursor-pointer hover:text-gray-600' />
//           <Link to={'/cart'}><div className='relative'>
//             <PiShoppingCartSimple size={23} className='cursor-pointer hover:text-gray-600' />
//             <span className="bg-red-600 absolute top-0 right-0 -mt-2 -mr-2 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
//                 {cartCount}
//             </span>
//           </div></Link>
//           <Link to={'/profile'}><GoPerson size={23} className='cursor-pointer hover:text-gray-600' /></Link>

//           {user && <p>{name}</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiShoppingCartSimple } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Menu, X } from 'lucide-react';
import logo from '../assets/amarislogo.png'
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useAuth();
  const userId = user?.id;
  const name = user?.fname;
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${URL}/api/cart/count/${userId}`);
      setCartCount(res.data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      return 0;
    }
  };

  useEffect(() => {
    if(userId) {
      fetchCartCount();
    }
  }, [userId]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-white shadow-xl">
      <div className="px-4 py-4">
        <div className="max-w-[1500px] mx-auto">
          {/* Desktop and Mobile Header */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src={logo} alt="Amaris Logo" className="h-12 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              <Link to="/" className="font-medium text-lg hover:text-gray-600">Home</Link>
              <Link to="/about" className="font-medium text-lg hover:text-gray-600">About</Link>
              <Link to="/products" className="font-medium text-lg hover:text-gray-600">Self-Care Packages</Link>
              <Link to="/products" className="font-medium text-lg hover:text-gray-600">Stress Relief</Link>
              <Link to="/blogs" className="font-medium text-lg hover:text-gray-600">Blog</Link>
              <Link to="/author" className="font-medium text-lg hover:text-gray-600">Coaching Services</Link>
              <Link to="/contact" className="font-medium text-lg hover:text-gray-600">Contact</Link>
              <Link to="/login" className="bg-black font-medium text-lg text-white px-4 rounded-md">Login</Link>
            </div>

            {/* Icons and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <IoSearchOutline size={23} className="cursor-pointer hover:text-gray-600" />
                <Link to="/cart">
                  <div className="relative">
                    <PiShoppingCartSimple size={23} className="cursor-pointer hover:text-gray-600" />
                    <span className="bg-red-600 absolute top-0 right-0 -mt-2 -mr-2 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  </div>
                </Link>
                <Link to="/profile">
                  <GoPerson size={23} className="cursor-pointer hover:text-gray-600" />
                </Link>
                {user && <p className="text-sm">{name}</p>}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-white shadow-lg z-50`}>
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 font-medium hover:text-gray-600">Home</Link>
            <Link to="/about" className="block py-2 font-medium hover:text-gray-600">About</Link>
            <Link to="/products" className="block py-2 font-medium hover:text-gray-600">Self-Care Packages</Link>
            <Link to="/products" className="block py-2 font-medium hover:text-gray-600">Stress Relief</Link>
            <Link to="/blogs" className="block py-2 font-medium hover:text-gray-600">Blog</Link>
            <Link to="/author" className="block py-2 font-medium hover:text-gray-600">Coaching Services</Link>
            <Link to="/contact" className="block py-2 font-medium hover:text-gray-600">Contact</Link>
            <Link to="/login" className="block py-2 font-medium hover:text-gray-600">Login</Link>
            
            {/* Mobile Icons */}
            <div className="sm:hidden flex items-center space-x-4 py-2">
              <IoSearchOutline size={23} className="cursor-pointer hover:text-gray-600" />
              <Link to="/cart">
                <div className="relative">
                  <PiShoppingCartSimple size={23} className="cursor-pointer hover:text-gray-600" />
                  <span className="bg-red-600 absolute top-0 right-0 -mt-2 -mr-2 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                </div>
              </Link>
              <Link to="/profile">
                <GoPerson size={23} className="cursor-pointer hover:text-gray-600" />
              </Link>
              {user && <p className="text-sm">{name}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;