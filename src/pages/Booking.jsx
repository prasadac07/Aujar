import React from 'react'

function Booking() {
  return (
    <div className="m-4 rounded-md  bg-white p-6">
    <p className='text-lg font-bold text-center mt-4'>Booking history</p>
    <table class="my-8 w-[1200px] bg-white border border-gray-300 ml-auto mr-auto">
      <thead className='text-center'>
        <tr >
          <th class="border-b  text-lg ">Booking ID</th>
          <th class="border-b  text-lg ">Date</th>
          <th class="border-b  text-lg ">Driver Name</th>
          <th class="border-b  text-lg ">Destination</th>
          <th class="border-b  text-lg ">Capacity</th>
          <th class="border-b  text-lg ">Price</th>
          <th class="border-b  text-lg ">Status</th>
        </tr>
      </thead>
      <tbody>
      <tr className='text-center'>
          <td class=" border-b text-lg ">123456</td>
          <td class="border-b text-lg ">02/01/2005</td>
          <td class="border-b text-lg ">Jasprit</td>
          <td class="border-b text-lg ">Pune</td>
          <td class="border-b text-lg ">2000</td>
          <td class="border-b text-lg ">2000</td>
          <td class="border-b text-lg  "><div className=' bg-yellow-300 w-28 mx-auto'>Pending</div></td>

        </tr>
        <tr className='text-center'>
          <td class=" border-b text-lg ">123456</td>
          <td class="border-b text-lg ">02/01/2005</td>
          <td class="border-b text-lg ">Jasprit</td>
          <td class="border-b text-lg ">Mumbai</td>
          <td class="border-b text-lg ">2000</td>
          <td class="border-b text-lg ">2000</td>
          <td class="border-b text-lg  "><div className=' bg-green-600 w-28 mx-auto'>Accepted</div></td>

        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Booking