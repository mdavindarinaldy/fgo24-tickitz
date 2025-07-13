import React, { forwardRef, useImperativeHandle, useState } from 'react'
import http from '../lib/http'

const ModalResetPassword = forwardRef(({ modal, onClose, email }, ref) => {
  const [otp, setOtp] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setOtp('')
      setNewPass('')
      setConfPass('')
      setError('')
      setSuccess('')
    }
  }))

  async function handleResetPass(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await http().patch('/auth/pass', {
        email,
        otp,
        newPass,
        confPass
      })
      setSuccess('Berhasil mengganti password! Silakan login dengan password baru.')
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Terjadi kesalahan saat reset password. Silakan coba lagi.'
      )
    }
  }

  if (!modal) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
      <div className='bg-white border-gray-400 border-1 outline-0 rounded-sm px-3 py-3 p-6 w-[90%] max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>Reset Password</h2>
        <p className='text-sm text-gray-500 mb-4'>
          Masukkan OTP yang telah dikirim ke email dan buat password baru Anda.
        </p>
        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
        {success && <p className='text-green-500 text-sm mb-2'>{success}</p>}
        <form onSubmit={handleResetPass} className='flex flex-col gap-3'>
          <input
            type='text'
            placeholder='OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
          <input
            type='password'
            placeholder='New Password'
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
          <div className='flex justify-end gap-3 mt-3'>
            <button type='button' onClick={onClose} className='text-gray-600'>
              Cancel
            </button>
            <button type='submit'
              className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700'>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

export default ModalResetPassword
