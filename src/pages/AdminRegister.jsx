import React, { useState, useContext, useEffect } from 'react'
import { SlGlobe } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from "../url"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';


const AdminRegister = () => {
  const { login } = useAuth();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [lga, setLGA] = useState('')
  const [Country, setCountry] = useState('')
  const [lgarea, setLGArea] = useState([])
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const fetchLGA = async () => {
    const res = await axios.get(`${URL}/api/deliveryrates`)
    console.log("delivery rates", res.data)
    setLGArea(res.data)
  }

  useEffect(() => {
    fetchLGA()
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(URL + "/api/auth/register", {firstName, lastName, email, phone, password, role:'admin' })

      // const { accessToken, user } = res.data;

      if (res.status == 200) {
        // localStorage.setItem("access_token", accessToken)
        // login(user)
        setError(false)
        console.log(res.data)
        navigate("/admin")
      }

    }
    catch (err) {
      setError(true)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-nunito'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create Admin Account
          </h2>
          <p className='text-gray-400 text-center mt-2'>Join Amariamour and start enjoying our service</p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className='rounded-md shadow-sm -space-y-px'>
          <div>
              <label htmlFor='first name' className='sr-only'>First Name</label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='First Name'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='last name' className='sr-only'>Last Name</label>
              <input
                id='lastName'
                name='lastName'
                type='text'  
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Last Name'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>Email address</label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='phone' className='sr-only'>Phone Number</label>
              <input
                id='phone'
                name='phone'
                type='text'  
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Phone Number'
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
      
          
            <div className='relative'>
              <label htmlFor='password' className='sr-only'>Password</label>
              <input
                id='password'
                name='password'
                type={isPasswordVisible ? "text" : "password"}
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <RiEyeOffLine className='h-5 w-5 text-gray-400' /> : <RiEyeLine className='h-5 w-5 text-gray-400' />}
              </button>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <svg className='h-5 w-5 text-blue-500 group-hover:text-blue-400 animate-spin' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                </span>
              ) : null}
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {error && <p className='mt-2 text-center text-sm text-red-600'>Something went wrong. Please try again.</p>}

        <p className='mt-2 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='font-medium text-blue-600 hover:text-blue-500'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminRegister