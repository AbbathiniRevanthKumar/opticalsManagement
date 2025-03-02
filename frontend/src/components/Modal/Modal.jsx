import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
const Modal = (props) => {
  const { header, onCloseModal, children } = props;

  useEffect(() => {
    if (header) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [header]);

  const onClose = () => {
    document.body.style.overflow = "auto";
    onCloseModal();
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-6  overflow-hidden ">
      <div className="bg-secondary rounded-lg h-fit max-h-full w-full md:w-2/3 shadow-sm overflow-auto flex flex-col justify-between modalLoader">
        <div className="flex justify-between px-6 pt-4 bg-opacity-70 items-center sticky top-0 z-20 gap-4">
          <div className="text-sm md:text-lg font-semibold bg-primary bg-opacity-90 px-6 py-2  rounded-full  text-center shadow-sm w-fit">
            {header}
          </div>
          <button
            className="flex items-center cursor-pointer btn w-fit p-2 rounded-full shadow-sm text-secondary hover:text-black"
            onClick={onClose}
          >
            <FaTimes className="text-xl md:text-2xl" />
          </button>
        </div>
        <div className="px-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
