import React, { useEffect } from "react";
import SalesBreakDownChart from "./SalesBreakDownChart";
import { TextLG, TextXS } from "@/app/_components/Typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CalendarButton from "@/app/_components/CalendarButton";
import { Card } from "@/components/ui/card";
import SalesBreakdownTable from "./SalesBreakdownTable";
import { Sparkle } from "lucide-react";
import useSalesBreakdownStore from "@/store/salesBreakdown";

const salesTabs: salesBreakDownTabs[] = [
  "Rings",
  "Bracelets",
  "Pendants",
  "9KT collection",
  "Solitaire",
  "Other",
];

const SalesBreakDown = ({ store }: { store: store }) => {
  const { chartData, dominate, loading, fetchSalesBreakdown } =
    useSalesBreakdownStore();
  const [tabs, setTabs] = useState<salesBreakDownTabs>("Rings");

  useEffect(() => {
    fetchSalesBreakdown(store);
  }, [store, tabs]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <TextXS text="Sales break down" className="text-muted-foreground" />
          <TextLG text={loading ? "Loading..." : dominate} className="mt-1" />
        </div>
        <div className="flex gap-2 items-center">
          <Tabs
            value={tabs}
            onValueChange={(value: string) =>
              setTabs(value as salesBreakDownTabs)
            }
            className="w-full"
          >
            <TabsList className="w-full">
              {salesTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <CalendarButton />
        </div>
      </div>

      <Card className="rounded-[10px] px-3 gap-5">
        <SalesBreakDownChart data={loading ? [] : chartData} />
        <SalesBreakdownTable store={store} />
        <p className="text-[13px] rounded-md shadow-xs tracking-normal flex gap-2 py-2 px-3 bg-blue-100 text-blue-700">
          <Sparkle size={16} />
          Checkout abandonment is disproportionately high for 18kt gold,
          suggesting size chart clarity and metal variant recommendations could
          recover up to ₹3.2M in potential sales.
        </p>
      </Card>
    </div>
  );
};

export default SalesBreakDown;
