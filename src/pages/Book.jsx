import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
export default function Book({
  handleModal,
  img,
  type,
  company,
  spec,
  rate,
  from,
  till,
  taluka,
  id,
}) {
  const [hours, setHours] = useState(0);
  const [price, setPrice] = useState();
  const [book, setbook] = useState(false);
  const[bookDate,setBookdate]=useState();
  useEffect(() => {
    setPrice(hours * 1200);
  }, [hours]);

  useEffect(() => {
    // Disable scrolling when the modal is open
    document.documentElement.style.overflowY = "hidden";

    // Re-enable scrolling when the modal is closed
    return () => {
      document.documentElement.style.overflowY = "scroll";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://192.168.137.1:8000/api/bookproduct/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            httpvinay: "localStorage.getItem('token')",
          },
          body: JSON.stringify({
            id: id,
            hours: hours,
            date:bookDate
          }),
        }
      );
      setbook(true);
      if (!response.ok) {
        alert("error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("error");
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="">
        <div className=" w-3/4 mx-auto rounded-2xl shadow-2xl top-[20%] left-[15%] fixed bg-slate-50 p-10  ">
          <div className=" flex">
            <img src={img} alt="" className=" rounded-l-2xl" />
            <div className=" text-center p-4">
              <p className=" text-2xl font-bold">{type}</p>
              <p className=" text-xl font-semibold">{company}</p>
              <p className="">{spec}</p>
              <p className=" font-extrabold">₹ {rate} /hr</p>

              <p>{taluka}</p>
              <form onSubmit={handleSubmit}>
                <label>
                  Number of Hours :
                  <input
                    type="number"
                    min="1"
                    max="24"
                    step="1"
                    onChange={(e) => setHours(e.target.value)}
                    className=" border-2 border-green-500 ml-3"
                    required
                  />
                  <div className=" flex ">
                  <p className=" mr-4"> select booking dates :</p>
                  <div>
                  <input
                    type="date"
                    id="dateInput"
                    name="dateInput"
                    onChange={(e)=>setBookdate(e.target.value)}
                 
                    min={from}
                    max={till}
                  />
                  </div>
                 
                  </div>
               
                </label>
                <p className=" font-bold text-2xl">
                  Price : <span className=" font-semibold">₹{price}</span>{" "}
                </p>

                <button
                  className="my-4  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={handleModal}
                >
                  Confirm Booking
                </button>
              </form>

              {book && (
                <div className=" p-3 bg-green-600">Booking successfull</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector(".modal")
  );
}
