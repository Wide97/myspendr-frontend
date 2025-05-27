import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./CapitalePieChart.scss";

const COLORS = ["#00c49f", "#8884d8", "#ffc658"]; // Banca, Liquidità, Altri

const CapitalePieChart = ({ contoBancario, liquidita, altriFondi }) => {
  const data = [
    {
      name: "Conto Bancario",
      value: parseFloat(contoBancario) || 0,
    },
    {
      name: "Liquidità",
      value: parseFloat(liquidita) || 0,
    },
    {
      name: "Altri Fondi",
      value: parseFloat(altriFondi) || 0,
    },
  ];

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v} €`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CapitalePieChart;
