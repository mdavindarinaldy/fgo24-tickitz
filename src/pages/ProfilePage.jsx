import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import dot from '../assets/dot.png'
import profile from '../assets/profile.png'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAction } from '../redux/reducer.js/users'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'
import { Navigate } from 'react-router-dom'

const validationSchema = yup.object({
  fullname: yup.string().min(3, 'Nama minimal 3 karakter').required('Nama harus diisi!'),
  email: yup.string()
    // eslint-disable-next-line no-useless-escape
    .matches(/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,5}$/, {message:'Email tidak valid!', excludeEmptyString:true})
    .required('Email harus diisi!'),
  password: yup.string().min(8, 'Karakter minimal 8 karakter').max(12, 'Karakter maksimal 12 karakter').required('Password harus diisi!'),
  phonenumber: yup.string().matches(/^[8][0-9]{10,11}$/, {message: 'Nomor Ponsel tidak valid'}).required('Nomor Ponsel harus diisi'),
  terms: yup.bool().oneOf([true], 'Syarat dan ketentuan harus disetujui'),
})

function ProfilePage() {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(validationSchema)
  })
  const dispatch = useDispatch()
  const [update, setUpdate] = useState('')
  const [menu, setMenu] = useState(true)

  const currentLogin = useSelector((state) => state.currentLogin.data)
  const historyTransaction = useSelector((state) => state.history.data)
  const filteredTransaction = historyTransaction.filter((transaction) => transaction.createdBy === currentLogin.id)

  if(!currentLogin.email) { return (<Navigate to='/' replace/>) }

  function submitChange(value) {
    const sanitizedValue = {
        ...value,
        password: btoa(value.password),
        fullname: value.fullname.trim(),
        email: value.email.trim(),
        phonenumber: value.phonenumber.trim()
    }
    dispatch(editUserAction({currentLogin, sanitizedValue}))
    dispatch(currentLoginAction({...currentLogin, ...sanitizedValue}))
    setUpdate('Profile berhasil dilakukan perubahan!')
    setTimeout(() => {
        setUpdate('')
    }, 3000);
  }

  function Menu() {
    if(menu) {
        return (
            <form onSubmit={handleSubmit(submitChange)} id='profile' className='w-full flex flex-col gap-10'>
                <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5'>
                    <div className='border-b-1 border-gray-400 py-3'>
                        <span className='text-semibold text-base'>Details Information</span>
                    </div>
                    <Input type='fullname' register={register} defaultValue={currentLogin.fullname} error={errors.fullname}/>
                    <Input type='email' register={register} defaultValue={currentLogin.email} error={errors.email}/>
                    <Input type='phonenumber' register={register} defaultValue={currentLogin.phonenumber} error={errors.phonenumber}/>
                </div>
                <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5'>
                    <div className='border-b-1 border-gray-400 py-3'>
                        <span className='text-semibold text-base'>Account and Privacy</span>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <Input type='password' text='New Password' register={register} error={errors.password}/>
                    </div>
                    {update && <span className='text-lg text-green-400 font-semibold'>{update}</span>}
                </div>
                <button type='submit' className='text-white font-semibold bg-orange-500 py-4 w-[30%] rounded-2xl'>Update Changes</button>
            </form>
        )
    } else {
        return (
            <div className='w-full flex flex-col gap-10'>
                {filteredTransaction?.map((item,index)=>(
                    <HistoryCard key={`transaction-${index}`} item={item}/>
                ))}
            </div>
        )
    }
  }

  function HistoryCard(item) {
    // console.log(item)
    return (
        <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5 border-b-10 border-b-orange-200'>
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
    <div>
        <Navbar/>
        <div className='h-[10svh]'></div>
        <div className='h-fit w-svw bg-gray-200 flex flex-row justify-center items-start gap-5 py-10'>
            <div className='bg-white w-[25%] px-5 py-5 rounded-2xl flex flex-col gap-5 justify-center items-center'>
                <div className='w-full flex flex-row justify-between'>
                    <span>INFO</span>
                    <img src={dot} alt="icon-dot" />
                </div>
                <img src={profile} alt="profile-picture" className='size-[10svw]'/>
                <span className='font-bold text-2xl text-center'>{currentLogin.fullname}</span>
                <span className='text-gray-400'>Moviegoers</span>
                <hr className='w-full h-0.5 border-1 border-gray-400'/>
                <span className='self-start text-lg font-semibold'>Loyalty Points</span>
                <div className='bg-orange-200 flex flex-col self-start px-5 py-5 w-full rounded-2xl h-[20svh] justify-between'>
                    <span className='text-2xl font-bold'>Moviegoers</span>
                    <span className='text-lg font-bold'>320 <span className='text-sm font-normal'>points</span></span>
                </div>
                <span>180 points become a master</span>
                <div className='relative w-[90%] bg-gray-300 h-[2svh] rounded-lg'>
                    <div className='absolute w-[60%] bg-orange-500 h-[2svh] rounded-lg'></div>
                </div>
            </div>
            <div className='w-[60%] flex flex-col gap-5'>
                <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-row gap-10'>
                    <button className={`text-lg font-semibold ${menu ? 'border-b-3 border-orange-300 ' : 'hover:border-b-3 hover:border-orange-300'}`} onClick={()=>setMenu(true)}>Account Settings</button>
                    <button className={`text-lg font-semibold ${menu ? 'hover:border-b-3 hover:border-orange-300' : 'border-b-3 border-orange-300'}`} onClick={()=>setMenu(false)}>Order History</button>
                </div>
                <Menu/>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage