import React, { useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TextSM, TextXS } from "@/app/_components/Typography";
import { TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Row = {
  size: string;
  cols: {
    value: string;
    percent: string;
    reasons: string;
    extra?: string;
  }[];
  revenue: { amount: string; changePct: string };
};

const salesTabs: salesBreakDownTableTabs[] = [
  "Lab-grown Diamond / Clarity",
  "Gold",
];

const DATA: Row[] = [
  {
    size: "< 1 ct",
    cols: [
      {
        value: "50K",
        percent: "2%",
        reasons: "Market fluctuations, supply issues, +2",
      },
      {
        value: "50K",
        percent: "2%",
        reasons: "Market fluctuations, supply issues, +2",
      },
      {
        value: "50K",
        percent: "2%",
        reasons: "Market fluctuations, supply issues, +2",
      },
      {
        value: "50K",
        percent: "2%",
        reasons: "Market fluctuations, supply issues, +2",
      },
    ],
    revenue: { amount: "₹10,40,00,000", changePct: "12%" },
  },
  {
    size: "1.0 - 1.5 ct",
    cols: [
      {
        value: "100K",
        percent: "4%",
        reasons: "Regulatory changes, staffing, +4",
      },
      {
        value: "100K",
        percent: "4%",
        reasons: "Regulatory changes, staffing, +4",
      },
      {
        value: "100K",
        percent: "4%",
        reasons: "Regulatory changes, staffing, +4",
      },
      {
        value: "100K",
        percent: "4%",
        reasons: "Regulatory changes, staffing, +4",
      },
    ],
    revenue: { amount: "₹11,20,00,000", changePct: "12%" },
  },
  {
    size: "1.5 - 2.0 ct",
    cols: [
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
    ],
    revenue: { amount: "₹11,20,00,000", changePct: "12%" },
  },
  {
    size: "> 2.0 ct",
    cols: [
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
      {
        value: "30K",
        percent: "1%",
        reasons: "Technical hiccups, training, +1",
      },
    ],
    revenue: { amount: "₹9,60,00,000", changePct: "12%" },
  },
];

export default function SalesBreakdownTable() {
  const [tabs, setTabs] = useState<salesBreakDownTableTabs>(
    "Lab-grown Diamond / Clarity"
  );
  return (
    <div className="">
      <div className="mb-1 max-w-[286px]">
        <Tabs
          value={tabs}
          onValueChange={(value: string) =>
            setTabs(value as salesBreakDownTableTabs)
          }
          className="w-full"
        >
          <TabsList className="w-full bg-white">
            {salesTabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`
                  relative py-2 text-left
                  after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0
                  after:h-[2px] after:rounded-none after:opacity-0
                  data-[state=active]:shadow-[0_0_0_0px_#000] data-[state=active]:after:opacity-100 data-[state=active]:after:bg-[#3B82F6]
                `}
              >
                <TextSM text={tab} className="text-[#0A0A0A]" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Table className="w-full">
        <TableBody>
          {DATA.map((row) => (
            <TableRow key={row.size} className="align-top">
              {/* size cell */}
              <TableCell className="py-5 align-middle">
                <TextSM text={row.size} className="text-[#0A0A0A]" />
              </TableCell>

              {/* metric columns */}
              {row.cols.map((c, ci) => (
                <TableCell key={ci} className="py-[10px] px-2 align-middle">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <TextSM
                        text={c.value}
                        className="text-[#0A0A0A] font-normal"
                      />
                      <Badge className="bg-[#FEE2E2] text-[#EF4444] border-none px-2 py-0.5 rounded-md text-xs font-semibold leading-4 tracking-normal">
                        {c.percent}
                      </Badge>
                    </div>
                    <TextXS
                      text={c.reasons}
                      className="text-[#0A0A0A] font-normal opacity-50"
                    />
                  </div>
                </TableCell>
              ))}

              {/* revenue cell */}
              <TableCell className="py-6 align-top text-right">
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm font-medium">
                    {row.revenue.amount}
                  </div>
                  <div className="text-xs flex items-center gap-1">
                    <TrendingUp size={14} color="#2D912A" />
                    <span>
                      <span className="text-xs text-[#2D912A]">
                        {row.revenue.changePct}{" "}
                      </span>
                      <span className="text-[#0A0A0A] opacity-50">
                        from last month
                      </span>
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
