import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Logo from './Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import profile from '../assets/profile.png'
import { removeLoginAction } from '../redux/reducer.js/currentLogin'

function Navbar({currentlyOn, ...props}) {
  const currentLogin = useSelector((state) => state.currentLogin.data)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  function Menu() {
    const [dropdown, setDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdown(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [])

    function logout() {
      setDropdown(false)
      dispatch(removeLoginAction())
      navigate('/')
    }

    if(currentLogin.email) {
      return (
        <div className='flex flex-row relative' ref={dropdownRef}>
          <button type='button' className='flex flex-row gap-5 items-center' onClick={() => setDropdown(!dropdown)}>
            <span className='text-lg font-semibold'>{currentLogin.fullname}</span>
            <img src={profile} alt="profile-picture" className='size-[50px]'/>
          </button>
          {dropdown && (
            <div className="absolute top-[60px] right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[150px] flex flex-col z-50">
              <Link to="/profile" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg" onClick={() => setDropdown(false)}>Profile</Link>
              <button type='button' className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg text-left" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className='flex flex-row gap-5'>
            <Button text="Log In" href="/login" className="off"/>
            <Button text="Sign Up" href="/register" className="on"/>
        </div>
      )
    }
  }

  return (
    <div className='navbar' {...props}>
        <Logo type='0' className='w-[10svw] h-[4svw]'/>
        <div className='flex flex-row gap-5'>
            <Link to='/' className={isHome ? 'currentlyHere' : 'currentlyNotHere'}>HOME</Link>
            <Link to='/movie' className={isMovie ? 'currentlyHere' : 'currentlyNotHere'}>MOVIE</Link>
            <Link className={isBuy ? 'currentlyHere' : 'currentlyNotHere'}>BUY TICKET</Link>
        </div>
        <Menu/>
    </div>
  )
}

export default Navbar