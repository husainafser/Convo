import { useId } from "react"
import React from 'react'

const Input = React.forwardRef(({label,type='text',className='', ...props},ref) => {
    const id = useId();
  return (
    <div className="w-full">
      
        {label && <label className="block text-sm font-medium leading-6 text-gray-900 text-left" htmlFor={id}>{label}</label>}
        <input type={type} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`} {...props} ref={ref} id={id} />
    </div>
  )
})

export default Input