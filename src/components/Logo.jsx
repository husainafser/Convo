import React from 'react'

const Logo = (className='') => {
  return (
    <div><img
    alt="Your Company"
    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
    className={`mx-auto w-10 ${className}`}
  /></div>
  )
}

export default Logo