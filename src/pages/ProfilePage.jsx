import React from 'react'
import Navbar from '../components/Navbar'
import dot from '../assets/dot.png'
import profile from '../assets/profile.png'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'

function ProfilePage() {
  const {register, handleSubmit} = useForm()
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
                <span className='font-bold text-2xl'>Jonas El Rodriguez</span>
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
                <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-row gap-10'>
                    <span className='border-b-3 border-orange-300 text-lg font-semibold'>Account Settings</span>
                    <span className='hover:border-b-3 hover:border-orange-300 text-lg font-semibold'>Order History</span>
                </div>
                <form id='profile' className='w-full flex flex-col gap-10'>
                    <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5'>
                        <div className='border-b-1 border-gray-400 py-3'>
                            <span className='text-semibold text-base'>Details Information</span>
                        </div>
                        <Input type='fullname' register={register}/>
                        <Input type='email' register={register}/>
                        <Input type='phonenumber' register={register}/>
                    </div>
                    <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5'>
                        <div className='border-b-1 border-gray-400 py-3'>
                            <span className='text-semibold text-base'>Account and Privacy</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <Input type='password' text='New Password' register={register}/>
                            <Input type='password' text='Confirm Password' register={register}/>
                        </div>
                    </div>
                    <button type='submit' className='text-white font-semibold bg-orange-500 py-4 w-[30%] rounded-2xl'>Update Changes</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage