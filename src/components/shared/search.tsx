"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleQuestionMark, Star, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";
import { Property } from "@/app/type";
import Link from "next/link";
import api from "@/lib/axios";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SearchFilter } from "./search-filter";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import SearchReward from "./search-reward";
import RecomendFilter from "./recomend-filter";

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type FilterSection =
  | {
      title: string;
      key: string;
      type: "range";
      min: number;
      max: number;
      step: number;
    }
  | {
      title: string;
      key: string;
      type?: "checkbox";
      options: FilterOption[];
    };

// --------------------------
// Page Component
// --------------------------
const SearchPage = () => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState("Most Recommended");
  const [hotels, setHotels] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchFacilities, setSearchFacilities] = useState<
    { label: string; value: string }[]
  >([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // --------------------------
  // Fetch Hotels on Filter Change
  // --------------------------
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const url = `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/search-property?${searchParams.toString()}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setHotels(data.data || []);
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  // --------------------------
  // Fetch Available Facilities
  // --------------------------
  useEffect(() => {
    const fetchFacilities = async () => {
      const res = await api.get("/search-facilites");
      const resData = await res.data;
      console.log(resData.data);
      setSearchFacilities(
        resData.data.map((item: { id: string; title: string }) => ({
          label: item.title,
          value: item.id,
        }))
      );
    };
    fetchFacilities();
  }, []);

  // --------------------------
  // Build Filter Sections
  // --------------------------
  const filterSections: FilterSection[] = [
    {
      title: "Your budget (per night)",
      key: "maxPrice",
      type: "range",
      min: 1000,
      max: 50000,
      step: 100,
    },
    {
      title: "Facilities",
      key: "facilities",
      options: searchFacilities,
    },

    {
      title: "Review score",
      key: "review",
      options: [
        {
          label: "Excellent: 9+",
          value: "excellent",
          icon: <ThumbsUp className="h-4 w-4 mr-2" />,
        },
        {
          label: "Very Good: 8+",
          value: "veryGood",
          icon: <ThumbsUp className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      title: "Star Rating",
      key: "rating",
      options: [
        {
          label: "5 Stars",
          value: "5",
        },
        {
          label: "4 Stars",
          value: "4",
        },
        {
          label: "3 Stars",
          value: "3",
        },
        {
          label: "2 Stars",
          value: "2",
        },
        {
          label: "1 Star",
          value: "1",
        },
      ],
    },
  ];

  // --------------------------
  // Render Stars
  // --------------------------
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));

  // --------------------------
  // Render
  // --------------------------
  return (
    <div className="bg-gray-50">
      {/* Mobile Filter (Drawer) */}
      <p className=" px-4 font-bold text-lg md:hidden block">
        Available Properties ({hotels.length})
      </p>
      <div className="lg:hidden flex justify-between pt-2 px-4">
        <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Filters</Button>
          </DrawerTrigger>
          <DrawerContent className="min-h-[100vh] flex flex-col">
            <DrawerHeader className="flex flex-row justify-between items-center border-b">
              <DrawerTitle className=" text-[18px]">Filters By</DrawerTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </Button>
            </DrawerHeader>

            {/* Filters scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <SearchFilter sections={filterSections} />
            </div>

            {/* Footer with actions */}
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50">
              <Button
                variant="ghost"
                onClick={() => setMobileOpen(false)}
                className="text-gray-500"
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // You can trigger filter API call here if needed
                  setMobileOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
        <RecomendFilter selected={selected} setSelected={setSelected} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto p-4">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block lg:w-1/4 h-full space-y-8 border border-gray-200 bg-white p-6 rounded-xl shadow-md">
          <p className="text-[16px] font-semibold mb-4">Filter by:</p>
          <SearchFilter
            sections={filterSections}
            onAfterChange={() => setMobileOpen(false)}
          />{" "}
        </aside>

        {/* Hotels List */}
        <div className="lg:w-3/4 min-h-screen space-y-6">
          <div className=" hidden md:flex justify-between">
            <p className=" font-bold text-lg">
              Available Properties ({hotels.length})
            </p>
            <RecomendFilter selected={selected} setSelected={setSelected} />
          </div>
          <SearchReward />
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : hotels.length === 0 ? (
            <p className="text-center text-gray-600">No property found</p>
          ) : hotels[0]?.propertyType?.name === "Apartment" ? (
            <div className=" grid grid-ccol-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <div className="flex flex-col ">
                    {/* Hotel Image */}
                    <div className="w-full relative h-48 overflow-hidden">
                      <Image
                        src={hotel.thumbImg || "/placeholder.jpg"}
                        alt={hotel.title}
                        height={200}
                        width={400}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Hotel Info */}
                    <div className=" p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {hotel.title}
                          </h3>
                        </div>
                        {hotel.isFeatured && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Facilities */}

                      {/* Rating and Price */}
                      <div className="flex flex-col justify-between ">
                        <div className="flex flex-col gap-1 mb-2">
                          <div className="flex">
                            {renderStars(Math.round(hotel.ratings || 0))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {hotel.city?.name}, {hotel.country?.name}
                          </span>
                        </div>
                        <div className="text-right flex flex-col">
                          <span className="text-2xl font-bold text-gray-900">
                            BDT {hotel.price}
                          </span>

                          <Link
                            href={`/availability/${hotel.id}/${searchParams.get(
                              "start"
                            )}/${searchParams.get("end")}`}
                          >
                            <Button className="mt-2 bg-blue-600 hover:bg-blue-700">
                              See availability
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Hotel Image */}
                  <div className="md:w-1/3 relative h-48  overflow-hidden">
                    <Image
                      src={hotel.thumbImg || "/placeholder.jpg"}
                      alt={hotel.title}
                      height={200}
                      width={400}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Hotel Info */}
                  <div className=" flex w-full md:flex-row flex-col justify-between">
                    <div className="md:w-2/3 p-3  bg-white ">
                      <div className="flex justify-between items-start mb-2">
                        <div className=" ">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {hotel.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {renderStars(Math.round(hotel.ratings || 0))}
                              <span className="font-semibold text-blue-600">
                                {hotel.ratings.toFixed(1)} (
                                <span className=" text-sm">
                                  {" "}
                                  {hotel.reviews?.length} reviews)
                                </span>
                              </span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {hotel.city?.name}, {hotel.country?.name}
                          </span>
                        </div>
                      </div>

                      {/* Facilities */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        {hotel.facilities?.slice(0, 3).map((facility) => (
                          <div
                            key={facility.facilityIcon?.id}
                            className="flex items-center gap-[2px] text-sm text-gray-600"
                          >
                            <Image
                              src={facility.facilityIcon.iconUrl}
                              alt={facility.facilityIcon.title}
                              height={16}
                              width={16}
                            />{" "}
                            <span>{facility.facilityIcon?.title}</span>
                          </div>
                        ))}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className=" text-blue-600 hover:text-blue-800 underline">
                              more
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className=" bg-white space-y-2 shadow-2xl">
                            {hotel.facilities?.slice(3).map((facility) => (
                              <div
                                key={facility.facilityIcon?.id}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <Image
                                  src={facility.facilityIcon.iconUrl}
                                  alt={facility.facilityIcon.title}
                                  height={16}
                                  width={16}
                                />{" "}
                                <span className=" font-semibold">
                                  {facility.facilityIcon?.title}
                                </span>
                              </div>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    {/* Rating and Price */}
                    <div className="flex flex-col justify-end bg-slate-200 p-3">
                      <div className="text-right ">
                        <span className="text-2xl font-bold text-gray-900">
                          BDT {hotel.price}
                        </span>
                        <p className="text-sm text-gray-600">per night</p>
                        <Link
                          href={`/availability/${hotel.id}/${searchParams.get(
                            "start"
                          )}/${searchParams.get("end")}`}
                        >
                          <Button className="mt-2 cursor-pointer bg-blue-600 hover:bg-blue-700">
                            See availability
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
