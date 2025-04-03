import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import Input from "../../components/InputBox/Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";

export default function Login() {
  const [Pass, setPass] = useState("");
  const [PhNo, setPhNo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Make an Axios POST request to your backend endpoint
      const response = await axios.post('http://localhost:8000/api/login/', {
        password: Pass,
        username: PhNo
      }, { withCredentials: true });
     
      console.log(response);
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("phno", PhNo);
      
      // Force a reload of the page to update navbar
      window.location.href = "/home";
      
      // The following code won't execute due to the page reload
      // navigate("/home");
    } catch (error) {
      console.error('Error submitting data:', error);
      setError(error.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <>
      <div className="flex justify-evenly my-6">
        <div className="flex-col my-auto text-center border-2 border-green-600 rounded-xl px-40 p-14">
          <p className="text-4xl font-extrabold mb-4">LOGIN</p>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              name="Phnum"
              type="tel"
              placeholder="Mobile No."
              icon={FaPhone}
              maxLength={10}
              onChange={(e) => setPhNo(e.target.value)}
              value={PhNo}
            />
            <Input
              name="password"
              type="password"
              placeholder="password"
              icon={RiLockPasswordLine}
              onChange={(e) => setPass(e.target.value)}
              value={Pass}
            />
            <button 
              className="bg-green-600 text-white font-extrabold p-2 rounded-md shadow-2xl my-4 w-full hover:bg-green-700 disabled:bg-green-400"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div>
            Don't Have Account?
            <Link to="/signin">
              <p className="bg-green-300 w-[150px] mx-auto my-2 rounded-sm font-medium">
                Create Account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}