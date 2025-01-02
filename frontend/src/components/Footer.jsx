import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
<div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ---left---- */}
        <div>
            <img className='mb-8 w-40' src={assets.logomedicare} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>At Medicare, we believe healthcare should be simple, convenient, and centered around you. Our platform is designed to make booking a doctor’s appointment effortless, so you can focus on what truly matters—your health and well-being.With Medicare, finding the right doctor and scheduling appointments that fit your busy life has never been easier. Browse verified doctors, check their availability in real-time, and book your preferred slot in just a few clicks.</p>
        </div>
        {/* ---center--- */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        {/* ----right---- */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>8658915514</li>
                <li>kirtikapriyadarshini748@gmail.com</li>
            </ul>
        </div>
    </div>
    {/* ---copyright--- */}
    <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2024 Medicare - All Right Reserved.</p>
    </div>
</div>
  )
}

export default Footer