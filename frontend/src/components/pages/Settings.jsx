import React, { useState } from "react";
import Header from "../layouts/Header";
import ToogleDrop from "../toogleDrop/ToogleDrop";
import Toogle from "../Toogle/Toogle";
import FramesSettings from "../elements/FramesSettings";
import LensSettings from "../elements/LensSettings";

const Settings = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("Frames");
  return (
    <div className="">
      <Header heading={"SETTINGS"} />
      <div className="py-2">
        <div className="flex items-center">
          <ToogleDrop
            name={"Products"}
            isOpen={isProductOpen}
            onClick={() => setIsProductOpen(!isProductOpen)}
          />
        </div>

        {isProductOpen && (
          <div
            className={`py-1 w-full transition-all duration-300 ease-in-out transform ${
              isProductOpen
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0 max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2 shadow-md p-2 rounded-xl bg-secondary">
              <div className="flex justify-end px-4">
                <Toogle
                  left={"Frames"}
                  right={"Lens"}
                  onChange={(isOn) =>
                    setActiveProduct(isOn ? "Lens" : "Frames")
                  }
                  checked={activeProduct === "Lens"}
                />
              </div>
              <div className="transition-all duration-150">
                {activeProduct === "Frames" && <FramesSettings />}
                {activeProduct === "Lens" && <LensSettings />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
