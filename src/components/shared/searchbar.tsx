"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bed, Plane, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainSearchBar from "./main-search-bar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LoginPopover from "./login";
import { useSearchParams } from "next/navigation";
import { differenceInDays, format } from "date-fns";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("propertyType") || "stays");
  const [toggle, setToggle] = useState(false);
  const searchParms = useSearchParams();
  const locationName = searchParms.get("district");
  const startDate = searchParms.get("start");
  const endDate = searchParms.get("end");

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // If click is inside wrapper → ignore
      if (wrapperRef.current && wrapperRef.current.contains(target)) {
        return;
      }

      // If click is inside a Radix Popover/Portal → ignore
      if (
        target instanceof HTMLElement &&
        target.closest("[data-radix-popper-content-wrapper]")
      ) {
        return;
      }

      // Otherwise → close
      setToggle(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full sticky top-0 bg-white z-50 shadow-md"
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className=" text-[20px] font-semibold">
            BookNoww
          </Link>

          {/* Search Input */}
          {toggle ? (
            <div className="rounded-full px-2 bg-slate-700 h-12 w-full sm:w-min mx-auto hidden md:flex justify-start sm:justify-between gap-2 items-center overflow-x-auto scrollbar-hide">
              {["Hotel", "Resort", "Apartment", "House Boat"].map((item) => (
                <button
                  key={item}
                  className={cn(
                    "font-medium px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors",
                    tab === item
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-white hover:bg-white/20"
                  )}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <div
              onClick={() => setToggle(true)}
              className="w-[425px] whitespace-nowrap justify-between items-center border border-gray-300 py-1.5 px-1 hidden md:flex rounded-full h-[46px] cursor-pointer hover:shadow-md transition"
            >
              <div className="px-2 font-semibold text-[14px] truncate">
                {locationName}
              </div>
              <div className="h-full w-[1px] mx-1 bg-gray-200"></div>
              <div className="flex items-center gap-2 font-semibold text-[14px] px-4 py-3">
                <p className="text-gray-800">
                  {format(new Date(startDate || new Date()), "MMM-dd")} –{" "}
                  {format(new Date(endDate || new Date()), "MMM-dd")}
                </p>
                <p className="font-normal text-gray-800">
                  ·
                  {differenceInDays(
                    format(new Date(endDate || new Date()), "MMM-dd"),
                    format(new Date(startDate || new Date()), "MMM-dd")
                  )}
                  nights
                </p>
              </div>
              <div className="h-full w-[1px] bg-gray-200"></div>
              <div className="px-2">
                <p className="text-[14px] font-semibold text-gray-800">
                  2 guests
                </p>
              </div>
              <Button className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700">
                <Search className="text-white h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-gray-700" />
            <LoginPopover />
          </div>
        </div>

        {/* Expanded Search */}
        <div
          onClick={() => setToggle(!toggle)}
          className="w-full whitespace-nowrap mt-4 justify-between items-center border border-gray-300 py-1.5 px-1 md:hidden flex rounded-full h-[46px] cursor-pointer hover:shadow-md transition"
        >
          <div className="px-2 font-semibold text-[14px] truncate">
            {" "}
            Dhaka, Bangladesh
          </div>
          <div className="h-full w-[1px] mx-1 bg-gray-200"></div>
          <div className="flex items-center gap-2 font-semibold text-[14px] px-4 py-3">
            <p className="text-gray-800">Aug 30 – Aug 31</p>
            <p className="font-normal text-gray-800">· 2 nights</p>
          </div>
          <div className="h-full w-[1px] bg-gray-200"></div>
          <div className="px-2">
            <p className="text-[14px] font-semibold text-gray-800">2 guests</p>
          </div>
          <Button className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700">
            <Search className="text-white h-5 w-5" />
          </Button>
        </div>

        {toggle && (
          <div
            className={cn(
              "transition-all duration-500 overflow-hidden", // smooth expand/collapse
              toggle
                ? "opacity-100 translate-y-0 max-h-[800px] mt-4"
                : "opacity-0 -translate-y-4 max-h-0"
            )}
          >
            <div className="rounded-full px-2 bg-slate-700 h-12 w-full md:hidden flex justify-between gap-2 items-center">
              {["Hotel", "Resort", "Apartment", "House Boat"].map((item) => (
                <button
                  key={item}
                  className={cn(
                    "font-medium px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors",
                    tab === item
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-white hover:bg-white/20"
                  )}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <MainSearchBar />
          </div>
        )}
      </div>
    </div>
  );
}
