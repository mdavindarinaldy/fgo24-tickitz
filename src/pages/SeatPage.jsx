import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Steps from '../components/Steps'
import GenreButton from '../components/GenreButton'
import Button from '../components/Button'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import fetchChosenMovie from '../script/fetchChosenMovie'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addDataAction } from '../redux/reducer.js/buyTicket'

function SeatPage() {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errorSeat, setErrorSeat] = useState('')
  const detailMovie = useSelector((state) => state.data.data)
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      seat: [],
    },
  })
  const [payment, setPayment] = useState(0)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const details = await fetchChosenMovie(id)
        setData(details)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    getMovies()
  }, [id])

  const formState = watch()

  const history = useSelector((state) => state.history.data)
  const filteredHistory = history.filter((item) => 
    item.title === data.title 
    && item.location === detailMovie.location
    && item.cinema === detailMovie.cinema
    && item.showtime === detailMovie.showtime
    && item.date === detailMovie.date
  )

  const occupiedSeats = filteredHistory.flatMap((item) => item.seats || [])

  useEffect(()=> {
    if (formState.seat !== undefined) {setPayment(formState.seat.length * 10)}
  },[formState])

  if(!currentLogin.email) { return (<Navigate to='/' replace/>) }

  function Letter({ letter }) {
    return <div className="size-[20px] text-base font-normal">{letter}</div>
  }

  function Seat({value, formState, occupiedSeats}) {
    const isOccupied = occupiedSeats.includes(value.toString())
    // console.log(isOccupied)
    function handleChange(e) {
      if (isOccupied) { return } 
      const isChecked = e.target.checked
      const currentSeats = formState.seat || []
      let updatedSeats
      if (isChecked) {
        updatedSeats = [...currentSeats, value]
      } else {
        updatedSeats = currentSeats.filter((seat) => seat !== value)
      }
      setValue('seat', updatedSeats)
    }
    return (
      <div className="relative inline-block">
        <span 
          className={`size-[20px] sm:size-[30px] border-1 border-gray-500 rounded-sm inline-block ${
            isOccupied ? 'bg-black' : 
              formState.seat?.includes(value.toString()) ? 'bg-blue-500' : 'bg-white'
          }`}
        ></span>
        <input 
          type="checkbox" 
          value={value} 
          name="seat"
          disabled={isOccupied} 
          {...register('seat')} 
          onChange={handleChange}
          className="absolute size-[20px] sm:size-[30px] rounded-sm cursor-pointer left-0 top-0 opacity-0"/>
      </div>
    )
  }

  function SectionA() {
    const items = []
    let currentLetter = 'A'
    let number = 1
    for (let i=0;i<8;i++) {
      for (let j=0;j<8;j++) {
        if (j===0) {
          if (i===7) {
            items.push(
              <div key={`item-${j}`} className="size-[20px] text-base font-normal"></div>
            )     
          } else {
            items.push(<Letter key={`letter-${i}`} letter={currentLetter}/>)
          }
        } else if (i===7) {
          items.push(
            <div key={`item-${j}`} className="size-[20px] w-full text-base font-normal text-center">
              {number}
            </div>
          )
          number += 1
        } else {
          items.push(
            <Seat 
              key={`seat-${currentLetter}${j}`} 
              value={`${currentLetter}${j}`} 
              register={register} 
              formState={formState}
              occupiedSeats={occupiedSeats}
            />
          )
        }
      }
      currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1)
    }
    return items
  }

  function SectionB() {
    const items = []
    let currentLetter = 'A'
    let number = 8
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 7; j++) {
        if (i===7) {
          items.push(
            <div key={`item-${number}`} className="size-[20px] w-full text-base font-normal text-center">
              {number}
            </div>
          )
          number += 1
        } else {
          items.push(
            <Seat 
              key={`seat-${currentLetter}${j+8}`} 
              value={`${currentLetter}${j+8}`} 
              register={register} 
              formState={formState}
              occupiedSeats={occupiedSeats}
            />
          )
        }
      }
      currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1)
    }
    return items
  }

  function submitData(value) {
    if (value.seat.length !== 0) {
      setErrorSeat('')
      dispatch(addDataAction({seats: value.seat, payment: payment}))
      navigate(`/buy-ticket/${id}/payment`)
    } else {
      setErrorSeat('Silakan pilih kursi terlebih dahulu')
    }
  }

  if (loading) { return (<div className="h-svh flex flex-col justify-center items-center"> Loading... </div>) }
  if (error) { return (<div className="h-svh flex flex-col justify-center items-center">{error}</div>) }

  return (
    <div>
      <Navbar currentlyOn="buy" />
      <div className="h-[10svh]"></div>
      <main className="w-svw h-fit bg-gray-100 flex flex-col justify-center items-center py-10 gap-5">
        <Steps text1="Date & Time" text2="Seat" text3="Payment" statusT1={'passed'} statusT2={'on'}/>
        <form onSubmit={handleSubmit(submitData)} className="w-[90%] h-fit flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[65%] h-fit bg-white rounded-2xl flex flex-col gap-10 pt-5 pb-10 px-5">
            <div className="w-full h-fit flex flex-col lg:flex-row gap-5 py-3 px-3 border-1 border-gray-300 rounded-sm items-center lg:items-start">
              <img src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`} className="w-[500px] lg:w-[200px] rounded-sm" alt="movie-poster"/>
              <div className="flex flex-col flex-1 gap-5 w-full items-center lg:items-start">
                <span className="font-bold text-2xl">{data.title}</span>
                <div className="flex flex-row gap-1">
                  {data.genres?.map((item) => (
                    <GenreButton key={item.id} id={item.id} text={item.name} />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-5 lg:gap-0 lg:flex-row lg:justify-between w-full flex-1">
                  <span>{detailMovie.date}</span>
                  <Button text="Change" className="on" href={`/buy-ticket/${id}`} />
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-10">
              <span className="text-3xl font-bold">Choose Your Seat</span>
              <div className="w-full bg-gray-200 rounded-3xl py-2 text-center font-semibold">Screen</div>
              <div className="w-full flex flex-row justify-evenly items-center gap-3 sm:gap-0">
                <div className="grid grid-cols-8 gap-1 sm:gap-2">
                  <SectionA/>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 justify-center items-center">
                  <SectionB/>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="font-semibold text-lg">Seating Key</span>
              <div className="flex flex-row items-center gap-5">
                <div className="flex flex-row items-center gap-2">
                  <div className="size-[20px] bg-gray-300 rounded-sm"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="size-[20px] bg-blue-500 rounded-sm"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="size-[20px] bg-black rounded-sm"></div>
                  <span className="text-sm">Sold</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[35%] h-fit bg-white rounded-2xl flex flex-col justify-center items-center py-8 px-5 gap-7">
            <span className="text-3xl font-bold">CINEMA: {detailMovie.cinema}</span>
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-gray-400 font-semibold text-sm">Movie selected</span>
              <span className="text-base font-semibold">{data.title}</span>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-gray-400 font-semibold text-sm">{detailMovie.date}</span>
              <span className="text-base font-semibold">{detailMovie.showtime}</span>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-gray-400 font-semibold text-sm">One ticket price</span>
              <span className="text-base font-semibold">$10</span>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-gray-400 font-semibold text-sm">Seat choosed</span>
              <span className="text-base font-semibold">{formState?.seat?.join(', ') || 'None'}</span>
            </div>
            <hr className="w-full h-0.1 border-1 border-gray-300" />
            <div className="w-full flex flex-row justify-between items-center">
              <span className="font-bold text-lg">Total Payment</span>
              <span className="text-blue-600 font-semibold text-lg">${payment}</span>
            </div>
            <button type="submit" className="w-full bg-orange-500 py-3 text-center rounded-3xl text-white font-semibold">Check Out Now</button>
            {errorSeat && <span className='text-lg font-semibold text-red-500'>{errorSeat}</span>}
          </div>
        </form>
      </main>
      <Footer/>
    </div>
  )
}

export default SeatPage