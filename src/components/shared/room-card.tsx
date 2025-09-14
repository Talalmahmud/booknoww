"use client";
import Image from "next/image";
import RoomGallary from "./room-image-gallery";
import { Facility, RoomAvailability } from "@/app/availability/[...slug]/page";
import { useState } from "react";

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
  const firstAvailability = room.roomAvailability[0];

  const [selectedMeal, setSelectedMeal] = useState<{
    id: string;
    price: number;
  }>(() => {
    const firstMeal = firstAvailability?.mealOptions?.[0];
    console.log(firstMeal);
    return {
      id: firstMeal?.id || "",
      price: firstMeal?.price || 0,
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
      <RoomGallary images={[room.thumbImg, ...room.roomImages]} />

      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-lg font-bold">{room.title}</h3>
          <p className="text-gray-600">{room.description}</p>
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
        {firstAvailability && (
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
                    name={`meal-${room.id}`} // group radio by room
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

        {/* Price */}
        <div className="flex justify-between items-center pt-2 border-t">
          <p className="text-lg font-bold text-green-600">
            BDT {selectedMeal.price}
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
