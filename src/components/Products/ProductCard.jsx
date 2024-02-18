import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import Book from '../../pages/Book';

// import './FlipCard.css';
export default function ProductCard() {

  useEffect(()=>{
    AOS.init({duration:"2000",});
},[])
const [modal,setModal]=useState(false)
const handleModal=()=>{
  setModal(!modal);
}
  return (
    <>
    <div >
    <div className=' w-[350px] text-center shadow-2xl bg-slate-50 p-5 rounded-2xl m-5'data-aos="flip-right">
       
       <p className=' font-bold text-3xl'>Mahindra Tractor</p>
       <p className=' text-xl'>Jethalal</p>
      <p className=' font-bold text-green-700'>₹ 1200 /ton</p>
      <p className=' font-bold text-green-700'>Capacity 200 ton</p>
      <p className=' font-bold text-green-700'>Pune-khandala</p>
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In impedit perspiciatis pariatur! Ab atque dicta eaque ex vitae cupiditate sequi impedit sunt asperiores praesentium accusamus aspernatur eligendi facilis a, exercitationem omnlaceat?</p>
     
      
      <button
        onClick={handleModal}
        className="my-4  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      >
        Book
      </button>

      
  {modal && <Book onclick={handleModal}/>}
      
       
    </div>
   
    </div>
    </>
  )
}
