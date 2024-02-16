import React from "react";

export default function Add() {
  return (
    // <div className=' text centre text-5xl font-black'>Add</div>
    <>
      <p className=" text-center text-3xl font-semibold mt-2 mb-5">
        
        Earn By renting your Farm machinary
      </p>

      <form className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-2xl my-3 w-2/3">
        <div className="flex items-center  ">
          <label htmlFor="" className="mr-2">
            Choose a machinary:
          </label>
          <select id="" name="" className="p-2">
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
         <div className="flex items-center my-2  ">
          <label htmlFor="" className="mr-2">
            Choose Taluka:
          </label>
          <select id="" name="" className="p-2">
            <option value="tractor">Tractor</option>
            <option value="combineHarvester">Combine Harvester</option>
            <option value="plow">Plow</option>
            <option value="seedDrill">Seed Drill</option>
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
            className="w-full p-2 border border-gray-300 rounded-md  my-auto"
          />
          <p className=" my-auto p-1">To:</p>
          <input
            type="date"
            name="to"
            className="w-full p-2 border border-gray-300 rounded-md "
          />
        </div>

        <label for="price" class="block text-gray-700 font-bold my-3">
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
              step="1"
              className="w-full p-2 pl-8 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className=" flex">
          <p className=" font-medium mr-5 my-auto">Per Day:</p>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 my-auto">
              ₹
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

        <div className="mb-4 my-3">
          <label for="image" class="block text-gray-700 font-bold mb-2">
            Upload image:
          </label>
          <div className="flex items-center justify-center w-full h-32 border-dashed border-2 border-gray-400 rounded-md">
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
          </div>
        </div>

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
