import React, { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TextSM, TextXS } from "@/app/_components/Typography";
import { TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSalesBreakdownStore from "@/store/salesBreakdown";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "@/app/_components/Pagination";

const salesTabs: salesBreakDownTableTabs[] = [
  "Lab-grown Diamond / Clarity",
  "Gold",
];

export default function SalesBreakdownTable({ store }: { store: any }) {
  const {
    tableData = [],
    loadingTable,
    fetchSalesBreakdownTable,
  } = useSalesBreakdownStore();

  const [tabs, setTabs] = useState<salesBreakDownTableTabs>(salesTabs[0]);
  // always show 5 items per page
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  useEffect(() => {
    fetchSalesBreakdownTable(store, tabs);
  }, [store, tabs, fetchSalesBreakdownTable]);

  /**
   * Build columns dynamically:
   * - first column: size
   * - metric columns: based on number of cols in first row (preserve their rendering)
   * - last column: revenue
   */
  const columns = useMemo<ColumnDef<SalesBreakdownTable, any>[]>(() => {
    // base size column
    const cols: ColumnDef<SalesBreakdownTable, any>[] = [
      {
        accessorKey: "size",
        id: "size",
        header: "", // no visible header to match original design
        cell: ({ row }) => (
          <TextSM text={row.original.size} className="text-[#0A0A0A]" />
        ),
      },
    ];

    const metricCount = tableData?.[0]?.cols?.length ?? 0;

    // create metric columns (metric-0, metric-1, ...)
    for (let i = 0; i < metricCount; i++) {
      cols.push({
        id: `metric-${i}`,
        header: "", // keep header empty (original had no header row for metrics)
        cell: ({ row }) => {
          const c = row.original.cols?.[i];
          if (!c) return null;
          return (
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <TextSM text={c.value} className="text-[#0A0A0A] font-normal" />
                <Badge className="bg-[#FEE2E2] text-[#EF4444] border-none px-2 py-0.5 rounded-md text-xs font-semibold leading-4 tracking-normal">
                  {c.percent}
                </Badge>
              </div>
              <TextXS
                text={c.reasons}
                className="text-[#0A0A0A] font-normal opacity-50"
              />
            </div>
          );
        },
      });
    }

    // revenue column
    cols.push({
      id: "revenue",
      header: "", // keep header empty
      cell: ({ row }) => {
        const rev = row.original.revenue || {};
        return (
          <div className="flex flex-col items-start gap-1 text-right">
            <div className="text-sm font-medium">{rev.amount}</div>
            <div className="text-xs flex items-center gap-1">
              <TrendingUp size={14} color="#2D912A" />
              <span>
                <span className="text-xs text-[#2D912A]">{rev.changePct} </span>
                <span className="text-[#0A0A0A] opacity-50">
                  from last month
                </span>
              </span>
            </div>
          </div>
        );
      },
    });

    return cols;
  }, [tableData]);

  const table = useReactTable<SalesBreakdownTable>({
    data: tableData ?? [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: tableData?.length ? Math.ceil(tableData.length / 5) : 0,
  });

  return (
    <div>
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

      <div className="overflow-hidden rounded-md">
        <Table className="w-full">
          <TableBody>
            {loadingTable ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="py-5 align-middle" colSpan={7}>
                      <Skeleton className="h-[40px] w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="align-top">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "revenue"
                          ? "py-6 align-top text-right"
                          : "py-5 align-middle"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination table={table} />
      </div>
    </div>
  );
}
