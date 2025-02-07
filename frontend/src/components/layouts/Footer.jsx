import React from "react";
import icons from "../../utils/icons";
const Footer = () => {
  const HeartComponent = icons.Heart;
  const year = new Date('01-01-2020').getFullYear();
  return (
    <div className="bg-white  h-fit rounded-t-3xl fixed bottom-0 left-2 right-2 z-30 flex items-center justify-center px-6 py-2 shadow-md font-semibold gap-2 ">
      <div>Mahesh Opticals</div>
      <div>{year}</div>
      <i>
        <HeartComponent className="text-primary"/>
      </i>
    </div>
  );
};

export default Footer;
