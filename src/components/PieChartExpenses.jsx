import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChartExpenses.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartExpenses = ({ movimenti }) => {
  // Filtro solo le uscite
  const spese = movimenti.filter((m) => m.importo > 0 && m.tipo === "USCITA");

  // Raggruppa per categoria
  const categorie = {};
  spese.forEach((mov) => {
    categorie[mov.categoria] = (categorie[mov.categoria] || 0) + mov.importo;
  });

  const data = {
    labels: Object.keys(categorie),
    datasets: [
      {
        data: Object.values(categorie),
        backgroundColor: [
          "#7affc3",
          "#c1ff00",
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#8c9eff",
          "#ff8a65",
          "#4dd0e1"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#f5f5f5",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="pie-chart-wrapper">
      {spese.length === 0 ? (
        <p className="no-data">Nessuna spesa disponibile</p>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
};

export default PieChartExpenses;
