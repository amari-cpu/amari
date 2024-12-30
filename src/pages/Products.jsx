import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";



const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])


    const fetchProducts = async() => {
        try {
            const res = await axios.get(`${URL}/api/products`)
            console.log("see products",res.data)
            setProducts(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

  return (
    <>
    <Navbar/>
    <div>
        


        
    <p onClick={() => {navigate(-1)}} className='flex items-center gap-x-2 text-gray-500 px-4 md:px-16 mt-9 cursor-pointer'>Home <MdOutlineKeyboardArrowRight /> Products</p>


    <div className="flex items-center justify-center">
<div className='grid md:grid-cols-3 gap-x-12 gap-y-9 mt-12'>
{products?.map(d => (

<Link to={`/productdetails/${d.id}`}>
  <div key={d.id}>
  <ProductCard title={d.title} imageUrl={d?.imageUrl} price={d.price} description={d.description}/>
  </div>
  </Link>
))}

</div>

</div>


    </div>
    </>
  )
}

export default Products