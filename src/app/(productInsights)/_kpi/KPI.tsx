"use client";

import useKPIStore from "@/store/kpi";
import { useEffect } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { KPIChart } from "./KPIChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Text3XL, TextLG, TextXS } from "@/app/_components/Typography";
import CalendarButton from "@/app/_components/CalendarButton";

const KPI = ({ store }: { store: store }) => {
  const { kpiData, loading, fetchKPI } = useKPIStore();

  useEffect(() => {
    fetchKPI(store);
  }, [store]);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <TextLG text="KPI's" />

        <CalendarButton />
      </div>

      <div className="min-h-[108px] flex gap-4 flex-wrap">
        {loading ? (
          <Skeleton className="h-[108px] w-full" />
        ) : kpiData.length > 0 ? (
          kpiData.map((kpi, index) => (
            <Card
              key={index}
              className="flex-1 min-w-[243.2px] p-3 max-h-[180px] gap-3 border-[0.5px] rounded-[10px]"
            >
              <CardHeader className="p-0">
                <CardTitle className="">
                  <TextXS text={kpi.label} />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex justify-between items-end">
                  <div className="flex-[.6]">
                    <Text3XL text={kpi.value} />
                    <TextXS className="font-normal flex items-center gap-1 whitespace-nowrap">
                      <span
                        className={cn(
                          kpi.trend === "up"
                            ? "text-[#16A34A]"
                            : "text-[#DC2626]",
                          "flex items-center gap-1 whitespace-nowrap"
                        )}
                      >
                        {kpi.upBy ? (
                          <>
                            <TrendingUp size={16} /> {kpi.upBy}
                          </>
                        ) : kpi.downBy ? (
                          <>
                            <TrendingDown size={16} /> {kpi.downBy}
                          </>
                        ) : null}
                      </span>
                      <span className="text-muted-foreground">
                        {kpi.description}
                      </span>
                    </TextXS>
                  </div>
                  {/* LINE CHART */}
                  <KPIChart data={kpi.data} trend={kpi.trend} />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <TextXS className="text-muted-foreground italic">
              No data available
            </TextXS>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPI;
