import React from "react";
import Card from "../Card/Card";
import CardGraph from "../Graphs/CardGraph";

const CardWithGraph = ({
  cardType = "defaultType",
  title,
  value,
  description,
}) => {
  const percentager = {
    success: {
      fill: "bg-[#315a00]",
      ring: "ring-[#00b603]",
      text: "text-[#a9ff43]",
    },
    error: {
      fill: "bg-[#a22200]",
      ring: "ring-[#da3800]",
      text: "text-[#ff3633]",
    },
    defaultType: {
      fill: "bg-[#2b2828]",
      ring: "ring-[#7a7676]",
      text: "text-[#c4b7b7]",
    },
  };

  return (
    <div className="w-full h-36">
      <Card cardType={"defaultType"}>
        <div className="flex flex-col justify-between h-full w-full gap-2">
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{title}</div>
            <div className="flex items-center justify-between px-2 gap-2 text-nowrap">
              <div className="flex flex-col justify-center">
                <div className="text-2xl lg:text-2xl font-bold">{value}</div>
                <div className="text-sm text-[#616161]">{description}</div>
              </div>
              <div
                className={`flex px-2 rounded-full justify-center items-center ${percentager[cardType].fill} ring-1 ${percentager[cardType].ring}`}
              >
                <div
                  className={`text-sm text-center ${percentager[cardType].text} font-semibold`}
                >
                  - 25 %
                </div>
              </div>
            </div>
          </div>
          <div className="h-44 w-full">
            <CardGraph type={cardType} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardWithGraph;
