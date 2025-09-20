import { catchApiError } from "@/utils/api/catchApiError";
import { successResponse } from "@/utils/api/Response";
import { NextRequest } from "next/server";

export const GET = catchApiError(async (req: NextRequest) => {
    const store = req.nextUrl.searchParams.get("store") || "indian";

    const indianData: ExploreProductsTableData[] = [
        {
            id: "p1",
            product: "18K Gold Diamond Ring",
            feedback: "Love the cost to value of this",
            stores: 231,
            sentiment: "Positive",
            issue: "Inventory Issue",
        },
        {
            id: "p2",
            product: "Platinum Sapphire Necklace",
            feedback: "Love the cost to value of this",
            stores: 334,
            sentiment: "Neutral",
            issue: "Seasonal",
        },
        {
            id: "p3",
            product: "Silver Emerald Earrings",
            feedback: "Love the cost to value of this",
            stores: 231,
            sentiment: "Negative",
            issue: "Inventory shortage",
        },
        {
            id: "p4",
            product: "Rose Gold Aquamarine Bracelet",
            feedback: "Love the cost to value of this",
            stores: 53,
            sentiment: "Positive",
            issue: "Discontinued SKU",
        },
        {
            id: "p5",
            product: "White Gold Pearl Pendant",
            feedback: "Love the cost to value of this",
            stores: 109,
            sentiment: "Positive",
            issue: "Discontinued SKU",
        },
    ];

    const usData: ExploreProductsTableData[] = [
        {
            id: "p21",
            product: "18K Gold Diamond Ring",
            feedback: "Love the cost to value of this",
            stores: 331,
            sentiment: "Positive",
            issue: "Inventory Issue",
        },
        {
            id: "p22",
            product: "Platinum Sapphire Necklace",
            feedback: "Love the cost to value of this",
            stores: 354,
            sentiment: "Neutral",
            issue: "Seasonal",
        },
        {
            id: "p23",
            product: "Silver Emerald Earrings",
            feedback: "Love the cost to value of this",
            stores: 281,
            sentiment: "Neutral",
            issue: "Inventory shortage",
        },
        {
            id: "p24",
            product: "Rose Gold Aquamarine Bracelet",
            feedback: "Love the cost to value of this",
            stores: 253,
            sentiment: "Negative",
            issue: "Discontinued SKU",
        },
        {
            id: "p25",
            product: "White Gold Pearl Pendant",
            feedback: "Love the cost to value of this",
            stores: 9,
            sentiment: "Neutral",
            issue: "Discontinued SKU",
        },
    ];

    return successResponse({
        data: store === "indian" ? indianData : usData,
        message: "Random KPI fetched successfully",
    });
});
