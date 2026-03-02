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
  Legend,
);

import { Bar } from "react-chartjs-2";

export default function RiskHeatmap({ tasksRisk }) {
  const data = {
    labels: tasksRisk.map((t) => t.name),
    datasets: [
      {
        label: "Task Risk",
        data: tasksRisk.map((t) => t.risk),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Task Risk Heatmap</h2>
      <Bar data={data} />
    </div>
  );
}
