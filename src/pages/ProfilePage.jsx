import React, { useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { currentLoginAction } from '../redux/reducer.js/currentLogin'
import dot from '../assets/dot.png'
import profile from '../assets/profile.png'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import http from '../lib/http'

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
  confirmPassword: yup.string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .optional(),
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
})

function ProfilePage() {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const dispatch = useDispatch()
  const [update, setUpdate] = useState('')
  const [errorConfirm, setErrorConfirm] = useState('')
  const [errorPicture, setErrorPicture] = useState('')
  const [errorConfirmNewPass, setErrorConfirmNewPass] = useState('')
  const [errorRegistered, setErrorRegistered] = useState('')
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState(null)
  const fileInputRef = useRef(null)
  // const pictureURL = import.meta.env.VITE_PROFILE_PICTURE_URL
  const currentLogin = useSelector((state) => state.currentLogin)
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

  function updateChange(value) {
    const formData = new FormData()
    const file = fileInputRef.current?.files
    if (file && file.length > 0) {
      const selectedFile = file[0]
      if (selectedFile.size > 2 * 1024 * 1024) {
        setErrorPicture('File terlalu besar, maksimum 2MB')
        return
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorPicture('Tipe file tidak valid, hanya JPG, JPEG, PNG yang diperbolehkan')
        return
      }
      formData.append('profilePicture', selectedFile)
    }
    if (value.fullname.trim() !== currentLogin.profile.name.trim()) {
      formData.append('fullname', value.fullname.trim())
    }
    if (value.email.trim() !== currentLogin.profile.email) {
      formData.append('email', value.email.trim())
    }
    if (value.phonenumber.trim() !== currentLogin.profile.phoneNumber) {
      formData.append('phoneNumber', value.phonenumber.trim())
    }
    if (value.password !== value.confirmPassword) {
      setErrorConfirmNewPass("Password dan konfirmasi password baru tidak sama!")
      return
    } else if (value.password) {
      formData.append('password', value.password)
      formData.append('confirmPassword', value.confirmPassword)
      setErrorConfirmNewPass('')
    }
    setFormData(formData)
    setValue('confirmOldPassword', '')
    setModal(true)
  }

  async function submitChange() {
    const value = getValues()
    if (!value.confirmOldPassword) {
      setErrorConfirm('Anda harus memasukkan password lama!')
      return
    }
    try {
      const response = await http(currentLogin.token).post('/profile/check-pass',{
        password: value.confirmOldPassword
      })
      if (response.data.results) {
        await http(currentLogin.token).patch('/profile', formData, {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        })
        setValue('confirmOldPassword', '')
        setValue('confirmPassword', '')
        setValue('password', '')
        setErrorConfirm('')
        setErrorRegistered('')
        setErrorPhoneNumber('')
        setErrorConfirmNewPass('')
        setError('')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        const getProfile = await http(currentLogin.token).get('/profile')
        const profile = getProfile.data.results
        const token = currentLogin.token
        dispatch(currentLoginAction({token, profile}))
        setModal(false)
        setUpdate('Profile berhasil dilakukan perubahan!')
        setTimeout(function () {
          setUpdate('')
        }, 5000)
      }
    } catch (err) {
      setValue('confirmOldPassword', '')
      setValue('confirmPassword', '')
      setValue('password', '')
      if (err.response.data.message.includes("Wrong password")) {
        setErrorConfirm('Password salah!')
        return
      }
      if (err.response.data.errors.includes("email already used by another user")) {
        setErrorRegistered('Email sudah digunakan, mohon gunakan email lain')
      } else if (err.response.data.errors.includes("phone number already used by another user")) {
        setErrorPhoneNumber('Nomor ponsel sudah digunakan, mohon gunakan nomor lain')
      } else {
        setError('Terjadi kesalahan pada server. Silakan refresh halaman atau coba beberapa saat lagi.')
      }
      setModal(false)
    }
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
          <span className='font-bold text-2xl text-center'>{currentLogin.profile.name}</span>
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
          <Input type='file' ref={fileInputRef} name='profilePicture'/>
          {errorPicture && <p className="text-red-500 text-sm">{errorPicture}</p>}
          <Input type='fullname' register={register} defaultValue={currentLogin.profile.name} error={errors.fullname} />
          <Input type='email' register={register} defaultValue={currentLogin.profile.email} error={errors.email} />
          {errorRegistered && <p className="text-red-500 text-sm">{errorRegistered}</p>}
          <Input type='phonenumber' register={register} defaultValue={currentLogin.profile.phoneNumber} error={errors.phonenumber}/>
          {errorPhoneNumber && <p className="text-red-500 text-sm">{errorPhoneNumber}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className='bg-white rounded-2xl w-[90%] lg:w-full px-10 py-5 flex flex-col gap-5'>
          <div className='border-b-1 border-gray-400 py-3'>
            <span className='text-semibold text-base'>Account and Privacy</span>
          </div>
          <div className='flex flex-col lg:flex-row gap-5'>
            <Input type='password' text='New Password' register={register} error={errors.password} />
            <Input type='confirmPassword' text='Confirm New Password' register={register} errorConfirm={errorConfirmNewPass}/>
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
            setValue('confirmOldPassword', '')
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