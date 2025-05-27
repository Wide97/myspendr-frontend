import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const BarChartMovimenti = ({ movimenti, tipo }) => {
  // Filtra movimenti per tipo
  const filtered = movimenti.filter((m) => m.tipo === tipo);

  // Raggruppa per categoria e somma gli importi
  const data = Object.values(
    filtered.reduce((acc, curr) => {
      const cat = curr.categoria;
      if (!acc[cat]) acc[cat] = { categoria: cat, totale: 0 };
      acc[cat].totale += curr.importo;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="categoria" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totale" fill={tipo === "ENTRATA" ? "#82ca9d" : "#ff7675"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartMovimenti;
