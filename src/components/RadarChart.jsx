import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart() {
  const data = {
    labels: ["Articles", "Conference", "Others"],
    datasets: [
      {
        label: "Research Output",
        data: [60, 90, 10],
        backgroundColor: "rgba(34, 197, 94, 0.2)", // green-500/20
        borderColor: "rgb(34, 197, 94)", // green-500
        borderWidth: 2,
      },
    ],
  };

  return <Radar data={data} />;
}
