// import React, { useState, useContext } from 'react'
// import { SlGlobe } from "react-icons/sl";
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { URL } from "../url"
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
// import { useAuth } from '../context/AuthContext';

// const Login = () => {

//   const { login} = useAuth();
//   const [email, setEmail] = useState('')
//   const [error,setError] = useState(false)
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate()
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   function togglePasswordVisibility() {
//     setIsPasswordVisible((prevState) => !prevState);
//   }

//   const handleSubmit = async() => {
//     //e.preventDefault()

//     setIsLoading(true)
//     try{
//       const res = await axios.post(URL+"/api/auth/login", {email,password})

//       const {accessToken, user} = res.data;

//       if(res.status == 200){
//         localStorage.setItem("access_token", accessToken)
//         // localStorage.setItem("currentUser", JSON.stringify(res.data))
//         login(user)
//         setError(false)
//         console.log(res.data)
//         navigate("/")
//       }

//     }
//     catch(err) {
//       setError(true)
//       console.log(err)
//     } finally {
//       setIsLoading(false)
//     }
// }

//   return (
//     <div className='font-nunito'>
//     <div className='flex justify-center '>
//         <div className='rounded-lg px-[180px] py-[40px] relative pt-[75px]'>

//         <p className='text-center font-semibold text-3xl mt-3'>Login To Your Account</p>
 
//         <p className='pt-6'>Email</p>
//         <input onChange={(e) => setEmail(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[450px] py-2 px-3 rounded-lg hover:border-blue-400' />

//         <p className='pt-5'>Password</p>

//         <div class="relative w-full md:w-[450px]">
//     <div class="absolute inset-y-0 right-0 flex items-center px-2">
//       <label onClick={togglePasswordVisibility} className=" px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">{isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}</label>
//     </div>
//     <input onChange={(e) => setPassword(e.target.value)} className="border rounded-lg w-full md:w-[450px] py-2 px-3 leading-tight hover:border-blue-400 pr-16 font-mono " type={isPasswordVisible ? "text" : "password"} autocomplete="off"
//     />

//   </div>

//   <div className='flex justify-between'>
//     <p className='text-white'>Forgot Password</p>
//     <Link to={'/forgotpassword'}><p className='text-blue-400'>Forgot Password</p></Link>
//     </div>

//         <div>
//         <button onClick={handleSubmit}  className='bg-[#F7F7F7] text-[#98999A] w-full md:w-[450px] py-2 rounded-2xl mt-6 hover:bg-blue-400 hover:text-white'>{isLoading ? "Loading..." : "Login"}</button>
//         {error && <h3 className='text-red-500 text-lg text-center'>Something went wrong</h3>}
//         </div>
//         <p className='pt-3 text-center text-[#98999A]'>Don't have an account?   <Link to={'/register'}><span className='text-blue-400 ml-3'>Create an account</span></Link></p>
//         </div>

//     </div>
//     {/* <div className='flex justify-between mb-12 '>
//     <p className='px-6 text-[#6A6B6C]'>Privacy Policy</p>
//     <p className='px-6 text-[#6A6B6C]'>All Rights Reserved © 2024</p>
//     </div> */}
// </div>
//   )
// }

// export default Login

import React, { useState, useContext } from 'react'
import { SlGlobe } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from "../url"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password })

      const { accessToken, user } = res.data;

      if (res.status == 200) {
        localStorage.setItem("access_token", accessToken)
        login(user)
        setError(false)
        console.log(res.data)
        navigate("/")
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
            Forgot Password
          </h2>
          <p className='text-gray-400 mt-2 text-center'>Enter your email to receive a password reset link</p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>Email address</label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <div className='relative'>
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
            </div> */}
          </div> 

          {/* <div className='flex items-center justify-between'>
            <div className='text-sm'>
              <Link to='/forgotpassword' className='font-medium text-blue-600 hover:text-blue-500'>
                Forgot your password?
              </Link>
            </div>
          </div> */}

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
              {isLoading ? 'Loading...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        {error && <p className='mt-2 text-center text-sm text-red-600'>Something went wrong. Please try again.</p>}

        <p className='mt-2 text-center text-sm text-gray-600'>
          Remember your password?{' '}
          <Link to='/login' className='font-medium text-blue-600 hover:text-blue-500'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword