import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

function NavbarAdmin({currentlyOn, ...props}) {
  let isMovie = false
  let isDashboard = false
  if(currentlyOn==='movie') {
    isMovie = true
  }
  if(currentlyOn==='dashboard') {
    isDashboard = true
  }

  return (
    <div className='navbar' {...props}>
        <Logo type='0' className='w-[10svw] h-[4svw]'/>
        <div className='flex flex-row gap-5'>
            <Link to='/' className={isDashboard ? 'currentlyHere' : 'currentlyNotHere'}>DASHBOARD</Link>
            <Link to='/' className={isMovie ? 'currentlyHere' : 'currentlyNotHere'}>MOVIE</Link>
        </div>
        <div className='flex flex-row gap-5'>
            <button className='border-0'>Location</button>
            <img src="" alt="" />
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default NavbarAdmin