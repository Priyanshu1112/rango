// components/StackedRevenueChart.tsx
import React, { useMemo } from "react";
import { ChartData, ChartOptions, Plugin } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Card } from "@/components/ui/card";

// plugin instance — do NOT globally register; pass to plugins prop
const cdlPlugins = [ChartDataLabels];

// Custom plugin to draw total above each stack (centred)
const totalsPlugin: Plugin<"bar"> = {
  id: "totalsPlugin",
  afterDatasetsDraw: (chart) => {
    const { ctx, scales } = chart;
    const xScale = scales["x"];
    const yScale = scales["y"] as any;

    if (!ctx || !xScale || !chart.data.labels) return;

    ctx.save();
    ctx.fillStyle = "#6b7280"; // text color (gray-500)
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    const datasetCount = chart.data.datasets.length;
    const meta0 = chart.getDatasetMeta(0);

    for (let i = 0; i < chart.data.labels.length; i++) {
      // compute total for this label
      let total = 0;
      for (let d = 0; d < datasetCount; d++) {
        total += (chart.data.datasets[d].data as number[])[i] ?? 0;
      }

      // find x coordinate - use first dataset bar rect as reference
      const bar = meta0.data[i];
      const x = bar?.x ?? (xScale.getPixelForValue(i) || 0);
      // get y pixel for the top of the stack
      const yTop = yScale.getPixelForValue(total);

      // draw total slightly above the top of the stack
      const paddingAbove = 6;
      ctx.fillText(String(total), x, yTop - paddingAbove);
    }

    ctx.restore();
  },
};

// Chart options — updated legend, grid (dashed both axes) and y-axis title
const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "start",
      labels: {
        // Styling the legend labels (text + swatch)
        color: "#737373 ", // legend text color (gray-500)
        font: {
          size: 12,
          weight: "bold",
        },
        boxWidth: 8, // swatch width
        boxHeight: 8, // swatch height
        padding: 8, // space between legend items
        usePointStyle: false, // keep square swatches (set true if you prefer circular/point style)
        // If you need fully custom swatches you can use generateLabels callback here
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (ctx) => {
          const label = ctx.dataset.label ?? "";
          const value = ctx.parsed.y ?? ctx.parsed;
          return `${label}: ${value}`;
        },
      },
    },
    datalabels: {
      color: "#000000B2",
      anchor: "center",
      align: "center",
      font: {
        weight: "normal",
        size: 10,
      },
      formatter: (value: number) => {
        return value > 0 ? String(value) : "";
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: "#737373",
        padding: 8,
        font: {
          size: 12,
          weight: "bold",
        },
      },
      grid: {
        // vertical grid lines (dashed)
        display: true,
        drawOnChartArea: true,
        color: "#E5E7EB",
      },
    },
    y: {
      stacked: true,
      position: "right",
      suggestedMax: 9000,
      ticks: {
        stepSize: 1500,
        color: "#737373",
        callback: (value) => String(value),
        padding: 4,
      },
      grid: {
        // horizontal grid lines (dashed)
        display: true,
        drawOnChartArea: true,
        color: "#E5E7EB",
      },
    },
  },
  layout: {
    padding: {
      top: 12,
      bottom: 0,
      left: 6,
      right: 12,
    },
  },
  elements: {
    bar: {
      borderRadius: 4,
      borderSkipped: false,
    },
  },
};

export default function StackedRevenueChart({
  data,
  loading,
}: {
  data: purchaseProductChartData;
  loading: boolean;
}) {
  const plugins = useMemo(() => [totalsPlugin], []);

  const chartData: ChartData<"bar", number[], string> = loading
    ? {
        labels: [],
        datasets: [],
      }
    : {
        labels: data.labels,
        datasets: [
          {
            label: "Rings",
            data: data.ringData,
            backgroundColor: "#FDE04799",
            borderColor: "#FDE04799",
            borderWidth: 0,
          },
          {
            label: "Bracelets",
            data: data.braceletData,
            backgroundColor: "#D8B4FE99",
            borderColor: "#D8B4FE99",
            borderWidth: 0,
          },
          {
            label: "Other",
            data: data.otherData,
            backgroundColor: "#D1D5DB99",
            borderColor: "#D1D5DB99",
            borderWidth: 0,
            borderRadius: 0,
          },
        ],
      };

  return (
    <Card className="p-4 max-h-[344px] rounded-[10px]">
      <Bar
        data={chartData}
        options={options}
        plugins={[...plugins, ...cdlPlugins]}
      />
    </Card>
  );
}
