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
import { useEffect, useState } from "react";
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

  const [formatted, setFormatted] = useState("");
  const [iso, setIso] = useState("");

  useEffect(() => {
    const now = new Date();
    setIso(now.toISOString());
    setFormatted(
      now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
    );
  }, []);

  return (
    <main className="container mx-auto pb-10 relative">
      {/* HEADER */}
      <header
        className="
        flex justify-between items-center 
        pt-3 pb-4 
        sticky top-0 z-50 
        bg-[#F9FAFB]
        before:content-[''] before:absolute before:top-0 before:-left-10 before:w-10 before:h-full before:bg-[#F9FAFB] before:z-40
        after:content-[''] after:absolute after:top-0 after:-right-10 after:w-10 after:h-full after:bg-[#F9FAFB] after:z-40
      "
      >
        <H1 text="Product Insights" />

        <div className="flex items-center gap-4">
          <TextXS className="text-green-600 flex items-center gap-1">
            <span className="inline-grid h-2 w-2 rounded-full bg-green-600" />
            <time dateTime={iso}>Updated on {formatted}</time>
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
