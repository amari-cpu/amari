import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import sanctuary from '../assets/sanctuaryphoto.png'
import { IoIosArrowRoundForward } from "react-icons/io";
import about from '../assets/aboutphoto.png'
import greenstar from '../assets/greenstar.png'
import bluebook from '../assets/bluebook.png'
import weirdstuff from '../assets/weirdstuff.png'
import blogsubscribe from '../assets/blogsubscribe.png'
import group3 from '../assets/Group3.png'

const About = () => {
  return (
    <div className='h-screen'>
        <Navbar/>
     
  {/* <div className='flex justify-center items-center gap-x-48'>

<div> */}
<div className='flex justify-center gap-x-32 items-center mt-12'>


<div>
<p className='text-[#1F2A44] text-2xl font-thin'>ABOUT US</p>
<p className='text-[#1F2A44] text-5xl font-normal mt-24'>WELCOME TO</p>
<p className='text-[#1F2A44] font-bold text-5xl mt-2'>AMARIS AMOUR</p>
<img src={sanctuary} className='object-contain mt-4' />
<button className='bg-[#1F2A44] px-4 py-2 text-white font-thin text-xl rounded-3xl mt-12 flex items-center gap-x-9'>Explore Now<div className='bg-white rounded-full p-1 flex justify-center items-center'><IoIosArrowRoundForward color='#1F2A44'/></div></button>
</div>


<img src={about} className='object-contain' />

</div>



<div className='bg-gradient-to-b from-blue-200  py-16 px-[240px] mt-6'>
        <p className='font-medium'>At Amaris Amour, we understand that the journey through trauma and loss can be challenging, especially for professional women balancing demanding careers and personal lives. We believe that every woman deserves a moment of tranquility and healing amidst the hustle and bustle of life. Founded with a deep commitment to enhancing the well-being of women who have experienced trauma, Amaris Amour is dedicated to offering premium self-care solutions designed to support your path to recovery and empowerment.</p>

        <p className='font-thin text-2xl text-center mt-9'>OUR MISSION</p>
        <p className='font-medium'>Our mission is to guide and empower women to integrate self-care into their lives, helping them thrive and find clarity after experiencing trauma or loss. Through our inspirational stress relief products and personalized coaching and mentoring, we aim to transform how you approach self-care, making it an essential, luxurious part of your daily routine.</p>

        <p className='font-thin text-2xl text-center mt-9'>OUR STORY</p>
        <p className='font-medium'>Amaris Amour was born from a personal journey of resilience and self-discovery. As a single mother of three, managing a demanding career while coping with the loss of her husband, our founder deeply understands the necessity of self-care for mental clarity and emotional strength. This experience highlighted the profound impact of consistent self-care practices and inspired the creation of Amaris Amour—a brand dedicated to helping other women find balance and serenity in their lives.</p>

        <p className='font-thin text-2xl text-center mt-9'>WHAT WE OFFER</p>

        <div className='flex justify-center gap-x-24 mt-9'>
                <div className='border border-[#D397F8] bg-[#EDF5FD] w-[490px] px-4 rounded-2xl py-6'>
                <div className='mx-auto w-1/3'><img src={weirdstuff} className='object-contain'/></div>
                        <p className='font-medium text-center mt-4'>Curated Stress Relief Subscription</p>
                        <p className='font-medium text-center'>Boxes</p>
                  
                        <p className='font-thin text-sm mt-4'>Each Amaris Amour box is thoughtfully designed with high-quality, luxurious items to promote relaxation and rejuvenation. From soothing teas and aromatic candles to nourishing bath products, our boxes are crafted to enhance your self-care journey.</p>
                </div>

                <div className='border border-[#D397F8] bg-[#E6E6FA] w-[490px] px-4 rounded-2xl py-6'>
                <img src={bluebook} className='mx-auto w-1/3' />
                        <p className='font-medium text-center text-[#480FA0] mt-4'>Personalized Mentoring and</p>
                        <p className='font-medium text-center text-[#480FA0]'>Coaching</p>
                 
                        <p className='font-thin text-sm text-[#480FA0] mt-4'>Our founder offers one-on-one mentoring and coaching to help women navigate their healing journey, find themselves, and achieve clarity. Our approach integrates self-care practices with actionable strategies for personal growth.</p>
                </div>

                <div className='border border-[#D397F8] bg-[#ECFFDC] w-[490px] px-4 rounded-2xl py-6'>
                <img src={greenstar} className='mx-auto w-1/3' />
                        <p className='font-medium text-center text-[#072D1C] mt-4'>Exclusive Offerings</p>
                        <p className='font-thin text-sm text-[#072D1C] mt-4'>Exclusive Offers: Subscribers enjoy access to limited edition products, early releases, and special discounts. We value our community and strive to provide an unparalleled self-care experience.</p>
                </div>

        </div>

        <p className='text-center text-xl font-thin pt-9'>OUR VALUES</p>

        <div className='border-2 rounded-xl px-6 py-12 mt-9'>

        <p className='font-semibold text-lg'>Empowerment: <span className='font-normal'>We empower women to take control of their well-being and make self-care a priority in their lives.</span></p>

        <p className='font-semibold text-lg mt-6'>Quality: <span className='font-normal'>We are committed to delivering the highest quality products and services that meet rigorous standards.</span></p>

        <p className='font-semibold text-lg mt-6'>Community: <span className='font-normal'>We foster a supportive community of like-minded women dedicated to mutual well-being and growth.</span></p>

        <p className='font-semibold text-lg mt-6'>Balance: <span className='font-normal'>We help women achieve a harmonious balance between their professional responsibilities and personal needs.</span></p>

        </div>

</div>

<div className='py-2 px-[240px] mt-2'>

        <p className='font-semibold text-2xl'>Join the Amaris Amour Community</p>

        <p className='mt-6 max-w-[1200px] text-lg'>Amaris Amour is more than just a subscription service; it's a community of women dedicated to supporting each other's healing and well-being. Join us as we make self-care an integral part of your life and experience the serenity and empowerment that come with it.</p>

        <p className='mt-6 text-lg'>Discover the transformative power of self-care with Amaris Amour.</p>

        <div className='flex justify-center'><img src={group3} className='' /></div>


</div>





<div className='bg-[#E1F5FF]'>

  <div className='flex justify-center items-center gap-x-48'>

    <div>
  <p className='text-[#1F2A44] text-5xl font-normal'>Subscribe to our Blog</p>
  <p className='text-[#1F2A44] font-normal text-lg'>Want to Start Your Journey to Self-Care and Elevate Your Well-Being?</p>

  <div className='border border-purple-500 bg-white rounded-full py-3 px-2 mt-9 shadow-2xl'>
    <div className='flex justify-center gap-x-24 items-center'>
          <div><p className='text-gray-500 font-light'>Enter your e-mail</p></div>
          <div className='bg-[#1F2A44] p-3 rounded-full'>
            <IoIosArrowRoundForward color='white' size={20}/>
          </div>
          </div>

  </div>
  </div>
  <img src={blogsubscribe} />
  </div>
  </div>



        <div className='mb-24'></div>
        <Footer/>
        </div>
  )
}

export default About