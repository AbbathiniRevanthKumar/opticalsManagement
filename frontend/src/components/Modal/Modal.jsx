import React from "react";
import { FaTimes } from "react-icons/fa";
const Modal = (props) => {
  const { header, onCloseModal, children } = props;
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-6  overflow-hidden">
      <div className="bg-secondary  rounded-lg h-full w-full md:w-1/2 shadow-sm  overflow-hidden">
        <div className="flex justify-between  p-2 px-4 bg-opacity-70 items-center">
          <div className="text-lg font-semibold bg-primary px-4 py-1  rounded-full ">
            {header}
          </div>
          <button
            className="flex items-center cursor-pointer"
            onClick={onCloseModal}
          >
            <FaTimes className="text-xl md:text-2xl"/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
