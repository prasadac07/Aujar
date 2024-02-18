import React from 'react'
import Renting from './Renting'
import Booking from './Booking'
import { NavLink, Outlet } from 'react-router-dom';


export default function Dashboard() {
  return (
    <>
        
      <div className='bg-gray-100 text-centre text-5xl font-white gap-2'>
        <div className='flex justify-center py-4 gap-40'>
        <NavLink to="booking">
        <button className="my-4 text-2xl bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" >Check Booking</button>
        </NavLink>
        
        <NavLink to="renting">
        <button className="my-4 text-2xl bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" >Check Renting</button>
        </NavLink>
        </div>
      </div>
      <Outlet/>
    </>

    
    
  )
}
