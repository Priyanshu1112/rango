import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TextSM, TextXS } from "@/app/_components/Typography";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronsDown,
  ChevronsUp,
  CircleMinus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Row = {
  id: string;
  product: string;
  feedback: string;
  stores: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  issue?: string;
};

const columns = [
  "Product",
  "Feedback",
  "Available in #Stores",
  "Sentiment",
  "Issue, if Any",
];

const DATA: Row[] = [
  {
    id: "p1",
    product: "18K Gold Diamond Ring",
    feedback: "Love the cost to value of this",
    stores: 231,
    sentiment: "Positive",
    issue: "Inventory Issue",
  },
  {
    id: "p2",
    product: "Platinum Sapphire Necklace",
    feedback: "Love the cost to value of this",
    stores: 334,
    sentiment: "Neutral",
    issue: "Seasonal",
  },
  {
    id: "p3",
    product: "Silver Emerald Earrings",
    feedback: "Love the cost to value of this",
    stores: 231,
    sentiment: "Negative",
    issue: "Inventory shortage",
  },
  {
    id: "p4",
    product: "Rose Gold Aquamarine Bracelet",
    feedback: "Love the cost to value of this",
    stores: 53,
    sentiment: "Positive",
    issue: "Discontinued SKU",
  },
  {
    id: "p5",
    product: "White Gold Pearl Pendant",
    feedback: "Love the cost to value of this",
    stores: 109,
    sentiment: "Positive",
    issue: "Discontinued SKU",
  },
];

export default function ProductIssuesTable() {
  const columnsTable: ColumnDef<Row>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => {
        return (
          <TextSM className="text-[#0A0A0A] flex items-center gap-2 ">
            <Image
              src="/purchase-product-tab.png"
              alt="product"
              width={36}
              height={26}
            />
            {row.original.product}
          </TextSM>
        );
      },
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      cell: ({ row }) => {
        return (
          <TextSM className="text-[#0A0A0A] font-normal p-4">
            {row.original.feedback}
          </TextSM>
        );
      },
    },
    {
      accessorKey: "stores",
      header: () => <div className="text-end">Available in #Stores</div>,
      cell: ({ row }) => {
        return (
          <TextSM className="text-[#0A0A0A] font-normal text-end inline-block w-full p-4">
            {row.original.stores}
          </TextSM>
        );
      },
    },
    {
      accessorKey: "sentiment",
      header: () => <div className="text-end">Sentiment</div>,
      cell: ({ row }) => {
        const values =
          row.original.sentiment === "Positive"
            ? { icon: ChevronsUp, color: "text-green-600", bg: "bg-green-100" }
            : row.original.sentiment === "Neutral"
            ? {
                icon: CircleMinus,
                color: "text-yellow-600",
                bg: "bg-yellow-100",
              }
            : {
                icon: ChevronsDown,
                color: "text-orange-600",
                bg: "bg-orange-100",
              };

        return (
          <div className={cn("text-end p-4")}>
            <TextXS
              className={cn(
                values.color,
                values.bg,
                "flex justify-end items-center gap-1 w-fit ml-auto py-[2px] px-2 rounded-md"
              )}
            >
              <values.icon size={10} />
              {row.original.sentiment}
            </TextXS>
          </div>
        );
      },
    },
    {
      accessorKey: "issue",
      header: () => <div className="text-end">Issue, if Any</div>,
      cell: ({ row }) => {
        return (
          <div className="text-end">
            <TextXS className="text-[#0A0A0A] font-semibold py-[2px] px-2 border border-[#E5E5E5] rounded-md">
              {row.original.issue}
            </TextXS>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: DATA,
    columns: columnsTable,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border bg-white shadow-xs p-4 pb-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-50 rounded-t-md"
              >
                {headerGroup.headers.map((header, idx) => (
                  <TableHead
                    key={header.id}
                    className={`text-xs font-medium text-muted-foreground px-6 py-3 ${
                      idx === 0 ? "rounded-tl-md" : ""
                    } ${
                      idx === headerGroup.headers.length - 1
                        ? "rounded-tr-md"
                        : ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      </div>
      {/* bottom CTA - matching desired screenshot (optional) */}
      <div className="w-full flex justify-center mt-2">
        <Button
          variant={"outline"}
          className="text-sm px-4 py-2 rounded-md shadow-sm text-[#0A0A0A]"
        >
          <TextXS text="Show all 124 products" />
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </div>
  );
}
