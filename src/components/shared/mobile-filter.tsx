"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, ThumbsUp, X } from "lucide-react";

const MobileFilter = () => {
  // State
  const [toggle, setToggle] = useState(false);
  const [priceRange, setPriceRange] = useState([5000, 20000]);
  const [facilities, setFacilities] = useState({
    pool: false,
    swimmingPool: false,
    freeBreakfast: false,
    petFriendly: false,
    petsAllowed: false,
  });
  const [stayTypes, setStayTypes] = useState({
    hotels: false,
    entireHomes: false,
  });
  const [reviewScores, setReviewScores] = useState({
    excellent: false,
    veryGood: false,
  });

  // Handlers
  const handleFacilityChange = (key: keyof typeof facilities) =>
    setFacilities((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleStayTypeChange = (key: keyof typeof stayTypes) =>
    setStayTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleReviewScoreChange = (key: keyof typeof reviewScores) =>
    setReviewScores((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [toggle]);

  return (
    <div className="lg:hidden px-6 pt-4">
      {/* Trigger button with Filter icon */}

      <Button
        variant="outline"
        onClick={() => setToggle(true)}
        className="flex items-center gap-2 rounded-full border-gray-300"
      >
        <Filter className="h-4 w-4" />
        Filters
      </Button>

      {/* Popover Content */}
      {toggle && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen  rounded-none shadow-none p-6 bg-white z-50 overflow-y-auto">
          <div className=" flex justify-between items-center">
            {" "}
            <h3 className="text-lg font-semibold mb-4">Filter by:</h3>
            <X className=" h-8 w-8" onClick={() => setToggle(false)} />
          </div>

          {/* Budget Filter */}
          <div className="mb-6">
            <Label className="text-sm font-medium">
              Your budget (per night)
            </Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={1000}
              max={50000}
              step={100}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>

          {/* Facilities Filter */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-4 block">Facilities</Label>
            <div className="space-y-3">
              {[
                { id: "pool", label: "Pool" },
                { id: "swimmingPool", label: "Swimming pool" },
                { id: "freeBreakfast", label: "Free breakfast" },
                { id: "petFriendly", label: "Pet friendly" },
                { id: "petsAllowed", label: "Pets allowed" },
                { id: "swimmingPool1", label: "Swimming pool" },
                { id: "freeBreakfast1", label: "Free breakfast" },
                { id: "petFriendly1", label: "Pet friendly" },
                { id: "petsAllowed1", label: "Pets allowed" },
              ].map((facility) => (
                <div key={facility.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={facility.id}
                    checked={facilities[facility.id as keyof typeof facilities]}
                    onCheckedChange={() =>
                      handleFacilityChange(
                        facility.id as keyof typeof facilities
                      )
                    }
                  />
                  <Label
                    htmlFor={facility.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {facility.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Stay Types */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-4 block">Stay types</Label>
            <div className="space-y-3">
              {[
                { id: "hotels", label: "Hotels" },
                { id: "entireHomes", label: "Entire homes & apartments" },
              ].map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={stayTypes[type.id as keyof typeof stayTypes]}
                    onCheckedChange={() =>
                      handleStayTypeChange(type.id as keyof typeof stayTypes)
                    }
                  />
                  <Label
                    htmlFor={type.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Review Score */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-4 block">
              Review score
            </Label>
            <div className="space-y-3">
              {[
                {
                  id: "excellent",
                  label: "Excellent: 9+",
                  icon: <ThumbsUp className="h-4 w-4 mr-2" />,
                },
                {
                  id: "veryGood",
                  label: "Very Good: 8+",
                  icon: <ThumbsUp className="h-4 w-4 mr-2" />,
                },
              ].map((score) => (
                <div key={score.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={score.id}
                    checked={
                      reviewScores[score.id as keyof typeof reviewScores]
                    }
                    onCheckedChange={() =>
                      handleReviewScoreChange(
                        score.id as keyof typeof reviewScores
                      )
                    }
                  />
                  <Label
                    htmlFor={score.id}
                    className="text-sm font-normal flex items-center cursor-pointer"
                  >
                    {score.icon}
                    {score.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Show all
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileFilter;
