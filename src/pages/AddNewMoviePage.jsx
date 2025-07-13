import React, { useEffect, useRef, useState } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import http from '../lib/http'
import Input from '../components/Input'

const validationSchema = yup.object({
  title: yup.string().required('Judul film harus diisi'),
  synopsis: yup.string().required('Sinopsis film harus diisi'),
  releaseDate: yup.string().required('Tanggal rilis film harus diisi'),
  price: yup.number().required('Harga tiket film harus diisi').positive('Harga harus positif').typeError('Harga harus berupa angka'),
  runtime: yup.number().required('Durasi film harus diisi').positive('Durasi harus positif').integer('Durasi harus bilangan bulat').typeError('Durasi harus berupa angka'),
  genre_ids: yup.string().required('Pilih setidaknya satu genre'),
  directors: yup.string().required('Pilih setidaknya satu sutradara'),
  casts: yup.string().required('Pilih setidaknya satu pemeran'),
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
  const [selectedGenres, setSelectedGenres] = useState([]) // State baru untuk genre
  const [newGenre, setNewGenre] = useState('')
  const [newDirector, setNewDirector] = useState('')
  const [newCast, setNewCast] = useState('')
  const [errorPoster, setErrorPoster] = useState('')
  const [errorBackdrop, setErrorBackdrop] = useState('')
  const [errorGenre, setErrorGenre] = useState('')
  const [errorDirector, setErrorDirector] = useState('')
  const [errorCast, setErrorCast] = useState('')
  const [error, setError] = useState('')
  const [update, setUpdate] = useState('')
  const posterInputRef = useRef(null)
  const backdropInputRef = useRef(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      genre_ids: '',
      directors: '',
      casts: '',
      poster: null,
      backdrop: null,
    }
  })

  useEffect(() => {
    async function getGenres() {
      try {
        const genresData = await http(currentLogin.token).get('/admin/genres')
        setGenres(genresData.data.results)
      } catch (err) {
        console.log('Error fetching genres:', err)
      }
    }
    getGenres()
  }, [currentLogin.token])

  useEffect(() => {
    async function getDirectors() {
      try {
        const directorsData = await http(currentLogin.token).get(`/admin/directors?search=${directorSearch}`)
        setDirectors(directorsData.data.results)
      } catch (err) {
        console.log('Error fetching directors:', err)
      }
    }
    if (directorSearch) {
      getDirectors()
    } else {
      setDirectors([])
    }
  }, [directorSearch, currentLogin.token])

  useEffect(() => {
    async function getCasts() {
      try {
        const castsData = await http(currentLogin.token).get(`/admin/casts?search=${castSearch}`)
        setCasts(castsData.data.results)
      } catch (err) {
        console.log('Error fetching casts:', err)
      }
    }
    if (castSearch) {
      getCasts()
    } else {
      setCasts([])
    }
  }, [castSearch, currentLogin.token])

  const handleAddGenre = async () => {
    if (!newGenre) {
      setErrorGenre('Nama genre tidak boleh kosong!')
      return
    }
    try {
      const response = await http(currentLogin.token).post('/admin/genres', { name: newGenre })
      setGenres([...genres, response.data.result])
      setNewGenre('')
      setErrorGenre('')
    } catch (err) {
      if (err.response.data.message.includes("genre name should not be empty")) {
        setErrorGenre('Nama genre tidak boleh kosong!')
      } else {
        setErrorGenre('Terjadi kesalahan pada server. Silakan refresh halaman atau coba beberapa saat lagi.')
      }
    }
  }

  const handleAddDirector = async () => {
    if (!newDirector) {
      setErrorDirector('Nama sutradara tidak boleh kosong!')
      return
    }
    try {
      const response = await http(currentLogin.token).post('/admin/directors', { name: newDirector })
      const updatedDirectors = [...selectedDirectors, response.data.result]
      setSelectedDirectors(updatedDirectors)
      setValue('directors', updatedDirectors.map((d) => d.id).join(', '))
      setNewDirector('')
      setErrorDirector('')
    } catch (err) {
      if (err.response.data.message.includes("director name should not be empty")) {
        setErrorDirector('Nama sutradara tidak boleh kosong!')
      } else {
        setErrorDirector('Terjadi kesalahan pada server. Silakan refresh halaman atau coba beberapa saat lagi.')
      }
    }
  }

  const handleAddCast = async () => {
    if (!newCast) {
      setErrorCast('Nama pemeran tidak boleh kosong!')
      return
    }
    try {
      const response = await http(currentLogin.token).post('/admin/casts', { name: newCast })
      const updatedCasts = [...selectedCasts, response.data.result]
      setSelectedCasts(updatedCasts)
      setValue('casts', updatedCasts.map((c) => c.id).join(', '))
      setNewCast('')
      setErrorCast('')
    } catch (err) {
      if (err.response.data.message.includes("cast name should not be empty")) {
        setErrorCast('Nama pemeran tidak boleh kosong!')
      } else {
        setErrorCast('Terjadi kesalahan pada server. Silakan refresh halaman atau coba beberapa saat lagi.')
      }
    }
  }

  const validateFile = (file, fieldName) => {
    const allowedExts = ['.jpg', '.jpeg', '.png']
    const maxSize = 5 * 1024 * 1024 
    if (!file) {
      return `${fieldName} harus diisi`
    }
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    if (!allowedExts.includes(ext)) {
      return `Format file ${fieldName} harus JPG, JPEG, atau PNG`
    }
    if (file.size > maxSize) {
      return `Ukuran file ${fieldName} tidak boleh lebih dari 5MB`
    }
    return ''
  }

  async function addMovie(data) {
    console.log('Form data:', data)
    const posterFile = posterInputRef.current?.files[0]
    const backdropFile = backdropInputRef.current?.files[0]

    const posterError = validateFile(posterFile, 'Poster')
    const backdropError = validateFile(backdropFile, 'Backdrop')
    if (posterError || backdropError) {
      setErrorPoster(posterError)
      setErrorBackdrop(backdropError)
      return
    }

    if (!data.genre_ids) {
      setErrorGenre('Pilih setidaknya satu genre')
      return
    }
    if (!selectedDirectors.length) {
      setErrorDirector('Pilih setidaknya satu sutradara')
      return
    }
    if (!selectedCasts.length) {
      setErrorCast('Pilih setidaknya satu pemeran')
      return
    }

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('synopsis', data.synopsis)
    formData.append('releaseDate', data.releaseDate)
    formData.append('price', data.price.toString())
    formData.append('runtime', data.runtime.toString())
    formData.append('genres', data.genre_ids)
    formData.append('directors', selectedDirectors.map((d) => d?.id).join(', '))
    formData.append('casts', selectedCasts.map((c) => c?.id).join(', '))
    if (posterFile) formData.append('poster', posterFile)
    if (backdropFile) formData.append('backdrop', backdropFile)

    try {
      console.log('Sending FormData:', Object.fromEntries(formData))
      const response = await http(currentLogin.token).post('/admin/movie', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.data.success) {
        reset()
        setSelectedDirectors([])
        setSelectedCasts([])
        setSelectedGenres([])
        setNewGenre('')
        setNewDirector('')
        setNewCast('')
        setErrorPoster('')
        setErrorBackdrop('')
        setErrorGenre('')
        setErrorDirector('')
        setErrorCast('')
        setError('')
        if (posterInputRef.current) posterInputRef.current.value = ''
        if (backdropInputRef.current) backdropInputRef.current.value = ''
        setUpdate('Film baru berhasil ditambahkan!')
        setTimeout(function () {
          setUpdate('')
        }, 5000)
      }
    } catch (err) {
      console.error('Error adding movie:', err)
      setError(
        err.response?.data?.message?.includes('new movie data should not be empty')
          ? 'Data film tidak boleh kosong!'
          : 'Terjadi kesalahan pada server. Silakan refresh halaman atau coba lagi nanti.'
      )
    }
  }

  const handleDirectorSelect = (director) => {
    if (!selectedDirectors.some((d) => d.id === director.id)) {
      const updatedDirectors = [...selectedDirectors, director]
      setSelectedDirectors(updatedDirectors)
      setValue('directors', updatedDirectors.map((d) => d.id).join(', '))
    }
    setDirectorSearch('')
    setDirectors([])
  }

  const handleCastSelect = (cast) => {
    if (!selectedCasts.some((c) => c.id === cast.id)) {
      const updatedCasts = [...selectedCasts, cast]
      setSelectedCasts(updatedCasts)
      setValue('casts', updatedCasts.map((c) => c.id).join(', '))
    }
    setCastSearch('')
    setCasts([])
  }

  const removeDirector = (id) => {
    const updatedDirectors = selectedDirectors.filter((d) => d.id !== id)
    setSelectedDirectors(updatedDirectors)
    setValue('directors', updatedDirectors.map((d) => d.id).join(', '))
  }

  const removeCast = (id) => {
    const updatedCasts = selectedCasts.filter((c) => c.id !== id)
    setSelectedCasts(updatedCasts)
    setValue('casts', updatedCasts.map((c) => c.id).join(', '))
  }

  const handleGenreChange = (id, checked) => {
    let updatedGenres
    if (checked) {
      updatedGenres = [...selectedGenres, id]
    } else {
      updatedGenres = selectedGenres.filter((genreId) => genreId !== id)
    }
    setSelectedGenres(updatedGenres)
    setValue('genre_ids', updatedGenres.join(', '))
    setErrorGenre('')
  }

  const onSubmit = (data) => {
    console.log('handleSubmit called with data:', data)
    console.log('Form errors:', errors)
    addMovie(data)
  }

  if (currentLogin.profile.role !== 'admin') { return (<Navigate to='/' replace/>) }
  
  return (
    <div>
      <NavbarAdmin currentlyOn='movie'/>
      <div className='h-[10svh]'></div>
      <div className='w-svw bg-gray-200 h-fit py-10 px-5 flex flex-col gap-10 justify-starts items-center'>
        <div className='w-[90%] lg:w-[65%] h-[95%] bg-white rounded-lg px-10 py-10 flex flex-col gap-5'>
          <span className='font-bold text-2xl'>Add Movie</span>
          <form 
            id='addMovie'
            onSubmit={handleSubmit(onSubmit)}
            className='self-center flex flex-col gap-5 w-[95%] h-fit'>
              <Input type='file' ref={posterInputRef} name='poster' fieldName='Poster'/>
              {errorPoster && <p className="text-red-500 text-sm">{errorPoster}</p>}
              {errors.poster && <p className="text-red-500 text-sm">{errors.poster.message}</p>}
              <Input type='file' ref={backdropInputRef} name='backdrop' fieldName='Backdrop'/>
              {errorBackdrop && <p className="text-red-500 text-sm">{errorBackdrop}</p>}
              {errors.backdrop && <p className="text-red-500 text-sm">{errors.backdrop.message}</p>}
              <div className='flex flex-col gap-3'>
                <span>Movie Name</span>
                <input 
                  type="text" 
                  placeholder='Enter Movie Title' 
                  className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' 
                  {...register('title')}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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
                  {errorGenre && <p className="text-red-500 text-sm">{errorGenre}</p>}
                </div>
                {errors.genre_ids && <p className="text-red-500 text-sm">{errors.genre_ids.message}</p>}
                <div className='grid grid-cols-3 lg:grid-cols-5 w-full'>
                  {genres?.map((item) => (
                    item?.id && item?.name ? (
                      <div key={`genre-${item.id}`} className='flex flex-row gap-2 p-2 w-fit'>
                        <input 
                          type="checkbox" 
                          id={`genre-${item.id}`}
                          value={item.id}
                          checked={selectedGenres.includes(item.id)}
                          onChange={(e) => handleGenreChange(item.id, e.target.checked)}
                          className='w-[1.1rem]'
                        />
                        <label htmlFor={`genre-${item.id}`}>{item.name}</label>
                      </div>
                    ) : null
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register('genre_ids')}
                />
              </div>
              <div className='flex flex-row gap-3 w-full'>
                <div className='flex flex-col gap-3 w-[50%]'>
                  <span>Release Date (YYYY-MM-DD)</span>
                  <input 
                    type="text" 
                    placeholder='Enter Release Date' 
                    className='w-full outline-o border-1 border-gray-400 px-5 py-2 rounded-lg'
                    {...register('releaseDate')} 
                  />
                  {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate.message}</p>}
                </div>
                <div className='flex flex-col gap-3 w-[50%]'>
                  <span>Duration/Runtime (Minutes)</span>
                  <input 
                    type="number" 
                    placeholder='Enter Runtime in Total Minutes' 
                    className='w-full outline-o border-1 border-gray-400 px-5 py-2 rounded-lg'
                    {...register('runtime')} 
                  />
                  {errors.runtime && <p className="text-red-500 text-sm">{errors.runtime.message}</p>}
                </div>
              </div>
              <div className='flex flex-col gap-3 w-full'>
                <span>Ticket Price</span>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder='Enter Ticket Price' 
                  className='w-full outline-0 border-1 border-gray-400 px-5 py-2 rounded-lg' 
                  {...register('price')}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
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
                  {errorDirector && <p className="text-red-500 text-sm">{errorDirector}</p>}
                </div>
                {errors.directors && <p className="text-red-500 text-sm">{errors.directors.message}</p>}
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
                        director?.id && director?.name ? (
                          <div
                            key={`director-${director.id}`}
                            className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDirectorSelect(director)}
                          >{director.name}
                          </div>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDirectors?.map((director) => (
                    director?.id && director?.name ? (
                      <div
                        key={`selected-director-${director.id}`}
                        className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {director.name}
                        <button
                          type="button"
                          className="ml-2 text-orange-600"
                          onClick={() => removeDirector(director.id)}>×
                        </button>
                      </div>
                    ) : null
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register('directors')}
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
                    onClick={handleAddCast}>Tambah Pemeran</button>
                  {errorCast && <p className="text-red-500 text-sm">{errorCast}</p>}
                </div>
                {errors.casts && <p className="text-red-500 text-sm">{errors.casts.message}</p>}
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
                        cast?.id && cast?.name ? (
                          <div
                            key={`cast-${cast.id}`}
                            className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCastSelect(cast)}>
                            {cast.name}
                          </div>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCasts?.map((cast) => (
                    cast?.id && cast?.name ? (
                      <div
                        key={`selected-cast-${cast.id}`}
                        className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {cast.name}
                        <button
                          type="button"
                          className="ml-2 text-orange-600"
                          onClick={() => removeCast(cast.id)}>×
                        </button>
                      </div>
                    ) : null
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register('casts')}
                />
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
                  {errors.synopsis && <p className="text-red-500 text-sm">{errors.synopsis.message}</p>}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="rounded-lg bg-orange-500 text-white py-5 font-semibold text-lg">Save Movie</button>
              {update && <span className='text-lg text-green-400 font-semibold'>{update}</span>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewMoviePage