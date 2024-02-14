import React from 'react'

export default function Footer() {
  return (
    <>
        <div className=' flex list-none justify-between bg-green-600 font-semibold p-4 px-28'>
            <div className=' flex justify-center align-middle'>
                <img src="logo.png" alt="" className=' h-32' />
            </div>
            <div className=' my-auto'>
                <li>Home</li>
                <li>Dashboard</li>
                <li>Add Product</li>
                <li>Get Product</li>
            </div>
            <div className=' my-auto'>
                <li>Buy</li>
                <li>Sell</li>
                <li>Rent</li>
            </div>
            <div className=' my-auto'>
                <li>Help</li>
                <li>FAQs</li>
                <li>Policy</li>
            </div>

        </div>

      
    </>
 )
}
