import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import Input from "../../components/InputBox/Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Login() {
  const [Pass, setPass] = useState();
  const [PhNo, setPhNo] = useState();
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Make an Axios POST request to your backend endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
      
        password:Pass,
        username:PhNo
      
       
      
        
      }, { withCredentials: true });
      console.log('Response headers:', response.headers);
      response.headers.forEach((value, name) => {
        if (name.toLowerCase() === 'authorization') {
          console.log('Authentication token:', value);
        }
      });
      
      // If the above loop doesn't find the authorization header, try the original approach
      // console.log('Response from server:', response.data);
      navigate("/home")
    } catch (error) {
      console.error('Error submitting data:', error);
    }
}
 
  
  return (
    <>
      <div className=" flex justify-evenly my-6 ">
        <div className=" flex-col my-auto text-center border-2 border-green-600 rounded-xl px-40 p-14 ">
          <p className=" text-4xl font-extrabold mb-4">LOGIN</p>
          <form onSubmit={handleSubmit}>
            <Input
              name="Phnum"
              type="tel"
              placeholder="Mobile No."
              icon={FaPhone}
              maxLength={10}
              onChange={(e) => setPhNo(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              placeholder="password"
              icon={RiLockPasswordLine}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className=" bg-green-600 text-white font-extrabold  p-2 rounded-md shadow-2xl my-4">
              Login
            </button>
          </form>
          <div>
            Dont Have Acoount ?
            <Link to="/signin">
              <p className=" bg-green-300 w-[150px] mx-auto my-2 rounded-sm font-medium">
                Create Account
              </p>
            </Link>
          </div>
          <div className=" flex   h-[40px] rounded-xl justify-center my"></div>
        </div>
      </div>
    </>
  );
}
