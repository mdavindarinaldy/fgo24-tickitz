import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import http from '../lib/http'

const validationSchema = yup.object({
  title: yup.string().required('Judul film harus diisi'),
  synopsis: yup.string().required('Sinopsis film harus diisi'),
  releaseDate: yup.string().required('Tanggal rilis film harus diisi'),
  price: yup.number().required('Harga tiket film harus diisi'),
  runtime: yup.number().integer().required('Durasi film harus diisi'),
  poster: yup.string().required('Poster film harus diisi'),
  backdrop: yup.string().required('Backdrop film harus diisi'),
  genres: yup.string().required('Genres film harus diisi'),
  directors: yup.string().required('Nama directors film harus diisi'),
  casts: yup.string().required('Nama pemain film harus diisi'),
})

function AddNewMoviePage() {
  const currentLogin = useSelector((state) => state.currentLogin)
  const [genres, setGenres] = useState([{}])
  const [directors, setDirectors] = useState([])
  const [directorSearch, setDirectorSearch] = useState('')
  const [casts, setCasts] = useState([])
  const [castSearch, setCastSearch] = useState('')
  const [selectedDirectors, setSelectedDirectors] = useState([])
  const [selectedCasts, setSelectedCasts] = useState([])
  const [newGenre, setNewGenre] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newCast, setNewCast] = useState('');
  const {register, handleSubmit, reset} = useForm({
    resolver: yupResolver(validationSchema)
  })

  useEffect(()=> {
    async function getGenres() {
      try {
        const genresData = await http(currentLogin.token).get('/admin/genres')
        setGenres(genresData.data.results)
      } catch (err) {
        console.log(err)
      }
    }
    getGenres()
  },[currentLogin.token])

  useEffect(()=> {
    async function getDirectors() {
      try {
        const directorsData = await http(currentLogin.token).get(`/admin/directors?search=${directorSearch}`)
        setDirectors(directorsData.data.results)
      } catch (err) {
        console.log(err)
      }
    }
    if (directorSearch) {
      getDirectors()
    } else {
      setDirectors([])
    }
  },[directorSearch, currentLogin.token])

  useEffect(()=> {
    async function getCasts() {
      try {
        const castsData = await http(currentLogin.token).get(`/admin/casts?search=${castSearch}`)
        setCasts(castsData.data.results)
      } catch (err) {
        console.log(err)
      }
    }
    if (castSearch) {
      getCasts()
    } else {
      setCasts([])
    }
  },[castSearch, currentLogin.token])

  const handleAddGenre = async () => {
    if (!newGenre) return
    try {
      const response = await http(currentLogin.token).post('/admin/genres', { name: newGenre })
      setGenres([...genres, response.data.result])
      setNewGenre('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddDirector = async () => {
    if (!newDirector) return
    try {
      const response = await http(currentLogin.token).post('/admin/directors', { name: newDirector })
      setSelectedDirectors([...selectedDirectors, response.data.result])
      setNewDirector('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddCast = async () => {
    if (!newCast) return
    try {
      const response = await http(currentLogin.token).post('/admin/casts', { name: newCast })
      setSelectedCasts([...selectedCasts, response.data.result])
      setNewCast('')
    } catch (err) {
      console.log(err)
    }
  }

  function addMovie(data) {
    data.directors = selectedDirectors.map((d) => d.id).join(', ')
    data.casts = selectedCasts.map((c) => c.id).join(', ')
    console.log('Data yang dikirim:', data)
    reset()
    setSelectedDirectors([])
    setSelectedCasts([])
  }

  const handleDirectorSelect = (director) => {
    if (!selectedDirectors.some((d) => d.id === director.id)) {
      setSelectedDirectors([...selectedDirectors, director])
    }
    setDirectorSearch('')
    setDirectors([])
  }

  const handleCastSelect = (cast) => {
    if (!selectedCasts.some((c) => c.id === cast.id)) {
      setSelectedCasts([...selectedCasts, cast])
    }
    setCastSearch('')
    setCasts([])
  }

  const removeDirector = (id) => {
    setSelectedDirectors(selectedDirectors.filter((d) => d.id !== id))
  }

  const removeCast = (id) => {
    setSelectedCasts(selectedCasts.filter((c) => c.id !== id))
  }

  if(currentLogin.profile.role !== 'admin') { return (<Navigate to='/' replace/>) }
  
  return (
    <div>
      <NavbarAdmin currentlyOn='movie'/>
      <div className='h-[10svh]'></div>
      <div className='w-svw bg-gray-200 h-fit py-10 px-5 flex flex-col gap-10 justify-starts items-center'>
        <div className='w-[90%] lg:w-[65%] h-[95%] bg-white rounded-lg px-10 py-10 flex flex-col gap-5'>
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
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Masukkan nama genre baru"
                    className="outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg w-[60%]"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}/>
                  <button
                    type="button"
                    className="py-2 px-2 lg:px-5 bg-orange-500 text-white rounded-lg w-[40%]"
                    onClick={handleAddGenre}>
                    Tambah Genre
                  </button>
                </div>
                <div className='grid grid-cols-3 lg:grid-cols-5 w-full'>
                  {genres?.map((item, index) => (
                    <div key={`genre-${index}`} className='flex flex-row gap-2 p-2 w-fit'>
                        <input 
                          type="checkbox" 
                          id={`genre-${item?.id}`}
                          value={`${item?.id}`}
                          {...register('genre_ids')}
                          className='w-[1.1rem]'
                        />
                        <label htmlFor={`genre-${item?.id}`}>{item?.name}</label>
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
                    {...register('releaseDate')} 
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
              <div className="flex flex-col gap-3">
                  <span>Directors Name</span>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Masukkan nama sutradara baru"
                      className="w-[60%] outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg"
                      value={newDirector}
                      onChange={(e) => setNewDirector(e.target.value)}/>
                    <button
                      type="button"
                      className="py-2 px-2 lg:px-5 bg-orange-500 text-white rounded-lg w-[40%]"
                      onClick={handleAddDirector}>Tambah Sutradara</button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari nama sutradara"
                      className="w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg"
                      value={directorSearch}
                      onChange={(e) => setDirectorSearch(e.target.value)}/>
                    {directors?.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-400 rounded-lg mt-1 max-h-40 overflow-y-auto">
                      {directors?.map((director) => (
                        <div
                          key={`director-${director?.id}`}
                          className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleDirectorSelect(director)}
                        >{director?.name}
                        </div>
                      ))}
                    </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                      {selectedDirectors?.map((director) => (
                      <div
                        key={`selected-director-${director?.id}`}
                        className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {director?.name}
                        <button
                          type="button"
                          className="ml-2 text-orange-600"
                          onClick={() => removeDirector(director?.id)}>&times;
                        </button>
                      </div>
                      ))}
                  </div>
                  <input
                    type="hidden"
                    {...register('directors')}
                    value={selectedDirectors?.map((d) => d?.id).join(', ')}
                  />
              </div>
              <div className="flex flex-col gap-3">
                <span>Casts Name</span>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Masukkan nama pemeran baru"
                    className="w-[60%] outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg"
                    value={newCast}
                    onChange={(e) => setNewCast(e.target.value)}/>
                  <button
                    type="button"
                    className="py-2 px-2 lg:px-5 bg-orange-500 text-white rounded-lg w-[40%]"
                    onClick={handleAddCast}>
                    Tambah Pemeran
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari nama pemeran"
                    className="w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg"
                    value={castSearch}
                    onChange={(e) => setCastSearch(e.target.value)}/>
                  {casts?.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-400 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {casts?.map((cast) => (
                      <div
                        key={`cast-${cast?.id}`}
                        className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCastSelect(cast)}>
                        {cast?.name}
                      </div>
                    ))}
                  </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCasts?.map((cast) => (
                    <div
                      key={`selected-cast-${cast?.id}`}
                      className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {cast?.name}
                      <button
                        type="button"
                        className="ml-2 text-orange-600"
                        onClick={() => removeCast(cast?.id)}>&times;
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register('casts')}
                  value={selectedCasts?.map((c) => c?.id).join(', ')}/>
              </div>
              <div className="flex flex-col gap-3">
                <span>Synopsis</span>
                <div className="border-1 border-gray-400 rounded-lg h-[40svh]">
                  <input
                    type="text"
                    placeholder="Enter Synopsis"
                    className="w-full px-5 py-2 rounded-lg outline-0 border-0"
                    {...register('synopsis')}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-orange-500 text-white py-5 font-semibold text-lg">Save Movie</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewMoviePage