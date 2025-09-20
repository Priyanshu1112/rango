"use client";

// components/FunnelChartChartjsUpdated.tsx
import React, { useMemo, useRef } from "react";
import { ChartOptions, ChartData, Plugin, Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";

// Custom plugin for funnel visualization

export default function FunnelChartChartjsUpdated({
  data: apiData,
}: {
  data: SalesBreakdown[];
}) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const chartData = useMemo<ChartData<"bar", number[], string>>(() => {
    return {
      labels: apiData.map((s) => s.label),
      datasets: [
        {
          label: "",
          data: apiData.map((s) => s.value),
          backgroundColor: apiData.map((s) =>
            s.trend === "up" ? "#16A34A" : "#012F48"
          ),
          categoryPercentage: 1,
          barThickness: 20,
        },
        {
          label: "",
          data: apiData.map(() => 4000),
          backgroundColor: "transparent",
          barThickness: 20,
          categoryPercentage: 1,
        },
        {
          label: "",
          data: apiData.map((d) => d.redData?.value ?? 0),
          backgroundColor: apiData.map((d) =>
            d.redData?.value == 0
              ? "transparent"
              : d.value / (d.redData?.value ?? 1) < 1
              ? "#EF4444"
              : "#FCA5A5"
          ),
          borderWidth: 0,
          barThickness: 20,
          categoryPercentage: 1,
        },
      ],
    };
  }, [apiData]);

  const funnelPlugin = useMemo<Plugin<"bar">>(() => {
    return {
      id: "funnelPluginV3",
      beforeDraw: (chart) => {
        const { ctx, chartArea, scales, data } = chart;
        if (!ctx || !chartArea || apiData.length === 0) return;

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
          const t = apiData[i + 1]?.trend ?? "down";

          // Build polygon from TOP -> curr.value -> next.value -> TOP
          // (if you prefer bottom-to-value, change chartArea.top to chartArea.bottom accordingly)
          ctx.beginPath();
          ctx.moveTo(curr.x, chartArea.top); // top-left
          ctx.lineTo(curr.x, curr.y); // down to current value
          ctx.lineTo(next.x, next.y); // across to next value
          ctx.lineTo(next.x, chartArea.top); // up to top-right
          ctx.closePath();

          // Create a vertical-ish gradient anchored to the trapezoid bounds.
          const maxY = Math.max(curr.y, next.y);
          const midY = (chartArea.top + maxY) / 2;
          const grad = ctx.createLinearGradient(
            curr.x,
            midY, // start at left bar center
            next.x,
            midY // end at right bar center
          );

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

            const label = apiData?.[i]?.percentLabel ?? "100%";
            ctx.fillStyle =
              apiData?.[i]?.trend === "up" ? "#16A34A" : "#012F48";
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
            const stage = apiData[i];

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

        // RED DATA LABELS
        try {
          const dataset3Index = 2;
          const meta3 = chart.getDatasetMeta(dataset3Index);
          if (meta3 && Array.isArray(meta3.data)) {
            ctx.save();

            const textBoxWidth = 86;
            const percentFontSize = 12;
            const eventFontSize = 12;
            const labelFontSize = 11; // "Top reason:" font
            const reasonFontSize = 11; // reason font
            const gapBetweenPercentAndEvent = 6; // px space between percent and event
            const lineGap = 2;

            // ensure left alignment for text and set baseline where needed
            ctx.textAlign = "start";

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

              // read the redData from apiData
              const rd = apiData?.[i]?.redData;
              if (!rd || (rd.value ?? 0) <= 0) continue;

              const percentText = (rd.percentLabel || "").trim(); // e.g. "22%"
              const eventText = (rd.event || "").trim() || "dropoff"; // e.g. "dropoff"
              const reasonText = (rd.reason || "").trim() || "inventory issue"; // e.g. "inventory issue"

              // compute vertical placement: first line (percent+event), second line "Top reason:", third line reason(s)
              // estimate heights to vertically center the 3-line block around centerY
              const firstLineHeight = percentFontSize; // approx
              const secondLineHeight = labelFontSize;
              const totalEstimate =
                firstLineHeight +
                lineGap +
                secondLineHeight +
                lineGap +
                reasonFontSize * 2;

              const startY = Math.round(centerY - totalEstimate / 2);

              // ---- First line: percent (red, bold) + event (gray) ----
              // draw percent
              ctx.font = `700 ${percentFontSize}px Inter, sans-serif`;
              ctx.textBaseline = "top";
              // measure percent
              let drawPercent = percentText;
              let percentWidth = percentText
                ? ctx.measureText(percentText).width
                : 0;

              // measure event and decide truncation if combined width > textBoxWidth
              ctx.font = `400 ${eventFontSize}px Inter, sans-serif`;

              // if percent itself exceeds full width, truncate percent
              if (percentWidth > textBoxWidth) {
                ctx.font = `700 ${percentFontSize}px Inter, sans-serif`;
                const ell = "…";
                let s = percentText;
                while (
                  s.length > 0 &&
                  ctx.measureText(s + ell).width > textBoxWidth
                ) {
                  s = s.slice(0, -1);
                }
                drawPercent = s + (s.length ? ell : "");
                percentWidth = ctx.measureText(drawPercent).width;
              }

              // set percent style & draw
              ctx.font = `700 ${percentFontSize}px Inter, sans-serif`;
              ctx.fillStyle = "#EF4444";
              ctx.fillText(drawPercent, leftX, startY);

              // draw event next to percent (truncate with ellipsis if necessary)
              if (eventText) {
                ctx.font = `700 ${eventFontSize}px Inter, sans-serif`;
                ctx.fillStyle = "#6B7280"; // gray for event

                let drawEvent = eventText;
                if (drawEvent) {
                  const eventX =
                    leftX + percentWidth + gapBetweenPercentAndEvent;
                  ctx.fillText(drawEvent, eventX, startY);
                }
              }

              // ---- Second line: "Top reason:" ----
              const topReasonY = startY + firstLineHeight + lineGap;
              ctx.font = `400 ${labelFontSize}px Inter, sans-serif`;
              ctx.textBaseline = "top";
              ctx.fillStyle = "#6B7280"; // muted gray for label
              ctx.fillText("Top reason:", leftX, topReasonY);

              // ---- Third line(s): actual reason (allow up to 2 wrapped lines) ----
              const reasonStartY = topReasonY + labelFontSize + lineGap;
              ctx.font = `400 ${reasonFontSize}px Inter, sans-serif`;
              ctx.fillStyle = "#6B7280"; // dark red/burgundy for the reason text as requested

              // simple word-wrap into lines <= textBoxWidth
              const words = reasonText.split(/\s+/);
              const reasonLines: string[] = [];
              let cur = "";
              for (let w = 0; w < words.length; w++) {
                const word = words[w];
                const test = cur ? `${cur} ${word}` : word;
                if (ctx.measureText(test).width <= textBoxWidth) {
                  cur = test;
                } else {
                  if (cur) reasonLines.push(cur);
                  // if single word too long, split by characters
                  if (ctx.measureText(word).width > textBoxWidth) {
                    let acc = "";
                    for (const ch of word) {
                      const t = acc + ch;
                      if (ctx.measureText(t).width <= textBoxWidth) {
                        acc = t;
                      } else {
                        if (acc) reasonLines.push(acc);
                        acc = ch;
                      }
                    }
                    cur = acc;
                  } else {
                    cur = word;
                  }
                }
              }
              if (cur) reasonLines.push(cur);

              const maxReasonLines = 2;
              const drawReasonLines = reasonLines.slice(0, maxReasonLines);
              for (let li = 0; li < drawReasonLines.length; li++) {
                const line = drawReasonLines[li];
                const y = reasonStartY + li * (reasonFontSize + 2);
                ctx.fillText(line, leftX, y);
              }
            }

            ctx.restore();
          }
        } catch (e) {}

        ctx.restore();
      },
    };
  }, [apiData]);

  // Chart.js options
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        // return false for tooltip items you want to hide; here datasetIndex 1 is hidden
        filter: (tooltipItem) => {
          // tooltipItem.datasetIndex is the dataset index of that tooltip row
          return tooltipItem.datasetIndex !== 1;
        },
        // optional: customize label for other datasets
        callbacks: {
          label: (ctx) => {
            const value = ctx.raw ?? "";
            // Example label formatting: show only for dataset 0 and 2
            return `${value}`;
          },
        },
      },
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

    onHover: () => {
      // change cursor
      const canvas = chartRef.current?.canvas;
      if (canvas) canvas.style.cursor = "pointer";
    },
  };

  return (
    <div className="h-[452px]">
      <div style={{ width: "100%", height: "100%" }}>
        {apiData.length > 0 ? (
          <Bar
            ref={chartRef}
            data={chartData}
            options={options}
            plugins={[funnelPlugin]}
          />
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>
    </div>
  );
}
