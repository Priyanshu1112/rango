import { create } from "zustand";
import { catchStoreError } from "@/utils/store/catchStoreError";
import { handleApiResponse } from "@/utils/store/handleApiResponse";

interface KPIState {
    loading: boolean;
    kpiData: KPI[];

    fetchKPI: (store: store) => Promise<void>;
}

const initialState = {
    loading: true,
    kpiData: []
};

const useKPIStore = create<KPIState>((set) => ({
    ...initialState,

    fetchKPI: async (store = 'indian') => {
        await catchStoreError(async () => {
            set({ loading: true });

            const response = await fetch("/api/kpi?store=" + store);
            const { data, message } = await response.json();
            try {
                handleApiResponse(response.ok, message, () => {
                    set({ kpiData: data.kpi });
                });
            } finally {
                set({ loading: false });
            }
        })
    }
}));

export default useKPIStore;
