"use client";

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

import { DateRange } from "react-day-picker";

// ✅ Hook for media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export function DateRangePicker({
  className,
  value,
  onChange,
}: {
  className?: string;
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const nights =
    value?.from && value?.to ? differenceInDays(value.to, value.from) : 0;

  const triggerBtn = (
    <Button
      id="date"
      variant="outline"
      className={cn(
        "w-full h-14 justify-start text-left font-semibold rounded-xl border-gray-300 shadow-sm hover:border-gray-400 transition",
        !value && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
      {value?.from ? (
        value.to ? (
          <>
            {format(value.from, "MMM dd")} - {format(value.to, "MMM dd")}
          </>
        ) : (
          format(value.from, "MMM dd")
        )
      ) : (
        <span>Check in - Check out</span>
      )}
    </Button>
  );

  return (
    <div className={cn("grid gap-2", className)}>
      {/* ✅ Desktop → Popover */}
      {!isMobile ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{triggerBtn}</PopoverTrigger>
          <PopoverContent
            className="w-full p-0 rounded-2xl shadow-lg border"
            align="start"
          >
            <div className="flex w-full flex-col sm:flex-row">
              <Calendar
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={onChange}
                numberOfMonths={2}
                pagedNavigation
                className="rounded-xl"
                showOutsideDays={false}
                disabled={{ before: new Date() }} // 👈 disable all past dates
              />
            </div>

            <div className="flex items-center justify-between border-t px-4 py-3 bg-gray-50 rounded-b-2xl">
              {nights > 0 ? (
                <span className="text-sm font-medium text-gray-700">
                  {nights} Night{nights > 1 ? "s" : ""}
                </span>
              ) : (
                <span className="text-sm text-gray-500">Select your dates</span>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => onChange(undefined)}
              >
                Clear
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        // ✅ Mobile → Drawer
        <Drawer open={open} onOpenChange={setOpen}>
          {/* Trigger button outside DrawerContent */}
          <div onClick={() => setOpen(true)}>{triggerBtn}</div>

          <DrawerContent className="min-h-[100vh] p-0">
            <DrawerHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
              <DrawerTitle>Select Dates</DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="flex justify-center p-4 overflow-y-auto h-[calc(100vh-120px)]">
              <Calendar
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={onChange}
                numberOfMonths={2}
                pagedNavigation
                disabled={{ before: new Date() }} // 👈 disable all past dates
                showOutsideDays={false}
                className="rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between border-t px-4 py-3 bg-gray-50">
              {nights > 0 ? (
                <span className="text-sm font-medium text-gray-700">
                  {nights} Night{nights > 1 ? "s" : ""}
                </span>
              ) : (
                <span className="text-sm text-gray-500">Select your dates</span>
              )}

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onChange(undefined)}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setOpen(false)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
