import React from 'react'
import { Link } from 'react-router-dom'

function Button({text, href, className, ...props}) {
  return (
    <div className={`button ${className}`} {...props}>
        <Link to={href}>{text}</Link>
    </div>
  )
}

export default Button