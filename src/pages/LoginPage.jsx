import React, { useRef, useState } from 'react'
import backdrop from '../assets/backdrop.png'
import logo from '../assets/logo_cinemate.png'
import Input from '../components/Input'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'
import Modal from '../components/Modal'
import http from '../lib/http'

const validationSchema = yup.object({
  email: yup.string().required('Email harus diisi!'),
  password: yup.string().required('Password harus diisi!'),
})

function LoginPage() {
  const {register, handleSubmit, getValues, setValue, formState:{errors}} = useForm({
    resolver: yupResolver(validationSchema)
  })
  const [error, setError] = useState('')
  const [errorPass, setErrorPass] = useState('')
  let navigate = useNavigate()
  const users = useSelector((state) => state.users.data) || []
  const currentLogin = useSelector((state) => state.currentLogin)
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const [modal, setModal] = useState(false)
  const [errorConfirm, setErrorConfirm] = useState('')
  const [success, setSuccess] = useState('')

  function forgotPass() {
    const value = getValues()
    const findUser = users.find((item)=> item.email === value.forgetPassword)
    if (findUser === undefined) {
      setErrorConfirm('Email tidak terdaftar!')
    } else {
      setErrorConfirm('')
      setSuccess('Password sementara telah dikirimkan melalui email!')
      setTimeout(function() {
        setModal(false)
        setValue('forgetPassword', '')
        setSuccess('')
      }, 3000)
    }
  }

  async function submitData(value) {
    const sanitizedValue = {
      ...value,
      email: value.email.trim(),
    }
    try {
      const response = await http().post('/auth/login', {
        email: sanitizedValue.email,
        password: sanitizedValue.password
      })
      setError('')
      const getProfile = await http(response.data.results).get('/profile')
      const profile = getProfile.data.results
      const token = response.data.results
      dispatch(currentLoginAction({token, profile}))
      if (profile.role==="admin") {
        navigate('/dashboard-admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      if (err.response.data.message.includes("not registered")) {
        setError('Email tidak terdaftar, silakan lakukan registrasi akun terlebih dahulu')
      } else if (err.response.data.message.includes("password")) {
        setError('')
        setErrorPass('Password yang digunakan salah!')
      }
    }
  }

  if(currentLogin.token && currentLogin.profile.role==='admin') { return (<Navigate to='/dashboard-admin' replace/>) }
  if(currentLogin.token && currentLogin.profile.role==='user') { return (<Navigate to='/' replace/>) }
  
  return (
    <main className='w-svw min-h-svh max-h-fit flex flex-col justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backdrop})`}}>
        <form onSubmit={handleSubmit(submitData)} id='login' className='flex flex-col gap-3 w-[85%] lg:w-[40%] h-[75%] bg-white rounded-2xl px-10 py-5 mb-5'>
            <img src={logo} alt="icon-logo" className='w-[8svw] h-[3svw] self-center mb-1'/>
            <span className='font-bold text-2xl self-center'>Welcome Back 👋</span>
            <span className='text-gray-500 self-center'>Sign in with your data that you entered during
            your registration</span>
            <Input type='email' register={register} error={errors.email}/>
            {error && (<p className="text-red-500 text-sm">{error}</p>)}
            <Input type='password' register={register} text='Password' error={errors.password}/>
            {errorPass && (<p className="text-red-500 text-sm">{errorPass}</p>)}
            <button type='button' onClick={()=>setModal(true)}className='text-blue-600 text-sm self-end font-semibold border-0 bg-none'>Forgot Your Password?</button>
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
                <span className='text-xs text-gray-400 text-center'>Sign Up with Google Account</span>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center border-1 border-gray-400 flex-1 rounded-2xl py-3 hover: cursor-pointer'>
                <FaFacebook className='size-8'/>
                <span className='text-xs text-gray-400 text-center'>Sign Up with Facebook Account</span>
                </div>
            </div>
        </form>
        <Modal
          ref={modalRef}
          modalHeading='Forgot Password'
          errorConfirm={errorConfirm}
          success={success}
          option='forgetPassword'
          additionalInfo='Password sementara akan dikirimkan melalui email, silakan login dengan password tersebut dan rubah password Anda di menu profile'
          modal={modal}
          register={register}
          buttonText='Send'
          onClose={function () {
            setErrorConfirm('')
            setModal(false)
          }}
          onSubmit={function () {forgotPass()}}
        />
    </main>
  )
}

export default LoginPage