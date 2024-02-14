import React from 'react'

export default function Add() {
  return (
    // <div className=' text centre text-5xl font-black'>Add</div>
    <>
      <p className=' text-center text-3xl font-semibold mt-2 mb-5'> Earn By renting your Farm machinary</p>

      <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-2xl my-3 w-1/3">

      <div className="flex items-center  ">
      <label htmlFor="" className="mr-2">Choose a machinary:</label>
      <select id="cars" name="cars" className="p-2">
      <option value="tractor">Tractor</option>
        <option value="combineHarvester">Combine Harvester</option>
        <option value="plow">Plow</option>
        <option value="seedDrill">Seed Drill</option>
      </select>
    </div>


      <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
        Select an image:
      </label>
      <input
        type="file"
        id="image"
        name="image"
        required
        className="border rounded-md px-3 py-2 w-full"
      />
      
      <label  className="block text-gray-700 text-sm font-bold mt-4 mb-2">
        Specification:
      </label>
      <input
        type="text"
        id="caption"
        name="caption"
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
  )
}
