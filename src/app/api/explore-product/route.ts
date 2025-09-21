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
        {
            id: "p6",
            product: "Titanium Tungsten Wedding Band",
            feedback: "Premium feel, great durability",
            stores: 175,
            sentiment: "Positive",
            issue: "High Cost",
        },
        {
            id: "p7",
            product: "Classic Diamond Studs",
            feedback: "Timeless look, but stock low",
            stores: 58,
            sentiment: "Negative",
            issue: "Inventory Issue",
        },
        {
            id: "p8",
            product: "Emerald Halo Necklace",
            feedback: "Gorgeous, perfect gift choice",
            stores: 121,
            sentiment: "Positive",
            issue: "None",
        },
        {
            id: "p9",
            product: "Ruby Drop Earrings",
            feedback: "Bold and beautiful, a bit heavy",
            stores: 34,
            sentiment: "Neutral",
            issue: "Weight Concern",
        },
    ];

    const usData: ExploreProductsTableData[] = [
        {
            id: "p21",
            product: "18K Gold Diamond Ring",
            feedback: "Excellent price for the sparkle",
            stores: 310,
            sentiment: "Positive",
            issue: "Inventory Issue",
        },
        {
            id: "p22",
            product: "Platinum Sapphire Necklace",
            feedback: "Looks great, arrived late",
            stores: 187,
            sentiment: "Neutral",
            issue: "Shipping Delay",
        },
        {
            id: "p23",
            product: "Silver Emerald Earrings",
            feedback: "Unique design, fits well",
            stores: 144,
            sentiment: "Positive",
            issue: "Limited Edition",
        },
        {
            id: "p24",
            product: "Rose Gold Aquamarine Bracelet",
            feedback: "Good value, slightly small size",
            stores: 205,
            sentiment: "Negative",
            issue: "Size Issue",
        },
        {
            id: "p25",
            product: "White Gold Pearl Pendant",
            feedback: "Arrived damaged, replaced quickly",
            stores: 41,
            sentiment: "Negative",
            issue: "Quality Issue",
        },
        {
            id: "p26",
            product: "Titanium Wedding Band",
            feedback: "Perfect fit, stunning metal",
            stores: 206,
            sentiment: "Positive",
            issue: "No Issue",
        },
        {
            id: "p27",
            product: "Classic Diamond Studs",
            feedback: "Superb clarity for price",
            stores: 89,
            sentiment: "Positive",
            issue: "Seasonal",
        },
        {
            id: "p28",
            product: "Emerald Halo Necklace",
            feedback: "Nice chain, quick delivery",
            stores: 97,
            sentiment: "Neutral",
            issue: "Short Chain",
        },
        {
            id: "p29",
            product: "Opal Cluster Ring",
            feedback: "Lightweight, wish for more size options",
            stores: 34,
            sentiment: "Neutral",
            issue: "Size Variety",
        },
    ];


    return successResponse({
        data: store === "indian" ? indianData : usData,
        message: "Random KPI fetched successfully",
    });
});
