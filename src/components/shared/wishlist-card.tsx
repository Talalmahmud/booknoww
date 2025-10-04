"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

type WishlistItem = {
  id: string;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  status: "Available" | "Booked" | "Sold Out";
};

const wishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Ocean View Resort",
    location: "Cox’s Bazar, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
    price: "$120/night",
    rating: 4.8,
    status: "Available",
  },
  {
    id: "2",
    name: "Mountain Escape Lodge",
    location: "Bandarban, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1559599101-bc9b5f237b66?auto=format&fit=crop&w=600&q=60",
    price: "$95/night",
    rating: 4.6,
    status: "Booked",
  },
  {
    id: "3",
    name: "City Center Apartment",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=60",
    price: "$80/night",
    rating: 4.2,
    status: "Available",
  },
];

export function WishlistCard() {
  const getStatusColor = (status: WishlistItem["status"]) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Booked":
        return "bg-yellow-100 text-yellow-700";
      case "Sold Out":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="relative w-full h-48">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col justify-between h-[220px]">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.location}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <Badge className={`mt-2 ${getStatusColor(item.status)}`}>
                {item.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold text-primary">{item.price}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View
                </Button>
                <Button size="sm" variant="destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
