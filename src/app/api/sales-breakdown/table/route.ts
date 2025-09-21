import { catchApiError } from "@/utils/api/catchApiError";
import { successResponse } from "@/utils/api/Response";
import { NextRequest } from "next/server";

export const GET = catchApiError(async (req: NextRequest) => {
    const store = (req.nextUrl.searchParams.get("store") || "indian").toLowerCase();
    const tab = req.nextUrl.searchParams.get("tab") || "Lab-grown Diamond / Clarity";

    // base template (labels / reasons must not change)
    // const BASE_DATA: SalesBreakdownTable[] = [
    //     {
    //         size: "< 1 ct",
    //         cols: [
    //             {
    //                 value: "50K",
    //                 percent: "2%",
    //                 reasons: "Market fluctuations, supply issues, +2",
    //             },
    //             {
    //                 value: "50K",
    //                 percent: "2%",
    //                 reasons: "Market fluctuations, supply issues, +2",
    //             },
    //             {
    //                 value: "50K",
    //                 percent: "2%",
    //                 reasons: "Market fluctuations, supply issues, +2",
    //             },
    //             {
    //                 value: "50K",
    //                 percent: "2%",
    //                 reasons: "Market fluctuations, supply issues, +2",
    //             },
    //         ],
    //         revenue: { amount: "₹10,40,00,000", changePct: "12%" },
    //     },
    //     {
    //         size: "1.0 - 1.5 ct",
    //         cols: [
    //             {
    //                 value: "100K",
    //                 percent: "4%",
    //                 reasons: "Regulatory changes, staffing, +4",
    //             },
    //             {
    //                 value: "100K",
    //                 percent: "4%",
    //                 reasons: "Regulatory changes, staffing, +4",
    //             },
    //             {
    //                 value: "100K",
    //                 percent: "4%",
    //                 reasons: "Regulatory changes, staffing, +4",
    //             },
    //             {
    //                 value: "100K",
    //                 percent: "4%",
    //                 reasons: "Regulatory changes, staffing, +4",
    //             },
    //         ],
    //         revenue: { amount: "₹11,20,00,000", changePct: "12%" },
    //     },
    //     {
    //         size: "1.5 - 2.0 ct",
    //         cols: [
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //         ],
    //         revenue: { amount: "₹11,20,00,000", changePct: "12%" },
    //     },
    //     {
    //         size: "> 2.0 ct",
    //         cols: [
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //             {
    //                 value: "30K",
    //                 percent: "1%",
    //                 reasons: "Technical hiccups, training, +1",
    //             },
    //         ],
    //         revenue: { amount: "₹9,60,00,000", changePct: "12%" },
    //     },
    // ];
    const BASE_DATA: SalesBreakdownTable[] = [
        {
            size: "< 0.5 ct",
            cols: [
                { value: "20K", percent: "1%", reasons: "Seasonal demand, +1" },
                { value: "20K", percent: "1%", reasons: "Seasonal demand, +1" },
                { value: "20K", percent: "1%", reasons: "Seasonal demand, +1" },
                { value: "20K", percent: "1%", reasons: "Seasonal demand, +1" },
            ],
            revenue: { amount: "₹5,20,00,000", changePct: "10%" },
        },
        {
            size: "0.5 – 1.0 ct",
            cols: [
                { value: "35K", percent: "2%", reasons: "Market fluctuations, +2" },
                { value: "35K", percent: "2%", reasons: "Market fluctuations, +2" },
                { value: "35K", percent: "2%", reasons: "Market fluctuations, +2" },
                { value: "35K", percent: "2%", reasons: "Market fluctuations, +2" },
            ],
            revenue: { amount: "₹8,40,00,000", changePct: "11%" },
        },
        {
            size: "1.0 – 1.5 ct",
            cols: [
                { value: "100K", percent: "4%", reasons: "Regulatory changes, +4" },
                { value: "100K", percent: "4%", reasons: "Regulatory changes, +4" },
                { value: "100K", percent: "4%", reasons: "Regulatory changes, +4" },
                { value: "100K", percent: "4%", reasons: "Regulatory changes, +4" },
            ],
            revenue: { amount: "₹11,20,00,000", changePct: "12%" },
        },
        {
            size: "1.5 – 2.0 ct",
            cols: [
                { value: "30K", percent: "1%", reasons: "Technical hiccups, +1" },
                { value: "30K", percent: "1%", reasons: "Technical hiccups, +1" },
                { value: "30K", percent: "1%", reasons: "Technical hiccups, +1" },
                { value: "30K", percent: "1%", reasons: "Technical hiccups, +1" },
            ],
            revenue: { amount: "₹11,20,00,000", changePct: "12%" },
        },
        {
            size: "2.0 – 2.5 ct",
            cols: [
                { value: "45K", percent: "2%", reasons: "Training issues, +2" },
                { value: "45K", percent: "2%", reasons: "Training issues, +2" },
                { value: "45K", percent: "2%", reasons: "Training issues, +2" },
                { value: "45K", percent: "2%", reasons: "Training issues, +2" },
            ],
            revenue: { amount: "₹12,00,00,000", changePct: "13%" },
        },
        {
            size: "2.5 – 3.0 ct",
            cols: [
                { value: "60K", percent: "3%", reasons: "Inventory shortage, +3" },
                { value: "60K", percent: "3%", reasons: "Inventory shortage, +3" },
                { value: "60K", percent: "3%", reasons: "Inventory shortage, +3" },
                { value: "60K", percent: "3%", reasons: "Inventory shortage, +3" },
            ],
            revenue: { amount: "₹12,80,00,000", changePct: "14%" },
        },
        {
            size: "3.0 – 3.5 ct",
            cols: [
                { value: "75K", percent: "4%", reasons: "Regulatory delay, +4" },
                { value: "75K", percent: "4%", reasons: "Regulatory delay, +4" },
                { value: "75K", percent: "4%", reasons: "Regulatory delay, +4" },
                { value: "75K", percent: "4%", reasons: "Regulatory delay, +4" },
            ],
            revenue: { amount: "₹13,40,00,000", changePct: "15%" },
        },
        {
            size: "> 3.5 ct",
            cols: [
                { value: "90K", percent: "5%", reasons: "Economic slowdown, +5" },
                { value: "90K", percent: "5%", reasons: "Economic slowdown, +5" },
                { value: "90K", percent: "5%", reasons: "Economic slowdown, +5" },
                { value: "90K", percent: "5%", reasons: "Economic slowdown, +5" },
            ],
            revenue: { amount: "₹14,00,00,000", changePct: "16%" },
        },
    ];


    // helper to deep clone and mutate safely
    const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

    // derive table data from base template according to tab + store
    let tableData: SalesBreakdownTable[] = clone(BASE_DATA);

    // Tab-based variations (keeps label/smallLabel/reasons unchanged as requested)
    if (tab === "Gold") {
        // For 'Gold' tab we change the displayed values to a different set (example)
        tableData = tableData.map((row, rIdx) => {
            const multiplierByRow = [1.2, 1.1, 0.9, 0.85][rIdx] ?? 1;
            const newCols = row.cols.map((c) => {
                // compute new numeric value from original string like "50K" => 50
                const baseNum =
                    typeof c.value === "string" && c.value.toUpperCase().endsWith("K")
                        ? Number(c.value.slice(0, -1))
                        : parseInt(String(c.value)) || 0;
                const newNum = Math.round(baseNum * multiplierByRow);
                return {
                    ...c,
                    value: `${newNum}K`,
                    // keep percent/reasons as-is (requirements)
                };
            });

            // adjust revenue slightly for gold
            const revenueMultiplier = 1.15;
            const amountDigits = row.revenue.amount.replace(/[^\d]/g, "");
            const amountNum = Number(amountDigits || 0);
            const newAmountNum = Math.round(amountNum * revenueMultiplier);
            // reformat back to ₹xx,xx,xx,xxx style (simple heuristic)
            const formatted =
                "₹" +
                newAmountNum.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ","); // not perfect, but OK for sample

            return {
                ...row,
                cols: newCols,
                revenue: { amount: formatted, changePct: row.revenue.changePct },
            };
        });
    } else {
        // default (Lab-grown Diamond / Clarity) — we mildly randomize values a bit per store
        tableData = tableData.map((row, rIdx) => {
            // small pseudo-random but deterministic adjustments depending on store
            const randSeed = store === "indian" ? 1 : 0.92; // us slightly lower
            const rowFactor = 1 + (rIdx - 1) * 0.02;
            const newCols = row.cols.map((c, cIdx) => {
                const baseNum =
                    typeof c.value === "string" && c.value.toUpperCase().endsWith("K")
                        ? Number(c.value.slice(0, -1))
                        : parseInt(String(c.value)) || 0;
                // vary value slightly by column index so not all cols equal
                const colAdj = 1 + (cIdx - 1) * 0.01;
                const newNum = Math.max(
                    1,
                    Math.round(baseNum * randSeed * rowFactor * colAdj)
                );
                return { ...c, value: `${newNum}K` };
            });

            // revenue adjust for store
            const revenueMultiplier = store === "us" ? 0.9 : 1.0;
            const amountDigits = row.revenue.amount.replace(/[^\d]/g, "");
            const amountNum = Number(amountDigits || 0);
            const newAmountNum = Math.round(amountNum * revenueMultiplier);
            const formatted =
                (store === "us" ? "$" : "₹") +
                newAmountNum.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");

            return {
                ...row,
                cols: newCols,
                revenue: { amount: formatted, changePct: row.revenue.changePct },
            };
        });
    }

    // Additionally: allow tab-specific per-store tweak for a realistic feel
    if (store === "us" && tab === "Gold") {
        tableData = tableData.map((row) => {
            const newCols = row.cols.map((c) => {
                // US gold numbers might be shown without K suffix for demo (keep reasons)
                const baseNum =
                    typeof c.value === "string" && c.value.toUpperCase().endsWith("K")
                        ? Number(c.value.slice(0, -1))
                        : parseInt(String(c.value)) || 0;
                const scaled = Math.max(1, Math.round(baseNum * 0.95));
                return { ...c, value: `${scaled}K` };
            });
            return { ...row, cols: newCols };
        });
    }

    return successResponse({
        data: tableData,
        meta: { store, tab },
        message: "Sales breakdown table fetched",
    });
});
