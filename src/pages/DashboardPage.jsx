import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import chart from '../assets/chart.png'

function DashboardPage() {
  return (
    <div>
        <NavbarAdmin currentlyOn='dashboard'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw bg-gray-200 h-fit py-10 px-10 flex flex-col gap-10 justify-starts items-center'>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Sales Chart</span>
                <form id='sales' className='w-full flex flex-row gap-5'>
                    <select name="movies-options" id="movies-options" className='w-[25%] px-5 py-2 bg-gray-100 rounded-md'>
                        <option>Movies Name</option>
                        <option>Jumbo</option>
                        <option>Final Destination</option>
                    </select>
                    <select name="duration-options" id="duration-options" className='w-[25%] px-5 py-2 bg-gray-100 rounded-md'>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                    <button type='submit' className='text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md'>Filter</button>
                </form>
                <div className='flex flex-col gap-2'>
                        <span>Jumbo</span>
                        <img src={chart} alt="chart" className='w-full'/>
                </div>
            </div>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Ticket Sales</span>
                <form id='ticket' className='w-full flex flex-row gap-5'>
                    <select name="movies-options" id="movies-options" className='w-[25%] px-5 py-2 bg-gray-100 rounded-md'>
                        <option>Category</option>
                        <option>Adventure</option>
                        <option>Romance</option>
                    </select>
                    <select name="duration-options" id="duration-options" className='w-[25%] px-5 py-2 bg-gray-100 rounded-md'>
                        <option>Location</option>
                        <option>Jakarta</option>
                        <option>Bekasi</option>
                        <option>Tangerang</option>
                        <option>Bogor</option>
                        <option>Depok</option>
                    </select>
                    <button type='submit' className='text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md'>Filter</button>
                </form>
                <div className='flex flex-col gap-2'>
                        <span>Jumbo</span>
                        <img src={chart} alt="chart" className='w-full'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage