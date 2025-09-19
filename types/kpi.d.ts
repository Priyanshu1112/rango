interface KPI {
    label: string;
    value: string;
    trend: trend;
    upBy?: string;
    downBy?: string;
    description: string;
    data?: KPIData;
}

declare type trend = "up" | "down";

interface KPIData {
    labels: string[],
    datasets: {
        data: number[]
    }[]
}