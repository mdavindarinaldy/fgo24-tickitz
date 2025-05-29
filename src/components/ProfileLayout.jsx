import React from 'react'
import dot from '../assets/dot.png'
import profile from '../assets/profile.png'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function ProfileLayout() {
  const currentLogin = useSelector((state) => state.currentLogin.data)
  if(!currentLogin.email) { return (<Navigate to='/' replace/>) }
  
  return (
    <div>
        <Navbar/>
        <div className='h-[10svh]'></div>
        <div className='h-fit w-svw bg-gray-200 flex flex-row justify-center items-start gap-5 py-10'>
            <div className='bg-white w-[25%] px-5 py-5 rounded-2xl flex flex-col gap-5 justify-center items-center'>
                <div className='w-full flex flex-row justify-between'>
                    <span>INFO</span>
                    <img src={dot} alt="icon-dot" />
                </div>
                <img src={profile} alt="profile-picture" className='size-[10svw]'/>
                <span className='font-bold text-2xl text-center'>{currentLogin.fullname}</span>
                <span className='text-gray-400'>Moviegoers</span>
                <hr className='w-full h-0.5 border-1 border-gray-400'/>
                <span className='self-start text-lg font-semibold'>Loyalty Points</span>
                <div className='bg-orange-200 flex flex-col self-start px-5 py-5 w-full rounded-2xl h-[20svh] justify-between'>
                    <span className='text-2xl font-bold'>Moviegoers</span>
                    <span className='text-lg font-bold'>320 <span className='text-sm font-normal'>points</span></span>
                </div>
                <span>180 points become a master</span>
                <div className='relative w-[90%] bg-gray-300 h-[2svh] rounded-lg'>
                    <div className='absolute w-[60%] bg-orange-500 h-[2svh] rounded-lg'></div>
                </div>
            </div>
            <div className='w-[60%] flex flex-col gap-5'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default ProfileLayout