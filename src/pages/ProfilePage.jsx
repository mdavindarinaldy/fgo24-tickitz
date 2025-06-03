import React, { useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAction } from '../redux/reducer.js/users'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'
import dot from '../assets/dot.png'
import profile from '../assets/profile.png'
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

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [modal]);

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
      <div className='bg-white lg:rounded-2xl w-full px-10 py-5 flex flex-row gap-10 lg:justify-start justify-center'>
        <button type='button' className={`text-lg font-semibold border-b-3 border-orange-300`} disabled>Account Settings</button>
        <button type='button' className={`text-lg font-semibold hover:border-b-3 hover:border-orange-300`} onClick={function () { navigate('/profile/history-transaction') }}>Order History</button>
      </div>
      <div className='bg-white w-[90%] px-5 py-5 rounded-2xl flex lg:hidden flex-col gap-5 justify-center items-center'>
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
      <form onSubmit={function(e) {handleSubmit(updateChange)(e)}} id='profile' className='w-full flex flex-col gap-10 relative items-center'>
        <div className='bg-white rounded-2xl w-[90%] lg:w-full px-10 py-5 flex flex-col gap-5'>
          <div className='border-b-1 border-gray-400 py-3'>
            <span className='text-semibold text-base'>Details Information</span>
          </div>
          <Input type='fullname' register={register} defaultValue={currentLogin.fullname} error={errors.fullname} />
          <Input type='email' register={register} defaultValue={currentLogin.email} error={errors.email} />
          {errorRegistered && <p className="text-red-500 text-sm">{errorRegistered}</p>}
          <Input type='phonenumber' register={register} defaultValue={currentLogin.phonenumber} error={errors.phonenumber}/>
        </div>
        <div className='bg-white rounded-2xl w-[90%] lg:w-full px-10 py-5 flex flex-col gap-5'>
          <div className='border-b-1 border-gray-400 py-3'>
            <span className='text-semibold text-base'>Account and Privacy</span>
          </div>
          <div className='flex flex-row gap-5'>
            <Input type='password' text='New Password' register={register} error={errors.password} />
          </div>
          {update && <span className='text-lg text-green-400 font-semibold'>{update}</span>}
        </div>
        <button type='submit' className='text-white font-semibold bg-orange-500 py-4 w-[90%] lg:w-[30%] rounded-2xl text-center lg:self-start'>Update Changes</button>
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