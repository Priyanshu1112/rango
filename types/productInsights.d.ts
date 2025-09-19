declare type purchasePurposeTabs = "top5" | "leakage" | "insights"

interface purchasePurposeTabData {
    title: string;
    description: string;
}

interface purchaseProductChartData {
    labels: string[],
    ringData: number[],
    braceletData: number[],
    otherData: number[]
}