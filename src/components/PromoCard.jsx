import React from 'react'

const PromoCard = ({title, price, discount, imageUrl, description}) => {
  return (

        <div className="bg-white rounded-lg shadow-md overflow-hidden w-[350px]">
          <img src={imageUrl ? imageUrl : "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"} alt='product' className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-green-600 font-bold text-2xl">${discount}</p>
            <p className="text-red-600 line-through">${price}</p>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              Buy Product
            </button>
          </div>
      </div>
  )
}

export default PromoCard