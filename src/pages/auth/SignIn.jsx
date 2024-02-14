import React from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <>
    <div className=" flex justify-evenly my-6 ">
      <div className=" flex-col my-auto text-center border-2 border-green-600 rounded-xl px-40 p-14 ">
        <p className=" text-4xl font-extrabold mb-4">SIGN UP</p>
        <form action="submit">
          <div className=" flex  bg-green-200 h-[40px] rounded-xl">
            <MdOutlineAccountCircle className=" my-auto ml-2" />
            <input
              type="text"
              placeholder="username"
              className=" outline-none bg-green-200 text-black placeholder-gray-700  p-2 rounded-xl"
            />
          </div>
          <br />
          <div className=" flex  bg-green-200 h-[40px] rounded-xl">
            <RiLockPasswordLine  className=" my-auto ml-2" />
            <input
              type="password"
              placeholder="password"
              className=" outline-none  bg-green-200 text-black placeholder-gray-700  p-2 rounded-xl"
            />
          </div>
          <button className=" bg-green-600 text-white font-extrabold  p-2 rounded-md shadow-2xl my-6">
          Sign Up
        </button>
        </form>
      
        
      </div>
    
    </div>
  </>
  )
}
