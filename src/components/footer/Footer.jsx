import React from 'react'

export default function Footer() {
  return (
    <>
        <div className=' md:flex list-none shadow-xl justify-between bg-green-600 font-semibold p-4 px-28'>
            <div className=' md:flex justify-center align-middle'>
                <img src="logo.png" alt="" className=' h-32 ml-auto mr-auto' />
            </div>
            <div className=' md:my-auto'>
                <li>Home</li>
                <li>Dashboard</li>
                <li>Add Product</li>
                <li>Get Product</li>
            </div>
            <div className=' md:my-auto'>
                <li>Buy</li>
                <li>Sell</li>
                <li>Rent</li>
            </div>
            <div className=' md:my-auto'>
                <li>Help</li>
                <li>FAQs</li>
                <li>Policy</li>
            </div>

        </div>

      
    </>
 )
}
