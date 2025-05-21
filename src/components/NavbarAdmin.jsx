import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import search from '../assets/Search.png'
import profile from '../assets/profile.png'

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
        <div className='flex flex-row gap-5 items-center'>
            <button className='border-0'>Location</button>
            <img src={search} alt="search-icon"/>
            <img src={profile} alt="profile-picture" className='size-[50px]'/>
        </div>
    </div>
  )
}

export default NavbarAdmin