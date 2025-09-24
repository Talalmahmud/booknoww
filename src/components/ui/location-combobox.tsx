"use client";

import {
  Building2,
  Check,
  ChevronsUpDown,
  Home,
  Hotel,
  MapPin,
  X,
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export function LocationCombobox({
  value,
  onChange,
}: {
  value: { type: string; name: string } | null;
  onChange: (val: { type: string; name: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<{ type: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch locations
  const fetchLocations = async (query: string) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/property-locations?location=${encodeURIComponent(query)}`
      );
      setLocations(res.data.success ? res.data.data : []);
    } catch (err) {
      console.error(err);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => fetchLocations(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const LocationList = (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search location..."
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? "Loading..." : "No results found."}
        </CommandEmpty>
        <CommandGroup>
          {locations.map((loc, idx) => {
            let Icon = MapPin;
            if (loc.type === "Hotel") Icon = Hotel;
            else if (loc.type === "Resort") Icon = Building2;
            else if (loc.type === "Apartment") Icon = Home;

            return (
              <CommandItem
                key={idx}
                value={loc.name}
                onSelect={() => {
                  onChange(loc);
                  isMobile ? setDrawerOpen(false) : setSheetOpen(false);
                }}
              >
                <Icon className="mr-2 h-4 w-4 text-gray-500" />
                <span className="flex-1 truncate">
                  {loc.name}{" "}
                  <span className="text-gray-400 text-xs">({loc.type})</span>
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
  );

  const TriggerButton = (
    <Button
      variant="outline"
      className="w-full h-14 justify-between rounded-lg border-gray-300"
      onClick={() => (isMobile ? setDrawerOpen(true) : setSheetOpen(true))}
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
            {!["Hotel", "Resort", "Apartment"].includes(value.type) && (
              <MapPin className="h-4 w-4 text-gray-500" />
            )}
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
  );

  // Desktop → Sheet
  if (!isMobile) {
    return (
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="p-0 w-[400px]">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Select Location</SheetTitle>
          </SheetHeader>
          <div className="p-4">{LocationList}</div>
        </SheetContent>
        <div onClick={() => setSheetOpen(true)}>{TriggerButton}</div>
      </Sheet>
    );
  }

  // Mobile → Drawer
  return (
    <>
      {TriggerButton}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="h-screen w-screen p-0 flex flex-col">
          <DrawerHeader className="flex items-center justify-between p-4 border-b">
            <DrawerTitle>Select Location</DrawerTitle>
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
          <div className="flex-1 overflow-y-auto p-4">{LocationList}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
