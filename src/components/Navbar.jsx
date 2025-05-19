import React from 'react'
import Button from './Button'
import Logo from './Logo'
import { Link } from 'react-router-dom'

function Navbar({currentlyOn, ...props}) {
  let isHome = false
  let isMovie = false
  let isBuy = false 
  if(currentlyOn==='home') {
    isHome = true
  }
  if(currentlyOn==='movie') {
    isMovie = true
  }
  if(currentlyOn==='buy') {
    isBuy = true
  }

  return (
    <div className='navbar' {...props}>
        <Logo type='0' className='w-[10svw] h-[4svw]'/>
        <div className='flex flex-row gap-5'>
            <Link to='/' className={isHome ? 'currentlyHere' : 'currentlyNotHere'}>HOME</Link>
            <Link to='/movie' className={isMovie ? 'currentlyHere' : 'currentlyNotHere'}>MOVIE</Link>
            <Link className={isBuy ? 'currentlyHere' : 'currentlyNotHere'}>BUY TICKET</Link>
        </div>
        <div className='flex flex-row gap-5'>
            <Button text="Log In" href="/" className="off"/>
            <Button text="Sign Up" href="/" className="on"/>
        </div>
    </div>
  )
}

export default Navbar