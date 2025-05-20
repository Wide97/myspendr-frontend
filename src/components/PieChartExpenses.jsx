import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartExpenses = ({ movimenti }) => {
  let totaleEntrate = 0;
  let totaleUscite = 0;

  movimenti.forEach((mov) => {
    if (mov.tipo === "ENTRATA") {
      totaleEntrate += mov.importo;
    } else if (mov.tipo === "USCITA") {
      totaleUscite += mov.importo;
    }
  });

  const totale = totaleEntrate + totaleUscite;

  const data = {
    labels: ["Entrate", "Uscite"],
    datasets: [
      {
        data: [totaleEntrate, totaleUscite],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <>
      {totale === 0 ? (
        <p className="text-center">Nessun dato da visualizzare.</p>
      ) : (
        <Pie data={data} />
      )}
    </>
  );
};

export default PieChartExpenses;
