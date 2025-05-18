import React from 'react'
import Logo from './Logo'
import ig from '../assets/ig.png'
import fb from '../assets/fb.png'
import x from '../assets/x.png'
import yt from '../assets/yt.png'
import ebv from '../assets/ebv.png'
import hiflix from '../assets/hiflix.png'
import cineone from '../assets/cineone.png'

function Footer() {
  return (
    <div className='bg-black rounded-t-[70px] h-[50svh] w-[99svw] flex flex-row justify-center items-center'>
        <div className='flex flex-col h-full justify-evenly w-5/6 text-white'>
            <div className='flex flex-row w-full justify-between'>
                <Logo type='1' className='w-[30svw] h-[10svw]'/>
                <div className='flex flex-row justify-evenly w-[60%]'>
                    <div className='flex flex-col gap-3'>
                        <span className='font-semibold text-2xl'>EXPLORE</span>
                        <span>Cinemas</span>
                        <span>Movies List</span>
                        <span>My Ticket</span>
                        <span>Notification</span>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className='font-semibold text-2xl'>OUR SPONSOR</span>
                        <img src={ebv} alt="logo-ebv" className='w-[10svw]'/>
                        <img src={cineone} alt="logo-cineone" className='w-[10svw]'/>
                        <img src={hiflix} alt="logo-hiflix" className='w-[8svw]'/>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className='font-semibold text-2xl'>FOLLOW US</span>
                        <div className='flex flex-row gap-3'>
                            <img src={fb} alt="logo-fb"/>
                            <span>tickitz.cinema.id</span>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <img src={ig} alt="logo-ig"/>
                            <span>tickitz.cinema.id</span>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <img src={x} alt="logo-x"/>
                            <span>tickitz.cinema.id</span>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <img src={yt} alt="logo-yt"/>
                            <span>tickitz.cinema.id</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full'>
                <span>Stop waiting in line. Buy tickets conveniently, watch movies quietly.</span>
                <span>© 2025 Tickitz. All Rights Reserved.</span>
            </div>
        </div>
    </div>
  )
}

export default Footer