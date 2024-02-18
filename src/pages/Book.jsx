import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
export default function Book({handleModal}) {
    const [capacity,setcapacity]=useState(0);
    const [itemprice,setitemprice]=useState(1200)
    const [price,setPrice]=useState(0);
    useEffect(()=>{
         setPrice(capacity*itemprice)
    },[capacity])

    useEffect(() => {
      // Disable scrolling when the modal is open
      document.documentElement.style.overflowY = "hidden";
    
          // Re-enable scrolling when the modal is closed
      return () => {
        document.documentElement.style.overflowY = "scroll";
        
      };
    }, []);
  return ReactDOM.createPortal(
    <>
    <div className="">

   
      <div className=" w-3/4 mx-auto rounded-2xl shadow-2xl top-[20%] left-[15%] fixed bg-green-100 p-10  ">
        <div className=" flex">
          <div className=" text-center p-4">
            <p className=" text-2xl font-bold">Tractor</p>
            <p className=" text-xl font-semibold">Mahindra</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              dignissimos velit labore delectus deserunt ipsum eos, repellendus
              deleniti necessitatibus laudantium quo nam, incidunt, voluptas qui
              sunt commodi voluptatibus voluptatem esse.
            </p>
            <p className=" font-extrabold">₹ 1200 /ton</p>
            <p>From pune to khandala</p>
            <form action="">

            <label>
              Quantity :
              <input
                type="number"
                
                min="1"
                step="1"
                onChange={(e)=>setcapacity(e.target.value)}
                className=" border-2 border-green-500 ml-3"
                required
              />
            </label>
            <p className=" font-bold text-2xl">Price : <span className=" font-semibold">₹{price}</span> </p>

            
            <button className="my-4  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleModal}>Confirm Booking</button>
            </form>
           
          </div>
        </div>
      </div>
      </div>
    </>,
    document.querySelector('.modal')
  );
}
