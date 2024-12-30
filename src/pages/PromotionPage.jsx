import React,{useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import PromoCard from '../components/PromoCard';
import { useAuth } from '../context/AuthContext';


const PromotionPage = () => {
  const navigate = useNavigate()

  const { user, logout } = useAuth();
  const [products, setProducts] = useState([])


  const fetchProducts = async() => {
    try {
        const res = await axios.get(`${URL}/api/products`)
        console.log(res?.data)
        setProducts(res?.data)
    }
    catch(err) {
        console.log(err)
    }
}
useEffect(() => {
    fetchProducts()
}, [])

const discountedProducts = products?.filter(product => product.discount && product.discount > 0 )
  
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className="container mx-auto px-4 text-center pt-9">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Promo Sale!</h2>
        <p className="text-xl text-gray-600 mb-8">Get up to 50% off on selected items!!</p>
   
      </div>
      
      <div className='grid md:grid-cols-3 gap-y-9 mt-24 px-9 content-center'>
          {discountedProducts?.map(d => (

  <div onClick={user ? (() => navigate(`/productdetails/${d.id}`)) : (() => navigate('/promosign'))}>
  <div key={d.id}>
      <PromoCard title={d.title} imageUrl={d?.imageUrl} price={d.price} discount={d?.discount} description={d.description} />
      </div>
      </div>
    ))}
      </div>



    </div>
  )
}

export default PromotionPage