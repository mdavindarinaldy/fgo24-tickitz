import React, {useState, useEffect} from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import fetchNowPlayingMovies from '../script/fetchNowPlayingMovies'
import del from '../assets/button-delete.png'
import edit from '../assets/button-edit.png'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import placeholder from '../assets/image-placeholder.png'
import GenreButton from '../components/GenreButton'

function ListMovieAdminPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [option, setOption] = useState('ori')
  const {register, handleSubmit} = useForm({})

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const currentLogin = useSelector((state) => state.currentLogin)
  const newMovies = useSelector((state) => state.newMovies.movies)
  
  useEffect(() => {
    const getMovies = async () => {
      try {
          const data = await fetchNowPlayingMovies()
          setMovies(data)
          setLoading(false)
        } catch (err) {
          setError(err.message)
          setLoading(false)
        }
    }
    getMovies()
  }, [])
    
  function filterByOption(value) {
    setOption(value.option)
    setCurrentPage(1)
  }

  if (currentLogin.profile.role !== 'admin') { return (<Navigate to='/' replace/>) }
  if (loading) return <div className='h-svh flex flex-col justify-center items-center'>Loading...</div>
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>

  function getPaginationData() {
    let data
    if (option==='ori') {data = movies}
    else if (option==='new') {data = newMovies}
    
    if (Array.isArray(data)) {
      const dataWithGenres = data.map((item) => {
        const genres = [];
        item.genre_ids.forEach((item) => {
          if (Number(item) === 28) genres.push('Action')
          if (Number(item) === 12) genres.push('Adventure')
          if (Number(item) === 16) genres.push('Animation')
          if (Number(item) === 35) genres.push('Comedy')
          if (Number(item) === 80) genres.push('Crime')
          if (Number(item) === 99) genres.push('Documentary')
          if (Number(item) === 18) genres.push('Drama')
          if (Number(item) === 10751) genres.push('Family')
          if (Number(item) === 14) genres.push('Fantasy')
          if (Number(item) === 36) genres.push('History')
          if (Number(item) === 27) genres.push('Horror')
          if (Number(item) === 10402) genres.push('Music')
          if (Number(item) === 9648) genres.push('Mystery')
          if (Number(item) === 10749) genres.push('Romance')
          if (Number(item) === 878) genres.push('Sci-Fi')
          if (Number(item) === 10770) genres.push('TV Movie')
          if (Number(item) === 53) genres.push('Thriller')
          if (Number(item) === 10752) genres.push('War')
          if (Number(item) === 37) genres.push('Western')
        })
        return { ...item, genres}
      })
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return dataWithGenres.slice(startIndex, endIndex)
    }
    return []
  }
  
  function getTotalPages() {
    let data
    if (option==='ori') {data = movies}
    else if (option==='new') {data = newMovies}
    return Math.ceil(data.length/itemsPerPage)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  const paginationData = getPaginationData()
  const totalPages = getTotalPages()

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
 
  return (
    <div>
      <NavbarAdmin currentlyOn='movie'/>
      <div className='h-[10svh]'></div>
      <div className='w-svw bg-gray-200 h-[90svh] py-5 px-10 flex flex-col gap-10 justify-starts items-center'>
        <div className='w-[85%] h-[95%] bg-white rounded-lg px-10 py-5 flex flex-col gap-5'>
          <div className='flex flex-row justify-between items-center w-full'>
            <span className='font-bold text-lg'>List Movie</span>
            <form 
              id='option'
              onSubmit={handleSubmit(filterByOption)} 
              className='flex flex-row justify-end items-center gap-5 w-[40%]'>
                <select 
                  name="date-options" 
                  id="date-options" 
                  className='w-full px-5 py-2 bg-gray-100 rounded-md'
                  {...register('option')}
                >
                  <option value={'ori'}>Original Movie</option>
                  <option value={'new'}>New Movie</option>
                </select>
                <button type='submit' className='rounded-lg bg-orange-500 text-white px-3 py-2'>Filter</button>
            </form>
            <div className='flex flex-row justify-end items-center gap-5 w-[40%]'>
              <Link to='/add-movie' className='rounded-lg bg-orange-500 text-white px-3 py-2'>Add Movie</Link>
            </div>
          </div>
          <div className='w-full'>
            <table className='w-full table-auto text-center'>
              <thead>
                  <tr>
                      <th>No</th>
                      <th>Thumbnail</th>
                      <th className='w-[30svw]'>Movie Name</th>
                      <th>Category</th>
                      <th>Released Date</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {(Array.isArray(paginationData)) ? 
                  paginationData.map((item, index) => (
                    <tr key={index} >
                      <td>{index+1}</td>
                      <td className='py-1 flex flex-row justify-center'>
                        <img 
                          src={option==='ori' ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : placeholder}
                          alt="movie-poster" className='size-[60px] object-cover rounded-sm'/>
                        </td>
                      <td>{item.title}</td>
                      <td>{item.genres.join(', ')}</td>
                      <td>{item.release_date}</td>
                      <td className='flex flex-row justify-center items-center h-[40%] gap-1'>
                        <button><img src={edit} alt="edit-icon" /></button>
                        <button><img src={del} alt="delete-icon" /></button>
                      </td>
                    </tr>
                  ))
                :
                  (
                    <tr>
                      <td colSpan={"6"} className='py-10'><span className='font-bold text-2xl text-center w-full'>Belum ada data film yang ditambahkan</span></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          <div className='w-full flex flex-row justify-center items-center gap-5'>
            {pageNumbers.map((page) => (
              <GenreButton 
                key={`page-${page}`} 
                id={`page-${page}`} 
                text={`${page}`}
                isActive={currentPage === page}
                onClick={() => handlePageChange(page)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListMovieAdminPage