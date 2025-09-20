interface ExploreProductsTableData {
    id: string;
    product: string;
    feedback: string;
    stores: number;
    sentiment: sentiment;
    issue?: string;
};

declare type sentiment = "Positive" | "Neutral" | "Negative";