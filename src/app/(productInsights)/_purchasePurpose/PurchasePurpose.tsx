import { TextLG, TextSM, TextXS } from "@/app/_components/Typography";
import React, { useEffect } from "react";
import CalendarButton from "@/app/_components/CalendarButton";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import usePurchaseProductStore from "@/store/purchaseProduct";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import PPChart from "./PPChart";

const PurchasePurpose = ({ store }: { store: store }) => {
  const {
    loadingTabData,
    purchaseProductTabData,
    fetchPurchaseProductTabData,
    loading,
    fetchPurchaseProductChartData,
    totalPurchase,
    chartData,
  } = usePurchaseProductStore();

  const [tab, setTab] = useState<purchasePurposeTabs>("top5");

  useEffect(() => {
    fetchPurchaseProductChartData(store);
  }, [store]);

  useEffect(() => {
    fetchPurchaseProductTabData(store, tab);
  }, [tab, store]);

  return (
    <div className="flex gap-4 max-h-[400px] items-end">
      {/* HEADER & CHART */}
      <div className="flex-[.75]">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <TextXS
              text="Purchase Purpose Trends"
              className="text-muted-foreground"
            />
            <TextLG
              text={loading ? "Loading..." : totalPurchase}
              className="mt-1"
            />
          </div>
          <CalendarButton />
        </div>
        {/* STACKED BAR */}
        <PPChart data={chartData} loading={loading} />
      </div>

      {/* TABS */}
      <div className="flex-[.25] min-h-[400px]">
        <Card className="px-3 min-h-[400px] rounded-lg">
          <CardHeader className="p-0">
            <Tabs
              value={tab}
              onValueChange={(value: string) =>
                setTab(value as purchasePurposeTabs)
              }
              className="min-w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="top5">Top 5</TabsTrigger>
                <TabsTrigger value="leakage">Leakage</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          {loadingTabData ? (
            Array.from({ length: 5 }, (_, index) => (
              <Skeleton className="w-full h-10" key={index} />
            ))
          ) : purchaseProductTabData.length > 0 ? (
            purchaseProductTabData.map((item, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <Image
                  src="/purchase-product-tab.png"
                  alt=""
                  width={40}
                  height={40}
                />
                <div className="flex flex-col gap-1">
                  <TextSM text={item.title} className="font-semibold" />
                  <TextXS
                    text={item.description}
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PurchasePurpose;
