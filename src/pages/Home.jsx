import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import grocery from '../assets/grocery.jpg'
import { IoIosArrowRoundForward } from "react-icons/io"
import ProductCard from '../components/ProductCard'
import { Link, Navigate } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"
import BlogCard from '../components/BlogCard'
import { URL } from '../url'
import axios from 'axios'
import Footer from '../components/Footer'
import blogsubscribe from '../assets/blogsubscribe.png'
import hero from '../assets/hero.png'
import hero3 from '../assets/hero3.png'
import { FaMinus } from "react-icons/fa"
import { TiMinusOutline } from "react-icons/ti"
import PopUp from '../components/PopUp'
import { useNavigate, useParams } from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";
import group4 from '../assets/Group4.png'


const slides = [
  {
    title: "",
    subtitle: "",
    text: "",
    // button:'first button'
  },
  {
    title: "",
    subtitle: "Surprise her with a gift that lasts beyond the moment",
    text: "",
    image: hero3,
    button:'Shop Now'
  },
]

const Home = () => {
const [showPopup, setShowPopup] = useState(false)

const navigate = useNavigate()

useEffect(() => {
  //show popup after a short delay when component mounts
  const timer = setTimeout(() => {
    setShowPopup(true)
  }, 2000)

  return () => setTimeout(timer)
}, [])

// check if user has dismissed popup before
useEffect(() => {
  const hasSeenPopup = localStorage.getItem('hasSeenPopup')
  if (!hasSeenPopup){
    setShowPopup(true)
  }
}, [])

const handleClosePopup = () => {
  setShowPopup(false)
  // store that the user has seen the pop up
  localStorage.setItem('hasSeenPopup', 'true')
}

  const [posts, setPost] = useState([])
  const [products, setProduct] = useState([])
  const [categories, setCategory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndex2, setCurrentIndex2] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlides = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlides = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlides()
    }, 3000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + (window.innerWidth >= 768 ? 3 : 1) >= products.length 
        ? 0 
        : prevIndex + (window.innerWidth >= 768 ? 3 : 1)
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - (window.innerWidth >= 768 ? 3 : 1) < 0 
        ? Math.max(products.length - (window.innerWidth >= 768 ? 3 : 1), 0) 
        : prevIndex - (window.innerWidth >= 768 ? 3 : 1)
    )
  }

  const nextSlide2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex + (window.innerWidth >= 768 ? 3 : 1) >= products.length 
        ? 0 
        : prevIndex + (window.innerWidth >= 768 ? 3 : 1)
    )
  }

  const prevSlide2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex - (window.innerWidth >= 768 ? 3 : 1) < 0 
        ? Math.max(products.length - (window.innerWidth >= 768 ? 3 : 1), 0) 
        : prevIndex - (window.innerWidth >= 768 ? 3 : 1)
    )
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${URL}/api/categories`)
      setCategory(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/api/products`)
      setProduct(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts`)
      setPost(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden font-light">
    <Navbar />
    
    {/* Hero Section */}
    <div className='flex flex-col lg:flex-row justify-between px-4 md:px-8 lg:px-64 mt-6 lg:mt-12'>
      <div className='text-center lg:text-left'>
        <div className='flex flex-wrap justify-center lg:justify-start gap-2'>
          <button className='border border-violet-400 px-4 rounded-2xl'>Mindfulness</button>
          <button className='border border-violet-400 px-4 rounded-2xl'>Meditation</button>
        </div>
        
        <div className='mt-4'>
          <p className='text-[#1F2A44] font-normal text-4xl lg:text-6xl'>EMPOWER</p>
          <p className='text-[#1F2A44] text-4xl lg:text-6xl mt-2'>
            <span className='font-bold'>ELEVATE,</span>
            <span className='font-normal'> THRIVE</span>
          </p>
        </div>

        <div className='mt-2 space-y-1'>
          <p className='text-[#FFB300] text-xl lg:text-2xl'>Self-care, wellness, and personal</p>
          <p className='text-[#FFB300] text-xl lg:text-2xl'>development products.</p>
          <p className='mt-2 text-lg lg:text-2xl'>Find Clarity and Focus with our premium self-care</p>
          <p className='text-lg lg:text-2xl'>solutions designed for empowerment.</p>
        </div>

        <button 
          className='bg-[#1F2A44] text-white text-lg lg:text-xl flex items-center justify-center lg:justify-start gap-x-9 px-3 rounded-full py-2 mt-6 lg:mt-9 mx-auto lg:mx-0 w-fit'
          onClick={() => navigate('/products')}
        >
          Shop Now
          <span className='bg-white rounded-full p-3'>
            <BsArrowRight color='#1F2A44'/>
          </span>
        </button>

        <p className='font-medium mt-6 lg:mt-9 text-base lg:text-lg text-center lg:text-left'>
          Join the Amaris Amour <span className='text-blue-600'>Community!</span>
        </p>
      </div>

      <img src={group4} className='w-full lg:w-auto mt-8 lg:mt-0 max-w-lg mx-auto'/>
    </div>

    {/* Categories Section */}
    <div className="px-4 md:px-12 lg:px-20 py-8 lg:py-12">
      <h2 className="text-center text-[#1F2A44] text-2xl md:text-3xl lg:text-5xl mb-4">Our Product Range</h2>
      <p className="text-gray-500 text-sm md:text-base lg:text-lg text-center mb-8 lg:mb-12 max-w-2xl mx-auto">
        Discover our stunning products designed to uplift and empower every woman, helping you feel your absolute best!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map(data => (
          <Link key={data.id} to={`/categories/${data.id}`}>
            <CategoryCard name={data.name} imageUrl={data?.imageUrl}/>
          </Link>
        ))}
      </div>
    </div>

    {/* Best Sellers Section */}
    <div className="px-4 md:px-12 lg:px-20 py-8 lg:py-12 bg-gray-50">
      <p className="text-center text-base md:text-lg lg:text-xl text-gray-400 mb-2">SHOP OUR BEST SELLERS</p>
      <p className="text-center text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 lg:mb-12">
        Unlock your inner beauty with our self care collection
      </p>

      <div className="relative max-w-6xl mx-auto">
        <button 
          onClick={prevSlide} 
          className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 hidden md:block"
        >
          <FaChevronLeft/>
        </button>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {products?.slice(currentIndex, currentIndex + (window.innerWidth >= 768 ? 3 : 1))?.map(d => (
            <Link key={d.id} to={`/productdetails/${d.id}`} className="w-full md:w-1/3">
              <ProductCard 
                title={d.title} 
                imageUrl={d?.imageUrl} 
                price={d.price} 
                discount={d?.discount} 
                description={d.description}
              />
            </Link>
          ))}
        </div>

        <button 
          onClick={nextSlide} 
          className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 hidden md:block"
        >
          <FaChevronRight/>
        </button>
      </div>
    </div>

    {/* Subscribe Section */}
    <div className="bg-[#E1F5FF] px-4 md:px-12 lg:px-20 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-20 max-w-6xl mx-auto">
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-[#1F2A44] text-2xl md:text-3xl lg:text-5xl font-normal mb-4">
            Subscribe to our Blog
          </h2>
          <p className="text-[#1F2A44] text-sm md:text-base lg:text-lg mb-6 lg:mb-8">
            Want to Start Your Journey to Self-Care and Elevate Your Well-Being?
          </p>

          <div className="relative max-w-md mx-auto md:mx-0">
            <input 
              type="email" 
              placeholder="Enter your e-mail" 
              className="w-full px-4 md:px-6 py-2 md:py-3 rounded-full border border-purple-500 bg-white shadow-lg focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1F2A44] p-2 md:p-3 rounded-full">
              <IoIosArrowRoundForward color="white" size={20}/>
            </button>
          </div>
        </div>
        
        <img 
          src={blogsubscribe} 
          alt="Subscribe" 
          className="max-w-full md:max-w-sm lg:max-w-md mt-6 md:mt-0"
        />
      </div>
    </div>

    <Footer/>
  </div>
);
}

export default Home