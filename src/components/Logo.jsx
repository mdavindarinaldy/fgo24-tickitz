import React from 'react'
// import logo from '../assets/logo.png'
// import logowhite from "../assets/logowhite.png"
import cinemate from '../assets/logo_cinemate.png'

function Logo({type,className, ...props}) {
  if(type==='0') {
    return (
      <div className='p-3 size-fit'>
          <img src={cinemate} alt='logo-tickitz' className={className} {...props}/>
      </div>
    )
  }
  if(type==='1') {
    return (
    <div className='p-3 size-fit'>
        <img src={cinemate} alt='logo-tickitz' className={className} {...props}/>
    </div>
  )}
}

export default Logo