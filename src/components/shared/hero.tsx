"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "../ui/date-range-picker";
import { LocationCombobox } from "../ui/location-combobox";
import { GuestSelector } from "./guest-selector";
import Link from "next/link";

const Hero = () => {
  const [activeItem, setActiveItem] = useState("Hotel");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [location, setLocation] = useState("");

  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const incrementGuest = (type: keyof typeof guests) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrementGuest = (type: keyof typeof guests) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(
        type === "adults" || type === "rooms" ? 1 : 0,
        prev[type] - 1
      ),
    }));
  };

  return (
    <div className="relative h-[320px] md:h-[220px] bg-cover bg-no-repeat bg-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop')]">
      <div className="absolute inset-0 pt-20 bg-blue-800/60 flex flex-col items-center justify-center text-center px-4">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white mb-4 leading-snug">
          Start Your Booking
        </h1>

        {/* Booking Box */}
        <div className="absolute flex flex-col pb-6 -bottom-28 bg-white w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] max-w-6xl h-auto rounded-2xl shadow-xl mx-auto p-4 sm:p-6">
          {/* Tabs */}
          <div className="rounded-full px-2 -mt-12 bg-slate-700 h-12 w-full sm:w-min mx-auto flex justify-between gap-2 items-center overflow-x-auto scrollbar-hide">
            {["Hotel", "Resort", "Apartment", "House Boat"].map((item) => (
              <button
                key={item}
                className={cn(
                  "font-medium px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors",
                  activeItem === item
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-white hover:bg-white/20"
                )}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
            {/* Location */}
            <div className="lg:col-span-3">
              <LocationCombobox value={location} onChange={setLocation} />
            </div>

            {/* Date Range */}
            <div className="lg:col-span-2">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            {/* Guests */}
            <div className="lg:col-span-2">
              <GuestSelector
                guests={guests}
                incrementGuest={incrementGuest}
                decrementGuest={decrementGuest}
              />
            </div>

            {/* Search button */}
            <Link href={"/search"} className="lg:col-span-1 flex">
              <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
