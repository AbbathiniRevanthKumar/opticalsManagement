import React from "react";
import { ResponsiveContainer, XAxis, Tooltip, BarChart, Bar } from "recharts";

const Graph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart
        data={data}
        margin={{ top: 30, right: 10, left:20, bottom: 0 }}
      >
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <Tooltip />
        <Bar
          type="monotone"
          dataKey="qty"
          barSize={15}
          fill="#FFA800"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
