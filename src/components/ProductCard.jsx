// import React from 'react'
// import grocery from '../assets/grocery.jpg'
// import { IoIosArrowRoundForward } from "react-icons/io";

// const ProductCard = ({title, price, discount, description, imageUrl}) => {
//   return (
//     <div className='border border-blue-300 rounded-xl w-[320px] h-[400px]'>

// <div className='relative'>
//     <img src={imageUrl ? imageUrl : "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"} className='object-cover w-[319px] h-[398px] rounded-xl'/>
// <div className='flex justify-between '>
// <div className='absolute z-50 bg-gray-500 bg-opacity-60 w-[160px] rounded-xl bottom-5 ml-3 flex items-center justify-center py-1 px-1'>
//   <p className='text-white font-light'>Buy Now</p>
//   <div className='bg-white px-2 py-2 rounded-full ml-9'><IoIosArrowRoundForward color='#1F2A44'/></div>
//   </div>
//     {discount ? <p className='absolute z-50 line-through text-white bg-black w-[60px] rounded-xl bottom-5 ml-3 flex items-center justify-center py-1 px-3'>₦{discount}</p> : <p className='absolute z-50 text-white bg-black w-[60px] rounded-xl bottom-5 ml-3 flex items-center justify-center py-1 px-3'>₦{price}</p>  }

//     </div>
//     </div>

//     </div>
//   )
// }

// export default ProductCard

import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { PiStarFill } from "react-icons/pi";

const ProductCard = ({title, price, discount, description, imageUrl}) => {
  return (
    <div>
    <div className='border border-blue-300 rounded-xl w-[320px] h-[400px] relative overflow-hidden'>
      <img 
        src={imageUrl || "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"} 
        className='object-cover w-full h-full rounded-xl'
        alt={title}
      />
      
      <div className='absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center'>
        <div className='bg-gray-500 bg-opacity-60 rounded-xl flex items-center justify-center py-1 px-2'>
          <p className='text-white font-light mr-2'>Buy Now</p>
          <div className='bg-white p-1 rounded-full'>
            <IoIosArrowRoundForward color='#1F2A44' size={20}/>
          </div>
        </div>

        <div className='bg-black rounded-xl py-1 px-3'>
          {discount ? (
            <p className='text-white'>
              <span className='line-through text-sm mr-2'>₦{price}</span>
              <span className='font-thin'>₦{discount}</span>
            </p>
          ) : (
            <p className='text-white font-thin'>₦{price}</p>
          )}
        </div>
      </div>



    </div>


    <div className='bg-gray-200 w-[320px] rounded-xl mt-4 px-4 py-4'>
        <p className='text-gray-500 text-lg'>{title}</p>
        <p className='text-gray-400 font-thin text-sm'>{description.slice(0, 32)+" . . ."}</p>
        <div className='flex mt-2'>
       <PiStarFill color='#FFB300'/>
       <PiStarFill color='#FFB300'/>
       <PiStarFill color='#FFB300'/>
       <PiStarFill color='#FFB300'/>
       <CiStar color='#FFB300'/>

        </div>
      </div>

    </div>
  )
}

export default ProductCard