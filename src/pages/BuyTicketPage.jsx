import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Subscription from '../components/Subscription'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import GenreButton from '../components/GenreButton'
import nowDate from '../script/nowDate'
import search from '../assets/Search.png'
import cineone from '../assets/cineone-black.png'
import ebv from '../assets/ebv-black.png'
import hiflix from '../assets/hiflix-black.png'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addDataAction } from '../redux/reducer.js/buyTicket'
import http from '../lib/http'


function BuyTicketPage() {
  const {id} = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errorLogin, setErrorLogin] = useState('')
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentLogin = useSelector((state) => state.currentLogin)
  const posterURL = import.meta.env.VITE_MOVIE_POSTER_URL
  const backdropURL = import.meta.env.VITE_MOVIE_BACKDROP_URL

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await http().get(`/movies/${id}`)
        setData(response.data.results)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    getMovies()
  }, [id])

  if (loading) return <div className='h-svh flex flex-col justify-center items-center'>Loading...</div>
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>
  
  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} hour(s) ${remainingMinutes} minute(s)`
  }
  
  const runtime = convertMinutesToHours(data.runtime)
  
  const date = nowDate
  const showtime = [
    '13.15',
    '15.45',
    '17.30',
    '18.40',
    '20.00',
    '22.15'
  ]
  const location = [
    'Jakarta',
    'Depok',
    'Tangerang',
    'Bogor',
    'Bekasi',
  ]
  
  function CinemaCard({src, id, value, register}) {
    return (
      <div className='flex flex-col justify-between w-full md:w-[25%] h-[20svh] rounded-3xl border-1 border-gray-400 px-5 py-5'>
        <div className='flex flex-row items-end justify-end w-full'>
          <input name='cinema' type='radio' id={id} {...register('cinema')} className='self-end' value={value}/>
        </div>
        <div className='flex flex-row justify-center items-center w-full h-fit'>
          <img src={src} alt="logo-cinema" className='w-[30svw] md:w-[10svw] md:h-[3svw]'/>
        </div>
      </div>
    )
  }

  function submitData(value) {
    if (currentLogin.token) {
      setErrorLogin('')
      dispatch(addDataAction({...value, id: id, genre:data.genres}))
      navigate(`/buy-ticket/${id}/seat`)
    } else {
      setErrorLogin('*Silakan login terlebih dahulu sebelum memesan tiket!')
    }
  }

  return (
    <div>
      <Navbar currentlyOn='buy'/>
      <div className='h-[10svh]'></div>
      <section id='header' className='flex flex-col gap-2 relative w-[99svw] h-fit md:h-svh md:mb-5'>
        <div className={`h-[60svh] md:h-[65%] w-full bg-cover bg-center bg-no-repeat rounded-3xl flex flex-col justify-center items-center`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backdropURL}/${data.backdrop})`}}>
          <div className='md:w-[90%] h-full flex flex-col-reverse md:flex-row'>
            <div className='md:w-[25%] h-full relative'>
              <img src={`${posterURL}/${data.poster}`} alt="movie-poster" className='w-[60svw] md:w-[20svw] left-[20svw] rounded-3xl absolute md:bottom-[-25svh] md:left-[0svw]'/>
            </div>
            <div className='w-svw px-5 md:w-[75%] flex flex-col justify-end gap-5 md:px-0 py-5 text-white'>
              <span className='text-2xl md:text-[3svw] font-bold'>{data.title}</span>
              <p className='text-lg font-light'>{data.synopsis}</p>
              <div className='flex flex-row gap-5'>
                {data.genres.split(', ').map((item, index) => (
                  <GenreButton key={`genre-${index}`} id={`genre-${index}`} text={item}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`h-fit md:h-30% w-full flex flex-col justify-center items-center mt-[65svw] mb-[10svh] md:mt-0 md:mb-0`}>
          <div className='w-svw md:w-[90%] h-full flex flex-col md:flex-row'>
            <div className='w-[25%] h-full'></div>
            <div className='w-full md:w-[75%] flex flex-col md:flex-row justify-start px-10 md:px-0 gap-5 md:gap-10'>
              <div className='flex flex-col gap-5 w-full md:w-[25%]'>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Release Date</span>
                  <span>{data.releaseDate}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Duration</span>
                  <span>{runtime}</span>
                </div>
              </div>
              <div className='flex flex-col gap-5 w-full md:w-[75%]'>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Directed By</span>
                  <span>{data.directors}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Casts</span>
                  <span>{data.casts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='book-ticket' className='flex flex-col justify-center items-center gap-2 w-[99svw] h-fit md:h-[70svh]'>
        <form onSubmit={handleSubmit(submitData)} className='w-[90%] h-full flex flex-col justify-center gap-10'>
          <div className='flex flex-row items-center justify-between'>
            <span className='text-4xl font-bold'>Book Tickets</span>
          </div>
          <div className='flex flex-col md:flex-row gap-5 w-full justify-between'>
            <div className='flex flex-col gap-4 min-w-[30%] flex-1'>
              <label htmlFor="date" className='text-2xl font-bold'>Choose Date</label>
              <div className='bg-white border-1 border-gray-400 rounded-3xl px-2 py-1 flex flex-row items-center gap-4 w-full'>
                <img src={search} alt="search-icon" className='size-[18px]'/>
                <select name="date" id="date" {...register('date')} className='outline-0 w-full'>
                  {date.map((item, index) => (
                    <option key={`date-${index}`}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-4 min-w-[30%] flex-1'>
              <label htmlFor="showtime" className='text-2xl font-bold'>Choose Time</label>
              <div className='bg-white border-1 border-gray-400 rounded-3xl px-2 py-1 flex flex-row items-center gap-4 w-full'>
                <img src={search} alt="search-icon" className='size-[18px]'/>
                <select name="showtime" id="showtime" {...register('showtime')}className='outline-0 w-full'>
                  {showtime.map((item, index) => (
                    <option key={`showtime-${index}`}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-4 min-w-[30%] flex-1'>
              <label htmlFor="location" className='text-2xl font-bold'>Choose Location</label>
              <div className='bg-white border-1 border-gray-400 rounded-3xl px-2 py-1 flex flex-row items-center gap-4 w-full'>
                <img src={search} alt="search-icon" className='size-[18px]'/>
                <select name="location" id="location" {...register('location')} className='outline-0 w-full'>
                  {location.map((item, index) => (
                    <option key={`location-${index}`}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              <span className='text-2xl font-bold'>Choose Cinema</span>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <CinemaCard src={ebv} register={register} id='cinema-1' value='ebv'/>
              <CinemaCard src={cineone} register={register} id='cinema-2' value='cineone'/>
              <CinemaCard src={hiflix} register={register} id='cinema-3' value='hiflix'/>
              <CinemaCard src={ebv} register={register} id='cinema-4' value='ebv'/>
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center gap-3 mb-10'>
            {/* <Button className='on' text='BOOK NOW'/> */}
            <button type='submit' className='py-3 w-[30%] bg-orange-500 text-white font-semibold rounded-2xl'>BOOK NOW</button>
            {errorLogin && <span className='text-lg font-semibold text-red-500'>{errorLogin}</span>}
          </div>
        </form>
      </section>
      <Subscription/>
      <Footer/>
    </div>
  )
}

export default BuyTicketPage