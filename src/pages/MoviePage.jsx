import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Subscription from '../components/Subscription'
import Footer from '../components/Footer'
import GenreButton from '../components/GenreButton'
import MovieCard from '../components/MovieCard'
import search from '../assets/Search.png'
import { ScrollRestoration, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import http from '../lib/http'

function MoviePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {register, handleSubmit} = useForm()

  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = parseInt(searchParams.get('page')) || 1
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPage, setTotalPage] = useState(1)
  const posterURL = import.meta.env.VITE_MOVIE_POSTER_URL

  const querySearch = searchParams.get('query') || ""
  const currentGenre = searchParams.get('genre') || ""
  const genres = [
    { id: 1, name: 'ACTION' },
    { id: 2, name: 'ADVENTURE' },
    { id: 4, name: 'COMEDY' },
    { id: 14, name: 'ROMANCE' },
    { id: 15, name: 'SCI-FI' },
  ]

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await http().get(`/movies?search=${querySearch}&genre=${currentGenre}&page=${currentPage}`)
        setMovies(response.data.results)
        setTotalPage(response.data.pageInfo.totalPage)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    getMovies()
  }, [currentGenre, querySearch, currentPage])

  const handleGenreChange = (genreName) => {
    const params = Object.fromEntries(searchParams)
    if (genreName === currentGenre) {
      delete params.genre
      setSearchParams({...params, page: '1' })
    } else if (genreName) {
      setSearchParams({...params, genre: genreName, page: '1' })
    }
    setCurrentPage(1)
    setLoading(false)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    const params = Object.fromEntries(searchParams)
    setSearchParams({ ...params, page: page.toString() })
  }

  function searchData(value) {
    const params = Object.fromEntries(searchParams)
    if (value.search === '') {
      delete params.query
      setSearchParams({...params, page: '1' })
    } else {
      setSearchParams({...params, query: value.search})
    }
  }

  if (loading) return <div className='h-svh flex flex-col justify-center items-center'>Loading...</div>
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>

  return (
    <div>
      <ScrollRestoration/>
      <Navbar currentlyOn='movie'/>
      <div className='h-[12svh]'></div>
      <section id='hero' className='flex flex-row justify-center items-center w-svw h-[40svh] mb-10'>
        <div className="relative h-full w-[88%] rounded-4xl">
          <div className="absolute inset-0 bg-[url(/background.png)] bg-cover bg-center rounded-4xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/85 rounded-4xl" />
          <div className='absolute start-5 bottom-10 flex flex-col justify-center items-start gap-5'>
            <span className='bg-primary rounded-3xl text-orange-500 font-bold text-[10px] w-fit py-2 px-3'>LIST MOVIE OF THE WEEK</span>
            <span className='text-white font-bold text-2xl'>Experience the Magic of Cinema: <span className='text-orange-500'>Book Your Tickets Today</span></span>
            <span className='text-white font-light text-lg'>Sign up and get the ticket with a lot of discount</span>
          </div>
        </div>
      </section>
      <section id='content' className='w-svw max-h-fit h-fit flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-[88%]'>
          <div className='flex flex-row justify-between items-center w-full'>
            <span className='font-extrabold text-[5svw] lg:text-[3svw]'>Now Showing in Cinemas</span>
            <GenreButton text='POPULAR' isActive={true}/>
          </div>
          <form onSubmit={handleSubmit(searchData)} id='search' className='flex flex-col justify-center items-start lg:flex-row lg:justify-start lg:items-center w-full h-fit py-5 gap-5 lg:gap-10'>
            <div className='w-full lg:w-[30%] flex flex-col gap-5'>
              <span className='text-[5svw] lg:text-[1.5svw] font-bold'>Find Movie</span>
              <div className='border-1 border-gray-400 rounded-3xl px-5 py-2 flex gap-2 items-center'>
                <button type='submit'>
                  <img src={search} alt="icon-search"/>
                </button>
                <input 
                  id='searchInput' type="text" 
                  placeholder='Search Your Movie' autoComplete='on'
                  className='outline-0 w-full'
                  {...register('search')}
                />
              </div>
            </div>
            <div className='w-full lg:w-[65%] flex flex-col gap-5'>
              <span className='text-[5svw] lg:text-[1.5svw] font-bold'>Filters</span>
              <div className='grid grid-cols-2 lg:flex lg:flex-row gap-3'>
                {genres.map((genre) => (
                  <GenreButton
                    key={genre.id}
                    id={genre.id}
                    text={genre.name}
                    isActive={currentGenre === genre.id.toString()}
                    onClick={() => handleGenreChange(genre.name.toString())}
                  />
                ))}
              </div>
            </div>
          </form>
          <div className='w-full h-fit py-5 grid grid-cols-2 lg:grid-cols-4'>
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                id={movie.id} 
                src={`${posterURL}/${movie.poster}`} 
                name={movie.title.toUpperCase()} 
                genre={movie.genres.split(', ')} 
                width='w-[40svw] lg:w-[20svw]' height='lg:h-[30svw]' textSize="text-lg" buttonSize='text-[3svw] lg:text-[1svw]' 
                date='' details={true}
              />
            ))}
          </div>
          <div className='w-full flex flex-row justify-center items-center gap-5'>
            {Array.from({ length: totalPage }, (_, i) => (
              <GenreButton
                key={`page-${i + 1}`}
                id={`page-${i + 1}`}
                text={`${i + 1}`}
                isActive={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              />
            ))}
          </div>
        </div>
      </section>
      <Subscription/>
      <Footer/>
    </div>
  )
}

export default MoviePage