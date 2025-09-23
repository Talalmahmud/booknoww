"use client";

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DateRange } from "react-day-picker";

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

  const nights =
    value?.from && value?.to ? differenceInDays(value.to, value.from) : 0;

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
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
              className="rounded-l-xl border-r sm:block hidden"
            />
            <Calendar
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={onChange}
              className="rounded-xl sm:hidden block"
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
    </div>
  );
}
