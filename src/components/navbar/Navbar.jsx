import React, { useState, useEffect } from "react";
import Button1 from "../Buttons/Button1";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import axios from "axios";

export default function Navbar() {
  const [nav, setNav] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on initial load and whenever this component re-renders
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    try {
      // Try to call the logout API, but don't wait for a successful response
      axios.get("http://localhost:8000/api/logout/", { 
        withCredentials: true,
        timeout: 3000 // Set a timeout in case the API is slow
      }).catch(error => {
        console.log("Logout API call failed, but proceeding with local logout")
      });
      
      // Always clear local storage and update state regardless of API response
      localStorage.removeItem("token");
      localStorage.removeItem("phno");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      // Even if there's an error in the try block, still logout locally
      localStorage.removeItem("token");
      localStorage.removeItem("phno");
      setIsLoggedIn(false);
      navigate("/login");
      console.log("Forced logout regardless of API response");
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex p-4 justify-between text-green-600 font-bold">
        <ul className="flex justify-evenly w-2/3">
          <li className="my-auto">
            <img src="logo.png" alt="Logo" className="h-24" />
          </li>
          <li className="my-auto">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/add">Add Product</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/my-products">My Products</NavLink>
          </li>
          <li className="my-auto">
            <NavLink to="/get">Get Products</NavLink>
          </li>
          <hr className="border-t border-gray-400 mr-2" />
        </ul>

        <div className="w-1/3 flex justify-evenly my-5">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded-md">
              Logout
            </button>
          ) : (
            <>
              <Button1 name="Log in" path="/login" />
              <Button1 name="Sign up" path="/signin" />
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex bg-white md:hidden">
        <img src="logo.png" alt="Logo" className="h-20 left-0" />
        <div onClick={handleNav} className="cursor-pointer ml-auto my-auto md:hidden">
          {nav && <AiOutlineMenu size={40} />}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[50%] h-full border-r border-gray-900 bg-white ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="text-2xl ml-3">
          <li>
            <div className="flex">
              <img src="logo.png" alt="Logo" className="h-24" />
              <div onClick={handleNav} className="cursor-pointer my-auto ml-auto p-3">
                <AiOutlineClose size={30} />
              </div>
            </div>
            <hr className="border-t border-gray-400 mr-2" />
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <hr className="border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <hr className="border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/add">Add Product</NavLink>
          </li>
          <hr className="border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/get">Get Products</NavLink>
          </li>
          <hr className="border-t border-gray-400 mr-2" />
          <li>
            <NavLink to="/my-products">My Products</NavLink>
          </li>
        </ul>

        <div className="ml-3">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded-md">
              Logout
            </button>
          ) : (
            <>
              <Button1 name="Log in" path="/login" />
              <br />
              <Button1 name="Sign up" path="/signin" />
            </>
          )}
        </div>
      </div>
    </>
  );
}