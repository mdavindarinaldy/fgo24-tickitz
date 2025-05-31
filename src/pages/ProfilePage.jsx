import React, { useRef, useState } from 'react'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAction } from '../redux/reducer.js/users'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'
import { Navigate, useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const validationSchema = yup.object({
  fullname: yup.string().min(3, 'Nama minimal 3 karakter').required('Nama harus diisi!'),
  email: yup.string()
    // eslint-disable-next-line no-useless-escape
    .matches(/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,5}$/, {message:'Email tidak valid!', excludeEmptyString:true})
    .required('Email harus diisi!'),
  password: yup.string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .optional()
    .min(8, 'Karakter minimal 8 karakter')
    .max(12, 'Karakter maksimal 12 karakter'),
  phonenumber: yup.string().matches(/^[8][0-9]{10,11}$/, {message: 'Nomor Ponsel tidak valid'}).required('Nomor Ponsel harus diisi'),
  confirmPassword: yup.string().required('Anda harus konfirmasi terlebih dahulu menggunakan password lama')
})

function ProfilePage() {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(validationSchema)
  })
  const dispatch = useDispatch()
  const [update, setUpdate] = useState('')
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const navigate = useNavigate()

  const modalRef = useRef(null)
  const [modal, setModal] = useState(false)
  const [errorConfirm, setErrorConfirm] = useState('')

//if(!currentLogin.email) { return (<Navigate to='/' replace/>) }

  function submitChange(value) {
    let sanitizedValue = {
        ...currentLogin,
        fullname: value.fullname.trim(),
        email: value.email.trim(),
        phonenumber: value.phonenumber.trim()
    }
    if (value.password !== null) {
        sanitizedValue = {
            ...sanitizedValue,
            password: value.password
        }
    }
    if (value.confirmPassword === currentLogin.password) {
      setErrorConfirm('')
      dispatch(editUserAction({currentLogin, sanitizedValue}))
      dispatch(currentLoginAction({...currentLogin, ...sanitizedValue}))
      setUpdate('Profile berhasil dilakukan perubahan!')
      setModal(false)
      setTimeout(() => {
          setUpdate('')
      }, 5000);
    } else {
      setErrorConfirm('Password salah!')
    }
  }

  return (
    <>
        <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-row gap-10'>
            <button type='button' className={`text-lg font-semibold border-b-3 border-orange-300`} disabled>Account Settings</button>
            <button type='button' className={`text-lg font-semibold hover:border-b-3 hover:border-orange-300`} onClick={()=>{navigate('/profile/history-transaction')}}>Order History</button>
        </div>
        <form onSubmit={handleSubmit(submitChange)} id='profile' className='w-full flex flex-col gap-10 relative'>
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
            <button type='button' onClick={()=> {setModal(true)}} className='text-white font-semibold bg-orange-500 py-4 w-[30%] rounded-2xl'>Update Changes</button>
            <Modal
                ref={modalRef}
                modalHeading = 'Confirmation'
                option = 'input'
                additionalInfo = 'Konfirmasi dengan password lama Anda terlebih dahulu'
                modal= {modal}
                errors = {errors.confirmPassword}
                errorConfirm = {errorConfirm}
                register = {register}
                buttonText = 'Confirm'
                onClose={() => setModal(false)}
                onSubmit={() => submitChange}
            />
        </form>
    </>
  )
}

export default ProfilePage