import React, { useState } from "react";

const Toggle = ({ left = "OFF", right = "ON", checked = false, onChange }) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    setIsOn(!isOn);
    if (onChange) onChange(!isOn);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">{left.toUpperCase()}</span>
      <div
        className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full  cursor-pointer  shadow-inner shadow-gray-400`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
      >
        <div
          className={`absolute w-6 h-6 bg-primary rounded-full shadow-md transition-all duration-300 ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="text-gray-700 font-medium">{right.toUpperCase()}</span>
    </div>
  );
};

export default Toggle;
