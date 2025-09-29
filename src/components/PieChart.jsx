import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useMemo, useState } from "react";
import { getCssColor, onThemeChange } from "../utils/themeColors";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart() {
  const [colors, setColors] = useState({
    primary: "#000",
    secondary: "#000",
    accent: "#000",
    info: "#000",
    neutral: "#000",
    base: "#000",
  });

  // ambil warna dari CSS variable DaisyUI
  useEffect(() => {
    const read = () =>
      setColors({
        primary: getCssColor("--color-primary"),
        secondary: getCssColor("--color-secondary"),
        accent: getCssColor("--color-accent"),
        info: getCssColor("--color-info"),
        neutral: getCssColor("--color-neutral"),
        base: getCssColor("--color-base-content"),
      });

    read();
    const off = onThemeChange(read);
    return off;
  }, []);

  // dummy data
  const rawData = useMemo(
    () => [
      { label: "No-Q", value: 50 },
      { label: "Q1", value: 100 },
      { label: "Q2", value: 200 },
      { label: "Q3", value: 150 },
      { label: "Q4", value: 80 },
    ],
    []
  );

  const data = useMemo(
    () => ({
      labels: rawData.map((d) => d.label),
      datasets: [
        {
          data: rawData.map((d) => d.value),
          backgroundColor: [
            "gray",
            colors.primary,
            colors.secondary,
            colors.accent,
            colors.info,
          ],
          borderColor: colors.base,
          borderWidth: 1.5, // border tipis
          borderRadius: 6,  // sudut lebih rapi
          offset: (ctx) => (ctx.active ? 15 : 0), // efek pop-up saat hover
        },
      ],
    }),
    [rawData, colors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          labels: { color: colors.base },
        },
        tooltip: {
          backgroundColor: colors.base,
          titleColor: colors.primary,
          bodyColor: "white",
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.raw || 0;
              return `${label}: ${value}`;
            },
          },
        },
       datalabels: {
            color: "white",
            font: { weight: "bold", size: 10 },
            formatter: (value, context) => {
                const dataset = context.chart.data.datasets[0].data;
                const total = dataset.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} (${percentage}%)`;
            },
            display: true,
            align: "center",     // can be: 'center', 'start', 'end'
            offset: 0,
        }

      },
    }),
    [colors]
  );

  return (
    <div className="card bg-base-100 shadow p-4">
      <h2 className="text-lg font-bold text-base-content mb-2">Artikel Kuartil</h2>
      <Pie data={data} options={options} />
    </div>
  );
}
