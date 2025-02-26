import React from "react";
import icons from "../../utils/icons";


const ToogleDrop = (props) => {
    const {name,isOpen=false,onClick} = props;
  return (
    <div className={`flex items-center justify-center gap-2 px-2 py-1 transistion-all duration-300`}>
      <div className=" font-semibold flex items-center justify-center">{name}</div>
      <div
        className="cursor-pointer rounded-lg flex items-center justify-center"
        onClick={onClick}
      >
        {isOpen ? (
          <icons.DropDown fontSize="medium" />
        ) : (
          <icons.DropUp fontSize="medium" />
        )}
      </div>
    </div>
  );
};

export default ToogleDrop;
