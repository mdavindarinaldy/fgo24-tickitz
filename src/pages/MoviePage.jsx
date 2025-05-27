import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import fetchNowPlayingMovies from '../script/fetchNowPlayingMovies'
import Subscription from '../components/Subscription'
import Footer from '../components/Footer'
import GenreButton from '../components/GenreButton'
import MovieCard from '../components/MovieCard'
import search from '../assets/Search.png'
import { useSearchParams } from 'react-router-dom'

function MoviePage() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const currentGenre = searchParams.get('genre') || null
  const genres = [
    { id: 28, name: 'ACTION' },
    { id: 12, name: 'ADVENTURE' },
    { id: 35, name: 'COMEDY' },
    { id: 10749, name: 'ROMANCE' },
    { id: 878, name: 'SCI-FI' },
  ]

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchNowPlayingMovies(currentPage)
        setMovies(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    getMovies()
  }, [currentPage])

  useEffect(() => {
    if (currentGenre) {
      const filtered = movies.filter((movie) =>
        movie.genre_ids.includes(parseInt(currentGenre, 10))
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [movies, currentGenre])

  const handleGenreChange = (genreId) => {
    const params = Object.fromEntries(searchParams);
    if (genreId === currentGenre) {
      delete params.genre
      setSearchParams({...params, page: '1' })
    } else if (genreId) {
      setSearchParams({...params, genre: genreId, page: '1' });
    }
    setLoading(false)
  }

  const handlePageChange = (page) => {
    setSearchParams({page})
    setLoading(false)
  };

  if (loading) return <div className='h-svh flex flex-col justify-center items-center'>Loading...</div>
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>
  
  return (
    <div>
      <Navbar currentlyOn='movie'/>
      <div className='h-[12svh]'></div>
      <section id='hero' className='flex flex-row justify-center items-center w-svw h-[40svh] mb-10'>
        <div className="relative h-full w-[88%] rounded-4xl">
          <div className="absolute inset-0 bg-[url(/background.png)] bg-cover bg-center rounded-4xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/85 rounded-4xl" />
          <div className='absolute start-5 bottom-10 flex flex-col justify-center items-start gap-5'>
            <span className='bg-orange-100 rounded-3xl text-orange-500 font-bold text-[10px] w-fit py-2 px-3'>LIST MOVIE OF THE WEEK</span>
            <span className='text-white font-bold text-2xl'>Experience the Magic of Cinema: <span className='text-orange-500'>Book Your Tickets Today</span></span>
            <span className='text-white font-light text-lg'>Sign up and get the ticket with a lot of discount</span>
          </div>
        </div>
      </section>
      <section id='content' className='w-svw max-h-fit h-fit flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-[88%]'>
          <div className='flex flex-row justify-between items-center w-full'>
            <span className='font-extrabold text-[3svw]'>Now Showing in Cinemas</span>
            <GenreButton text='POPULAR' isActive={true}/>
          </div>
          <form id='search' className='flex flex-row justify-start items-center w-full h-fit py-5 gap-10'>
            <div className='w-[30%] flex flex-col gap-5'>
              <span className='text-[1.5svw] font-bold'>Find Movie</span>
              <div className='border-1 border-gray-400 rounded-3xl px-5 py-2 flex gap-2 items-center'>
                <button type='submit'>
                  <img src={search} alt="icon-search"/>
                </button>
                <input id='searchInput' type="text" placeholder='Search Your Movie' autoComplete='on'/>
              </div>
            </div>
            <div className='w-[65%] flex flex-col gap-5'>
              <span className='text-[1.5svw] font-bold'>Filters</span>
              <div className='flex flex-row gap-3'>
                {genres.map((genre) => (
                  <GenreButton
                    key={genre.id}
                    id={genre.id}
                    text={genre.name}
                    isActive={currentGenre === genre.id.toString()}
                    onClick={() => handleGenreChange(genre.id.toString())}
                  />
                ))}
              </div>
            </div>
          </form>
          <div className='w-full h-fit py-5 grid grid-cols-4'>
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} id={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} name={movie.title.toUpperCase()} genre={[`${movie.genre_ids[0]}`,`${movie.genre_ids[1]}`]} width='w-[20svw]' height='h-[30svw]' textSize="text-lg" buttonSize='text-[1svw]' date='' details={true}/>
              ))}
          </div>
          <div className='flex flex-row gap-5'>
          {[1, 2, 3].map((page) => (
              <GenreButton key={`page-${page}`} id={`page-${page}`} text={`${page}`} isActive={currentPage === page} onClick={() => handlePageChange(page)}/>
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