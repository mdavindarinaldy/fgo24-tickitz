import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Steps from '../components/Steps'
import bca from '../assets/bca.png'
import bri from '../assets/bri.png'
import dana from '../assets/dana.png'
import gopay from '../assets/gopay.png'
import gpay from '../assets/gpay.png'
import ovo from '../assets/ovo.png'
import paypal from '../assets/paypal.png'
import visa from '../assets/visa.png'
import fetchChosenMovie from '../script/fetchChosenMovie'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addDataAction } from '../redux/reducer.js/buyTicket'
import Modal from '../components/Modal'

function PaymentDetailPage() {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errorMethod, setErrorMethod] = useState('')
  const detailMovie = useSelector((state) => state.data.data)
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const {register, handleSubmit, watch} = useForm()
  const modalRef = useRef(null)
  const [modal, setModal] = useState(false)
  const formState = watch()
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

  useEffect(() => {
    if (modal && modalRef.current) {
      modalRef.current.focus()
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [modal])

  if(!currentLogin.email) { return (<Navigate to='/' replace/>) }
  
  function Card({src,method}) {
    return (
        <label htmlFor={method} className={`py-5 px-5 flex flex-row justify-center border-1 border-gray-400 rounded-lg hover:cursor-pointer ${formState.method?.includes(method.toString()) ? 'bg-amber-100' : 'bg-white'}`}>
            <input id={method} value={method} type="radio" className='appearance-none' {...register('method')}/>
            <img src={src} alt="payment-method"/>
        </label>
    )
  }

  function submitData(value) {
    console.log(value.method)
    if(value.method) {
        setErrorMethod('')
        dispatch(addDataAction({
            method: value.method,
            createdBy: currentLogin.id
        }))
        setModal(true) 
    } else {
        setErrorMethod('Silakan pilih metode pembayaran terlebih dahulu')
    }
  }

  if (loading) { return (<div className="h-svh flex flex-col justify-center items-center"> Loading... </div>) }
  if (error) { return (<div className="h-svh flex flex-col justify-center items-center">{error}</div>) }

  return (
    <main>
        <Navbar currentlyOn='buy'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw h-[140%] bg-gray-100 flex flex-col justify-center items-center py-10 gap-5 relative'>
            <Steps text1='Date & Time' text2='Seat' text3='Payment'/>
            <form onSubmit={handleSubmit(submitData)} id='payment' className='bg-white w-[50%] h-fit rounded-3xl py-10 px-10 flex flex-col gap-10'>
                <div className='flex flex-col gap-5 w-full'>
                    <span className='font-bold text-2xl'>Payment Info</span>                
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>DATE & TIME</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>{`${detailMovie.date} at ${detailMovie.showtime}`}</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>MOVIE TITLE</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>{data.title}</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>CINEMA NAME</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>{detailMovie.cinema}</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>NUMBER OF TICKETS</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>{`${detailMovie.seats.length} piece(s)`}</span>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <span className='text-gray-400 text-sm'>TOTAL PAYMENT</span>
                        <span className='w-full border-b-1 border-gray-400 py-3'>{`$${detailMovie.payment},00`}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-full'>
                    <span className='font-bold text-2xl'>Personal Information</span>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='font-semibold text-lg'>Fullname</span>
                        <div className='border-gray-400 border-1 outline-0 rounded-sm w-full px-3 py-3'>
                        {currentLogin.fullname}</div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='font-semibold text-lg'>Email</span>
                        <div className='border-gray-400 border-1 outline-0 rounded-sm w-full px-3 py-3'>
                        {currentLogin.email}</div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='font-semibold text-lg'>Phone Number</span>
                        <div className='border-gray-400 border-1 outline-0 rounded-sm w-full px-3 py-3'>
                        {`+62${currentLogin.phonenumber}`}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-full'>
                    <span className='font-bold text-2xl'>Payment Method</span>                
                    <div className='grid grid-cols-4 gap-3'>
                        <Card src={gpay} method={'gpay'} register={register}/>
                        <Card src={visa} method={'visa'} register={register}/>
                        <Card src={gopay} method={'gopay'} register={register}/>
                        <Card src={paypal} method={'paypal'} register={register}/>
                        <Card src={dana} method={'dana'} register={register}/>
                        <Card src={bca} method={'bca'} register={register}/>
                        <Card src={bri} method={'bri'} register={register}/>
                        <Card src={ovo} method={'ovo'} register={register}/>
                    </div>
                </div>
                <button type='submit' className='py-5 w-full bg-orange-500 rounded-2xl text-white font-bold'>Pay Your Order</button>
                {errorMethod && <span className='text-lg font-semibold text-red-500 text-center'>{errorMethod}</span>}
            </form>
            <Modal
                ref={modalRef}
                modalHeading = 'Payment Info'
                infoSubheading1 = 'No. Rekening Virtual:'
                info1 = '12321328913829724'
                infoSubheading2 = 'Total Payment:'
                info2 = {`$${detailMovie.payment},00`}
                additionalInfo = {`Pay this payment bill before it's due on ${detailMovie.date} at ${detailMovie.showtime}. If the bill has not been paid by the specified time, it will be forfeited`}
                modal= {modal}
                buttonText = 'Pay Now'
                onClose={() => setModal(false)}
                onButton={() => navigate(`/buy-ticket/${id}/ticket-result`)}
            />
        </div>
        <Footer/>
    </main>
  )
}

export default PaymentDetailPage