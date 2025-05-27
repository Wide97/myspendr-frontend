import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BudgetBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="categoria" stroke="#f5f5f5" />
        <YAxis stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="speso" fill="#dc3545" name="Speso" />
        <Bar dataKey="limite" fill="#28a745" name="Limite" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetBarChart;
