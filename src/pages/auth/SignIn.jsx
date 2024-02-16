import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa";
import Input from "../../components/InputBox/Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function SignIn() {

const[FName,setFName]=useState();
const[LName,setLName]=useState();
const[Pass,setPass]=useState();
const[PhNo,setPhNo]=useState();
const[PinCode,setPinCode]=useState();
const navigate=useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    // Make an Axios POST request to your backend endpoint
    const response = await axios.post('http://127.0.0.1:8000/api/register/', {
      first_name:FName,
      last_name:LName,
      password:Pass,
      username:PhNo,
      pincode:PinCode
      
    
      
    });
    navigate('/home')
    // console.log('Response from server:', response.data);
    // navigate("/home")
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};


  return (
    <>
      <div className=" flex justify-evenly my-6 ">
        <div className=" flex-col my-auto text-center border-2 border-green-600 rounded-xl px-40 p-14 ">
          <p className=" text-4xl font-extrabold mb-4">SIGN UP</p>
          <form  onSubmit={handleSubmit}>
            <Input
              name="first"
              type="text"
              placeholder="First Name"
              icon={MdOutlineAccountCircle}
              onChange={(e)=>setFName(e.target.value)}
              
            />
            <Input
            name="last"
              type="text"
              placeholder="Last Name"
              icon={MdOutlineAccountCircle}
              onChange={(e)=>setLName(e.target.value)}
            />
            <Input
           name="password"
              type="password"
              placeholder="password"
              icon={RiLockPasswordLine}
              onChange={(e)=>setPass(e.target.value)}
            />
            <Input
              type="Password"
              placeholder="confirm password"
              icon={RiLockPasswordLine}
            />
            <Input
            name="Phnum"
              type="tel"
              placeholder="Mobile No."
              icon={FaPhone}
              maxLength={10}
              onChange={(e)=>setPhNo(e.target.value)}
            />

            <Input
            name="pin"
              type="tel"
              placeholder="Pin Code"
              icon={FaMapMarkerAlt}
              maxLength={6}
              onChange={(e)=>setPinCode(e.target.value)}
            />

            <button className=" bg-green-600 text-white font-extrabold  p-2 rounded-md shadow-2xl my-6" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
