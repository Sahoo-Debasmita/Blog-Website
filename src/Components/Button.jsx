import React from 'react'

function Button({children,type='text',className='',bgcolor='bg-blue-100',textcolor='text-white', ...props}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${textcolor}`} {...props}>
        {children}
        </button>
  )
}

export default Button

