import React from "react";
import Button1 from "../Buttons/button1";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className=" p-4 flex justify-between text-green-600 font-bold">
        <ul className=" flex justify-evenly w-2/3 ">
          <li className=" my-auto">
            <img src="logo.png" alt="" className=" h-24" />
          </li>
          <li className=" my-auto">
            <NavLink to='/home'>
            Home
            </NavLink>
            
           </li>
          <li className="my-auto">
            <NavLink to='/dashboard'>
            Dashboard
            </NavLink>
           
            </li>
            <li className="my-auto">
            <NavLink to='/add'>
            Add Product
            </NavLink>
           
            </li>
            <li className="my-auto">
            <NavLink to='/get'>
            Get Products
            </NavLink>
           
            </li>
          <li className=" my-auto">Help</li>
        </ul>

        <div className=" w-1/3 flex justify-evenly    my-5">
          <Button1 name="Log in" path='/login'/>
          <Button1 name="Sign up" path='/signin' />
        </div>
      </div>
    </>
  );
}
