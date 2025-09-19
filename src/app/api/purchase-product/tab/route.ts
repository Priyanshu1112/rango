// /app/api/purchase-purpose/route.ts
import { NextRequest } from "next/server";
import { successResponse } from "@/utils/api/Response";
import { catchApiError } from "@/utils/api/catchApiError";

export const GET = catchApiError(async (req: NextRequest) => {
    const store = (req.nextUrl.searchParams.get("store") ?? "indian") as store;
    const tab = (req.nextUrl.searchParams.get("tab") ?? "top5") as purchasePurposeTabs;

    // Mock data per tab and store
    const data = {
        indian: {
            top5: [
                {
                    title: "18K Gold Diamond Ring",
                    description: "Highest demand & revenue",
                },
                {
                    title: "Platinum Sapphire Necklace",
                    description: "Loved for anniversaries",
                },
                {
                    title: "Sterling Silver Emerald Earrings",
                    description: "Trending on social media",
                },
                {
                    title: "Rose Gold Morganite Bracelet",
                    description: "Features a delicate pavé setting",
                },
                {
                    title: "Titanium Tungsten Wedding Band",
                    description: "Praised for its scratch-resistance",
                },
            ],
            leakage: [
                {
                    title: "Gold Hoop",
                    description: "High drop-off at checkout",
                },
                {
                    title: "Pearl Necklace",
                    description: "Frequent returns",
                },
            ],
            insights: [
                {
                    title: "Shifting Preferences",
                    description: "Interest in colored stones up 10% MoM",
                },
                {
                    title: "Repeat Buyers",
                    description: "Repeat purchases highest in major metros",
                },
            ],
        },
        us: {
            top5: [
                {
                    title: "18K White Gold Wedding Band",
                    description: "Most popular choice in US",
                },
                {
                    title: "Diamond Stud Earrings",
                    description: "Classic and timeless favorite",
                },
                {
                    title: "Sapphire Pendant Necklace",
                    description: "High demand for birthdays",
                },
                {
                    title: "Rose Gold Charm Bracelet",
                    description: "Trending gift this season",
                },
                {
                    title: "Platinum Men's Cufflinks",
                    description: "Corporate gift favorite",
                },
            ],
            leakage: [
                {
                    title: "Silver Hoop Earrings",
                    description: "Abandoned cart frequent",
                },
                {
                    title: "Fashion Watches",
                    description: "High return rate",
                },
            ],
            insights: [
                {
                    title: "Luxury Segment Growth",
                    description: "Luxury jewelry demand up by 15%",
                },
                {
                    title: "Eco Conscious",
                    description: "Sustainable products favored in younger buyers",
                },
            ],
        },
    };


    return successResponse({
        data: data[store][tab],
        message: `${tab} data for ${store} store.`
    });
});
