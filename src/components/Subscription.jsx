import React from 'react'

function Subscription() {
  return (
    <div className='w-svw h-fit bg-white flex flex-row justify-center p-[20px]'>
        <form id='subscription' className='flex flex-row justify-center items-center w-[90%] h-fit min-h-[40svh] bg-orange-100 rounded-4xl'>
            <div className='flex flex-col gap-[5px] justify-center items-center w-[50%]'>
                <span className='text-4xl font-extrabold mb-5 text-center'>Subscribe to Our Newsletter</span>
                <div className='flex flex-row gap-5 w-full'>
                    <input id='firstName' type="text" placeholder='Your First Name' className='subscription-input w-1/2'/>
                    <input id='email' type="email" placeholder='Your Email Address' className='subscription-input w-1/2' autoComplete='off'/>
                </div>
                <button type='submit' className='mt-[10px] w-full text-xs font-semibold bg-orange-500 rounded-2xl py-1 text-white hover:cursor-pointer'>SUBSCRIBE NOW</button>
            </div>
        </form>
    </div>
  )
}

export default Subscription