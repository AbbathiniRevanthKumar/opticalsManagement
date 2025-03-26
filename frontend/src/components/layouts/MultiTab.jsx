import React, { useEffect, useState } from "react";

const MultiTab = (props) => {
  //takes array of tabs and one active tab onclicking any tab that should be active
  const { tabs, changeTab } = props;
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    setActiveTab(tabs[0]);
    changeTab(tabs[0]);
  }, [tabs]);

  const onChangeTab = (tab) => {
    setActiveTab(tab);
    changeTab(tab);
  };

  return (
    <div className="">
      <div className="grid grid-cols-2  gap-4 md:flex md:gap-1 items-center">
        {tabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={`py-2 px-4 rounded-t-lg  h-10 w-32 flex items-center justify-start ${
                activeTab === tab ? "bg-primary font-semibold z-20" : "bg-secondary z-10"
              } cursor-pointer transition-all duration-150 ease-out`}
              onClick={() => onChangeTab(tab)}
            >
              {tab.toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiTab;
