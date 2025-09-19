"use client";

// components/FunnelChartChartjsUpdated.tsx
import React, { useMemo } from "react";
import { ChartOptions, ChartData, Plugin } from "chart.js";
import { Bar } from "react-chartjs-2";

const data2 = [0, 10000, 20000, 88300, 40000];

// 1) Structured data with trend field
const STAGES = [
  {
    label: "Products Shown",
    value: 200000,
    smallLabel: "1.27M Products",
    percentLabel: "100%",
    trend: "down",
  },
  {
    label: "Shortlisted",
    value: 156000,
    smallLabel: "984K Products",
    percentLabel: "78%",
    trend: "down",
  },
  {
    label: "Finalised",
    value: 149250,
    smallLabel: "953K Products",
    percentLabel: "75%",
    trend: "down",
  },
  {
    label: "Checkout",
    value: 87300,
    smallLabel: "559K Products",
    percentLabel: "44%",
    trend: "down",
  }, // up -> green segment
  {
    label: "Net Revenue",
    value: 90000,
    smallLabel: "₹10,40,00,000",
    percentLabel: "43.5%",
    trend: "up",
  },
];

// 2) Build Chart.js chartData from STAGES (datasets used only to make scales)
const chartData: ChartData<"bar", number[], string> = {
  labels: STAGES.map((s) => s.label),
  datasets: [
    {
      label: "values",
      data: STAGES.map((s) => s.value),
      backgroundColor: STAGES.map((s) =>
        s.trend === "up" ? "#16A34A" : "#012F48"
      ),
      categoryPercentage: 1,
      barThickness: 20,
    },
    {
      label: "placeholder",
      data: STAGES.map(() => 4000),
      backgroundColor: "white",
      barThickness: 20,
      categoryPercentage: 1,
    },
    {
      label: "placeholder",
      data: data2,
      backgroundColor: STAGES.map((_, ind) =>
        STAGES[ind].value / data2[ind] < 1 ? "#EF4444" : "#FCA5A5"
      ),
      borderWidth: 0,
      barThickness: 20,
      categoryPercentage: 1,
    },
  ],
};

// Chart.js options
const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: {
      stacked: true,
      position: "top",
      grid: {
        display: false,
      },
      ticks: {
        display: false, // <-- show labels on top
      },
    },
    y: {
      stacked: true,
      reverse: true, // 0 at top, max at bottom
      position: "left",
      min: 0,
      max: 200000,
      grid: {
        display: true,
        drawOnChartArea: true,
        color: "rgba(209, 213, 219, 0.3)",
        lineWidth: 1,
      },
      ticks: {
        display: true,
        stepSize: 25000,
        callback: function (value) {
          const v = Number(value);
          if (v === 0) return "₹0";
          return `₹${Math.round(v / 1000)}K`;
        },
      },
    },
  },
  layout: {
    padding: { top: 50, left: 0, right: 60, bottom: 0 },
  },
};

