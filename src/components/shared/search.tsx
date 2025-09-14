"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Star } from "lucide-react";
import Image from "next/image";
import MobileFilter from "./mobile-filter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Property } from "@/app/type";
import Link from "next/link";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Property[]>([]); // ✅ typed state
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-50">
      <MobileFilter />
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto p-6">
        {/* Sidebar Filters */}
        <div className="hidden lg:block lg:w-1/4 h-full space-y-8 border border-gray-200 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Show all
          </Button>
        </div>

        {/* Hotels List */}
        <div className="lg:w-3/4 min-h-screen space-y-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : hotels.length === 0 ? (
            <p className="text-center text-gray-600">No hotels found</p>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Hotel Image */}
                  <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                    <Image
                      src={hotel.thumbImg || "/placeholder.jpg"}
                      alt={hotel.title}
                      height={200}
                      width={400}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Hotel Info */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {hotel.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {renderStars(Math.round(hotel.ratings || 0))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {hotel.city?.name}, {hotel.country?.name}
                          </span>
                        </div>
                      </div>
                      {hotel.isFeatured && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Facilities */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {hotel.facilities?.map((facility) => (
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
                    </div>

                    {/* Rating and Price */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-blue-600">
                          {hotel.ratings.toFixed(1)} / 5
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          BDT {hotel.price}
                        </span>
                        <p className="text-sm text-gray-600">
                          per night, taxes may apply
                        </p>
                        <Link href={`/availability/${hotel.id}`}>
                          {" "}
                          <Button className="mt-2 bg-blue-600 hover:bg-blue-700">
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
