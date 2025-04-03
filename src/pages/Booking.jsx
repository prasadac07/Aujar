import React, { useEffect, useState } from "react";

export default function Booking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/check-my-bookings/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        const responseData = await response.json();

        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-4 rounded-md bg-white p-6">
      <p className="text-lg font-bold text-center mt-4">Booking History</p>
      {data.length === 0 ? (
        <p className="text-center text-xl mt-8">There are no bookings.</p>
      ) : (
        <table className="my-8 w-[1200px] bg-white border border-gray-300 ml-auto mr-auto">
          <thead className="text-center">
            <tr>
              <th className="border-b text-lg">Booking ID</th>
              <th className="border-b text-lg">Date</th>
              <th className="border-b text-lg">Equipment Name</th>
              <th className="border-b text-lg">Prices</th>
              <th className="border-b text-lg">Status</th>
              <th className="border-b text-lg">Owner Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((currdata) => {
              const status = currdata.status;
              let statusClassName;
              switch (status) {
                case "pending":
                  statusClassName = "bg-yellow-400";
                  break;
                case "accepted":
                  statusClassName = "bg-green-400";
                  break;
                case "rejected":
                  statusClassName = "bg-red-400";
                  break;
                default:
                  statusClassName = "bg-white";
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
                  <td className="border-b text-lg">
                    {currdata.status === "accepted" ? (
                      <div>
                        <p className="font-bold">{currdata.owner_name}</p>
                        <p className="text-gray-600">{currdata.owner_phone}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400">Not Available</p>
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
