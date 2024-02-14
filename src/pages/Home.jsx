import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Button1 from "../components/Buttons/button1";
import Footer from "../components/footer/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Home() {

  useEffect(()=>{
    AOS.init({duration:"1000"});
},[])
  return (
    <>
      
      <div className="">
        <div className=" bg-green-600 flex justify-evenly p-3">
          <img src="tractor.webp" alt="" className="" />
          <div className=" w-[500px] text-center my-auto">
            <p className=" my-5 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              at nam error nesciunt sit, officia magni quam vero culpa. Porro
              repellendus aspernatur aut enim cumque magni excepturi iste beatae
              possimus?
            </p>
            <button className=" border-solid border-7 border-green-700 bg-white py-2 px-4 font-semibold rounded-md">
              book
            </button>
          </div>
        </div>
        <div className=" my-6 flex justify-center" data-aos="zoom-in">
          
            <img src="services.jpg" alt="" className=" h-[500px]" />
        </div>
      </div>
      <div className=" flex" data-aos="fade-right">
        <img src="app.png" alt="" className=" w-2/5 ml-9"/>
        <p className=" my-auto w-[600px] mx-auto font-bold ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus modi, eligendi dolorum, maxime optio consequatur earum eveniet beatae facilis incidunt dignissimos. Aperiam aspernatur quam iusto. Minima pariatur repellendus fuga. Voluptas?</p>
      </div>


      <div className=" flex my-5" data-aos="fade-left">
      <p className=" my-auto w-[600px] mx-auto font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus modi, eligendi dolorum, maxime optio consequatur earum eveniet beatae facilis incidunt dignissimos. Aperiam aspernatur quam iusto. Minima pariatur repellendus fuga. Voluptas?</p>
        <img src="home1.png" alt="" className=" w-2/5 ml-9 " />
        
      </div>
      
    </>
  );
}
