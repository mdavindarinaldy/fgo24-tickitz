import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Steps from '../components/Steps'
import Poster from '../assets/poster-spiderman.png'
import Cineone from '../assets/cineone-black.png'
import GenreButton from '../components/GenreButton'
import Button from '../components/Button'

// Use Context buat halaman buy ticket --> seat --> payment --> order (context film detail)

function SeatPage() {
  function Letter({letter}) {
    return (
        <div className='size-[20px] text-base font-normal'>{letter}</div>
    )
  }
  function Seat(){
    return (
        <>
            <input type="checkbox" name='seat' className='size-[30px] rounded-2xl'/>
        </>
    )
  }
  function SectionA() {
    const items = []
    let currentLetter = 'A'
    let number = 1
    for (let i = 0; i < 64; i++) {
        if (i % 8 === 0 && i !== 56) {
          items.push(<Letter key={`letter-${i}`} letter={currentLetter}/>)
          if (currentLetter === 'H') {
            continue
          }
          currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1)
        } else if (i < 56){
          items.push(<Seat key={`seat-${i}`}/>)
        } else if (i === 56) {
          items.push(<div key={`item-${i}`} className='size-[20px] text-base font-normal'></div>)
        } else {
          items.push(<div key={`item-${i}`} className='size-[20px] w-full text-base font-normal text-center'>{number}</div>)
          number+=1
        }
    }
    return items
  }
  function SectionB() {
    const items = []
    let number = 8
    for (let i = 0; i < 56; i++) {
        if (i < 49) { items.push(<Seat key={`seat-${i}`}/>) }
        else { 
            items.push(<div key={`item-${i}`} className='size-[20px] w-full text-base font-normal text-center'>{number}</div>)
            number+=1
        }
    }
    return items
  }

  return (
    <div>
        <Navbar currentlyOn='buy'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw h-fit bg-gray-100 flex flex-col justify-center items-center py-10 gap-5'>
            <Steps text1='Date & Time' text2='Seat' text3='Payment'/>
            <form className='w-[90%] h-fit flex flex-row gap-5'>
                <div className='w-[65%] h-fit bg-white rounded-2xl flex flex-col gap-10 pt-5 pb-10 px-5'>
                    <div className='w-full h-fit flex flex-row gap-5 py-3 px-3 border-1 border-gray-300 rounded-sm'>
                        <img src={Poster} alt="movie"/>
                        <div className='flex flex-col flex-1 gap-5'>
                            <span className='font-bold text-2xl'>Spider-Man: Homecoming</span>
                            <div className='flex flex-row gap-5'>
                                <GenreButton text='Action'/>
                            </div>
                            <div className='flex flex-row justify-between flex-1'>
                                <span>Regular - 13:00 PM</span>
                                <Button text='Change' className='on' href='/'/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-10'>
                        <span className='text-3xl font-bold'>Choose Your Seat</span>
                        <div className='w-full bg-gray-200 rounded-3xl py-2 text-center font-semibold'>Screen</div>
                        <div className='w-full flex flex-row justify-evenly items-center'>
                            <div className='grid grid-cols-8 gap-2'>
                                <SectionA/>
                            </div>
                            <div className='grid grid-cols-7 gap-2 justify-center items-center'>
                                <SectionB/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 justify-center items-center'>
                        <span className='font-semibold text-lg'>Seating Key</span>
                        <div className='flex flex-row items-center gap-5'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='size-[20px] bg-gray-300 rounded-sm'></div>
                                <span className='text-sm'>Available</span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='size-[20px] bg-blue-500 rounded-sm'></div>
                                <span className='text-sm'>Selected</span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='size-[20px] bg-black rounded-sm'></div>
                                <span className='text-sm'>Sold</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[35%] h-fit bg-white rounded-2xl flex flex-col justify-center items-center py-8 px-5 gap-7'>
                    <img src={Cineone} alt="logo-cinema"/>
                    <span className='text-3xl font-bold'>CineOne21 Cinema</span>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span className='text-gray-400 font-semibold text-sm'>Movie selected</span>
                        <span className='text-base font-semibold'>Spider-Man: Homecoming</span>
                    </div>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span className='text-gray-400 font-semibold text-sm'>Tuesday, 07 July 2020</span>
                        <span className='text-base font-semibold'>13:00pm</span>
                    </div>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span className='text-gray-400 font-semibold text-sm'>One ticket price</span>
                        <span className='text-base font-semibold'>$10</span>
                    </div>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span className='text-gray-400 font-semibold text-sm'>Seat choosed</span>
                        <span className='text-base font-semibold'>C4, C5, C6</span>
                    </div>
                    <hr className='w-full h-0.1 border-1 border-gray-300'/>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span className='font-bold text-lg'>Total Payment</span>
                        <span className='text-blue-600 font-semibold text-lg'>$30</span>
                    </div>
                    <button type='submit' className='w-full bg-orange-500 py-3 text-center rounded-3xl text-white font-semibold'>Check Out Now</button>
                </div>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default SeatPage