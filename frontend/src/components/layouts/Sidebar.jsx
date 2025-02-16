import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import SidebarElement from "./SidebarElement";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isSidebarOpen }) => {
  const sidebarElements = ["Home", "Stock"];
  const location = useLocation();
  const [activeElement, setActiveElement] = useState("Home");
  const auth = useSelector((state) => state.auth);
    
  if ((auth.isAuthenticated && auth.user.role === "super-admin")) {
    sidebarElements.push("Settings");
  }

  useEffect(() => {
    if (location.pathname === "/app/home") {
      setActiveElement("Home");
    }
  }, [location]);

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }  bg-primary bg-opacity-85 w-12 md:w-fit fixed left-0 top-16 bottom-12 shadow-md pt-12 pb-8 md:py-16 pr-2 rounded-e-full transistion-all ease-in-out duration-300 flex flex-col justify-between items-center overflow-hidden z-30`}
    >
      <div>
        <ul className="flex flex-col justify-center gap-2">
          {sidebarElements.map((element, _) => {
            return (
              <li key={_}>
                <SidebarElement
                  element={element}
                  active={activeElement}
                  onClick={() => setActiveElement(element)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center md:hidden">
        <ul>
          <li className="cursor-pointer text-lg">
            <LogoutBtn />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
