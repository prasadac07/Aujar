import React from 'react';
import Renting from './Renting';
import Booking from './Booking';
import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <div className=' text-centre flex text-5xl font-white gap-2'>
        <img src="../public/tractor.webp" alt="" className='mt-12 ml-2 w-auto h-64 mx-auto' />
        <div className='mt-16 justify-center py-4 gap-40'>
    
        <NavLink to="booking">
        <button className="my-4 mr-64 text-2xl  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-10 rounded" >Check Booked Trips</button>
        </NavLink>
        <br />
        
        <NavLink to="renting">
        <button className="my-4 mr-64 text-2xl  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" >Check Your Driven Trips</button>
        </NavLink>
        </div>
      </div>
      <Outlet/>
    </>
  );
}
