import { create } from "zustand";
import { catchStoreError } from "@/utils/store/catchStoreError";
import { handleApiResponse } from "@/utils/store/handleApiResponse";

interface ExploreProductsState {
    loading: boolean;
    tableData: ExploreProductsTableData[];

    fetchTableData: (store: store) => Promise<void>;
}

const initialState = {
    loading: true,
    tableData: [],

};

const useExploreProductsStore = create<ExploreProductsState>((set) => ({
    ...initialState,

    fetchTableData: async (store = 'indian') => {
        await catchStoreError(async () => {
            set({ loading: true });

            const response = await fetch("/api/explore-product?store=" + store);
            const { data, message } = await response.json();
            try {
                handleApiResponse(response.ok, message, () => {
                    set({ tableData: data.data });
                });
            } finally {
                set({ loading: false });
            }
        })
    },

}));

export default useExploreProductsStore;
