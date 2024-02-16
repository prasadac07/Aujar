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
            <p className=" my-5 font-semibold md:p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              at nam error nesciunt sit, officia magni quam vero culpa. Porro
              repellendus aspernatur aut enim cumque magni excepturi iste beatae
              possimus?
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
        <p className="text-center w-[400px] md:my-auto w-[600px] mx-auto font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus modi, eligendi dolorum, maxime optio consequatur earum eveniet beatae facilis incidunt dignissimos. Aperiam aspernatur quam iusto. Minima pariatur repellendus fuga. Voluptas?</p>
      </div>


      <div className=" md:flex my-5" >
      <p className=" text-center w-[400px] md:my-auto w-[600px] mx-auto font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus modi, eligendi dolorum, maxime optio consequatur earum eveniet beatae facilis incidunt dignissimos. Aperiam aspernatur quam iusto. Minima pariatur repellendus fuga. Voluptas?</p>
        <img src="home1.png" alt="" className="w-[300px] ml-auto mr-auto   md:w-2/5 ml-9 " />
        
      </div>
    </>
  );
}
