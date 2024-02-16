import React from "react";
import ProductCard from "../components/Products/ProductCard";
import Manufacturer from "../components/Filter/Manufacturer";

export default function Get() {
  return (
    <>
      <div className=" flex justify-between">
        <div className=" w-[500px] p-4">
          <p className=" font-bold text-3xl mt-10 text-green-600">Add Filters</p>
           
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
              step="10"
              class="w-full h-2 rounded-lg cursor-pointer  dark:bg-gray-700"
              
            />

           
          </div>
          <div>
            <p className=" text-gray-700 font-bold mb-3">Equipment Type</p>
          <Manufacturer/>
          </div>
        </div>
        <div className=" flex flex-wrap ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
  
    </>
  );
}
