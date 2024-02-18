import React from 'react'

export default function Renting() {
  return (
    <div className=" m-4 rounded-md  bg-white p-6">
          <p className='text-lg font-bold text-center mt-4'>Renting history</p>
          <table class="my-8  w-[1200px] bg-white border border-gray-300 mr-auto ml-auto">
            <thead className='text-center'>
              <tr>
                <th class="border-b text-lg ">Booking ID</th>
                <th class="border-b text-lg ">Date</th>
                <th class="border-b text-lg ">Name </th>
                <th class="border-b text-lg ">Quantity</th>
                <th class="border-b text-lg ">Price</th>
                <th class="border-b text-lg ">Action</th>
                
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'>
                <td class=" border-b text-lg ">6534765</td>
                <td class=" border-b text-lg ">02/01/2005</td>
                <td class=" border-b text-lg ">Bumrah</td>
                <td class=" border-b text-lg ">200</td>
                <td class=" border-b text-lg ">2000</td>
                <td class="border-b text-lg flex justify-center gap-1">
                  <button type="button" class="bg-red-500 py-1 px-3 rounded text-white">Reject</button>
                  <button type="button" class="bg-green-500 py-1 px-3 rounded text-white">Accept</button>
                </td>

              </tr>
              <tr className='text-center'>
                <td class=" border-b text-lg ">6534765</td>
                <td class=" border-b text-lg ">02/01/2005</td>
                <td class=" border-b text-lg ">Bumrah</td>
                <td class=" border-b text-lg ">200</td>
                <td class=" border-b text-lg ">2000</td>
                <td class="border-b text-lg flex justify-center gap-1">
                  <button type="button" class="bg-red-500 py-1 px-3 rounded text-white">Reject</button>
                  <button type="button" class="bg-green-500 py-1 px-3 rounded text-white">Accept</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
  )
}
