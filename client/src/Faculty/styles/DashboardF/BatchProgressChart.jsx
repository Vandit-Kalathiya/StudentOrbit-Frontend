import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BatchProgressChart = ({ batchData }) => {
  const colors = [
    "rgba(255, 99, 132, 0.6)",  // Red
    "rgba(54, 162, 235, 0.6)",  // Blue
    "rgba(255, 206, 86, 0.6)",  // Yellow
    "rgba(75, 192, 192, 0.6)",  // Green
    "rgba(153, 102, 255, 0.6)", // Purple
    "rgba(255, 159, 64, 0.6)",  // Orange
  ];

  const data = {
    labels: batchData.map((batch) => batch.name),
    datasets: [
      {
        label: "Progress (%)",
        data: batchData.map((batch) => batch.progress),
        backgroundColor: colors.slice(0, batchData.length), 
        borderColor: colors.map((color) => color.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: (chart) => {
            const defaultLabels = chart.data.labels || [];
            return defaultLabels.map((label, index) => ({
              text: label,
              fillStyle: colors[index % colors.length], 
            }));
          },
        },
      },
      title: {
        display: true,
        text: "Batch-wise Progress",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Progress (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Batches",
        },
        ticks: {
          callback: (val, index) => {
            return batchData[index].name;
          },
          color: (context) => colors[context.index % colors.length], 
        },
      },
    },
  };

  return <Bar data={data} options={options} className="bg-white rounded-lg w-full px-2 shadow-md" />;
};

export default BatchProgressChart;
