"use client";
import Image from "next/image";
import RoomGallary from "./room-image-gallery";
import { Facility, RoomAvailability } from "@/app/availability/[...slug]/page";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { storeBooking } from "@/services/cart";
import { useCart } from "../card-provider";

type Props = {
  propertyId?: string;
  child?: number;
  adult?: number;
  guest?: number;
  checkIn?: string;
  checkOut?: string;
  room: {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbImg: string;
    roomImages: string[];
    facilities: Facility[];
    roomAvailability: RoomAvailability[];
  };
};

type BookingItem = {
  propertyId: string;
  roomTypeId: string;
  roomAvailabilityId: string;
  mealOptionId: string;
  checkIn: string;
  checkOut: string;
  adult: number;
  child: number;
  guest: number;
  roomQuantity: number;
  mealPrice: number;
  totalPrice: number;
  title: string;
  thumbImg: string;
};

const RoomCard = ({
  room,
  propertyId,
  adult,
  checkIn,
  checkOut,
  child,
  guest,
}: Props) => {
  console.log(room);
  const { addBooking } = useCart(); // ✅ get addBooking from context

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
  // handle book now

  // ✅ handle book now using context
  const handleBookNow = () => {
    addBooking({
      propertyId: propertyId || "",
      roomTypeId: room.id,
      roomAvailabilityId: firstAvailability?.id || "",
      mealOptionId: selectedMeal.id,
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      adult: adult || 0,
      child: child || 0,
      guest: guest || 0,
      roomQuantity: roomCount,
      mealPrice: selectedMeal.price,
      totalPrice: selectedMeal.price * roomCount,
      title: room.title,
      thumbImg: room.thumbImg,
    });

    alert("Room added to cart ✅");
  };

  // useEffect(() => {
  //   storeBooking("hotel", room.id, "2025-09-20", "2025-09-25", roomCount);
  // }, [roomCount]);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
      <RoomGallary images={[room.thumbImg, ...room.roomImages]} />

      <div className="flex-1 space-y-3 min-w-1/2 ">
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
                className="flex items-center gap-1 text-[12px] text-gray-600"
              >
                <Image
                  src={f.facilityIcon.iconUrl}
                  alt={f.facilityIcon.title}
                  height={14}
                  width={14}
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
                  className="flex items-center gap-2 text-[13px] font-bold text-gray-700"
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
              BDT {selectedMeal.price}
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
