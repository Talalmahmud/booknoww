"use client";
import Image from "next/image";
import RoomGallary from "./room-image-gallery";
import { Facility, RoomAvailability } from "@/app/availability/[...slug]/page";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { storeBooking } from "@/services/cart";

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

const RoomCard = ({ room }: { room: RoomType }) => {
  console.log(room);
  const firstAvailability = room.roomAvailability[0];
  const totalRoom =
    room.roomAvailability.length > 0 ? room.roomAvailability[0].rooms : 0;

  const [selectedMeal, setSelectedMeal] = useState<{
    id: string;
    price: number;
  }>(() => {
    const firstMeal = firstAvailability?.mealOptions?.[0];
    return {
      id: firstMeal?.id || "",
      price: firstMeal?.price || 0,
    };
  });

  const [roomCount, setRoomCount] = useState(1);

  // handle book now
  const handleBookNow = () => {
    const bookingItem = {
      roomId: room.id,
      title: room.title,
      mealId: selectedMeal.id,
      mealPrice: selectedMeal.price,
      roomCount,
      totalPrice: selectedMeal.price * roomCount,
      thumbImg: room.thumbImg,
    };

    // Get old cart
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add new item
    const updatedCart = [...existingCart, bookingItem];

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Room added to cart ✅");
  };

  useEffect(() => {
    storeBooking("hotel", room.id, "2025-09-20", "2025-09-25", roomCount);
  }, [roomCount]);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
      <RoomGallary images={[room.thumbImg, ...room.roomImages]} />

      <div className="flex-1 space-y-3">
        <div>
          <p className=" font-bold text-[16px] text-red-600">
            {totalRoom > 0
              ? `Hurry up ${totalRoom} rooms are available!`
              : "No rooms are available!"}
          </p>

          <h3 className="text-lg font-bold">{room.title}</h3>
        </div>

        {/* Room Facilities */}
        <div>
          <p className="font-semibold mb-1">Facilities</p>
          <div className="flex flex-wrap gap-3">
            {room.facilities.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <Image
                  src={f.facilityIcon.iconUrl}
                  alt={f.facilityIcon.title}
                  height={16}
                  width={16}
                />
                <span>{f.facilityIcon.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Options */}
        {totalRoom > 0 && firstAvailability && (
          <div>
            <p className="font-semibold mb-1">Meal Options</p>
            <div className="space-y-2">
              {firstAvailability.mealOptions.map((meal) => (
                <label
                  key={meal.id}
                  className="flex items-center gap-2 text-sm font-bold text-gray-700"
                >
                  <input
                    type="radio"
                    name={`meal-${room.id}`}
                    checked={selectedMeal.id === meal.id}
                    onChange={() =>
                      setSelectedMeal({ id: meal.id, price: meal.price })
                    }
                  />
                  {meal.mealType.name} (
                  <span className="text-red-800">BDT</span> {meal.price})
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Room Selector */}
        {totalRoom > 0 && (
          <div className="flex items-center gap-3">
            <p className="font-semibold">Select Rooms:</p>
            <Button
              onClick={() => setRoomCount((prev) => Math.max(1, prev - 1))}
              className=" bg-orange-800 rounded-full h-6 w-6 cursor-pointer"
            >
              <MinusCircle className=" min-h-4 min-w-4" />
            </Button>
            <span className="px-3">{roomCount}</span>
            <Button
              onClick={() =>
                setRoomCount((prev) => Math.min(totalRoom, prev + 1))
              }
              className=" bg-orange-800 rounded-full h-6 w-6 cursor-pointer "
            >
              <PlusCircle className=" min-h-4 min-w-4" />
            </Button>
          </div>
        )}

        {/* Price */}
        {totalRoom > 0 && (
          <div className="flex justify-between items-center pt-2 border-t">
            <p className="text-lg font-bold text-green-600">
              BDT {selectedMeal.price * roomCount}
            </p>
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
