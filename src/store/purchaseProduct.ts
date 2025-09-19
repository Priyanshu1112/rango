import { create } from "zustand";
import { catchStoreError } from "@/utils/store/catchStoreError";
import { handleApiResponse } from "@/utils/store/handleApiResponse";

interface PurchaseProductState {
    loading: boolean;
    chartData: purchaseProductChartData;
    totalPurchase: string;

    loadingTabData: boolean;
    purchaseProductTabData: purchasePurposeTabData[];

    fetchPurchaseProductChartData: (store: store) => Promise<void>;
    fetchPurchaseProductTabData: (store: store, tab: purchasePurposeTabs) => Promise<void>;
}

const initialState = {
    loading: true,
    chartData: {
        labels: [],
        ringData: [],
        braceletData: [],
        otherData: []
    },
    totalPurchase: "",
    loadingTabData: true,
    purchaseProductTabData: []
};

const usePurchaseProductStore = create<PurchaseProductState>((set) => ({
    ...initialState,

    fetchPurchaseProductChartData: async (store = 'indian') => {
        await catchStoreError(async () => {
            set({ loading: true });

            const response = await fetch("/api/purchase-product?store=" + store);
            const { data, message } = await response.json();
            try {
                handleApiResponse(response.ok, message, () => {
                    set({ chartData: data.data, totalPurchase: data.totalPurchase });
                });
            } finally {
                set({ loading: false });
            }
        })
    },

    fetchPurchaseProductTabData: async (store = 'indian', tab = 'top5') => {
        await catchStoreError(async () => {
            set({ loadingTabData: true });

            const response = await fetch("/api/purchase-product/tab?store=" + store + "&tab=" + tab);
            const { data, message } = await response.json();
            try {
                handleApiResponse(response.ok, message, () => {
                    set({ purchaseProductTabData: data.data });
                });
            } finally {
                set({ loadingTabData: false });
            }
        })
    }
}));

export default usePurchaseProductStore;
