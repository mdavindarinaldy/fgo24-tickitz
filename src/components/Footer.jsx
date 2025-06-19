import React from 'react'
import Logo from './Logo'
import { FaFacebook } from "react-icons/fa6"
import { FaInstagramSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa6"
import ebv from '../assets/ebv-black.png'
import hiflix from '../assets/hiflix-black.png'
import cineone from '../assets/cineone-black.png'

function Footer() {
  return (
    <div className='bg-secondary rounded-t-[70px] h-fit lg:h-[50svh] w-[99svw] flex flex-row justify-center items-center'>
        <div className='flex flex-col h-full justify-evenly w-5/6 text-darkblue gap-5 lg:gap-0'>
            <div className='flex flex-col justify-center items-center w-full lg:flex-row lg:justify-between'>
                <Logo type='1' className='w-[50svw] lg:w-[30svw] lg:h-[10svw]'/>
                <div className='flex flex-col gap-5 items-center lg:items-start lg:gap-0 lg:flex-row lg:justify-evenly w-[60%]'>
                    <div className='flex flex-col gap-3 items-center lg:items-start'>
                        <span className='font-semibold text-2xl'>EXPLORE</span>
                        <span>Cinemas</span>
                        <span>Movies List</span>
                        <span>My Ticket</span>
                        <span>Notification</span>
                    </div>
                    <div className='flex flex-col gap-4 items-center lg:items-start'>
                        <span className='font-semibold text-2xl'>OUR SPONSOR</span>
                        <img src={ebv} alt="logo-ebv" className='w-[10svw]'/>
                        <img src={cineone} alt="logo-cineone" className='w-[10svw]'/>
                        <img src={hiflix} alt="logo-hiflix" className='w-[8svw]'/>
                    </div>
                    <div className='flex flex-col gap-4 items-center lg:items-start'>
                        <span className='font-semibold text-2xl'>FOLLOW US</span>
                        <div className='flex flex-row gap-3 items-center'>
                            <FaFacebook />
                            <span>tickitz.cinema.id</span>
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <FaInstagramSquare />
                            <span>tickitz.cinema.id</span>
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <FaSquareXTwitter />
                            <span>tickitz.cinema.id</span>
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <FaYoutube />
                            <span>tickitz.cinema.id</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5 justify-center items-center lg:gap-0 lg:flex-row lg:justify-between w-full'>
                <span className='text-center lg:text-start'>Stop waiting in line. Buy tickets conveniently, watch movies quietly.</span>
                <span className='text-center lg:text-start'>© 2025 Tickitz. All Rights Reserved.</span>
            </div>
        </div>
    </div>
  )
}

export default Footer