import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin'

function AddNewMoviePage() {
  return (
    <div>
        <NavbarAdmin currentlyOn='dashboard'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw bg-gray-200 h-fit py-10 px-5 flex flex-col gap-10 justify-starts items-center'>
            <div className='w-[65%] h-[95%] bg-white rounded-lg px-10 py-10 flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Add Movie</span>
                <form className='self-center flex flex-col gap-5 w-[95%] h-fit'>
                    <div className='flex flex-col gap-3'>
                        <span>Upload Image</span>
                        <button type='button' className='py-2 px-5 bg-orange-500 text-white rounded-lg w-[20%]'>Upload</button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span>Movie Name</span>
                        <input type="text" placeholder='Enter Movie Title' className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span>Category</span>
                        <input type="text" placeholder='Enter Movie Genre(s)' className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' />
                    </div>
                    <div className='flex flex-row gap-3 w-full'>
                        <div className='flex flex-col gap-3 w-[50%]'>
                            <span>Release Date</span>
                            <input type="text" placeholder='Enter Release Date' className='w-full outline-o border-1 border-gray-400 px-5 py-2 rounded-lg' />
                        </div>
                        <div className='flex flex-col gap-3 w-[50%]'>
                            <span>Duration (hour/minutes)</span>
                            <div className='flex flex-row gap-3 w-full'>
                                <input type="text" placeholder='Hours' className='w-[50%] outline-o border-1 border-gray-400 px-5 py-2 rounded-lg' />
                                <input type="text" placeholder='Minutes' className='w-[50%] outline-o border-1 border-gray-400 px-5 py-2 rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span>Director Name</span>
                        <input type="text" placeholder='Enter Director Name' className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span>Cast</span>
                        <input type="text" placeholder='Enter Casts Name' className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span>Synopsis</span>
                        <div className='border-1 border-gray-400 rounded-lg h-[40svh]'>
                            <input type="text" placeholder='Enter Synopsis' className='w-full px-5 py-2 rounded-lg outline-0 border-0'/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span>Add Location</span>
                        <input type="text" placeholder='Enter Location' className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <span>Set Date & Time</span>
                        <select name="movies-options" id="movies-options" className='w-[25%] px-5 py-2 bg-gray-100 rounded-md'>
                            <option>Set A Date</option>
                            <option>Next Date</option>
                        </select>
                        <div className='flex flex-row gap-5 items-center'>
                            <button type='button' className='border-1 border-gray-400 px-10 py-2 text-lg rounded-md'>+</button>
                            <span className='border-1 border-gray-300 px-5 py-2 rounded-md'>08.30 AM</span>
                            <span className='border-1 border-gray-300 px-5 py-2 rounded-md'>11.30 AM</span>
                            <span className='border-1 border-gray-300 px-5 py-2 rounded-md'>14.30 AM</span>
                        </div>
                        <hr className='w-full'/>
                        <button type='submit' className='rounded-lg bg-orange-500 text-white py-5 font-semibold text-lg'>Save Movie</button>
                    </div>    
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddNewMoviePage