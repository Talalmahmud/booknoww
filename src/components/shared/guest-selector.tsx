"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown, Minus, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const summary = `${guests.adults} Adult${guests.adults !== 1 ? "s" : ""} • ${
    guests.children
  } Child${guests.children !== 1 ? "ren" : ""} • ${guests.rooms} Room${
    guests.rooms !== 1 ? "s" : ""
  }`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-14 w-full  lg:min-w-[200px] justify-between rounded-xl border-gray-300 font-normal"
        >
          <div className="flex items-center gap-2 truncate">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm truncate">{summary}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[90vw] sm:w-80 max-w-md rounded-xl shadow-lg p-4"
      >
        <h4 className="mb-2 font-medium text-base">Guests & Rooms</h4>
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
                  onClick={() =>
                    decrementGuest(key as keyof GuestSelectorProps["guests"])
                  }
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
                  onClick={() =>
                    incrementGuest(key as keyof GuestSelectorProps["guests"])
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
