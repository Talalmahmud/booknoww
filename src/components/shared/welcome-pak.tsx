"use client";
import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WelcomePack = () => {
  const deals = [
    {
      id: 1,
      city: "Atlanta",
      hotel: "AC Hotel Atlanta Downtown",
      rating: 4,
      reviews: 107,
      cancellation: "Free Cancellation",
      originalPrice: 136,
      discountedPrice: 131,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      city: "Atlanta",
      hotel: "Atlanta Marriott Marquis",
      rating: 4.5,
      reviews: 74,
      cancellation: "Free Cancellation",
      originalPrice: 143,
      discountedPrice: 118,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      city: "New York",
      hotel: "The Ritz-Carlton New York",
      rating: 4.8,
      reviews: 256,
      cancellation: "Free Cancellation",
      originalPrice: 299,
      discountedPrice: 249,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 4,
      city: "Miami",
      hotel: "Fontainebleau Miami Beach",
      rating: 4.3,
      reviews: 189,
      cancellation: "Free Cancellation",
      originalPrice: 325,
      discountedPrice: 289,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1025&auto=format&fit=crop",
    },
  ];
  const router = useRouter();

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-4 py-8">
      {/* Main Container */}
      <div className="bg-gradient-to-r from-slate-500 to-purple-700 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Content - Welcome Message */}
          <div className="flex flex-col justify-between lg:w-2/5">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Welcome Pack
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-6">
                Save Big on Your First Booking
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Hotel Promo Code{" "}
                    <strong className="text-green-300">5% off</strong>
                  </span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Tours & Tickets Promo Code{" "}
                    <strong className="text-green-300">5% off</strong>
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full lg:w-auto bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 transform hover:scale-105">
              Sign In & Claim All
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Content - Carousel */}
          <div className="lg:w-3/5 relative">
            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3 mb-4 lg:mb-6">
              <Button
                variant="outline"
                size="icon"
                className="prev-p-button rounded-full  flex bg-white shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="next-p-button rounded-full flex bg-white shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="h-6 w-6 text-black" />
              </Button>
            </div>

            {/* Carousel */}
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: ".prev-p-button",
                nextEl: ".next-p-button",
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
                  slidesPerView: 2,
                },
              }}
              className="w-full"
            >
              {deals.map((deal) => (
                <SwiperSlide key={deal.id}>
                  <div
                    onClick={() => router.push("/availability")}
                    className="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-100"
                  >
                    {/* Image */}

                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={deal.image}
                        alt={deal.hotel}
                        height={200}
                        width={400}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-sm font-semibold text-gray-800">
                          {deal.city}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {deal.hotel}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < Math.floor(deal.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-300 text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {deal.rating}/5 • {deal.reviews} reviews
                        </span>
                      </div>

                      {/* Cancellation */}
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-green-600 font-medium">
                          {deal.cancellation}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${deal.discountedPrice}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${deal.originalPrice}
                          </span>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 transition-colors duration-300">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePack;
