import React, { forwardRef } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io"
import Input from './Input'

const Modal = forwardRef(({modalHeading, infoSubheading1, info1, infoSubheading2, info2, additionalInfo, onClose, onSubmit, onButton, modal, buttonText, option, register, errorConfirm, success}, ref) => {

  function Option() {
    if (option==='input') {
        return (
            <>
                <Input type='confirmOldPassword' text='Confirm Password' register={register} errorConfirm={errorConfirm}/>
                <span className='font-semibold text-center'>{additionalInfo}</span>
                <button type='button' className='w-full py-3 font-bold text-lg bg-orange-500 text-white rounded-2xl' onClick={onSubmit}>{buttonText}</button>
            </>
        )
    } else if (option==='forgetPassword') {
         return (            
            <>
                <div className='flex flex-col w-full gap-4'>
                    <label htmlFor="forgot" className='font-semibold text-lg'>Email</label>
                    <input {...register('forgetPassword')} type="email" id='forgot' placeholder='Enter your email here' className='border-gray-400 border-1 outline-0 rounded-sm w-full px-3 py-3' autoComplete='off'/>
                    {errorConfirm && <p className="text-red-500 text-sm">{errorConfirm}</p>}
                </div>
                <span className='font-semibold text-center'>{additionalInfo}</span>
                <button type='button' className='w-full py-3 font-bold text-lg bg-orange-500 text-white rounded-2xl' onClick={onSubmit}>{buttonText}</button>
                {success && <p className="text-green-500 text-lg font-semibold text-center">{success}</p>}
            </>
         )   
    } else {
        return (
            <>
                <div className='w-full flex flex-row justify-between'>
                    <span className='text-gray-400 text-base'>{infoSubheading1}</span>
                    <span className='text-lg'>{info1}</span>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <span className='text-gray-400 text-base'>{infoSubheading2}</span>
                    <span className='text-lg'>{info2}</span>
                </div>
                <span className='font-semibold text-center'>{additionalInfo}</span>
                <button type='button' className='w-full py-3 font-bold text-lg bg-orange-500 text-white rounded-2xl' onClick={onButton}>{buttonText}</button>
            </>
        )
    }
  }

  return (
    <section ref={ref} id='modal' tabIndex={-1} className={`w-full h-full flex-col justify-center items-center absolute ${modal ? 'flex' : 'hidden'}`}>
        <div className='w-[85%] lg:w-[50%] h-fit px-10 py-5 bg-white rounded-2xl flex flex-col justify-center items-center gap-5'>
            <div className='w-full flex flex-row justify-between'>
                <div className='size-[20px]'></div>
                <span className='text-2xl font-bold'>{modalHeading}</span>
                <IoIosCloseCircleOutline onClick={onClose} className='hover:cursor-pointer size-[25px]'/>
            </div>
            <hr className='w-full bg-gray-300'/>
            <Option/>
        </div>
    </section>
  )
})

export default Modal