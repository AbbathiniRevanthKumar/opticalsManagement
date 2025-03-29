import React, { useEffect, useState } from "react";

const InsideNavbar = (props) => {
  const { links, onChangeLink } = props;
  const [activeLink, setActiveLink] = useState(links[0]);

  useEffect(() => {
    setActiveLink(links[0]);
    onChangeLink(links[0]);
  }, [links]);

  const handleChangeLink = (link) => {
    setActiveLink(link);
    onChangeLink(link);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:flex gap-2 items-end w-full md:place-items-center">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className={`${
                activeLink === link
                  ? "bg-primary  text-secondary"
                  : "bg-secondary"
              } flex items-end justify-center  px-4 rounded-full transition-all ease-in duration-200 cursor-pointer w-fit`}
              onClick={() => handleChangeLink(link)}
            >
              {link.toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsideNavbar;
