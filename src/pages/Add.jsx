import React from "react";

export default function Add() {
  return (
    // <div className=' text centre text-5xl font-black'>Add</div>
    
    <>
      <p className=" text-center text-green-800 text-3xl font-semibold mt-2 mb-5">
        
        let's Transport Goods together!!!
      </p>

      <form className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-2xl my-3 w-2/3">


        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Drivers Name:
        </label>
        <input
          type="text"
          name="Name"
          required
          className="border rounded-md px-3 py-2 w-full"
        />
         <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Vehicle Name:
        </label>
        <input
          type="text"
          name="Name"
          required
          className="border rounded-md px-3 py-2 w-full"
        />
        <label for="" class="block text-gray-700 font-bold my-2">
        Journey 
        </label>
        <div className=" flex">
          <p className=" my-auto p-1">From:</p>
          <input
            type="text"
            name="from"
            className="w-full p-2 border border-gray-300 rounded-md  my-auto"
          />
          <p className=" my-auto p-1">To:</p>
          <input
            type="text"
            name="to"
            className="w-full p-2 border border-gray-300 rounded-md "
          />
          
        </div>
        <p className=" my-auto p-1">Date</p>
          <input
            type="date"
            name="to"
            className="w-full p-2 border border-gray-300 rounded-md "
          />
          <p className=" my-auto p-1">Time</p>
          <input
            type="time"
            name="to"
            className="w-full p-2 border border-gray-300 rounded-md "
          />
        
        

        <label for="price" class="block text-gray-700 font-bold my-3">
          Enter the price/ton:
        </label>
        <div className=" flex mb-1">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 my-auto">
              ₹/ton
            </span>
            <input
              type="number"   
              id="price"
              name="price"
              step="1"
              className="w-full p-2 pl-8 border border-gray-300 rounded-md"
            />
          </div>
          
        </div>
        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Capacity(in ton):
        </label>
        <input
          type="number"
          name="capacity"
          required
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
          className="border rounded-md px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="mt-4  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}

