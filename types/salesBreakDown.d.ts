declare type salesBreakDownTabs = "Rings" | "Bracelets" | "Pendants" | "9KT collection" | "Solitaire" | "Other"
declare type salesBreakDownTableTabs = "Lab-grown Diamond / Clarity" | "Gold"

interface Stage {
    key: string;
    title: string;
    value: number;
    percentLabel?: string;
    smallLabel?: string;
    dropoff?: { percent: string; reason?: string };
    highlight?: { percent: string; color?: string };
    trend?: trend;
};