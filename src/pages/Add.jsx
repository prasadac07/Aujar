import React, { useState } from "react";
import axios from 'axios'
import { stringify } from "postcss";
export default function Add() {
  const [machinary,setMachinary]=useState();
  const [company,setCompany]=useState();
  const [spec,setSpec]=useState();
  const [taluka,setTaluka]=useState()
  const [todate,setToDate]=useState()
  const [fromdate,setFromDate]=useState()
  const [price,setPrice]=useState()
  const[upload,setUpload]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todate);
    console.log(fromdate);
    const UserID = 3;
  
    try {
      const response = await fetch('http://192.168.137.1:8000/api/postproduct/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token'),
          'httpvinay':"localStorage.getItem('token')"
        },
        body: JSON.stringify({
          id: UserID,
          product_type: machinary,
          company_name: company,
          description: spec,
          taluka: taluka,
          ask_price: price,
          available_till: todate,
          available_from: fromdate,
          pincode: 411046,
        }),
      });
  
      if (!response.ok) {
        alert("error")
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setUpload(true);
    } catch (error) {
      console.error('Error:', error);
      alert("error")
    }
  };
  
  return (
    // <div className=' text centre text-5xl font-black'>Add</div>
    <>
      <p className=" text-center text-3xl font-semibold mt-2 mb-5">
        
        Earn By renting your Farm machinary
      </p>

      <form className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-2xl my-3 w-2/3" onSubmit={handleSubmit}>
        <div className="flex items-center  ">
          <label htmlFor="" className="mr-2">
            Choose a machinary:
          </label>
          <select id="" name="" className="p-2" onChange={(e)=>setMachinary(e.target.value)}>
            <option value="tractor">Tractor</option>
            <option value="combineHarvester">Combine Harvester</option>
            <option value="plow">Plow</option>
            <option value="seedDrill">Seed Drill</option>
          </select>
        </div>

        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Company Name:
        </label>
        <input
          type="text"
          name="company"
          required
         onChange={(e)=>setCompany(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />

        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Specification:
        </label>
        <input
          type="text"
          id="caption"
          name="specification"
          required
          onChange={(e)=>setSpec(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />
         <div className="flex items-center my-2  ">
          <label htmlFor="" className="mr-2">
            Choose Taluka:
          </label>
          <select id="" name="" className="p-2" onChange={(e)=>setTaluka(e.target.value)}>
            <option value="Bhor">Bhor</option>
            <option value="Haveli">Haveli</option>
            <option value="khed">Khed</option>
            <option value="phaltan">Phaltan</option>
          </select>
        </div>
        <label for="" class="block text-gray-700 font-bold my-2">
          Availability:
        </label>
        <div className=" flex">
          <p className=" my-auto p-1">From:</p>
          <input
            type="date"
            name="from"
            onChange={(e)=>setFromDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md  my-auto"
          />
          <p className=" my-auto p-1">To:</p>
          <input
            type="date"
            onChange={(e)=>setToDate(e.target.value)}
            name="to"
            className="w-full p-2 border border-gray-300 rounded-md "
          />
        </div>

        <label  className="block text-gray-700 font-bold my-3">
          Enter the price:
        </label>
        <div className=" flex mb-1">
          <p className=" font-medium mr-3 my-auto">Per Hour:</p>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 my-auto">
              ₹
            </span>
            <input
              type="number"
              id="price"
              name="price"
              onChange={(e)=>setPrice(e.target.value)}
              step="1"
              className="w-full p-2 pl-8 border border-gray-300 rounded-md"
            />
          </div>
        </div>

     

        <div className="mb-4 my-3">
          <label for="image" className="block text-gray-700 font-bold mb-2">
            Upload image:
          </label>
          {/* <div className="flex items-center justify-center w-full h-32 border-dashed border-2 border-gray-400 rounded-md">
            <label for="image" class="cursor-pointer text-gray-500">
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span className=" mx-auto">Choose File</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
            />
          </div> */}
        </div>

        <button
          type="submit"
          className="mt-4  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {upload && <div className=" text-black p-3 bg-green-600 my-9 w-[300px] mx-auto text-center">Form uploaded succesfully</div>}
    </>
  );
}
