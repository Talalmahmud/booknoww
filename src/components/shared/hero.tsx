"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Users, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "../ui/date-range-picker";
import { LocationCombobox } from "../ui/location-combobox";

const Hero = () => {
  const [activeItem, setActiveItem] = useState("Hotel");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [location, setLocation] = useState("");

  const incrementGuest = (type: keyof typeof guests) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrementGuest = (type: keyof typeof guests) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  return (
    <div className="relative h-[360px] bg-cover bg-no-repeat bg-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop')]">
      <div className="absolute inset-0 pt-20 bg-blue-800/60 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Start Your Booking <br /> BookNoww
        </h1>

        <div className="absolute flex flex-col justify-between pb-6 -bottom-20 bg-white w-full md:w-[90%] lg:w-[90%] xl:w-[80%] max-w-6xl h-auto rounded-xl shadow-xl mx-2 p-4">
          {/* top tabs */}
          <div className="rounded-full px-2 -mt-8 bg-slate-700 h-12 w-min mx-auto flex justify-between gap-1 items-center">
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

          {/* search form */}
          <div className="flex flex-col lg:flex-row mt-6 gap-4 w-full">
            {/* Location input */}
            {/* <div className="relative w-full lg:w-2/5">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Where are you going?"
                className="pl-10 h-14 rounded-lg border-gray-300 focus:border-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div> */}

            <LocationCombobox value={location} onChange={setLocation} />

            {/* Date Range Picker with two DatePickers */}
            <div className="w-full lg:w-1/5">
              {" "}
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            {/* Guests selector */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className=" h-14 justify-between font-normal rounded-lg border-gray-300"
                >
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span className="text-sm">
                      {guests.adults} Adult{guests.adults !== 1 ? "s" : ""},{" "}
                      {guests.children} Child
                      {guests.children !== 1 ? "ren" : ""}, {guests.rooms} Room
                      {guests.rooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-lg">
                <div className="grid gap-4">
                  <h4 className="font-medium">Guests & Rooms</h4>
                  {/* Adults */}
                  {["adults", "children", "rooms"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium capitalize">{type}</div>
                        <div className="text-sm text-gray-500">
                          {type === "adults" && "Ages 13+"}
                          {type === "children" && "Ages 0-12"}
                          {type === "rooms" && "Hotel rooms"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            decrementGuest(type as keyof typeof guests)
                          }
                          disabled={
                            guests[type as keyof typeof guests] <=
                            (type === "adults" || type === "rooms" ? 1 : 0)
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {guests[type as keyof typeof guests]}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            incrementGuest(type as keyof typeof guests)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Search button */}
            <Button className="w-full lg:w-1/5 h-14 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
