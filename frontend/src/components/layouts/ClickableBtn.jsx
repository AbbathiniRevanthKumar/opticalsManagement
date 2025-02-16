import React from "react";

const ClickableBtn = ({ active = false, hidden, onClick, children }) => {
  return (
    <div
      className={`${hidden ? "hidden md:flex" : "md:flex"} ${
        active ? "bg-primary backgroundLoader bg-opacity-85" : "bg-white"
      }  rounded-lg px-4 py-1 md:py-2 md:h-24 w-full  shadow-md flex items-center cursor-pointer transition-all ease-out duration-300`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ClickableBtn;
