"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const locations = [
  "Dhaka, Bangladesh",
  "Cox's Bazar, Bangladesh",
  "Sylhet, Bangladesh",
  "Chittagong, Bangladesh",
  "Sundarbans, Bangladesh",
  "Kuakata, Bangladesh",
];

export function LocationCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-1/3 h-14 justify-between rounded-lg border-gray-300"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 text-gray-500" />
            {value ? (
              value
            ) : (
              <span className="text-gray-400">Where are you going?</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {locations.map((loc) => (
                <CommandItem
                  key={loc}
                  value={loc}
                  onSelect={(val) => {
                    onChange(val);
                    setOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="flex-1 truncate">{loc}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === loc ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
