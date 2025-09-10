"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Shield,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

// Type Definitions
type Category = {
  id: string;
  name: string;
  icon: string;
};

type PropertyBase = {
  id: number;
  title: string;
  ratings: number;
  price: number;
  discount: number;
  thumbImg: string;
  reviews: [];
};

type Property = PropertyBase;

type PropertyCategory = "Hotel" | "resort" | "apartment" | "tour";

const FeaturedProperties = () => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] =
    useState<PropertyCategory>("Hotel");
  const [activeCity, setActiveCity] = useState<string>("Orlando");

  const categories: Category[] = [
    { id: "Hotel", name: "Hotel", icon: "🏨" },
    { id: "Resort", name: "Resort", icon: "🏖️" },
    { id: "Apartment", name: "Apartment", icon: "🏢" },
    { id: "House Boat", name: "House Boat", icon: "🏢" },
  ];
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/search/${activeCategory}`);
      const resData = await response.data;
      setProperties(resData.data);
    } catch (error) {
      console.log("Failed to fetch properties", error || "");
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div className="w-full max-w-6xl bg-amber-100/30 mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Properties
          </h2>

          {/* Guarantees */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-blue-50 rounded-lg px-3 py-2">
              <Shield className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">
                We Price Match
              </span>
            </div>
            <div className="flex items-center bg-green-50 rounded-lg px-3 py-2">
              <BadgeCheck className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">
                Hotel Booking Guarantee
              </span>
            </div>
            <div className="flex items-center bg-purple-50 rounded-lg px-3 py-2">
              <BadgeCheck className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">
                Hotel Stay Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as PropertyCategory)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="relative">
        {/* Navigation Buttons - Positioned on sides */}
        <Button
          variant="outline"
          size="icon"
          className="prev-f-button absolute left-0 top-1/2 rounded-full transform -translate-y-1/2 z-10 -translate-x-1/2 hidden md:flex bg-white shadow-lg hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="next-f-button next-t absolute rounded-full right-0 top-1/2 transform -translate-y-1/2 z-10 translate-x-1/2 hidden md:flex bg-white shadow-lg hover:bg-gray-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".prev-f-button",
            nextEl: ".next-f-button",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 1.8,
            },
            1024: {
              slidesPerView: 2.2,
            },
            1280: {
              slidesPerView: 3.5,
            },
          }}
          className="w-full"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <div
                onClick={() => router.push("/availability")}
                className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 my-1"
              >
                {/* Image */}

                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={property.thumbImg}
                    alt={property.title}
                    height={200}
                    width={400}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-sm font-semibold text-gray-800">
                        {property.city}
                      </span>
                    </div> */}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 line-clamp-1">
                      {property.title}
                    </h3>
                    {/* <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {property.tag}
                      </span> */}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(property.ratings)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-300 text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {property.ratings}/5 • {property.reviews.length} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        BDT {property.price - property.discount}
                      </span>
                      {property.discount && (
                        <span className="text-sm text-gray-500 ml-2">
                          <span className=" line-through">
                            {property.price}
                          </span>{" "}
                          / night
                        </span>
                      )}
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No properties found
          </h3>
          <p className="text-gray-500">
            Try selecting a different city or category
          </p>
        </div>
      )}

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl mt-4 p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Discover great deals on{" "}
          {activeCategory === "tour" ? "tours" : activeCategory + "s"} around
          the world
        </h3>
        <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg">
          Go Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProperties;
