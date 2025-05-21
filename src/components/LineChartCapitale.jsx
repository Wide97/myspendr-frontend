import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./LineChartCapitale.scss";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChartCapitale = ({ data, titolo }) => {
    const chartData = {
        labels: data.map((item) => item.periodo),
        datasets: [
            {
                label: "Capitale Totale (€)",
                data: data.map((item) => item.valoreTotale),
                borderColor: "#c1ff00",
                backgroundColor: "rgba(193,255,0,0.2)",
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#f5f5f5",
                },
            },
            title: {
                display: true,
                text: titolo,
                color: "#ffffff",
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#f5f5f5",
                },
                grid: {
                    color: "#2c2c2c",
                },
            },
            y: {
                ticks: {
                    color: "#f5f5f5",
                },
                grid: {
                    color: "#2c2c2c",
                },
            },
        },
    };

    return (
        <div className="line-chart-capitale">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChartCapitale;
