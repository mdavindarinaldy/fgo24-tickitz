import React, { forwardRef } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io"
import Input from './Input'

const Modal = forwardRef(({modalHeading, infoSubheading1, info1, infoSubheading2, info2, additionalInfo, onClose, onSubmit, onButton, modal, buttonText, option, register, errors, errorConfirm}, ref) => {

  function Option() {
    if (option==='input') {
        return (
            <>
                <Input type='confirmPassword' text='Confirm Password' register={register} error={errors} errorConfirm={errorConfirm}/>
                <span className='font-semibold text-center'>{additionalInfo}</span>
                <button type='submit' className='w-full py-3 font-bold text-lg bg-orange-500 text-white rounded-2xl' onClick={onSubmit}>{buttonText}</button>
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
        <div className='w-[50%] h-fit px-10 py-5 bg-white rounded-2xl flex flex-col justify-center items-center gap-5'>
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