import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import Book from "../../pages/Book";

// import './FlipCard.css';
export default function ProductCard({
  img,
  type,
  company,
  spec,
  rate,
  from,
  till,
  taluka,
  id
}) {
  useEffect(() => {
    AOS.init({ duration: "2000" });
  }, []);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div>
        <div
          className=" w-[350px] text-center shadow-2xl bg-slate-50 p-5 rounded-2xl m-5"
          data-aos="flip-right"
        >
          <img src={img} alt="" />
          <p className=" font-bold text-3xl">{type}</p>
          <p className=" text-xl">{company}</p>
           <p>{from} -  {till}</p>
          <p className=" font-extrabold">₹ {rate} /hr</p>

          <button
            onClick={handleModal}
            className="my-4  bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            Book
          </button>

          {modal && <Book onclick={handleModal} img={img} type={type} company={company} spec={spec} rate={rate} taluka={taluka} from={from} till={till} id={id} />}
        </div>
      </div>
    </>
  );
}
