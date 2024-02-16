import React from "react";
import { NavLink } from "react-router-dom";

export default function Button1(props) {
  return (
    <button className=" font-medium my-1 rounded-lg w-32 bg-green-600 text-white md:border-solid border-2 border-green-600  px-6 font-extrabold">
      <NavLink to={props.path}>
      {props.name}
      </NavLink>
      
    </button>
  );
}
