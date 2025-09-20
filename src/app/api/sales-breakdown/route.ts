import { catchApiError } from "@/utils/api/catchApiError";
import { successResponse } from "@/utils/api/Response";
import { NextRequest } from "next/server";

export const GET = catchApiError(async (req: NextRequest) => {
    const store = req.nextUrl.searchParams.get("store") || "indian";

    const MAX_VALUE = 200000;
    const MAX_SUM = MAX_VALUE - 4000; // 196000

    // Utility: generate randomized stage
    const getRandomStage = (
        label: string,
        smallLabel: string,
        fixedPercent: string,
        trend: "up" | "down",
        event: string,
        reason: string
    ) => {
        // Pick a random value (between 50k and MAX_SUM)
        const value = Math.floor(Math.random() * (MAX_SUM - 50000) + 50000);

        // Max redData we can allow without crossing MAX_SUM
        const maxRed = Math.max(0, MAX_SUM - value);

        // Random redData value between 0 and maxRed
        const redValue =
            Math.random() < 0.3 ? 0 : Math.floor(Math.random() * (maxRed + 1)); // 30% chance it's exactly 0

        return {
            label,
            value,
            smallLabel,
            percentLabel: fixedPercent, // keeping stage percent fixed as per requirement
            trend,
            redData: {
                value: redValue,
                percentLabel:
                    redValue > 0
                        ? `${((redValue / (value + redValue)) * 100).toFixed(1)}%`
                        : "",
                event,
                reason,
            },
        };
    };

    const indianData: SalesBreakdown[] = [
        getRandomStage("Products Shown", "1.27M Products", "100%", "down", "", ""),
        getRandomStage(
            "Shortlisted",
            "984K Products",
            "78%",
            "down",
            "dropoff",
            "inventory issue"
        ),
        getRandomStage(
            "Finalised",
            "953K Products",
            "75%",
            "down",
            "dropoff",
            "design issue"
        ),
        getRandomStage(
            "Checkout",
            "559K Products",
            "44%",
            "down",
            "dropoff",
            "size issue"
        ),
        getRandomStage(
            "Net Revenue",
            "₹10,40,00,000",
            "43.5%",
            "up",
            "refund, return, etc",
            "design issue"
        ),
    ];

    const usData: SalesBreakdown[] = [
        getRandomStage("Products Shown", "1.10M Products", "90%", "down", "", ""),
        getRandomStage(
            "Shortlisted",
            "910K Products",
            "78%",
            "down",
            "dropoff",
            "stockout issue"
        ),
        getRandomStage(
            "Finalised",
            "870K Products",
            "66%",
            "down",
            "dropoff",
            "customization issue"
        ),
        getRandomStage(
            "Checkout",
            "490K Products",
            "52%",
            "down",
            "dropoff",
            "shipping delay"
        ),
        getRandomStage(
            "Net Revenue",
            "₹8,80,00,000",
            "49.5%",
            "up",
            "refund, return, etc",
            "defective item"
        ),
    ];

    const dominate =
        store === "indian"
            ? "Earrings dominate June at ₹102.6Cr; gold surge July"
            : "Earrings dominate July at $302.6Cr; gold surge August";

    return successResponse({
        data: store === "indian" ? indianData : usData,
        dominate,
        message: "Random KPI fetched successfully",
    });
});
