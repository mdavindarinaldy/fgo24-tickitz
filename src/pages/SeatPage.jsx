import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Steps from '../components/Steps'
import GenreButton from '../components/GenreButton'
import Button from '../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import fetchChosenMovie from '../script/fetchChosenMovie'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addDataAction } from '../redux/reducer.js/buyTicket'

function SeatPage() {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const detailMovie = useSelector((state) => state.data.data)
  const { register, handleSubmit, watch } = useForm()
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

  useEffect(()=> {
    if (formState.seat !== undefined) {setPayment(formState.seat.length * 10)}
  },[formState])

  function Letter({ letter }) {
    return <div className="size-[20px] text-base font-normal">{letter}</div>
  }

  function Seat({value, formState}) {
    return (
      <div className="relative inline-block">
        <span 
            className={`size-[30px] border-1 border-gray-500 rounded-sm inline-block 
            ${formState.seat?.includes(value.toString()) ? 'bg-blue-500' : 'bg-white'}`}
        ></span>
        <input type="checkbox" value={value} name="seat" {...register('seat')} className="absolute size-[30px] rounded-sm opacity-0 cursor-pointer left-0"/>
      </div>
    );
  }

  function SectionA() {
    const items = []
    let currentLetter = 'A'
    let number = 1
    for (let i = 0; i < 64; i++) {
      if (i % 8 === 0 && i !== 56) {
        items.push(<Letter key={`letter-${i}`} letter={currentLetter} />)
        if (currentLetter === 'H') { continue }
        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1)
      } else if (i < 56) {
        items.push(
          <Seat key={`seat-${i}`} value={i + 1} register={register} formState={formState}/>
        )
      } else if (i === 56) {
        items.push(
          <div key={`item-${i}`} className="size-[20px] text-base font-normal"></div>
        )
      } else {
        items.push(
          <div key={`item-${i}`} className="size-[20px] w-full text-base font-normal text-center">
            {number}
          </div>
        )
        number += 1
      }
    }
    return items
  }

  function SectionB() {
    const items = []
    let number = 8
    for (let i = 0; i < 56; i++) {
      if (i < 49) {
        items.push(
          <Seat key={`seat-${i}`} value={57 + i} register={register} formState={formState}/>
        )
      } else {
        items.push(
          <div key={`item-${i}`} className="size-[20px] w-full text-base font-normal text-center">
            {number}
          </div>
        )
        number += 1
      }
    }
    return items
  }

  function submitData(value) {
    // console.log(value)
    dispatch(addDataAction({seats: value.seat, payment: payment}))
    navigate(`/buy-ticket/${id}/payment`)
  }

  if (loading) { return (<div className="h-svh flex flex-col justify-center items-center"> Loading... </div>) }
  if (error) { return (<div className="h-svh flex flex-col justify-center items-center">{error}</div>) }

  return (
    <div>
      <Navbar currentlyOn="buy" />
      <div className="h-[10svh]"></div>
      <main className="w-svw h-fit bg-gray-100 flex flex-col justify-center items-center py-10 gap-5">
        <Steps text1="Date & Time" text2="Seat" text3="Payment" />
        <form onSubmit={handleSubmit(submitData)} className="w-[90%] h-fit flex flex-row gap-5">
          <div className="w-[65%] h-fit bg-white rounded-2xl flex flex-col gap-10 pt-5 pb-10 px-5">
            <div className="w-full h-fit flex flex-row gap-5 py-3 px-3 border-1 border-gray-300 rounded-sm">
              <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} className="w-[200px] rounded-sm" alt="movie-poster"/>
              <div className="flex flex-col flex-1 gap-5">
                <span className="font-bold text-2xl">{data.title}</span>
                <div className="flex flex-row gap-1">
                  {data.genres?.map((item) => (
                    <GenreButton key={item.id} id={item.id} text={item.name} />
                  ))}
                </div>
                <div className="flex flex-row justify-between flex-1">
                  <span>{detailMovie.date}</span>
                  <Button text="Change" className="on" href={`/buy-ticket/${id}`} />
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-10">
              <span className="text-3xl font-bold">Choose Your Seat</span>
              <div className="w-full bg-gray-200 rounded-3xl py-2 text-center font-semibold">Screen</div>
              <div className="w-full flex flex-row justify-evenly items-center">
                <div className="grid grid-cols-8 gap-2">
                  <SectionA/>
                </div>
                <div className="grid grid-cols-7 gap-2 justify-center items-center">
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
          <div className="w-[35%] h-fit bg-white rounded-2xl flex flex-col justify-center items-center py-8 px-5 gap-7">
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
              <span className="text-base font-semibold">{formState.seat?.join(', ') || 'None'}</span>
            </div>
            <hr className="w-full h-0.1 border-1 border-gray-300" />
            <div className="w-full flex flex-row justify-between items-center">
              <span className="font-bold text-lg">Total Payment</span>
              <span className="text-blue-600 font-semibold text-lg">{payment}</span>
            </div>
            <button type="submit" className="w-full bg-orange-500 py-3 text-center rounded-3xl text-white font-semibold">Check Out Now</button>
          </div>
        </form>
      </main>
      <Footer/>
    </div>
  );
}

export default SeatPage;