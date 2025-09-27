"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Shield,
  BadgeCheck,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import api from "@/lib/axios";

interface Offer {
  id: string;
  tnc: string;
  tag: string;
  facilities: string;
  others: string;
  couponId: string;
  coupon: {
    id: string;
    code: string;
    title: string;
    discount: number;
    status: boolean;
    startTime: string;
    expireTime: string;
    description: string;
    imageUrl: string;
  };
}

const WeeklyDeals = () => {
  const deals = [
    {
      id: 1,
      title: "North America",
      description: "$100 flight coupons & Attractions BOGO",
      tag: "New Deal",
      provider: "Trip.com",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Exclusive Member Rewards",
      description: "Special benefits for our loyal members",
      tag: "Member Only",
      provider: "Eejay Now!",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "China",
      description: "Travel deals up to 50% off",
      tag: "Limited Time",
      provider: "View Dusk",
      image:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Europe Special",
      description: "Early bird discounts on hotels",
      tag: "Popular",
      provider: "EuroTravel",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1174&auto=format&fit=crop",
    },
  ];

  const [offers, setOffers] = useState<Offer[]>([]);

  const fetchOffer = async () => {
    try {
      const res = await api.get("/offer");
      const resData = res.data;
      setOffers(res.data.data);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOffer();
  }, []);
  console.log(offers);

  return (
    <div className="w-full max-w-[1160px] mx-auto mt-[100px] px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-center flex-wrap gap-1 pb-4">
        <div className="flex items-center bg-blue-50 rounded-lg px-3 py-2">
          <Shield className="h-4 w-4 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-700">
            We Price Match
          </span>
        </div>
        <div className="flex items-center bg-green-50 rounded-lg px-3 py-2">
          <BadgeCheck className="h-4 w-4 text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-700">
            Booking Guarantee
          </span>
        </div>
        <div className="flex items-center bg-purple-50 rounded-lg px-3 py-2">
          <BadgeCheck className="h-4 w-4 text-purple-600 mr-2" />
          <span className="text-sm font-medium text-purple-700">
            Stay Guarantee
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons - Positioned on sides */}
        <Button
          variant="outline"
          size="icon"
          className="prev-button pre-t absolute left-0 top-1/2 transform -translate-y-1/2 z-10 -translate-x-1/2 hidden md:flex bg-white shadow-lg hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="next-button next-t absolute right-0 top-1/2 transform -translate-y-1/2 z-10 translate-x-1/2 hidden md:flex bg-white shadow-lg hover:bg-gray-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".pre-t",
            nextEl: ".next-t",
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {offers.map((deal) => (
            <SwiperSlide key={deal.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={deal.coupon.imageUrl}
                    alt={deal.coupon.id}
                    height={200}
                    width={400}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {deal.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                {/* <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {deal.provider}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Explore More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination flex justify-center mt-6 space-x-2"></div>
      </div>

      {/* Mobile Navigation Buttons */}

      {/* View All Button */}
      {/* <div className="text-center mt-8">
        <Button
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          View All Deals
        </Button>
      </div> */}
    </div>
  );
};

export default WeeklyDeals;
