import React from "react";
import { FaTimes } from "react-icons/fa";
const Modal = (props) => {
  const { header, onCloseModal, children } = props;
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-6  overflow-hidden">
      <div className="bg-secondary rounded-lg h-fit max-h-full w-full md:w-2/3 shadow-sm overflow-auto flex flex-col justify-between ">
        <div className="flex justify-between px-6 pt-4 bg-opacity-70 items-center sticky top-0 z-20 ">
          <div className="text-lg font-semibold bg-primary bg-opacity-90 px-4 py-2  rounded-full w-40 md:w-80 text-center shadow-sm">
            {header}
          </div>
          <button
            className="flex items-center cursor-pointer btn w-fit p-2 rounded-full shadow-sm text-secondary hover:text-black"
            onClick={onCloseModal}
          >
            <FaTimes className="text-xl md:text-2xl" />
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
