"use client";
import Image from "next/image";
import RoomGallary from "./room-image-gallery";
import { Facility, RoomAvailability } from "@/app/availability/[...slug]/page";
import { useState } from "react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
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

  const [roomCount, setRoomCount] = useState(1);

  // handle book now
  // handle book now

  // ✅ handle book now using context
  // ✅ remove selectedMeal state
  // const [selectedMeal, setSelectedMeal] = useState<{ id: string; price: number }>(...);

  const handleBookNow = (mealId: string, mealPrice: number) => {
    addBooking({
      propertyId: propertyId || "",
      roomTypeId: room.id,
      roomAvailabilityId: firstAvailability?.id || "",
      mealOptionId: mealId,
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      adult: adult || 0,
      child: child || 0,
      guest: guest || 0,
      roomQuantity: roomCount,
      mealPrice,
      totalPrice: mealPrice * roomCount,
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
      <div className="space-y-1">
        {" "}
        <RoomGallary images={[room.thumbImg, ...room.roomImages]} />
        <h3 className="text-lg font-bold">{room.title}</h3>
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
                  height={16}
                  width={16}
                />
                <span className=" text-[16px] font-semibold">
                  {f.facilityIcon.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-3 min-w-1/2 ">
        <div>
          <p className=" font-bold text-[16px] text-red-600">
            {totalRoom > 0
              ? `Hurry up ${totalRoom} rooms are available!`
              : "No rooms are available!"}
          </p>
        </div>

        {/* Room Facilities */}
        <div className="space-y-4">
          {totalRoom > 0 && (
            <div className="flex items-center gap-3">
              <p className="font-semibold">Select Rooms:</p>
              <Button
                onClick={() => setRoomCount((prev) => Math.max(1, prev - 1))}
                className=" bg-orange-800 rounded-full h-6 w-6 cursor-pointer"
              >
                <MinusCircle className=" min-h-4 min-w-4" />
              </Button>
              <span className="px-2">{roomCount}</span>
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
          {firstAvailability?.mealOptions?.map((meal) => (
            <div key={meal.id} className="border-b-[1px] border-gray-300 pb-2">
              <div className="flex justify-between ">
                <div>
                  <p className=" px-2 py-1 bg-green-700 text-white text-sm rounded-md">
                    {meal.mealType.name}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <div className=" flex flex-col ">
                    <span className="text-red-800 text-lg font-bold">
                      BDT {meal.price}
                    </span>
                    <span className=" text-slate-800">per night</span>
                  </div>
                  <button
                    onClick={() => handleBookNow(meal.id, meal.price)} // ✅ pass meal data here
                    className="bg-blue-600 text-white px-2 py-1 text-sm rounded-lg hover:bg-blue-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
