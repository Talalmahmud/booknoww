import { Star, MapPin, ShoppingCart } from "lucide-react";
import Header from "@/components/shared/header";
import PropertyGallery from "@/components/shared/property-image-gellary";
import Image from "next/image";
import RoomCard from "@/components/shared/room-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MessagePopup from "@/components/shared/message-popup";
import CartItems from "@/components/shared/cart-item";

// ----------------- Types -----------------
type FacilityIcon = {
  id: string;
  title: string;
  iconUrl: string;
};

export type Facility = {
  id: string;
  facilityIcon: FacilityIcon;
};

type MealType = {
  id: string;
  name: string;
};

type MealOption = {
  id: string;
  mealType: MealType;
  price: number;
};

export type RoomAvailability = {
  id: string;
  date: string;
  rooms: number;
  mealOptions: MealOption[];
};

type RoomType = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbImg: string;
  roomImages: string[];
  facilities: Facility[];
  roomAvailability: RoomAvailability[];
};

type Review = {
  id: string;
  rating: number;
  comments: string;
};

type Area = { id: string; name: string };
type City = { id: string; name: string };
type District = { id: string; name: string };
type Country = { id: string; name: string };
type PropertyType = { id: string; name: string };

export type Hotel = {
  id: string;
  title: string;
  descriptions: string;
  ratings: number;
  reviews: Review[];
  price: number;
  discount: number;
  thumbImg: string;
  propertyImages: string[];
  facilities: Facility[];
  roomTypes: RoomType[];
  area: Area;
  city: City;
  district: District;
  country: Country;
  propertyType: PropertyType;
  checkIn: string;
  checkOut: string;
  childPolicies: string;
  cancellationPolicies: {
    title: string;
    hours: number;
    percentage: number;
  }[];
};

// ----------------- Component -----------------
const HotelDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search-availability/?propertyId=${
      slug[0] || ""
    }&start=${slug[1] || ""}&end=${slug[2] || ""}`,
    { cache: "no-store" }
  );
  const property = await res.json();
  const hotel: Hotel = property.data;
  // console.log(hotel.roomTypes[0].roomAvailability);
  console.log(hotel.cancellationPolicies);
  return (
    <div className="min-h-screen bg-blue-100">
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-0 py-8">
        {/* Title & Rating */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{hotel.title}</h1>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(hotel.ratings)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-700">
              {hotel.ratings} ({hotel.reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 mr-1" />
          <span>
            {hotel.area.name}, {hotel.city.name}, {hotel.district.name},{" "}
            {hotel.country.name}
          </span>
        </div>

        {/* Image Gallery */}
        <div className="mb-10 p-2 bg-white rounded-md">
          <PropertyGallery images={[hotel.thumbImg, ...hotel.propertyImages]} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Description + Rooms */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            {/* <div>
              <h2 className="text-2xl font-semibold mb-3">
                About this {hotel.propertyType.name}
              </h2>
              <p className="text-gray-700">{hotel.descriptions}</p>
            </div> */}

            {/* Room Types */}
            {hotel.roomTypes.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
                <div className="space-y-6">
                  {hotel.roomTypes.map((room) => (
                    <RoomCard
                      child={Number(slug[3]) || 0}
                      adult={Number(slug[3]) || 0}
                      guest={Number(slug[3]) || 0}
                      checkIn={slug[1]}
                      checkOut={slug[2]}
                      propertyId={hotel.id}
                      key={room.id}
                      room={room}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
              <div className="flex flex-wrap gap-4">
                {hotel.facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Image
                      src={facility.facilityIcon.iconUrl}
                      alt={facility.facilityIcon.title}
                      height={20}
                      width={20}
                    />
                    <span>{facility.facilityIcon.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className=" bg-white py-2 px-1">
              <p className=" text-xl font-bold pb-2">Know Before You Go</p>
              <p className=" text-[14px] font-bold">
                Check-In: <span className=" font-normal">{hotel.checkIn}</span>
              </p>
              <p className=" text-[14px] font-bold">
                Check-Out:{" "}
                <span className=" font-normal">{hotel.checkOut}</span>
              </p>
            </div>
            <div className=" bg-white py-2 px-1">
              <p className=" text-xl font-bold pb-1">Cancelletion Policies:</p>
              {hotel.cancellationPolicies?.map((item, index) => (
                <div
                  key={index}
                  className=" font-semibold flex items-center gap-1"
                >
                  <span>{item?.title} : </span>
                  <span className=" text-red-700">
                    {" "}
                    Return {item.percentage}%
                  </span>{" "}
                  <span className=" text-green-800">
                    {" "}
                    before {item.hours} hours
                  </span>
                </div>
              ))}
            </div>
            <div className=" bg-white py-2 px-1">
              <p className=" text-xl font-bold pb-2">Child Policies:</p>
              <p className=" text-[16px]">{hotel.childPolicies}</p>
            </div>

            {/* Reviews */}
            {hotel.reviews.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                <div className="space-y-4">
                  {hotel.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white p-3 rounded shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-gray-600">{review.comments}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Booking Card */}
          {hotel.propertyType.name !== "Apartment" ? (
            <div className="hidden lg:block">
              <div className="sticky top-20 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-3">Your Cart</h2>

                {/* ✅ Cart Items */}
                <CartItems />
              </div>
            </div>
          ) : (
            <div className="hidden lg:block">
              <div className="sticky top-20 flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-3">Book Your Stay</h2>
                <p className="text-gray-600 mb-2 text-[16px]">
                  <span className="font-bold">
                    {hotel.price - hotel.discount}
                  </span>{" "}
                  <span className="font-bold line-through"> {hotel.price}</span>
                  BDT / per night
                </p>
                <MessagePopup />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      <div className="fixed bottom-5 right-5 lg:hidden">
        <button className="h-14 w-14 bg-blue-600 flex justify-center items-center rounded-full shadow-lg hover:bg-blue-700">
          <ShoppingCart className="h-7 w-7 text-white" />
        </button>
      </div>
    </div>
  );
};

export default HotelDetailsPage;

// ----------------- Room Card -----------------
