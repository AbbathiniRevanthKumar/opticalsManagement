import React, { useEffect, useState } from "react";
import LowStocksDeatils from "../layouts/LowStocksDeatils";
import api from "../../helpers/api";

const LowStocks = () => {
  const [frameData, setFrameData] = useState([]);
  const [lensData, setLensData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchFrameData = async () => {
      const response = await api.getFrameLowStockDetails();
      if (response.success) {
        setFrameData(response.data);
        return;
      }
      setFrameData([]);
    };

    const fetchLensData = async () => {
      const response = await api.getLensLowStockDetails();
      if (response.success) {
        setLensData(response.data);
        return;
      }
      setLensData([]);
    };
    setLoading(true);
    fetchFrameData();
    fetchLensData();
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <div className="h-full rounded-lg  flex flex-col md:flex-row gap-4 w-full">
      <LowStocksDeatils
        data={frameData}
        header={"Frames Low Stock"}
        type="frames"
      />
      <LowStocksDeatils data={lensData} header={"Lens Low Stock"} type="lens" />
    </div>
  );
};

export default LowStocks;
