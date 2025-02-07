import React from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";

const SidebarElement = ({ element, active ,onClick}) => {
  const IconComponent = icons[element];
  const isActive = active === element;

  return (
    <Link to={`/app/${String(element).toLowerCase()}`}
      className={`flex justify-center flex-col cursor-pointer ${
        isActive ? "bg-white shadow-sm " : "bg-transparent "
      } rounded-e-md bg-opacity-90 hover:bg-opacity-100 h-12 md:h-16 w-full transition-all ease-out duration-300 p-2 gap-2`}
      onClick={onClick}
    >
      <i className="flex justify-center md:justify-end rounded-lg">
        <IconComponent fontSize="medium" />
      </i>
      <h1 className="hidden md:flex justify-center md:justify-end font-semibold text-sm md:text-[0.9em]">
        {element}
      </h1>
    </Link>
  );
};

export default SidebarElement;
