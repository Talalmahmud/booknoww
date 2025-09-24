"use client";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { LocationCombobox } from "../ui/location-combobox";
import { DateRangePicker } from "../ui/date-range-picker";
import { GuestSelector } from "./guest-selector";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { format } from "date-fns";

const DetailSearch = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [location, setLocation] = useState<{
    type: string;
    name: string;
  } | null>(null);

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
    <div className=" flex flex-col  bg-white w-full  h-auto rounded-2xl shadow-xl mx-auto p-2">
      {/* Tabs */}

      {/* Search Form */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Location */}

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
        <Link
          href={`/search?${location?.type}=${location?.name}&child=${
            guests.adults
          }&adult=${guests.adults}&room=${guests.rooms}&start=${format(
            new Date(dateRange?.from || new Date()),
            "yyyy-MM-dd"
          )}&end=${format(
            new Date(dateRange?.to || new Date()),
            "yyyy-MM-dd"
          )}`}
          className="lg:col-span-1 flex"
        >
          <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DetailSearch;
