import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Steps from '../components/Steps'
import Input from '../components/Input'
import bca from '../assets/bca.png'
import bri from '../assets/bri.png'
import dana from '../assets/dana.png'
import gopay from '../assets/gopay.png'
import gpay from '../assets/gpay.png'
import ovo from '../assets/ovo.png'
import paypal from '../assets/paypal.png'
import visa from '../assets/visa.png'

function PaymentDetailPage() {
  function Card({src,method}) {
    return (
        <label htmlFor={method} className='py-5 px-5 flex flex-row justify-center border-1 border-gray-400 rounded-lg hover:cursor-pointer'>
            <input name='payment' id={method} type="radio" className='appearance-none' />
            <img src={src} alt="method"/>
        </label>
    )
  }

  return (
    <main>
        <Navbar currentlyOn='buy'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw h-fit bg-gray-100 flex flex-col justify-center items-center py-10 gap-5'>
            <Steps text1='Date & Time' text2='Seat' text3='Payment'/>
            <form id='payment' className='bg-white w-[50%] h-fit rounded-3xl py-10 px-10 flex flex-col gap-10'>
                <div className='flex flex-col gap-5 w-full'>
                    <span className='font-bold text-2xl'>Payment Info</span>                
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>DATE & TIME</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>Tuesday, 07 July 2020 at 02:00pm</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>MOVIE TITLE</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>Spider-Man: Homecoming</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>CINEMA NAME</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>CineOne21 Cinema</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>NUMBER OF TICKETS</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>3 pieces</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>TOTAL PAYMENT</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>$30,00</span>
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-full'>
                    <span className='font-bold text-2xl'>Personal Information</span>                
                    <Input type='fullname'/>
                    <Input type='email'/>
                    <Input type='phonenumber'/>
                </div>
                <div className='flex flex-col gap-5 w-full'>
                    <span className='font-bold text-2xl'>Payment Method</span>                
                    <div className='grid grid-cols-4 gap-3'>
                        <Card src={gpay} method={'gpay'}/>
                        <Card src={visa} method={'visa'}/>
                        <Card src={gopay} method={'gopay'}/>
                        <Card src={paypal} method={'paypal'}/>
                        <Card src={dana} method={'dana'}/>
                        <Card src={bca} method={'bca'}/>
                        <Card src={bri} method={'bri'}/>
                        <Card src={ovo} method={'ovo'}/>
                    </div>
                </div>
                <button type='submit' className='py-5 w-full bg-orange-500 rounded-2xl text-white font-bold'>Pay Your Order</button>
            </form>
        </div>
        <Footer/>
    </main>
  )
}

export default PaymentDetailPage