import React from "react";
import CardContent from "./CardContent";

const Card = ({ cardType = "defaultType", children }) => {
  const backgroundColor = {
    success: "bg-[#00ce0f]",
    error: "bg-[#d03600]",
    defaultType: "bg-secondary",
    app: "bg-primary",
  };

  return (
    <div className={`h-full w-full rounded-lg shadow-md overflow-hidden ${backgroundColor[cardType]}`}>
      <CardContent>{children}</CardContent>
    </div>
  );
};

export default Card;
