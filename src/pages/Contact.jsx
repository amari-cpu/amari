import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
       <Navbar />
    <div className="bg-gray-100 p-9">
   

{/* <div className='border border-gray-600 rounded-2xl px-48 pt-24 pb-12 flex flex-col'> */}

<div className='px-4 md:px-64 '>
        <div className='text-center text-2xl'>Have questions or need support? Reach out to us at amarisamour2@gmail.com or fill this form </div>

     <p className='text-[#2A2B2B] text-3xl font-normal mt-12'>Name</p>
      <input className='w-full px-2 py-3 bg-white border border-gray-200 rounded-lg mb-4' />

      <p className='text-[#2A2B2B] mt-4 text-3xl font-normal'>Email </p>
      <input className='w-full px-2 py-3 bg-white border border-gray-200 rounded-lg mb-4' />

      <p className='text-[#2A2B2B] mt-4 text-3xl font-normal'>Message</p>
      <textarea className='w-full px-2 py-3 bg-white border border-gray-200 rounded-lg mb-4' />

    <button className='text-white text-3xl bg-blue-200 hover:bg-blue-600 py-4 px-6 w-full rounded-full mt-4' >Submit</button>

{/* </div> */}

</div>



      </div>
    <Footer/></>
  )
}

export default Contact