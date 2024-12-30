import React, {useState, useEffect} from 'react'
import { X } from 'lucide-react'
import popupImage from '../assets/pop-upimage.png'

const PopUp = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white rounded-xl max-w-[800px] w-full">
      <button 
        onClick={onClose}
        className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <X size={24} className="text-gray-600" />
      </button>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[350px]">
          <img 
            src={popupImage} 
            alt="Popup" 
            className="w-full h-[200px] md:h-[400px] object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none" 
          />
        </div>
        
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col space-y-6 justify-center h-full max-w-[450px] mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                className="border border-[#CCCCFF] text-gray-600 rounded-md shadow-md px-4 py-2 w-full" 
                placeholder="First Name" 
              />
              <input 
                className="border border-[#CCCCFF] text-gray-600 rounded-md shadow-md px-4 py-2 w-full" 
                placeholder="Last Name" 
              />
            </div>
            
            <input 
              className="border border-[#CCCCFF] text-gray-600 rounded-md shadow-md px-4 py-2 w-full" 
              placeholder="Enter your e-mail" 
            />
            
            <button className="bg-[#1F2A44] py-2 px-6 rounded-md text-white font-light hover:bg-opacity-90 transition-colors w-full md:w-auto md:self-center">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    // <div className='border border-[#CCCCFF] w-[800px] h-[402px] rounded-xl mx-auto items-center'>
    //     <div className='flex'>

    //     <div>
    //     <img src={popupImage}  className='w-[350px] h-[400px] rounded-l-xl' />

    //     </div>


    //     <div className='flex-1 justify-center'>


    //         <div className='flex justify-center gap-x-3 mt-32'>
    //     <input className='border border-[#CCCCFF] text-gray-400 rounded-md shadow-md px-2 py-2 w-[200px]' placeholder='First Name' />
    //     <input className='border border-[#CCCCFF] text-gray-400 rounded-md shadow-md px-2 py-2 w-[200px]'  placeholder='Last Name' />
    //     </div>

    //     <div className='flex flex-col justify-center items-center mt-6 space-y-4'>
    //     <input className='border border-[#CCCCFF] text-gray-400 rounded-md shadow-md px-2 py-2 w-[410px]'  placeholder='Enter your e-mail' />

    //     <div><button className='bg-[#1F2A44] py-2 px-4 rounded-md text-white font-thin'>Sign Up</button></div>

    //     </div>

    //     </div>


    //     </div>
    //     </div>
  )
}

export default PopUp