import React, { useState } from "react";
import Button1 from "../Buttons/button1";
import { NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <div className=" hidden md:flex p-4 flex justify-between text-green-600 font-bold">
        <ul className="flex justify-evenly w-2/3 ">
          <li className=" my-auto">
            <img src="logo.png" alt="" className=" h-24" />
          </li>
          <li className=" my-auto">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/add">Add Product</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/get">Get Products</NavLink>
          </li>
          <li className=" my-auto">Help</li>
        </ul>

        <div className=" w-1/3 flex justify-evenly    my-5">
          <Button1 name="Log in" path="/login" />
          <Button1 name="Sign up" path="/signin" />
        </div>
      </div>

      {/* mobile nav */}
      <div className=" flex  bg-white md:hidden">
        <img src="logo.png" alt="" className=" h-20 left-0" />
        <div
          onClick={handleNav}
          className=" cursor-pointer ml-auto  block my-auto md:hidden 
          "
        >
          {nav && <AiOutlineMenu size={40}  />}
        </div>
      </div>

      <div
        className={
          !nav
            ? " fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : " fixed left-[-100%] "
        }
      >
        <ul className=" text-2xl ml-3">
          <li>
            <div className=" flex">
              <img src="logo.png" alt="" className=" h-24" />
              <div onClick={handleNav} className=" cursor-pointer my-auto ml-auto p-3">
                <AiOutlineClose size={30}  />
              </div>
            </div>

            <hr className=" border-t border-gray-400 mr-2" />
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <hr className=" border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <hr className=" border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/add">Add Product</NavLink>
          </li>
          <hr className=" border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/get">Get Products</NavLink>
          </li>
          <hr className=" border-t border-gray-400 mr-2" />
          <li>Help</li>
          <hr className=" border-t border-gray-400 mr-2" />
        </ul>
        <div className=" ml-3">
          <Button1 name="Log in" path="/login" />
          <br />
          <Button1 name="Sign up" path="/signin" />
        </div>
      </div>
    </>
  );
}
