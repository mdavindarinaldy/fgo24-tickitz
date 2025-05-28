import React, { useState } from 'react'
import backdrop from '../assets/backdrop.png'
import logo from '../assets/logo-superwhite.png'
import Input from '../components/Input'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'

const validationSchema = yup.object({
  email: yup.string().required('Email harus diisi!'),
  password: yup.string().required('Password harus diisi!'),
})

function LoginPage() {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(validationSchema)
  })
  const [error, setError] = useState('')
  const [errorPass, setErrorPass] = useState('')
  let navigate = useNavigate()
  const users = useSelector((state) => state.users.data) || []
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const dispatch = useDispatch()

  if(currentLogin.email) { return (<Navigate to='/' replace/>) }
  
  function submitData(value) {
    const sanitizedValue = {
      ...value,
      email: value.email.trim(),
    }
    const findUser = users.find((item)=> item.email === sanitizedValue.email)
    if (findUser === undefined) {
      setError('Email tidak terdaftar, silakan lakukan registrasi akun terlebih dahulu')
    } else {
      setError('')
      if(sanitizedValue.password === atob(findUser.password)) {
        setErrorPass('')
        dispatch(currentLoginAction(findUser))
        navigate('/')
      } else {
        setErrorPass('Password yang digunakan salah!')
      }
    }
  }
  
  return (
    <main className='w-svw min-h-svh max-h-fit flex flex-col justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backdrop})`}}>
        <img src={logo} alt="icon-logo" className='w-[15svw]'/>
        <form onSubmit={handleSubmit(submitData)} id='login' className='flex flex-col gap-3 w-[40%] h-[75%] bg-white rounded-2xl px-10 py-5 mb-5'>
            <span className='font-bold text-2xl'>Welcome Back 👋</span>
            <span className='text-gray-500'>Sign in with your data that you entered during
            your registration</span>
            <Input type='email' register={register} error={errors.email}/>
            {error && (<p className="text-red-500 text-sm">{error}</p>)}
            <Input type='password' register={register} text='Password' error={errors.password}/>
            {errorPass && (<p className="text-red-500 text-sm">{errorPass}</p>)}
            <span className='text-blue-600 text-sm self-end font-semibold'>Forgot Your Password?</span>
            <button type='submit' className='bg-amber-600 text-white font-semibold w-full rounded-sm py-2'>Login</button>
            <span className='text-center text-sm'>Don't have an account? <Link to='/register' className='text-blue-700'>Register</Link></span>
            <div className='flex flex-row items-center gap-2 w-full'>
                <hr className='border-[0.5px] flex-1 h-[1px] border-gray-400'/>
                <span className='text-gray-400 text-sm'>OR</span>
                <hr className='border-[0.5px] flex-1 h-[1px] border-gray-400'/>
            </div>
            <div className='flex flex-row justify-between gap-3'>
                <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-3 hover: cursor-pointer'>
                <FcGoogle className='size-8'/>
                <span className='text-xs text-gray-400'>Sign Up with Google Account</span>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-3 hover: cursor-pointer'>
                <FaFacebook className='size-8'/>
                <span className='text-xs text-gray-400'>Sign Up with Facebook Account</span>
                </div>
            </div>
        </form>
    </main>
  )
}

export default LoginPage