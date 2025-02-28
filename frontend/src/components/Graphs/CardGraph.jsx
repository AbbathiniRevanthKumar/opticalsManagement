import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const CardGraph = ({ type }) => {
  const data = [
    { month: "Jan", sales: 500 },
    { month: "Feb", sales: 700 },
    { month: "Mar", sales: 1200 },
    { month: "Apr", sales: 900 },
    { month: "May", sales: 1500 },
    { month: "Jun", sales: 1800 },
    { month: "Jul", sales: 1300 },
    { month: "Aug", sales: 1100 },
    { month: "Sep", sales: 1600 },
    { month: "Oct", sales: 1900 },
    { month: "Nov", sales: 2200 },
    { month: "Dec", sales: 2500 },
  ];

  const stroke = {
    success: { color: "#008c0a", fill: "#095400" },
    error: { color: "#f94f14", fill: "#ff684a" },
    defaultType: { color: "#12100f", fill: "#685c58" },
  };

  const gradientId = `colorUv-${type}`;

  return (
    <div>
      <ResponsiveContainer width="100%" height={80}>
        <AreaChart
          data={data}
          margin={{ top: 0, left: 0, right: 0, bottom: 30 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={stroke[type].fill}
                stopOpacity={0.4}
              />
              <stop
                offset="80%"
                stopColor={stroke[type].fill}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{width:100 ,height:60 ,padding : "0px 10px" ,margin:"-20px 0px 0px 0px"}}
          />

          <Area
            type="monotone"
            dataKey="sales"
            stroke={stroke[type].color}
            fill={`url(#${gradientId})`}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardGraph;
