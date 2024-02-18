import React, { useEffect } from "react";
import ProductCard from "../components/Products/ProductCard";
import Manufacturer from "../components/Filter/Manufacturer";
// import axios from "axios";
import { useState } from "react";

export default function Get() {
  const [data, setData] = useState([]);
  const[filterPrice,setfilterPrice]=useState();


 
  useEffect(() => {
    
       let newproduct=[];
       newproduct=data.filter((data)=>data.ask_price<=filterPrice)
       console.log(newproduct)
       setData(newproduct)

    // Call the fetchData function
    // fetchData();
  }, [filterPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch( "http://192.168.137.1:8000/api/postproduct/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token'),
            'httpvinay':"localStorage.getItem('token')"
          },
         
        });
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
      <div className=" flex justify-between ">
        <div className=" w-[500px] p-4">
          <p className=" font-bold text-3xl mt-10 text-green-600">
            Add Filters
          </p>

          <div class="my-4">
            <label for="priceRange" class="block text-gray-700 font-bold mb-2">
              Select price range:
            </label>
            <input
              type="range"
              id="priceRange"
              name="priceRange"
              min="0"
              max="50000"
              onChange={(e)=>setfilterPrice(e.target.value)}
              step="10"
              className=" h-2 rounded-lg cursor-pointer  dark:bg-gray-700"
            />
            <span>₹{filterPrice}</span>
          </div>
          <div>
            <p className=" text-gray-700 font-bold mb-3">Equipment Type</p>
            <Manufacturer />
          </div>
        </div>
        <div className=" flex flex-wrap ">
          {data.map((currdata) => {
            const {
              image_link,
              product_type,
              company_name,
              description,
              ask_price,
              id,
              available_from,
              available_till,
              taluka,
            } = currdata;
            return (
              <>
                <ProductCard
                  id={id}
                  img={image_link}
                  type={product_type}
                  company={company_name}
                  spec={description}
                  rate={ask_price}
                  taluka={taluka}
                  from={available_from}
                  till={available_till}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
