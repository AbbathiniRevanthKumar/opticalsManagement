import React from "react";

const FloatingButton = ({ children,count=0 ,handleClick}) => {
  return (
    <div className=" fixed bottom-14 right-8 z-20 cursor-pointer floatButton overflow-hidden rounded-full shadow-lg" onClick={handleClick}>
      <div className="bg-primary h-16 w-16 rounded-full  p-2 flex justify-center items-center">
      <div className="absolute top-0 right-0 px-3 py-1 rounded-full z-30">
        <div className="font-bold">{count}</div>
      </div>
        <div className="bg-secondary w-full h-full rounded-full flex  justify-center items-center bg-opacity-70">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
