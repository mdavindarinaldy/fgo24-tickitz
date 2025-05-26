import React from 'react'
import backdrop from '../assets/backdrop.png'
import logo from '../assets/logo-superwhite.png'
import Input from '../components/Input'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <main className='w-svw min-h-svh max-h-fit  flex flex-col justify-center items-center' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backdrop})`}}>
        <img src={logo} alt="icon-logo" className='w-[15svw]'/>
        <form id='login' className='flex flex-col gap-3 w-[40%] h-[75%] bg-white rounded-2xl px-10 py-5 mb-5'>
            <span className='font-bold text-2xl'>Welcome Back 👋</span>
            <span className='text-gray-500'>Sign in with your data that you entered during
            your registration</span>
            <Input type='email'/>
            <Input type='password' text='Password'/>
            <span className='text-blue-600 text-sm self-end font-semibold'>Forgot Your Password?</span>
            <button type='submit' className='bg-amber-600 text-white font-semibold w-full rounded-sm py-2'>Login</button>
            <span className='text-center text-sm'>Don't have an account? <Link to='/register' className='text-blue-700'>Register</Link></span>
            <div className='flex flex-row items-center gap-2 w-full'>
                <hr className='border-[0.5px] flex-1 h-[1px] border-gray-400'/>
                <span className='text-gray-400 text-sm'>OR</span>
                <hr className='border-[0.5px] flex-1 h-[1px] border-gray-400'/>
            </div>
            <div className='flex flex-row justify-between gap-3'>
                <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-3 hover: cursor-pointer'>
                <FcGoogle className='size-8'/>
                <span className='text-xs text-gray-400'>Sign Up with Google Account</span>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-3 hover: cursor-pointer'>
                <FaFacebook className='size-8'/>
                <span className='text-xs text-gray-400'>Sign Up with Facebook Account</span>
                </div>
            </div>
        </form>
    </main>
  )
}

export default LoginPage