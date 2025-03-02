import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";

const QuickActionButtons = () => {
  const buttons = ["Add Frame", "Add Lens"];
  const navigate = useNavigate();
  
  const handleQuickAction = (button) => {
    if (button === "Add Frame" || button === "Add Lens") {
      navigate(routes.protectedRoutes.stocks, { state: { action: button } });
    }
  };

  return (
    <div
      className={`flex justify-center md:justify-end items-center p-2`}
    >
      <div className="grid grid-cols-2 md:flex md:justify-end md:items-center gap-2 w-full md:w-fit">
        {buttons.map((button, index) => {
          return (
            <button
              key={index}
              type="button"
              className="btn w-full text-nowrap px-4 shadow-sm flex items-center justify-center"
              onClick={() => handleQuickAction(button)}
            >
              {button}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionButtons;
