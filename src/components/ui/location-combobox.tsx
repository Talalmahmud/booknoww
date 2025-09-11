"use client";

import * as React from "react";
import {
  Building2,
  Check,
  ChevronsUpDown,
  Home,
  Hotel,
  MapPin,
} from "lucide-react";

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
import api from "@/lib/axios";

export function LocationCombobox({
  value,
  onChange,
}: {
  value: { type: string; name: string } | null;
  onChange: (val: { type: string; name: string }) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [locations, setLocations] = React.useState<
    { type: string; name: string }[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchLocations = async (query: string) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/property-locations?location=${encodeURIComponent(query)}`
      );
      const data = res.data;
      if (data.success) {
        setLocations(data.data);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce API calls
  React.useEffect(() => {
    const handler = setTimeout(() => {
      fetchLocations(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch initial locations
  React.useEffect(() => {
    fetchLocations("");
  }, []);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-14 justify-between rounded-lg border-gray-300"
          >
            <div className="flex items-center gap-2 truncate">
              {value ? (
                <>
                  {value.type === "Hotel" && (
                    <Hotel className="h-4 w-4 text-gray-500" />
                  )}
                  {value.type === "Resort" && (
                    <Building2 className="h-4 w-4 text-gray-500" />
                  )}
                  {value.type === "Apartment" && (
                    <Home className="h-4 w-4 text-gray-500" />
                  )}
                  {["Hotel", "Resort", "Apartment"].includes(value.type) ===
                    false && <MapPin className="h-4 w-4 text-gray-500" />}
                  <span>{value.name}</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400">Where are you going?</span>
                </>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="bottom"
          className="min-w-full left-0 top-0 !m-0 p-0 rounded-b-[2px] border-none"
          sideOffset={0}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search location..."
              onValueChange={(val) => setSearchTerm(val)}
            />
            <CommandList>
              <CommandEmpty>
                {loading ? "Loading..." : "No results found."}
              </CommandEmpty>
              <CommandGroup>
                {locations.map((loc, index) => {
                  let Icon = MapPin;
                  if (loc.type === "Hotel") Icon = Hotel;
                  else if (loc.type === "Resort") Icon = Building2;
                  else if (loc.type === "Apartment") Icon = Home;

                  return (
                    <CommandItem
                      key={index}
                      value={loc.name}
                      onSelect={() => {
                        onChange(loc); // ✅ Pass full {name, type}
                        setOpen(false);
                      }}
                    >
                      <Icon className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="flex-1 truncate">
                        {loc.name}{" "}
                        <span className="text-gray-400 text-xs">
                          ({loc.type})
                        </span>
                      </span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value?.name === loc.name && value?.type === loc.type
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
