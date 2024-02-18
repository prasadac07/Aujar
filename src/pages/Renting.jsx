import React, { useState, useEffect } from "react";

export default function Renting() {
  const [data, setData] = useState([]);
  const [res, setRes] = useState();
  const [bookID, setbookID] = useState();

  const putreq = async () => {
    try {
      const response = await fetch(
        `http://192.168.137.1:8000/api/update-status/${bookID}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        
            // token: "19227f7f8ce0ef185c0457b74eadd5cb9af69b0c",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            status: res, // Assuming res is the status you want to send
            
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      // Set the data in the state
      setData(responseData);
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  const accepted = "accepted";
  const rejected = "rejected";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.137.1:8000/api/check-requests/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: "19227f7f8ce0ef185c0457b74eadd5cb9af69b0c",
              httpvinay: "localStorage.getItem('token')",
            },
          }
        );

        // Make a GET request using axios
        const responseData = await response.json();

        // Set the data in the state if it is an array
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          console.error("Invalid response data:", responseData);
        }
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
      <div className=" m-4 rounded-md  bg-white p-6">
        <p className="text-lg font-bold text-center mt-4">Renting history</p>
        <table className="my-8 w-[1200px] bg-white border border-gray-300 mr-auto ml-auto">
          <thead className="text-center">
            <tr>
              <th className="border-b text-lg ">Booking ID</th>
              <th className="border-b text-lg ">Date</th>
              <th className="border-b text-lg ">Equipment Name</th>
              <th className="border-b text-lg ">Prices</th>
              <th className="border-b text-lg ">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((currdata) => (
              <tr key={currdata.id} className="text-center">
                <td className="border-b text-lg">{currdata.id}</td>
                <td className="border-b text-lg">{currdata.when_date}</td>
                <td className="border-b text-lg">{currdata.equipment_type}</td>
                <td className="border-b text-lg">{currdata.price}</td>
                <td className="border-b text-lg flex justify-center gap-1">
                  <button
                    onClick={() => {
                      setRes(rejected);
                      setbookID(stringify(currdata.id)); // Make sure to set bookID before calling putreq
                      putreq();
                    }}
                    className="bg-green-500 py-1 px-3 rounded text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setRes(accepted);
                      setbookID(stringify(currdata.id)); // Make sure to set bookID before calling putreq
                      putreq();
                    }}
                    className="bg-red-500 py-1 px-3 rounded text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}