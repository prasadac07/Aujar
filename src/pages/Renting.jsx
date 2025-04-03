import React, { useState, useEffect } from "react";

export default function Renting() {
  const [data, setData] = useState([]);

  const putreq = async (status, bookID) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/update-status/${bookID}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ status: status }),
        }
      );

      const responseData = await response.json();
      console.log("PUT response:", responseData);

      // Refetch updated data after status change
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/check-requests/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      const responseData = await response.json();
      setData(Array.isArray(responseData) ? responseData : []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-4 rounded-md bg-white p-6">
      <p className="text-lg font-bold text-center mt-4">Renting history</p>
      {data.length === 0 ? (
        <p className="text-center text-xl mt-8">There are no booking requests.</p>
      ) : (
        <table className="my-8 w-[1200px] bg-white border border-gray-300 mr-auto ml-auto">
          <thead className="text-center">
            <tr>
              <th className="border-b text-lg">Booking ID</th>
              <th className="border-b text-lg">Date</th>
              <th className="border-b text-lg">Equipment Name</th>
              <th className="border-b text-lg">Prices</th>
              <th className="border-b text-lg">Status</th>
              <th className="border-b text-lg">Asker Details</th>
              <th className="border-b text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((currdata) => {
              const currentStatus = currdata.status || "pending";
              return (
                <tr key={currdata.id} className="text-center">
                  <td className="border-b text-lg">{currdata.id}</td>
                  <td className="border-b text-lg">{currdata.when_date}</td>
                  <td className="border-b text-lg">{currdata.equipement_type}</td>
                  <td className="border-b text-lg">{currdata.price}</td>
                  <td className="border-b text-lg">{currentStatus}</td>
                  
                  {/* Show asker's details only if status is accepted */}
                  <td className="border-b text-lg">
                    {currentStatus === "accepted" ? (
                      <>
                        <p><strong>Name:</strong> {currdata.asker_name}</p>
                        <p><strong>Phone:</strong> {currdata.asker_phone}</p>
                      </>
                    ) : (
                      <p>-</p>
                    )}
                  </td>

                  <td className="border-b text-lg flex justify-center gap-1">
                    {currentStatus === "accepted" ? (
                      <button
                        onClick={() => putreq("rejected", currdata.id)}
                        className="bg-red-500 py-1 px-3 rounded text-white"
                      >
                        Reject
                      </button>
                    ) : currentStatus === "rejected" ? (
                      <button
                        onClick={() => putreq("accepted", currdata.id)}
                        className="bg-green-500 py-1 px-3 rounded text-white"
                      >
                        Accept
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => putreq("accepted", currdata.id)}
                          className="bg-green-500 py-1 px-3 rounded text-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => putreq("rejected", currdata.id)}
                          className="bg-red-500 py-1 px-3 rounded text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
