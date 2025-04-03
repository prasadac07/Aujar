import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa";
import Input from "../../components/InputBox/Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  // Form state
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [Pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [PhNo, setPhNo] = useState("");
  const [PinCode, setPinCode] = useState("");
  
  // Error handling state
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!FName) newErrors.FName = "First name is required";
    if (!LName) newErrors.LName = "Last name is required";
    if (!Pass) newErrors.Pass = "Password is required";
    if (Pass !== ConfirmPass) newErrors.ConfirmPass = "Passwords do not match";
    if (!PhNo) newErrors.PhNo = "Mobile number is required";
    if (PhNo && PhNo.length !== 10) newErrors.PhNo = "Mobile number must be 10 digits";
    if (!PinCode) newErrors.PinCode = "Pin code is required";
    if (PinCode && PinCode.length !== 6) newErrors.PinCode = "Pin code must be 6 digits";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setServerError("");
    
    // Validate form
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Make an Axios POST request to your backend endpoint
      const response = await axios.post('http://localhost:8000/api/register/', {
        first_name: FName,
        last_name: LName,
        password: Pass,
        username: PhNo,
        pincode: PinCode
      });
      
      // If your API returns a token on registration, store it
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("phno", PhNo);
      }
      
      // Force page reload to update navbar
      window.location.href = "/home";
    } catch (error) {
      // Handle error response from server
      console.error('Error submitting data:', error);
      
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const data = error.response.data;
        
        if (typeof data === 'string') {
          setServerError(data);
        } else if (data.username) {
          setServerError(`Mobile number ${data.username}`);
        } else if (data.error) {
          setServerError(data.error);
        } else if (data.detail) {
          setServerError(data.detail);
        } else {
          setServerError("Registration failed. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setServerError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        setServerError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-evenly my-6">
        <div className="flex-col my-auto text-center border-2 border-green-600 rounded-xl px-40 p-14">
          <p className="text-4xl font-extrabold mb-4">SIGN UP</p>
          
          {/* Display server error message */}
          {serverError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
              {serverError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                name="first"
                type="text"
                placeholder="First Name"
                icon={MdOutlineAccountCircle}
                onChange={(e) => setFName(e.target.value)}
                value={FName}
              />
              {errors.FName && <p className="text-red-500 text-sm text-left mt-1">{errors.FName}</p>}
            </div>
            
            <div className="mb-4">
              <Input
                name="last"
                type="text"
                placeholder="Last Name"
                icon={MdOutlineAccountCircle}
                onChange={(e) => setLName(e.target.value)}
                value={LName}
              />
              {errors.LName && <p className="text-red-500 text-sm text-left mt-1">{errors.LName}</p>}
            </div>
            
            <div className="mb-4">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                icon={RiLockPasswordLine}
                onChange={(e) => setPass(e.target.value)}
                value={Pass}
              />
              {errors.Pass && <p className="text-red-500 text-sm text-left mt-1">{errors.Pass}</p>}
            </div>
            
            <div className="mb-4">
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                icon={RiLockPasswordLine}
                onChange={(e) => setConfirmPass(e.target.value)}
                value={ConfirmPass}
              />
              {errors.ConfirmPass && <p className="text-red-500 text-sm text-left mt-1">{errors.ConfirmPass}</p>}
            </div>
            
            <div className="mb-4">
              <Input
                name="Phnum"
                type="tel"
                placeholder="Mobile No."
                icon={FaPhone}
                maxLength={10}
                onChange={(e) => setPhNo(e.target.value)}
                value={PhNo}
              />
              {errors.PhNo && <p className="text-red-500 text-sm text-left mt-1">{errors.PhNo}</p>}
            </div>
            
            <div className="mb-4">
              <Input
                name="pin"
                type="tel"
                placeholder="Pin Code"
                icon={FaMapMarkerAlt}
                maxLength={6}
                onChange={(e) => setPinCode(e.target.value)}
                value={PinCode}
              />
              {errors.PinCode && <p className="text-red-500 text-sm text-left mt-1">{errors.PinCode}</p>}
            </div>

            <button 
              className="bg-green-600 text-white font-extrabold p-2 rounded-md shadow-2xl my-6 w-full hover:bg-green-700 transition-colors disabled:bg-green-400" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            
            <p className="mt-4 text-sm">
              Already have an account? 
              <span 
                className="text-green-600 ml-1 cursor-pointer hover:underline"
                onClick={() => navigate('/login')}
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}