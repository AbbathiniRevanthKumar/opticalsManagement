import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ heading }) => {
  const location = useLocation();
  const currentComponent = location.pathname.split("/")[2];
  return (
    <div className="pt-2 border-b border-black flex justify-between items-center">
      <div className="font-bold text-lg md:text-2xl ">{heading}</div>
      <div className="font-semibold text-xs md:text-base">
        <Link className="text-primary" to={"/app/"}>Home </Link>
        <span>/ {currentComponent}</span>
      </div>
    </div>
  );
};

export default Header;
