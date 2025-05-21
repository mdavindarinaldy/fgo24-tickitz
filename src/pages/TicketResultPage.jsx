import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import backdrop from '../assets/backdrop.png'
import logo from '../assets/logo-superwhite.png'
import qr from '../assets/qrcode.png'
import download from '../assets/download.svg'

function TicketResultPage() {
  return (
    <div className='bg-black'>
        <Navbar currentlyOn='buy'/>
        <div className='h-[10svh]'></div>
        <main className='flex flex-row w-svw h-svh'>
            <div className='w-[60%] h-full bg-cover bg-center bg-no-repeat flex flex-col justify-center gap-5 px-10' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backdrop})`}}>
                <img src={logo} alt="logo-icon" className='w-[20svw]'/>
                <span className='text-4xl text-white font-semibold'>Thankyou For Purchasing</span>
                <span className='text-lg text-white font-extralight'>Lorem ipsum dolor sit amet consectetur. Quam pretium pretium tempor integer sed magna et.</span>
                <span className='text-lg text-white font-normal'>Please Download Your Ticket &rarr;</span>
            </div>
            <div className='w-[40%] h-full bg-gray-200 flex flex-col gap-10 justify-center items-center'>
                <div className='w-[50%] h-fit py-8 bg-white rounded-2xl flex flex-col justify-center items-center'>
                    <img src={qr} alt="qr-code"/>
                    <div className='w-full flex flex-row gap-0 relative'>
                        <div className='bg-gray-200 h-[40px] w-[40px] rounded-full left-[-20px] absolute'></div>
                        <hr className='w-full h-[20px] border-0 border-b-1 border-gray-400 border-dashed' />
                        <div className='bg-gray-200 h-[40px] w-[40px] rounded-full right-[-20px] absolute'></div>
                    </div>
                    <div className='mt-10 flex flex-col gap-5 w-full'>
                        <div className='flex flex-row justify-between items-center w-full px-5'>
                            <div className='flex flex-col gap-3 justify-start items-start'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-gray-400 text-sm'>Movie</span>
                                    <span className='text-lg'>Spider Man</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-gray-400 text-sm'>Date</span>
                                    <span className='text-lg'>07 Jul</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-gray-400 text-sm'>Count</span>
                                    <span className='text-lg'>3 pcs</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 justify-start items-start'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-gray-400 text-sm'>Category</span>
                                    <span className='text-lg w-[50px]'>PG-13</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-gray-400 text-sm'>Time</span>
                                    <span className='text-lg'>2:00pm</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-gray-400 text-sm'>Seats</span>
                                    <span className='text-lg'>C3, C4, C5</span>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className='w-[50%] flex flex-col gap-5'>
                    <button className='flex flex-row gap-3 justify-center items-center bg-orange-200 rounded-2xl px-5 py-3 font-semibold'>
                        <img src={download} alt="icon-download" />
                        <span>Download</span>
                    </button>
                    <button className='flex flex-row gap-3 justify-center items-center bg-orange-500 rounded-2xl px-5 py-3 text-white font-bold'>Done</button>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
  )
}

export default TicketResultPage