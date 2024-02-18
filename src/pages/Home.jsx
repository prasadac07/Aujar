import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Button1 from "../components/Buttons/button1";
import Footer from "../components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
export default function Home() {
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);
  return (
    <>
      <div className="">
        <div className=" bg-green-600 p-5 md:flex ">
          <img src="tractor.webp" alt="" className="" />
          <div className=" text-center md:my-auto">
            <p className=" text-white text-5xl  my-5 font-semibold md:p-3">
            Let's Farm Conveniently, Book  Machinery Rentals Today!
            </p>

            <NavLink to="/get">
              <button className=" border-solid border-7 border-green-700 bg-white py-2 px-4 font-semibold rounded-md">
                book
              </button>
            </NavLink>
          </div>
        </div>
        <div className=" my-6 flex justify-center" >
          <img src="services.jpg" alt="" className="h-[200px] md:h-[500px]" />
        </div>
      </div>
      <div className="md:flex my-5" >
        <img src="app.png" alt="" className=" w-[300px] ml-auto mr-auto  md:w-2/5 ml-9"/>
        <p className="text-center w-[400px] md:my-auto w-[600px] mx-auto font-bold">An innovative solution connecting farmers with local machinery owners, offering transparent rentals, real-time market data, and seamless logistics. Imagine maximizing your harvests, optimizing resource use, and boosting your profits - all through a user-friendly platform designed with your success in mind.</p>
      </div>


      <div className=" md:flex my-5" >
      <p className=" text-center w-[400px] md:my-auto w-[600px] mx-auto font-bold">Whether you're a seasoned farmer or just starting out, we can help you thrive. Discover a diverse range of machinery at competitive rates, find reliable providers in your area, and make informed decisions with instant market insights. Our integrated transportation options ensure smooth deliveries, and our secure platform prioritizes communication and trust. Join the future of farming and unlock a world of possibilities.</p>
        <img src="home1.png" alt="" className="w-[300px] ml-auto mr-auto   md:w-2/5 ml-9 " />
        
      </div>
    </>
  );
}
