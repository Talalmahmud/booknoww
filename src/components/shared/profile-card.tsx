"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, MapPin } from "lucide-react";

export function ProfileCard() {
  const user = {
    name: "Talal Mahmud",
    email: "talal@example.com",
    phone: "+880 1234 567890",
    location: "Dhaka, Bangladesh",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    joined: "March 2024",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="relative w-32 h-32">
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="rounded-full object-cover shadow-md"
        />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
        </div>

        <div className="space-y-1 text-gray-700 text-sm">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" /> {user.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" /> {user.phone}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" /> {user.location}
          </p>
          <p className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" /> Member since{" "}
            {user.joined}
          </p>
        </div>

        <div className="pt-3 flex gap-3">
          <Button>Edit Profile</Button>
          <Button variant="outline">Change Password</Button>
        </div>
      </div>
    </div>
  );
}
