import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const InfoCardWithChart = ({ label, value, icon, chartType, chartData }) => {
  return (
    <div className="info-card-chart">
      <div className="top">
        <span className="icon">{icon}</span>
        <span className="label">{label}</span>
        <span className="value">{value}€</span>
      </div>

      <div className="chart-preview">
        <ResponsiveContainer width="100%" height={50}>
          {chartType === "area" && (
            <AreaChart data={chartData}>
              <Area dataKey="valore" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          )}
          {chartType === "bar" && (
            <BarChart data={chartData}>
              <Bar dataKey="valore" fill="#ff7675" />
            </BarChart>
          )}
          {chartType === "radial" && (
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={chartData}
            >
              <RadialBar dataKey="valore" fill="#c1ff00" />
            </RadialBarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InfoCardWithChart;
