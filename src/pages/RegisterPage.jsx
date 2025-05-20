import React from 'react'
import backdrop from '../assets/backdrop.png'
import logo from '../assets/logo-superwhite.png'
import Steps from '../components/Steps'
import Input from '../components/Input'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <main className='w-svw min-h-svh max-h-fit bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backdrop})`}}>
      <img src={logo} alt="icon-logo" className='w-[15svw]'/>
      <form id='register' className='flex flex-col gap-3 w-[40%] h-[75%] bg-white rounded-2xl px-10 py-5 mb-5'>
        <Steps/>
        <Input type='fullname'/>
        <Input type='phonenumber'/>
        <Input type='email'/>
        <Input type='password'/>
        <div className='flex flex-row gap-2 w-full justify-start items-center'>
            <input type="checkbox" id='checkbox' className='size-4'/>
            <label htmlFor="checkbox">I agree to terms and conditions</label>
        </div>
        <button type='submit' className='bg-amber-600 text-white font-semibold w-full rounded-sm py-2'>Join For Free Now</button>
        <span className='text-center text-sm'>Already have an account? <Link to='/login' className='text-blue-700'>Log In</Link></span>
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
          <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-5 hover: cursor-pointer'>
            <FaFacebook className='size-8'/>
            <span className='text-xs text-gray-400'>Sign Up with Facebook Account</span>
          </div>
        </div>
      </form>
    </main>
  )
}

export default RegisterPage