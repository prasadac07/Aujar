import React, { useEffect, useState } from "react";

export default function Booking() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.137.1:8000/api/check-my-bookings/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
              httpvinay: "localStorage.getItem('token')",
            },
          }
        );
        // Make a GET request using axios
        const responseData = await response.json();

        // Set the data in the state
        setData(responseData);

        // Set the data in the state
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  return (
    <>
    <div className="m-4 rounded-md bg-white p-6">
      <p className="text-lg font-bold text-center mt-4">Booking history</p>
      <table className="my-8 w-[1200px] bg-white border border-gray-300 ml-auto mr-auto">
        <thead className="text-center">
          <tr>
          <th className="border-b text-lg">Booking ID</th>
            <th className="border-b text-lg">Date</th>
            <th className="border-b text-lg">Equipment Name</th>
            <th className="border-b text-lg">Prices</th>
            <th className="border-b text-lg">Status</th>
          </tr>
        </thead>


<tbody>
  {data.map((currdata) => {
    const status = currdata.status;
    let statusClassName;

    switch (status) {
      case 'pending':
        statusClassName = 'bg-yellow-400';
        break;
      case 'accepted':
        statusClassName = 'bg-green-400';
        break;
      case 'rejected':
        statusClassName = 'bg-red-400';
        break;
      default:
        statusClassName = 'bg-white';
    }

    return (
      <tr key={currdata.id} className="text-center">
        <td className="border-b text-lg">{currdata.id}</td>
        <td className="border-b text-lg">{currdata.when_date}</td>
        <td className="border-b text-lg">{currdata.equipement_type}</td>
        <td className="border-b text-lg">{currdata.price}</td>
        <td className={`border-b text-lg ${statusClassName}`}>
          <div className="w-28 mx-auto">{currdata.status}</div>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  </>
  );
}
