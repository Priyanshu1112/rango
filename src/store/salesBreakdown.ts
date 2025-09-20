import { create } from "zustand";
import { catchStoreError } from "@/utils/store/catchStoreError";
import { handleApiResponse } from "@/utils/store/handleApiResponse";

interface SalesBreakdownState {
    loading: boolean;
    chartData: SalesBreakdown[];
    dominate: string;

    loadingTable: boolean,
    tableData: SalesBreakdownTable[];

    fetchSalesBreakdown: (store: store) => Promise<void>;
    fetchSalesBreakdownTable: (store: store, tab: salesBreakDownTableTabs) => Promise<void>;
}

const initialState = {
    loading: true,
    chartData: [],
    dominate: "",

    loadingTable: true,
    tableData: [],
};

const useSalesBreakdownStore = create<SalesBreakdownState>((set) => ({
    ...initialState,

    fetchSalesBreakdown: async (store = 'indian') => {
        await catchStoreError(async () => {
            set({ loading: true });

            const response = await fetch("/api/sales-breakdown?store=" + store);
            const { data, message } = await response.json();
            try {
                handleApiResponse(response.ok, message, () => {
                    set({ chartData: data.data, dominate: data.dominate });
                });
            } finally {
                set({ loading: false });
            }
        })
    },

    fetchSalesBreakdownTable: async (store = 'indian', tab = 'Lab-grown Diamond / Clarity') => {
        await catchStoreError(async () => {
            set({ loadingTable: true });

            const response = await fetch("/api/sales-breakdown/table?store=" + store + "&tab=" + tab);
            const { data, message } = await response.json();
            try {
                handleApiResponse(response.ok, message, () => {
                    set({ tableData: data.data });
                });
            } finally {
                set({ loadingTable: false });
            }
        })
    }
}));

export default useSalesBreakdownStore;
