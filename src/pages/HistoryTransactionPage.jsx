import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import http from '../lib/http'

function HistoryTransactionPage() {
  const currentLogin = useSelector((state) => state.currentLogin)
  const [historyTrx, setHistoryTrx] = useState([{}])  
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    async function getHistory() {
      try {
        const response = await http(currentLogin.token).get("/transactions")
        setHistoryTrx(response.data.results)
        setError("")
      } catch {
        setError("Saat ini sedang terjadi kendala pada server, silakan coba lagi beberapa saat kemudian")
      }
    }
    getHistory()
  }, [currentLogin.token]);

  function HistoryCard({item}) {
    return (
        <div className='bg-white rounded-2xl w-[90%] lg:w-full px-10 py-5 flex flex-col gap-5 border-b-10 border-b-secondary'>
            <div className='w-full flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-sm'>Date: {item.date}</span>
                <span className='text-gray-500 text-sm'>Time: {item.showtime}</span>
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
                <span className='text-black text-2xl font-bold'>Title: {item.movieTitle}</span>
                <span className='text-black text-lg font-semibold'>Cinema: {item.cinema}</span>
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
                <span className='text-black text-base'>Seats: {item.seats}</span>
                <span className='text-black text-base'>Location: {item.location}</span>
            </div>
        </div>
    )
  }

  return (
    <>
        <div className='bg-white lg:rounded-2xl w-full px-10 py-5 flex flex-row gap-10 lg:justify-start justify-center'>
            <button type='button' className={`text-lg font-semibold hover:border-b-3 hover:border-secondary`} onClick={()=>{navigate('/profile/edit-profile')}}>Account Settings</button>
            <button type='button' className={`text-lg font-semibold border-b-3 border-secondary`} disabled>Order History</button>
        </div>
        <div className='lg:w-full flex flex-col gap-10 items-center'>
            {historyTrx?.map((item, index)=>(
                <HistoryCard key={`transaction-${index}`} item={item}/>
            ))}
            {error && <span className='text-lg text-black-400 font-bold'>{error}</span>}
        </div>
    </>
  )
}

export default HistoryTransactionPage