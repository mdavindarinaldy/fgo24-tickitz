import React from 'react'
import eye from '../assets/eye.svg'
// import eyeoff from '../assets/eye-off.svg'

function Input({type, text, register, error}) {
  if (type==='email') {
    return (
        <div className='flex flex-col w-full gap-4'>
            <label htmlFor="email" className='font-semibold text-lg'>Email</label>
            <input {...register('email')} type="email" id='email' placeholder='Enter your email here' className='border-gray-400 border-1 outline-0 rounded-sm w-full px-3 py-3' autoComplete='off'/>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
  }
  if (type==='password') {
    return (
        <div className='flex flex-col w-full gap-4'>
            <label htmlFor="password" className='font-semibold text-lg'>{text}</label>
            <div className='flex flex-row justify-between items-center border-gray-400 border-1 w-full px-3 py-3 rounded-sm'>
                <input  {...register('password')} type="password" id='password' placeholder='Enter your password here' className='outline-0  flex-1 border-0' autoComplete='off'/>
                <img src={eye} alt="eye-icon" />
            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
  }
  if (type==='fullname') {
    return (
        <div className='flex flex-col w-full gap-4'>
            <label htmlFor="fullname" className='font-semibold text-lg'>Fullname</label>
            <input {...register('fullname')} type="text" id="fullname" placeholder='Enter your fullname here' className='border-gray-400 border-1 outline-0 rounded-sm w-full px-3 py-3' autoComplete='off'/>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
  }
  if (type==='phonenumber') {
    return (
        <div className='flex flex-col w-full gap-4'>
            <label htmlFor="phonenumber" className='font-semibold text-lg'>Phone Number</label>
            <div className='border-gray-400 border-1 rounded-sm w-full px-3 py-3 flex flex-row gap-2 items-center'>
                <span className='border-r-1 border-gray-400 pr-3'>+62</span>
                <input {...register('phonenumber')} type='tel' id="phonenumber" placeholder='Enter your phonenumber here' className='outline-0 flex-1' autoComplete='off'/>
            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
  }
}

export default Input