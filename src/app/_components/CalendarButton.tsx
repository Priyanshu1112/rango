"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarFoldIcon } from "lucide-react";

const CalendarButton = () => {
  return (
    <Button variant={"outline"} size={"icon"} className="p-3">
      <CalendarFoldIcon size={16} />
    </Button>
  );
};

export default CalendarButton;
