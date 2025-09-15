"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchFilter } from "./search-filter";

const filterSections = [
  {
    title: "Facilities",
    key: "facilities",
    options: [
      { label: "WiFi", value: "wifi" },
      { label: "Pool", value: "pool" },
      { label: "Parking", value: "parking" },
    ],
  },
];

export default function MobileFilter() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <SearchFilter sections={filterSections} onAfterChange={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
