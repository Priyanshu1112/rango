// /app/api/purchase-purpose/route.ts
import { NextRequest } from "next/server";
import { successResponse } from "@/utils/api/Response";
import { catchApiError } from "@/utils/api/catchApiError";

export const GET = catchApiError(async (req: NextRequest) => {
    const store = (req.nextUrl.searchParams.get("store") ?? "indian") as store;

    // Mock data per tab and store
    const indData: purchaseProductChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        ringData: [1112, 1000, 1000, 2155, 1000, 1000],
        braceletData: [1112, 1000, 1000, 2913, 1532, 1000],
        otherData: [3209, 1000, 1000, 3262, 1633, 1000]
    };

    const usData: purchaseProductChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        ringData: [1312, 2000, 2000, 1155, 3000, 2000],
        braceletData: [2112, 2000, 1500, 1913, 1320, 1200],
        otherData: [2209, 1000, 1000, 2262, 1633, 1200]
    };

    const totalPurchase = store === "indian" ? "₹ 9,00,92,090" : "$ 120,092,090";


    return successResponse({
        data: store === "indian" ? indData : usData,
        totalPurchase,
        message: `Chart data for ${store} store.`
    });
});
