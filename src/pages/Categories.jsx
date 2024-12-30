// import React, {useEffect, useState} from 'react'
// import {Link, useNavigate, useParams } from 'react-router-dom'
// import { URL } from '../url';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// import Navbar from '../components/Navbar';
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";



// const Categories = () => {
//     const navigate = useNavigate()
//     const categoryId = useParams().id
//     const [products, setProducts] = useState([])


//     const fetchCategories = async() => {
//         try {
//             const res = await axios.get(`${URL}/api/categories/${categoryId}`)
//             console.log(res.data.Product)
//             setProducts(res.data.Product)
//             // setDescription(res.data.description)
//             // setImageUrl(res.data.imageUrl)
//             // setPrice(res.data.price)
//             // setSize(res.data.size)
//             // setColor(res.data.color)
//         }
//         catch(err) {
//             console.log(err)
//         }
//     }
    




//     useEffect(() => {
//         fetchCategories()
//     }, [categoryId])

//   return (
//     <>
//     <Navbar/>
//     <div>
        


        
//     <p onClick={() => {navigate(-1)}} className='flex items-center gap-x-2 text-gray-500 px-4 md:px-16 mt-9 cursor-pointer'>Home <MdOutlineKeyboardArrowRight /> Category Products</p>


//     <div className="flex items-center justify-center">
// <div className='grid md:grid-cols-3 gap-x-12 gap-y-9 mt-12'>
// {products.map(d => (

// <Link to={`/productdetails/${d.id}`}>
//   <div key={d.id}>
//   <ProductCard title={d.title} imageUrl={d?.imageUrl} price={d.price} description={d.description}/>
//   </div>
//   </Link>
// ))}

// </div>

// </div>


//     </div>
//     </>
//   )
// }

// export default Categories

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Categories = () => {
    const navigate = useNavigate()
    const categoryId = useParams().id
    const [products, setProducts] = useState([])

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${URL}/api/categories/${categoryId}`)
            console.log(res.data.Product)
            setProducts(res.data.Product)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [categoryId])

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <p onClick={() => { navigate(-1) }} className='flex items-center gap-x-2 text-gray-500 mt-4 md:mt-9 cursor-pointer'>
                    Home <MdOutlineKeyboardArrowRight /> Category Products
                </p>

                <div className="mt-8 md:mt-12">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
                        {products.map(d => (
                            <Link key={d.id} to={`/productdetails/${d.id}`} className="block">
                                <ProductCard 
                                    title={d.title} 
                                    imageUrl={d?.imageUrl} 
                                    price={d.price} 
                                    description={d.description}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories