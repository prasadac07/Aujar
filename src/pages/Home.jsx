import React, { useEffect } from "react";
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
        <div className="bg-green-600 p-5 md:flex">
          <img src="tractor.webp" alt="Tractor for rent" className="" />
          <div className="text-center md:my-auto">
            <p className="my-5 font-semibold md:p-3">
              Access affordable farm equipment without the high purchase costs. Our platform
              connects farmers with equipment owners to rent machinery on-demand. 
              Save money and increase efficiency with our wide selection of tractors,
              harvesters, and specialized agricultural tools.
            </p>

            <NavLink to="/get">
              <button className="border-solid border-7 border-green-700 bg-white py-2 px-4 font-semibold rounded-md hover:bg-green-50 transition-colors">
                Book Equipment
              </button>
            </NavLink>
          </div>
        </div>
        
        <div className="my-6 flex justify-center">
          <img src="services.jpg" alt="Farm equipment services" className="h-[200px] md:h-[500px]" />
        </div>
      </div>
      
      <div className="md:flex my-5 items-center">
        <img 
          src="app.png" 
          alt="Mobile app for equipment booking" 
          className="w-[300px] mx-auto md:w-2/5 md:ml-9"
          data-aos="fade-right"
        />
        <p className="text-center w-[400px] md:w-[600px] mx-auto font-medium mt-4 md:mt-0" data-aos="fade-left">
          <span className="block text-xl text-green-700 font-bold mb-2">Book Equipment On-The-Go</span>
          Our mobile-friendly platform makes it easy to find and book farm equipment whenever you need it.
          Browse available equipment near you, compare prices, check specifications, and book instantly.
          Save your favorite equipment for quick access and receive notifications when your preferred machinery becomes available.
        </p>
      </div>

      <div className="md:flex my-8 items-center flex-row-reverse">
        <img 
          src="home1.png" 
          alt="Equipment listing" 
          className="w-[300px] mx-auto md:w-2/5 md:mr-9"
          data-aos="fade-left"
        />
        <p className="text-center w-[400px] md:w-[600px] mx-auto font-medium mt-4 md:mt-0" data-aos="fade-right">
          <span className="block text-xl text-green-700 font-bold mb-2">Earn Income From Your Equipment</span>
          Own farm equipment that sits idle? List it on our platform and earn extra income when you're not using it.
          Set your own rental rates and availability schedule. Our secure payment system ensures timely payments,
          and our verification process helps connect you with reliable renters. Turn your equipment into a revenue stream during off-seasons.
        </p>
      </div>
      
      <div className="bg-green-50 py-8 px-4 my-8 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-6">Why Choose Our Platform?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Cost-Effective</h3>
            <p>Access high-quality equipment at a fraction of the purchase price. Pay only for the time you need.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Wide Selection</h3>
            <p>From tractors and harvesters to specialized tools, find exactly what you need for your farming operations.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Local Network</h3>
            <p>Connect with equipment owners in your taluka for quicker access and reduced transportation costs.</p>
          </div>
        </div>
      </div>
      
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Ready to Get Started?</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <NavLink to="/get">
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-semibold transition-colors">
              Find Equipment
            </button>
          </NavLink>
          <NavLink to="/add">
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 py-2 px-6 rounded-md font-semibold transition-colors">
              List Your Equipment
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}