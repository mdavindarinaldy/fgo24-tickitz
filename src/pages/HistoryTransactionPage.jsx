import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HistoryTransactionPage() {
  const currentLogin = useSelector((state) => state.currentLogin.data)  
  const historyTransaction = useSelector((state) => state.history.data)
  const filteredTransaction = historyTransaction.filter((transaction) => transaction.createdBy === currentLogin.id).reverse()
  const navigate = useNavigate()

  function HistoryCard(item) {
    return (
        <div className='bg-white rounded-2xl w-[90%] lg:w-full px-10 py-5 flex flex-col gap-5 border-b-10 border-b-secondary'>
            <div className='w-full flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-sm'>Date: {item.item.date}</span>
                <span className='text-gray-500 text-sm'>Time: {item.item.showtime}</span>
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
                <span className='text-black text-2xl font-bold'>Title: {item.item.title}</span>
                <span className='text-black text-lg font-semibold'>Cinema: {item.item.cinema}</span>
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
                <span className='text-black text-base'>Seats: {item.item.seats?.join(', ')}</span>
                <span className='text-black text-base'>Location: {item.item.location}</span>
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
            {filteredTransaction?.map((item,index)=>(
                <HistoryCard key={`transaction-${index}`} item={item}/>
            ))}
        </div>
    </>
  )
}

export default HistoryTransactionPage