"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown, Minus, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

interface GuestSelectorProps {
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  incrementGuest: (type: keyof GuestSelectorProps["guests"]) => void;
  decrementGuest: (type: keyof GuestSelectorProps["guests"]) => void;
}

const guestConfig = {
  adults: { label: "Adults", desc: "Ages 13+", min: 1 },
  children: { label: "Children", desc: "Ages 0–12", min: 0 },
  rooms: { label: "Rooms", desc: "Hotel rooms", min: 1 },
};

export const GuestSelector: React.FC<GuestSelectorProps> = ({
  guests,
  incrementGuest,
  decrementGuest,
}) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const summary = `${guests.adults} Adult${guests.adults !== 1 ? "s" : ""} • ${
    guests.children
  } Child${guests.children !== 1 ? "ren" : ""} • ${guests.rooms} Room${
    guests.rooms !== 1 ? "s" : ""
  }`;

  const GuestList = (
    <div className="space-y-4">
      {Object.entries(guestConfig).map(([key, cfg]) => (
        <div
          key={key}
          className="flex items-center justify-between text-sm sm:text-base"
        >
          {/* Labels */}
          <div>
            <div className="font-medium">{cfg.label}</div>
            <div className="text-xs text-gray-500">{cfg.desc}</div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full disabled:opacity-40"
              onClick={(e) => {
                e.stopPropagation();
                decrementGuest(key as keyof GuestSelectorProps["guests"]);
              }}
              disabled={guests[key as keyof typeof guests] <= cfg.min}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">
              {guests[key as keyof typeof guests]}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                incrementGuest(key as keyof GuestSelectorProps["guests"]);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const TriggerButton = (
    <Button
      variant="outline"
      className="h-14 w-full lg:min-w-[200px] justify-between rounded-xl border-gray-300 font-normal"
    >
      <div className="flex items-center gap-2 truncate">
        <Users className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-semibold truncate">{summary}</span>
      </div>
      <ChevronDown className="h-4 w-4 text-gray-500 opacity-70" />
    </Button>
  );

  // Desktop → Popover
  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
        <PopoverContent
          align="start"
          className="rounded-xl shadow-lg p-4 w-[300px]"
          onClick={(e) => e.stopPropagation()}
        >
          {GuestList}
        </PopoverContent>
      </Popover>
    );
  }

  // Mobile → Drawer
  return (
    <>
      <div onClick={() => setOpen(true)}>{TriggerButton}</div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[300px] w-screen p-0 flex flex-col">
          <DrawerHeader className="flex flex-row items-center justify-between pt-1 px-4 border-b">
            <DrawerTitle>Guests & Rooms</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">{GuestList}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
