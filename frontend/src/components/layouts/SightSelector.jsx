import React, { useEffect, useState } from "react";
import Select from "../select/select";

const SightSelector = (props) => {
  const { value, handleSightChange } = props;

  const [sightValue, setSightValue] = useState(String(value).substring(1));
  const [sightSign, setSightSign] = useState("-");
  const [sight, setSight] = useState(value);

  useEffect(() => {
    handleSightChange(sight);
  }, [sightSign, sightValue]);

  const generateOptions = () => {
    const options = [];
    for (let i = 0; i < 22; i++) {
      options.push({ label: i + ".00", value: i + ".00" });
      options.push({ label: i + ".25", value: i + ".25" });
      options.push({ label: i + ".50", value: i + ".50" });
      options.push({ label: i + ".75", value: i + ".75" });
    }
    return options;
  };
  const handleSignChange = (e) => {
    const sign = e.target.value;
    setSightSign(sign);
    setSight(sign + sightValue);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setSightValue(value);
    setSight(sightSign + value);
  };
  return (
    <div className="px-1">
      <div className="flex w-full gap-2 justify-between">
        <div className="basis-1/3 md:basis-2/5 w-full">
          <Select
            value={sightSign}
            options={[
              { label: "+", value: "+" },
              { label: "-", value: "-" },
            ]}
            id={"sightId"}
            placeholder={"select"}
            onChange={handleSignChange}
            required={true}
          />
        </div>
        <div className="basis-2/3 md:basis-3/5 w-full">
          <Select
            value={sightValue}
            options={generateOptions()}
            id={"sightId"}
            placeholder={"select"}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SightSelector;
