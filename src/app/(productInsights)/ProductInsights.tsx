"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { H1, TextSM, TextXS } from "../_components/Typography";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import useAppStore from "@/store/app";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import KPI from "./_kpi/KPI";
import PurchasePurpose from "./_purchasePurpose/PurchasePurpose";
import SalesBreakDown from "./_salesBreakDown/SalesBreakDown";
import ExploreProducts from "./_exploreProducts/ExploreProducts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Filler,
  Tooltip,
  Legend,

  PointElement,
  BarElement
);

const ProductInsights = () => {
  const { setSuccess } = useAppStore();

  const [store, setStore] = useState<store>("indian");

  return (
    <main className="container mx-auto pb-10 relative">
      {/* HEADER */}
      <header className="flex justify-between items-center pt-3 pb-4 sticky top-0 z-50 bg-[#F9FAFB]">
        <H1 text="Product Insights" />

        <div className="flex items-center gap-4">
          <TextXS className="text-green-600 flex items-center gap-1">
            <span className="inline-grid h-2 w-2 rounded-full bg-green-600" />
            <time dateTime="2024-10-22T12:23:00+05:30">
              Updated on 22 Oct 2024, 12:23 IST
            </time>
          </TextXS>

          <Select
            value={store}
            onValueChange={(value: store) => setStore(value)}
          >
            <SelectTrigger className="text-sm font-medium leading-5 px-4 cursor-pointer min-w-40 text-[#0A0A0A] bg-white ">
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="indian"
                className="text-sm font-medium leading-5"
              >
                All Indian Store
              </SelectItem>
              <SelectItem value="us" className="text-sm font-medium leading-5">
                All US Store
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={"outline"}
            className="cursor-pointer text-[#0A0A0A]"
            onClick={() => setSuccess("Exported successfully!")}
          >
            <TextSM>Export Data</TextSM>
            <Share size={16} />
          </Button>
        </div>
      </header>

      <section className="flex flex-col gap-10">
        {/* KPI */}
        <KPI store={store} />

        {/* Purchase Purpose */}
        <PurchasePurpose store={store} />

        {/* Sales Break Down */}
        <SalesBreakDown store={store} />

        {/* Explore Products */}
        <ExploreProducts store={store} />
      </section>
    </main>
  );
};

export default ProductInsights;
