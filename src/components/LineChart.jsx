import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { getCssColor, withAlpha, onThemeChange } from "../utils/themeColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [colors, setColors] = useState({
    primary: "#000000",
    secondary: "#000000",
    base: "#000000",
  });

  // Ambil warna dari CSS variable DaisyUI (custom theme pakai --color-*)
  useEffect(() => {
    const read = () =>
      setColors({
        primary: getCssColor("--color-primary"),
        secondary: getCssColor("--color-secondary"),
        base: getCssColor("--color-base-content"),
      });

    read(); // initial render
    const off = onThemeChange(read); // update saat ganti theme
    return off;
  }, []);

  // Dummy data
  const rawData = useMemo(
    () => [
      { year: 2019, value: 120 },
      { year: 2020, value: 180 },
      { year: 2021, value: 250 },
      { year: 2022, value: 300 },
      { year: 2023, value: 400 },
    ],
    []
  );

  // Chart data
  const data = useMemo(
    () => ({
      labels: rawData.map((d) => d.year),
      datasets: [
        {
          label: "Sinta Score",
          data: rawData.map((d) => d.value),
          borderColor: colors.primary,
          backgroundColor: withAlpha(colors.primary, 0.2),
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [rawData, colors.primary]
  );

  // Chart options
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          labels: { color: colors.base },
        },
      },
      scales: {
        x: {
          ticks: { color: colors.base },
          grid: { color: withAlpha(colors.base, 0.2) },
        },
        y: {
          ticks: { color: colors.base },
          grid: { color: withAlpha(colors.base, 0.2) },
        },
      },
    }),
    [colors.base]
  );

  return (
    <div className="card bg-base-100 shadow p-4">
      <h2 className="text-lg font-bold text-base-content mb-2">Number of #</h2>
      <Line data={data} options={options} />
    </div>
  );
}