// Custom plugin for funnel visualization
const funnelPlugin: Plugin<"bar"> = {
  id: "funnelPluginV3",
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales, data } = chart;
    if (!ctx || !chartArea) return;

    const xScale = scales.x;
    const yScale = scales.y;
    if (!xScale || !yScale) return;

    // dataset values (first dataset is the main values used for bar geometry)
    const ds = (data.datasets?.[0]?.data as number[]) ?? [];
    const labels = (data.labels as string[]) ?? [];

    // maximum reference value for opacity scaling
    // you can also read this from options or compute from data via Math.max(...)
    const maxValue = 200000;

    // Build positions array from dataset meta if available,
    // falling back to scale-based pixel calculations if needed.
    const positions: { x: number; y: number; value: number }[] = [];
    const meta = chart.getDatasetMeta(0);
    const elements = meta?.data ?? [];

    for (let i = 0; i < labels.length; i++) {
      let px = NaN;
      let py = NaN;
      const el = elements[i];

      // Prefer Chart.js element geometry (exact)
      if (el && typeof (el as any).getProps === "function") {
        const props = (el as any).getProps(["x", "y"], true) ?? {};
        px = Number(props.x ?? NaN);
        py = Number(props.y ?? NaN);
      }

      // Fallback: compute evenly spaced X center & pixel Y from yScale
      if (!isFinite(px)) {
        try {
          px = (xScale as any).getPixelForValue(labels[i]);
        } catch {
          const step = chartArea.width / Math.max(1, labels.length);
          px = chartArea.left + step * (i + 0.5);
        }
      }
      if (!isFinite(py)) {
        const val = Number(ds[i] ?? 0);
        py = yScale.getPixelForValue(val);
      }

      positions.push({ x: px, y: py, value: Number(ds[i] ?? 0) });
    }

    if (positions.length < 2) return;

    ctx.save();

    // Draw trapezoids between adjacent bars.
    for (let i = 0; i < positions.length - 1; i++) {
      const curr = positions[i];
      const next = positions[i + 1];

      // opacity proportional to current value
      const rawOpacity = (curr.value ?? 0) / (maxValue || 1);
      const opacity = Math.max(0, Math.min(1, rawOpacity));

      // determine trend for transition i -> i+1
      const t = STAGES[i + 1]?.trend ?? "down";

      // Build polygon from TOP -> curr.value -> next.value -> TOP
      // (if you prefer bottom-to-value, change chartArea.top to chartArea.bottom accordingly)
      ctx.beginPath();
      ctx.moveTo(curr.x, chartArea.top); // top-left
      ctx.lineTo(curr.x, curr.y); // down to current value
      ctx.lineTo(next.x, next.y); // across to next value
      ctx.lineTo(next.x, chartArea.top); // up to top-right
      ctx.closePath();

      // Create a vertical-ish gradient anchored to the trapezoid bounds.
      const midX = (curr.x + next.x) / 2;
      const maxY = Math.max(curr.y, next.y);
      const grad = ctx.createLinearGradient(midX, chartArea.top, midX, maxY);

      if (t === "up") {
        grad.addColorStop(
          0.0442,
          `rgba(134,239,172,${(0.48 * opacity).toFixed(3)})`
        );
        grad.addColorStop(
          0.9918,
          `rgba(240,253,244,${(0.48 * opacity).toFixed(3)})`
        );
      } else {
        grad.addColorStop(
          0.04,
          `rgba(1,47,72,${(0.192 * opacity).toFixed(3)})`
        );
        grad.addColorStop(
          0.3823,
          `rgba(1,47,72,${(0.096 * opacity).toFixed(3)})`
        );
        grad.addColorStop(
          0.6966,
          `rgba(1,47,72,${(0.048 * opacity).toFixed(3)})`
        );
        grad.addColorStop(
          0.9917,
          `rgba(1,47,72,${(0.024 * opacity).toFixed(3)})`
        );
      }

      ctx.fillStyle = grad;
      ctx.fill();

      // Optional: subtle top-edge stroke to separate segments
      ctx.beginPath();
      ctx.moveTo(curr.x, curr.y);
      ctx.lineTo(next.x, next.y);
      ctx.strokeStyle = "rgba(15,23,42,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    try {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Choose a font size that fits; this keeps it simple and consistent
      const fontSize = 13;
      ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`;

      // Loop over elements (meta bars) to get exact geometry
      for (let i = 0; i < elements.length; i++) {
        const bar = elements[i];
        if (!bar || typeof (bar as any).getProps !== "function") continue;

        const props = (bar as any).getProps(["x", "y", "base"], true);
        const x = props.x + 35;
        const yTop = props.y;
        const yBase = props.base ?? chartArea.bottom;
        const centerY = yTop + (yBase - yTop) / 2;

        const label = STAGES?.[i]?.percentLabel ?? "100%";
        ctx.fillStyle = STAGES?.[i]?.trend === "up" ? "#16A34A" : "#012F48";
        ctx.fillText(label, x, centerY);
      }
    } catch (e) {
      // don't break rendering if label drawing fails
      // console.warn("draw percent label failed", e);
    } finally {
      ctx.restore();
    }

    // --- custom dashed full-width grid + short axis tick marks ---
    try {
      const yScale = scales.y as any;
      const step = (options.scales?.y as any)?.ticks?.stepSize ?? 25000;
      const min = Number(yScale.min ?? 0);
      const max = Number(yScale.max ?? 200000);

      ctx.save();
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(15,23,42,0.06)"; // faint dashed lines

      for (let v = min; v <= max; v += step) {
        const y = yScale.getPixelForValue(v);
        // full-width dashed line
        ctx.beginPath();
        ctx.moveTo(chartArea.left, Math.round(y) + 0.5);
        ctx.lineTo(chartArea.right, Math.round(y) + 0.5);
        ctx.stroke();
        // short tick mark at left edge (6px into chart)
        ctx.setLineDash([]); // solid short tick
        ctx.beginPath();
        ctx.moveTo(chartArea.left - 6, Math.round(y) + 0.5);
        ctx.lineTo(chartArea.left + 0, Math.round(y) + 0.5);
        ctx.strokeStyle = "rgba(107,114,128,0.7)"; // slightly darker for tick
        ctx.lineWidth = 1;
        ctx.stroke();
        // (optional) small tick on right side as well:
        ctx.beginPath();
        ctx.moveTo(chartArea.right, Math.round(y) + 0.5);
        ctx.lineTo(chartArea.right + 6, Math.round(y) + 0.5);
        ctx.stroke();
        // restore dashed
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = "rgba(15,23,42,0.06)";
      }

      ctx.restore();
    } catch (e) {
      // ignore if something fails drawing ticks
    }

    // 6) Draw labels
    try {
      ctx.save();
      positions.forEach((pos, i) => {
        const stage = STAGES[i];

        // Title above chart
        ctx.fillStyle = "#6B7280";
        ctx.font = "normal 11px Inter, Arial, sans-serif";
        ctx.textAlign = "start";
        ctx.textBaseline = "bottom";
        ctx.fillText(stage.label, pos.x - 10, chartArea.top - 25);

        // Product count
        ctx.fillStyle = "#111827";
        ctx.font = "600 12px Inter, Arial, sans-serif";
        ctx.textAlign = "start";
        ctx.fillText(stage.smallLabel ?? "", pos.x - 10, chartArea.top - 8);
      });
      ctx.restore();
    } catch (e) {
      // ignore if something fails drawing ticks
    }

    try {
      const dataset3Index = 2;
      const meta3 = chart.getDatasetMeta(dataset3Index);
      if (meta3 && Array.isArray(meta3.data)) {
        ctx.save();
        const textBoxWidth = 86;
        const fontSize = 11;
        ctx.font = `500 ${fontSize}px Inter, Arial, sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#6B1C1C";

        // ensure left alignment for wrapped text and use same font for measureText
        ctx.textAlign = "start";

        const wrapText = (
          ctx2: CanvasRenderingContext2D,
          text: string,
          maxWidth: number
        ) => {
          const words = text.split(/\s+/);
          const lines: string[] = [];
          let current = "";
          for (let w = 0; w < words.length; w++) {
            const word = words[w];
            const test = current ? `${current} ${word}` : word;
            if (ctx2.measureText(test).width <= maxWidth) {
              current = test;
            } else {
              if (current) lines.push(current);
              // If single word too long, break by characters
              if (ctx2.measureText(word).width > maxWidth) {
                let acc = "";
                for (let ch of word) {
                  const testAcc = acc + ch;
                  if (ctx2.measureText(testAcc).width <= maxWidth) {
                    acc = testAcc;
                  } else {
                    if (acc) lines.push(acc);
                    acc = ch;
                  }
                }
                if (acc) current = acc;
                else current = "";
              } else {
                current = word;
              }
            }
          }
          if (current) lines.push(current);
          return lines;
        };

        // use dataset3 values to decide whether to show dropoff text
        const ds3 = (data.datasets?.[2]?.data as number[]) ?? [];

        for (let i = 0; i < meta3.data.length; i++) {
          const bar = meta3.data[i];
          if (!bar || typeof (bar as any).getProps !== "function") continue;
          const props = (bar as any).getProps(["x", "y", "base"], true);
          const xCenter = props.x;
          const barWidth = (bar as any).width ?? 20;
          const leftX = xCenter + barWidth / 2 + 8; // start just right of the bar
          const yTop = props.y;
          const yBase = props.base ?? chartArea.bottom;
          const centerY = yTop + (yBase - yTop) / 2;

          const rawText =
            ds3[i] > 0 ? "22% dropoff Top reason:inventory issue" : "";
          if (!rawText) continue;

          // wrap and draw lines starting at leftX
          const lines = wrapText(ctx, rawText, textBoxWidth);
          const lineHeight = Math.round(fontSize * 1.2);
          const blockHeight = lines.length * lineHeight;

          for (let li = 0; li < lines.length; li++) {
            const line = lines[li];
            const y =
              centerY - blockHeight / 2 + li * lineHeight + lineHeight / 2;
            ctx.fillText(line, leftX, y);
          }
        }

        ctx.restore();
      }
    } catch (e) {}

    ctx.restore();
  },
};

const plugins = [funnelPlugin];

export default function FunnelChartChartjsUpdated() {
  const memoData = useMemo(() => chartData, []);
  const memoPlugins = useMemo(() => plugins, []);
  return (
    <div className="h-[452px]">
      <div style={{ width: "100%", height: "100%" }}>
        <Bar data={memoData} options={options} plugins={memoPlugins} />
      </div>
    </div>
  );
}
