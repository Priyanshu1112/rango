import { NextRequest } from "next/server";
import { catchApiError } from "@/utils/api/catchApiError";
import { successResponse } from "@/utils/api/Response";

// ---------- helpers ----------
function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randPercent(max = 20) {
    return `${randInt(1, max)}%`;
}

function randomDataset() {
    return Array.from({ length: 7 }, () => randInt(1, 10));
}

function buildKPIs(currencySymbol = "₹"): KPI[] {
    return [
        {
            label: "Total Products Shown",
            value: randInt(100_000, 1_000_000).toLocaleString(),
            trend: "up",
            upBy: randPercent(),
            description: "from last month",
            data: { labels: ["Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep"], datasets: [{ data: randomDataset() }] }
        },
        {
            label: "Total Products Sold",
            value: `${currencySymbol} ${randInt(20_000, 90_000).toLocaleString()}`,
            trend: "up",
            upBy: randPercent(),
            description: "from last month",
            data: { labels: ["Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep"], datasets: [{ data: randomDataset() }] }
        },
        {
            label: "Conversion Rate",
            value: `${(Math.random() * 15).toFixed(1)}%`,
            trend: "up",
            description: "Industry benchmark: 8.1%",
            data: { labels: ["Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep"], datasets: [{ data: randomDataset() }] }
        },
        {
            label: "AQP Shown/Customer",
            value: randInt(5, 40).toString(),
            trend: "up",
            description: "Industry benchmark: 8.1%",
            data: { labels: ["Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep"], datasets: [{ data: randomDataset() }] }
        },
        {
            label: "ASP",
            value: `${currencySymbol} ${randInt(15_000, 60_000).toLocaleString()}`,
            trend: "down",
            description: `Industry benchmark: ${currencySymbol} ${randInt(10_000, 25_000).toLocaleString()}`,
            data: { labels: ["Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep"], datasets: [{ data: randomDataset() }] }
        },
    ];
}

// ---------- API route ----------
export const GET = catchApiError(async (req: NextRequest) => {
    const store = req.nextUrl.searchParams.get("store") || "indian";

    const kpiData = store === "indian"
        ? buildKPIs("₹")
        : buildKPIs("$");

    return successResponse({
        kpi: kpiData,
        message: "Random KPI fetched successfully"
    });
});
