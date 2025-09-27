"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react"; // sort/filter icon
import { de } from "date-fns/locale";

type Props = {
  selected: string;
  setSelected: (value: string) => void;
};

const RecomendFilter = ({ selected, setSelected }: Props) => {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "Most Recommended", label: "⭐ Most Recommended" },
    { value: "Star Rating", label: "⭐ Star Rating (highest first)" },
    { value: "User Rating", label: "👤 User Rating (highest first)" },
    { value: "Price", label: "💰 Price (lowest first)" },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex flex-col border-[1px] p-2 rounded-md bg-white gap-2">
        <label className="font-semibold text-gray-800 text-[15px]">
          Sort By
        </label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-[240px]  border-none  bg-white px-3 py-2 text-[14px]">
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
            <SelectGroup>
              {options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="cursor-pointer px-3 py-2 text-[14px] hover:bg-gray-100"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile/Tablet */}
      <div className="flex md:hidden">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <SlidersHorizontal size={18} />
          <span className="text-[14px]">Sort</span>
        </Button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="p-4">
            <DrawerHeader>
              <DrawerTitle className="text-lg font-semibold">
                Sort Options
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-3 py-3">
              {options.map((opt) => (
                <Button
                  key={opt.value}
                  variant={selected === opt.value ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    setSelected(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
export default RecomendFilter;
