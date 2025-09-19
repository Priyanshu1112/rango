import { Line } from "react-chartjs-2";

// Improved Chart.js config with more padding
const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: { tension: 0, borderWidth: 1 },
    point: { radius: 0, hoverRadius: 5, hitRadius: 10 },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: "nearest" as const,
      intersect: false,
      callbacks: {
        label: (context: { parsed: { y: number } }) => `${context.parsed.y}`,
      },
      datalabels: {
        display: false,
      },
    },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  layout: {
    padding: 0, // reduced from 14 and 10
  },
};

const chartDataTemplate = {
  labels: ["", "", "", "", "", "", ""],
  datasets: [
    {
      data: [2, 4, 3, 6, 8, 4, 9],
      borderWidth: 1,
      fill: true,
      tension: 0,
    },
  ],
};

const getGradient = (
  ctx: CanvasRenderingContext2D,
  chartArea: any,
  trend?: trend
) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  if (trend === "down") {
    gradient.addColorStop(0, "rgba(219, 57, 52, 0)");
    gradient.addColorStop(1, "rgba(219, 57, 52, 0.28)");
  } else {
    gradient.addColorStop(0, "rgba(81, 248, 76, 0)");
    gradient.addColorStop(1, "rgba(81, 248, 76, 0.28)");
  }
  return gradient;
};

export function KPIChart({ data, trend }: { data?: any; trend?: trend }) {
  const borderColor = trend === "down" ? "#DC2626" : "#16A34A";

  const chartData = {
    ...(data ?? chartDataTemplate),
    datasets: [
      {
        ...(data?.datasets?.[0] ?? chartDataTemplate.datasets[0]),
        borderColor,
        borderWidth: 1,
        fill: true,
        tension: 0,
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(0,0,0,0)";
          return getGradient(ctx, chartArea, trend);
        },
      },
    ],
  };

  return (
    <div className="flex-[.4] h-[41.37px] rounded-md overflow-hidden bg-transparent w-full relative">
      <div className="pointer-events-none absolute h-full w-full bg-[linear-gradient(254.96deg,rgba(255,255,255,0)_5.43%,#FFFFFF_41.03%)] -left-6"></div>
      <Line data={chartData} options={options} />
    </div>
  );
}
