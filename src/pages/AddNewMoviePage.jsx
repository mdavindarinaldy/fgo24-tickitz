import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addMovieAction } from '../redux/reducer.js/newMovies'

const validationSchema = yup.object({
  title: yup.string().required('Judul film harus diisi'),
  release_date: yup.string().required('Tanggal rilis film harus diisi'),
  runtime: yup.string().required('Durasi film harus diisi'),
  director: yup.string().required('Nama director film harus diisi'),
  casts: yup.string().required('Nama pemain film harus diisi'),
  overview: yup.string().required('Sinopsis film harus diisi'),
})

function AddNewMoviePage() {
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const {register, handleSubmit, reset} = useForm({
    resolver: yupResolver(validationSchema)
  })
  const dispatch = useDispatch()

  const genres = [
    {id: 28, genre:'Action'},
    {id: 12, genre:'Adventure'},
    {id: 16, genre:'Animation'},
    {id: 35, genre:'Comedy'},
    {id: 80, genre:'Crime'},
    {id: 99, genre:'Documentary'},
    {id: 18, genre:'Drama'},
    {id: 10751, genre:'Family'},
    {id: 14, genre:'Fantasy'},
    {id: 36, genre:'History'},
    {id: 27, genre:'Horror'},
    {id: 10402, genre:'Music'},
    {id: 9648, genre:'Mystery'},
    {id: 10749, genre:'Romance'},
    {id: 878, genre:'Sci-Fi'},
    {id: 10770, genre:'TV Movie'},
    {id: 53, genre:'Thriller'},
    {id: 10752, genre:'War'},
    {id: 37, genre:'Western'},
  ]

  function addMovie(value) {
    dispatch(addMovieAction(value))
    reset()
  }

  if(currentLogin.email !== 'admin@gmail.com') { return (<Navigate to='/' replace/>) }
  
  return (
    <div>
      <NavbarAdmin currentlyOn='movie'/>
      <div className='h-[10svh]'></div>
      <div className='w-svw bg-gray-200 h-fit py-10 px-5 flex flex-col gap-10 justify-starts items-center'>
        <div className='w-[65%] h-[95%] bg-white rounded-lg px-10 py-10 flex flex-col gap-5'>
          <span className='font-bold text-2xl'>Add Movie</span>
          <form 
            id='addMovie'
            onSubmit={handleSubmit(addMovie)}
            className='self-center flex flex-col gap-5 w-[95%] h-fit'>
              <div className='flex flex-col gap-3'>
                <span>Upload Image</span>
                <button type='button' className='py-2 px-5 bg-orange-500 text-white rounded-lg w-[20%]'>Upload</button>
              </div>
              <div className='flex flex-col gap-3'>
                <span>Movie Name</span>
                <input 
                  type="text" placeholder='Enter Movie Title' 
                  className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' 
                  {...register('title')}
                />
              </div>
              <div className='flex flex-col gap-3 w-full'>
                <span>Genres</span>
                <div className='grid grid-cols-5 w-full'>
                  {genres.map((item, index) => (
                    <div key={`genre-${index}`} className='flex flex-row gap-2 p-2 w-fit'>
                        <input 
                          type="checkbox" 
                          id={`genre-${item.id}`}
                          value={`${item.id}`}
                          {...register('genre_ids')}
                          className='w-[1.1rem]'
                        />
                        <label htmlFor={`genre-${item.id}`}>{item.genre}</label>
                    </div>
                    ))
                  }
                </div>
              </div>
              <div className='flex flex-row gap-3 w-full'>
                <div className='flex flex-col gap-3 w-[50%]'>
                  <span>Release Date (YYYY-MM-DD)</span>
                  <input 
                    type="text" placeholder='Enter Release Date' 
                    className='w-full outline-o border-1 border-gray-400 px-5 py-2 rounded-lg'
                    {...register('release_date')} 
                  />
                </div>
                <div className='flex flex-col gap-3 w-[50%]'>
                  <span>Duration/Runtime (Minutes)</span>
                    <input 
                      type="text" placeholder='Enter Runtime in Total Minutes' 
                      className='w-full outline-o border-1 border-gray-400 px-5 py-2 rounded-lg'
                      {...register('runtime')} 
                    />
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <span>Director Name</span>
                <input 
                  type="text" placeholder='Enter Director Name' 
                  className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' 
                  {...register('director')}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <span>Cast</span>
                <input 
                  type="text" placeholder='Enter Casts Name' 
                  className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' 
                  {...register('casts')}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <span>Synopsis</span>
                <div className='border-1 border-gray-400 rounded-lg h-[40svh]'>
                  <input 
                    type="text" placeholder='Enter Synopsis' 
                    className='w-full px-5 py-2 rounded-lg outline-0 border-0'
                    {...register('overview')}
                  />
                </div>
              </div>
              <button 
                type='submit' 
                className='rounded-lg bg-orange-500 text-white py-5 font-semibold text-lg'
                >
                  Save Movie
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewMoviePage