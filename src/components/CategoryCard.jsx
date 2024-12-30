import React from 'react'

const CategoryCard = ({name, imageUrl}) => {
  return (
    <div className='rounded-xl w-[320px] h-[400px]'>
   
  
<div className='relative'>
    <img src={imageUrl ? imageUrl : "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"} className='object-cover w-[319px] h-[398px] rounded-xl'/>
    <p className='absolute text-xl text-white z-50 bottom-5 ml-3'>{name}</p>
    </div>


  </div>
  )
}

export default CategoryCard