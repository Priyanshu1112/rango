declare type salesBreakDownTabs = "Rings" | "Bracelets" | "Pendants" | "9KT collection" | "Solitaire" | "Other"
declare type salesBreakDownTableTabs = "Lab-grown Diamond / Clarity" | "Gold"

interface SalesBreakdown {
    label: string,
    value: number,
    smallLabel: string,
    percentLabel: string,
    trend: trend,
    redData?: redData
}

interface redData {
    value: number,
    percentLabel: string,
    event: string,
    reason: string,
}

interface SalesBreakdownTable {
    size: string;
    cols: SalesBreakdownCol[];
    revenue: SalesBreakdownRevenue;
};

interface SalesBreakdownCol {
    value: string;
    percent: string;
    reasons: string;
    extra?: string;
}

interface SalesBreakdownRevenue {
    amount: string;
    changePct: string;
}