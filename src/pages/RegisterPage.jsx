import React, { useState } from 'react'
import backdrop from '../assets/backdrop.png'
import logo from '../assets/logo_cinemate.png'
import Steps from '../components/Steps'
import Input from '../components/Input'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import http from '../lib/http'

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

function RegisterPage() {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phonenumber: "",
      terms: false,
    }
  })
  const currentLogin = useSelector((state) => state.currentLogin)

  const [error, setError] = useState('')
  const [errorConfirm, setErrorConfirm] = useState('')
  let navigate = useNavigate()

  if(currentLogin.token && currentLogin.profile.role==='admin') { return (<Navigate to='/dashboard-admin' replace/>) }
  if(currentLogin.token && currentLogin.profile.role==='user') { return (<Navigate to='/' replace/>) }
  
  async function submitData(value) {
    const sanitizedValue = {
      confirmPassword: value.confirmPassword,
      password: value.password,
      fullname: value.fullname.trim(),
      email: value.email.trim(),
      phonenumber: value.phonenumber.trim()
    }

    if (sanitizedValue.password !== sanitizedValue.confirmPassword) {
      setErrorConfirm('Password dan konfirmasi password tidak sama!')
      setError('')
    } else {
      try {
        await http().post('/auth/register',{
          email: sanitizedValue.email,
          name: sanitizedValue.fullname,
          phonenumber: sanitizedValue.phonenumber,
          password: sanitizedValue.password,
          confPass: sanitizedValue.confirmPassword
        })
        setError('')
        setErrorConfirm('')
        navigate('/login')
      } catch (err) {
        console.log(err)
        if (err.response.data.errors.includes("email already used by another user")) {
          setError('Email sudah terdaftar, silakan login dengan email tersebut')
          setErrorConfirm('')
        } else if (err.response.data.errors.includes("phone number already used by another user")) {
          setError('Nomor ponsel sudah digunakan, mohon gunakan nomor lain')
          setErrorConfirm('')
        } else {
          setError('Terjadi kesalahan pada server. Silakan refresh halaman atau coba beberapa saat lagi.')
          setErrorConfirm('')
        }
      }
    }
  }

  return (
    <main className='w-svw min-h-svh max-h-fit bg-cover bg-no-repeat flex flex-col justify-center items-center' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backdrop})`}}>
      <form onSubmit={handleSubmit(submitData)} id='register' className='flex flex-col gap-3 w-[85%] lg:w-[40%] h-[75%] bg-white rounded-2xl px-10 py-5 mb-5 mt-3'>
        <img src={logo} alt="icon-logo" className='w-[10svw] mb-5 self-center'/>
        <Steps text1='Fill Form' text2='Activate' text3='Done'/>
        <Input type='fullname' register={register} error={errors.fullname}/>
        <Input type='phonenumber' register={register} error={errors.phonenumber}/>
        <Input type='email' register={register} error={errors.email}/>
        <Input type='password' text='Password' register={register} error={errors.password}/>
        <Input type='confirmPassword' text='Confirm Password' register={register} errorConfirm={errorConfirm}/>
        <div className='flex flex-row gap-2 w-full justify-start items-center'>
            <input {...register('terms')} type="checkbox" id='checkbox' className='size-4'/>
            <label htmlFor="checkbox">I agree to terms and conditions</label>
        </div>
        {errors.terms && (<p className="text-red-500 text-sm">{errors.terms.message}</p>)}
        {error && (<p className="text-red-500 text-sm">{error}</p>)}
        <button type='submit' className='bg-amber-600 text-white font-semibold w-full rounded-sm py-2'>Join For Free Now</button>
        <span className='text-center text-sm'>Already have an account? <Link to='/login' className='text-blue-700'>Log In</Link></span>
        <div className='flex flex-row items-center gap-2 w-full'>
          <hr className='border-[0.5px] flex-1 h-[1px] border-gray-400'/>
          <span className='text-gray-400 text-sm'>OR</span>
          <hr className='border-[0.5px] flex-1 h-[1px] border-gray-400'/>
        </div>
        <div className='flex flex-row justify-between gap-3'>
          <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-3 hover: cursor-pointer'>
            <FcGoogle className='size-8'/>
            <span className='text-xs text-gray-400 text-center'>Sign Up with Google Account</span>
          </div>
          <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-5 hover: cursor-pointer'>
            <FaFacebook className='size-8'/>
            <span className='text-xs text-gray-400 text-center'>Sign Up with Facebook Account</span>
          </div>
        </div>
      </form>
    </main>
  )
}

export default RegisterPage