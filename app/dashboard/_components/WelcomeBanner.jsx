"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user}=useUser();
  return (
    <div className='-mt-3 gap-3 p-5 bg-blue-700 w-full text-white rounded-lg flex items-center gap-'>
        <Image src={'/laptop.png'} alt='laptop' width={100} height={100}/>
        <div>
            <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
            <p className=''>Welcome Back, Its time to get back and start upskilling!</p>
        </div>

    </div>
  )
}

export default WelcomeBanner