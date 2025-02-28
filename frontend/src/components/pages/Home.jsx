import React from "react";
import CardWithGraph from "../layouts/CardWithGraph";
import QuickActionButtons from "../layouts/QuickActionButtons";

const Home = () => {
  const cardsDetails = [
    {
      title: "Frames",
      value: "144",
      description: "Last 30 days",
      type: "success",
    },
    { title: "Lens", value: "20", description: "Last 30 days", type: "error" },
  ];

  return (
    <div className="flex flex-col  gap-2">
      <QuickActionButtons/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsDetails.map((card, index) => (
          <div key={index}>
            <CardWithGraph
              cardType={card.type}
              title={card.title}
              value={card.value}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
