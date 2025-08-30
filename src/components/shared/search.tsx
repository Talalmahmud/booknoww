"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star, Wifi, Car, Utensils, Home, Hotel, ThumbsUp } from "lucide-react";
import Image from "next/image";

const HotelSearchPage = () => {
  const [priceRange, setPriceRange] = useState([60, 300]);
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

  const hotels = [
    {
      id: 1,
      name: "Hotel Randers",
      rating: 4,
      distance: "24.55 mi from center",
      badge: "Limited-time Deal",
      amenities: ["Wi-Fi", "Parking available", "Restaurant"],
      ratingScore: "Excellent",
      originalPrice: 299,
      discountedPrice: 188,
      totalPrice: 225,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Aiden By Best Western Herning",
      rating: 3,
      distance: "24.62 mi from center",
      badge: "Breakfast included",
      amenities: ["Wi-Fi", "Parking available", "Restaurant"],
      ratingScore: "Good",
      price: 167,
      totalPrice: 167,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Boutique Hotel Royal",
      rating: 4,
      distance: "28.19 mi from center",
      badge: "Limited-time Deal",
      amenities: ["Wi-Fi", "Parking available", "Restaurant"],
      ratingScore: "Very Good",
      originalPrice: 250,
      discountedPrice: 199,
      totalPrice: 225,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  const handleFacilityChange = (facility: keyof typeof facilities) => {
    setFacilities((prev) => ({
      ...prev,
      [facility]: !prev[facility],
    }));
  };

  const handleStayTypeChange = (type: keyof typeof stayTypes) => {
    setStayTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleReviewScoreChange = (score: keyof typeof reviewScores) => {
    setReviewScores((prev) => ({
      ...prev,
      [score]: !prev[score],
    }));
  };

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

  const getRatingColor = (score: string) => {
    switch (score) {
      case "Excellent":
        return "text-green-600";
      case "Very Good":
        return "text-blue-600";
      case "Good":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-6">
        {/* Filter Sidebar */}
        <div className=" hidden lg:block lg:w-1/4 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by:</h3>

            {/* Budget Filter */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">
                Your budget (per night)
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={500}
                step={10}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </div>

          {/* Facilities Filter */}
          <div>
            <Label className="text-sm font-medium mb-4 block">Facilities</Label>
            <div className="space-y-3">
              {[
                { id: "pool", label: "Pool" },
                { id: "swimmingPool", label: "Swimming pool" },
                {
                  id: "freeBreakfast",
                  label: "Free breakfast",
                  icon: <Utensils className="h-4 w-4 mr-2" />,
                },
                {
                  id: "petFriendly",
                  label: "Pet friendly",
                  icon: <Car className="h-4 w-4 mr-2" />,
                },
                {
                  id: "petsAllowed",
                  label: "Pets allowed",
                  icon: <Car className="h-4 w-4 mr-2" />,
                },
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
                    className="text-sm font-normal flex items-center cursor-pointer"
                  >
                    {facility.icon}
                    {facility.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Show all
          </Button>

          {/* Stay Types Filter */}
          <div>
            <Label className="text-sm font-medium mb-4 block">Stay types</Label>
            <div className="space-y-3">
              {[
                {
                  id: "hotels",
                  label: "Hotels",
                  icon: <Hotel className="h-4 w-4 mr-2" />,
                },
                {
                  id: "entireHomes",
                  label: "Entire homes & apartments",
                  icon: <Home className="h-4 w-4 mr-2" />,
                },
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
                    className="text-sm font-normal flex items-center cursor-pointer"
                  >
                    {type.icon}
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Review Score Filter */}
          <div>
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
        </div>

        {/* Hotel Listings */}
        <div className="lg:w-3/4 space-y-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Hotel Image */}
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Hotel Info */}
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(hotel.rating)}</div>
                        <span className="text-sm text-gray-600">
                          {hotel.distance}
                        </span>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {hotel.badge}
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        {amenity === "Wi-Fi" && (
                          <Wifi className="h-4 w-4 mr-1" />
                        )}
                        {amenity === "Parking available" && (
                          <Car className="h-4 w-4 mr-1" />
                        )}
                        {amenity === "Restaurant" && (
                          <Utensils className="h-4 w-4 mr-1" />
                        )}
                        {amenity}
                      </div>
                    ))}
                  </div>

                  {/* Rating and Price */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className={`font-semibold ${getRatingColor(
                          hotel.ratingScore
                        )}`}
                      >
                        {hotel.ratingScore}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {hotel.originalPrice && (
                          <span className="text-gray-400 line-through">
                            ${hotel.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">
                          ${hotel.discountedPrice || hotel.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        ${hotel.totalPrice} total includes taxes and fees
                      </p>
                      <Button className="mt-2 bg-blue-600 hover:bg-blue-700">
                        See availability
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelSearchPage;
