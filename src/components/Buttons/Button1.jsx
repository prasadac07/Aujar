import React from "react";
import { NavLink } from "react-router-dom";

export default function Button1(props) {
  return (
    <button className="border-solid border-2 border-green-600  px-6 font-extrabold">
      <NavLink to={props.path}>
      {props.name}
      </NavLink>
      
    </button>
  );
}
