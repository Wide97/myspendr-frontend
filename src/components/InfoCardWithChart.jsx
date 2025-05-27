import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",
          padding: "6px 10px",
          color: "#fff",
          fontSize: "0.75rem",
          border: "1px solid #333",
        }}
      >
        {payload[0].payload.giorno ? (
          <strong>{payload[0].payload.giorno}:</strong>
        ) : (
          <strong>Valore:</strong>
        )}{" "}
        {payload[0].value}€
      </div>
    );
  }

  return null;
};

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
              <Tooltip content={<CustomTooltip />} />
              <Area dataKey="valore" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          )}
          {chartType === "bar" && (
            <BarChart data={chartData}>
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valore" fill="#ff7675" />
            </BarChart>
          )}
          {chartType === "radial" && (
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={chartData}
            >
              <Tooltip content={<CustomTooltip />} />
              <RadialBar dataKey="valore" fill="#c1ff00" />
            </RadialBarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InfoCardWithChart;
