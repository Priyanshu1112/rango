import { TextLG, TextSM, TextXS } from "@/app/_components/Typography";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircleWarning, Search } from "lucide-react";
import React from "react";
import useAppStore from "@/store/app";
import CalendarButton from "@/app/_components/CalendarButton";
import EPTable from "./EPTable";
import { useState } from "react";

const ExploreProducts = ({ store }: { store: store }) => {
  const { setSuccess } = useAppStore();
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <TextXS
            text="Explore by Products"
            className="text-muted-foreground"
          />
          <TextLG
            text="20 products cause 10% revenue loss from inventory issues."
            className="mt-1"
          />
        </div>
        <div className=" gap-4 flex items-center">
          {/* search */}
          <div className="px-4 py-2 border border-[#E5E5E5] shadow-xs rounded-md bg-white flex gap-2 items-center">
            <Search size={16} className="opacity-50" />
            <input
              type="text"
              placeholder="Search Products & Services"
              className="outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            variant={"outline"}
            className="cursor-pointer text-[#0A0A0A] px-4 py-2"
            onClick={() => setSuccess("Location updated!")}
          >
            <MapPin size={16} />
            <TextSM>Location</TextSM>
          </Button>
          <Button
            variant={"outline"}
            className="cursor-pointer text-[#0A0A0A] px-4 py-2"
            onClick={() => setSuccess("Issue Type updated!")}
          >
            <MessageCircleWarning size={16} />
            <TextSM>Issue Type</TextSM>
            <TextXS
              text="8"
              className="bg-blue-700 text-[#FAFAFA] px-1 w-5 h-4 rounded-full"
            />
          </Button>
          <CalendarButton />
        </div>
      </div>

      <EPTable store={store} search={search} />
    </div>
  );
};

export default ExploreProducts;
