import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

const Graph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 40, right: 30, left:30, bottom: 0 }}
      >
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="qty"
          stroke="#FFA800"
          strokeWidth={2}
          fill="#FFA800"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
