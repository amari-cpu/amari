import React, { useState, useContext } from 'react'
import { SlGlobe } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from "../url"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";



const PromoSign = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [error,setError] = useState(false)

  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }



  const handleSubmit = async() => {
    //e.preventDefault()

    setIsLoading(true)
    try{
      const res = await axios.post(URL+"/api/auth/register", {firstName, lastName, email, password})

      setError(false)
      console.log(res.data)
      navigate("/promopage")
    }
    catch(err) {
      setError(true)
      console.log(err)
    } finally {
      setIsLoading(false)
    }

}






  return (
    <div>
    <div className=' flex items-center justify-center h-[100vh]'>



        <div className='border border-[#D7D7D7] rounded-lg px-[180px] py-[40px] relative'>
        {/* <img src={logo} alt='' className='mx-auto w-24 h-24'/> */}
        <p className='text-blue-600 text-center text-xl font-bold'>Sign Up</p>

        <p className='pt-6'>First Name</p>
        <input onChange={(e) => setFirstName(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[400px] py-2 px-3 rounded-lg hover:border-[#F08E1F]' />
       
        <p className='pt-6'>Last Name</p>
        <input onChange={(e) => setLastName(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[400px] py-2 px-3 rounded-lg hover:border-[#F08E1F]' />

      
        <p className='pt-6'>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[400px] py-2 px-3 rounded-lg hover:border-[#F08E1F]' />

       

        <p className='pt-5'>Password</p>

        <div class="relative w-full md:w-[400px]">
    <div class="absolute inset-y-0 right-0 flex items-center px-2">
      {/* <input class="hidden js-password-toggle" id="toggle" type="checkbox" /> */}
      <label onClick={togglePasswordVisibility} className=" px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">{isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}</label>
    </div>
    <input onChange={(e) => setPassword(e.target.value)} className="border rounded-lg w-full py-2 px-3 leading-tight hover:border-blue-200 pr-16 font-mono " type={isPasswordVisible ? "text" : "password"} autocomplete="off"
    />

  </div>

  <div className='flex justify-between'>
    <p className='text-white'>Forgot Password</p>
    <p className='text-blue-300'>Forgot Password</p>
    </div>

       



        <div>
        <button onClick={handleSubmit}  className='bg-[#F7F7F7] text-[#98999A] w-full md:w-[400px] py-2 rounded-2xl mt-6 hover:bg-blue-200 hover:text-white'>{isLoading ? "Loading..." : "Sign Up"}</button>
        {error && <h3 className='text-red-500 text-lg text-center'>Something went wrong</h3>}
        </div>
        <p className='pt-3 text-center text-[#98999A]'>Already have an account?   <Link to={'/login'}><span className='text-blue-500 ml-1'>Log in to your account</span></Link></p>
        </div>

    </div>
    <div className='flex justify-between mb-12 '>
    <p className='px-6 text-[#6A6B6C]'>Privacy Policy</p>
    <p className='px-6 text-[#6A6B6C]'>All Rights Reserved © 2024</p>
    </div>
</div>
  )
}

export default PromoSign