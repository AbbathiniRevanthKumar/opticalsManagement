import React, { useEffect, useState } from "react";
import CardWithGraph from "../layouts/CardWithGraph";
import QuickActionButtons from "../layouts/QuickActionButtons";
import LowStocks from "../elements/LowStocks";

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

  const [showLowStocks, setShowLowStocks] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLowStocks(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col  gap-2">
      <div
        className={`sticky top-16 left-0 right-0 transition-all duration-300 ${
          isScrolled ? "bg-secondary shadow-lg  rounded-lg" : "bg-transparent"
        } z-20 w-full`}
      >
        <QuickActionButtons />
      </div>
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
      <div className="flex flex-col lg:flex-row w-full">
        {showLowStocks && (
          <div className="transition-all duration-150 ease-out flex justify-center items-center basis-1/2 w-full py-4 lg:p-2">
            <LowStocks />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
