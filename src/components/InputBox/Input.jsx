import React from 'react'

export default function({type,name,placeholder,onChange,icon: Icon,...props}) {
  return (
    <>
        <div className=" flex  bg-green-200 rounded-xl">
             {Icon && <Icon className=" my-auto ml-2" />} 
              <input
                type={type}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className=" outline-none bg-green-200 text-black placeholder-gray-700  p-2 rounded-xl
                "
                {...props}
              />
            </div>
            <br />
    </>
  )
}
