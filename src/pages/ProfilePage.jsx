import React, { useRef, useState } from 'react'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAction } from '../redux/reducer.js/users'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const validationSchema = yup.object({
  fullname: yup.string().min(3, 'Nama minimal 3 karakter').required('Nama harus diisi!'),
  email: yup.string()
    // eslint-disable-next-line no-useless-escape
    .matches(/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,5}$/, { message: 'Email tidak valid!', excludeEmptyString: true })
    .required('Email harus diisi!'),
  password: yup.string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .optional()
    .min(8, 'Karakter minimal 8 karakter')
    .max(12, 'Karakter maksimal 12 karakter'),
  phonenumber: yup.string()
    .required('Nomor Ponsel harus diisi')
    .test({
      name: 'phonenumber-validation',
      skipAbsent: true,
      test(value, ctx) {
        if (!value.startsWith('8')) {
          return ctx.createError({ message: 'Nomor Ponsel harus dimulai dengan 8' });
        }
        if (value.length < 11) {
          return ctx.createError({ message: 'Nomor Ponsel harus memiliki minimal 11 karakter' });
        }
        if (value.length > 12) {
          return ctx.createError({ message: 'Nomor Ponsel tidak boleh lebih dari 12 karakter' });
        }
        if (!/^\d+$/.test(value)) {
          return ctx.createError({ message: 'Nomor Ponsel hanya boleh berisi angka' });
        }
        return true;
      },
    }),
  confirmPassword: yup.string().nullable().optional()
})

function ProfilePage() {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const dispatch = useDispatch()
  const [update, setUpdate] = useState('')
  const [formData, setFormData] = useState(null)
  const [errorConfirm, setErrorConfirm] = useState('')
  const [errorRegistered, setErrorRegistered] = useState('')
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const users = useSelector((state) => state.users.data)
  const navigate = useNavigate()

  const modalRef = useRef(null)
  const [modal, setModal] = useState(false)

  function registeredUser(email, users) {
    return users.some(user => user.email === email && user.email !== currentLogin.email)
  }

  function updateChange(value) {
    let sanitizedValue = {
      ...currentLogin,
      fullname: value.fullname.trim(),
      email: value.email.trim(),
      phonenumber: value.phonenumber.trim()
    }
    if (value.password) {
      sanitizedValue = {
        ...sanitizedValue,
        password: btoa(value.password)
      }
    }
    if (registeredUser(sanitizedValue.email, users)) {
      setErrorRegistered('Email ini sudah terdaftar dengan akun yang lain!')
    } else {
      setFormData(sanitizedValue)
      setModal(true)
      setErrorConfirm('')
      setErrorRegistered('')
    }
  }

  function submitChange() {
    const value = getValues()
    if (!value.confirmPassword) {
      setErrorConfirm('Anda harus memasukkan password lama!')
      return
    }
    if (value.confirmPassword !== atob(currentLogin.password)) {
      setErrorConfirm('Password salah!')
      return
    }
    dispatch(currentLoginAction({ ...currentLogin, ...formData }))
    dispatch(editUserAction({currentLogin, formData}))
    setUpdate('Profile berhasil dilakukan perubahan!')
    setModal(false)
    setErrorConfirm('')
    setFormData(null)
    setValue('confirmPassword', '')
    setValue('password', '')
    setTimeout(function () {
      setUpdate('')
    }, 5000)
  }

  return (
    <>
      <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-row gap-10'>
        <button type='button' className={`text-lg font-semibold border-b-3 border-orange-300`} disabled>Account Settings</button>
        <button type='button' className={`text-lg font-semibold hover:border-b-3 hover:border-orange-300`} onClick={function () { navigate('/profile/history-transaction') }}>Order History</button>
      </div>
      <form onSubmit={function(e) {handleSubmit(updateChange)(e)}} id='profile' className='w-full flex flex-col gap-10 relative'>
        <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5'>
          <div className='border-b-1 border-gray-400 py-3'>
            <span className='text-semibold text-base'>Details Information</span>
          </div>
          <Input type='fullname' register={register} defaultValue={currentLogin.fullname} error={errors.fullname} />
          <Input type='email' register={register} defaultValue={currentLogin.email} error={errors.email} />
          {errorRegistered && <p className="text-red-500 text-sm">{errorRegistered}</p>}
          <Input type='phonenumber' register={register} defaultValue={currentLogin.phonenumber} error={errors.phonenumber}/>
        </div>
        <div className='bg-white rounded-2xl w-full px-10 py-5 flex flex-col gap-5'>
          <div className='border-b-1 border-gray-400 py-3'>
            <span className='text-semibold text-base'>Account and Privacy</span>
          </div>
          <div className='flex flex-row gap-5'>
            <Input type='password' text='New Password' register={register} error={errors.password} />
          </div>
          {update && <span className='text-lg text-green-400 font-semibold'>{update}</span>}
        </div>
        <button type='submit' className='text-white font-semibold bg-orange-500 py-4 w-[30%] rounded-2xl'>Update Changes</button>
        <Modal
          ref={modalRef}
          modalHeading='Confirmation'
          option='input'
          additionalInfo='Konfirmasi dengan password lama Anda terlebih dahulu'
          modal={modal}
          errorConfirm={errorConfirm}
          register={register}
          buttonText='Confirm'
          onClose={function () {
            setErrorConfirm('')
            setModal(false)
            setValue('confirmPassword', '')
          }}
          onSubmit={function () {
            handleSubmit(submitChange)()
          }}
        />
      </form>
    </>
  )
}

export default ProfilePage