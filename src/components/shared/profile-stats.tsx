"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Heart, CreditCard, Star } from "lucide-react";

export function ProfileStats() {
  const stats = [
    { icon: CalendarDays, label: "Total Bookings", value: "12" },
    { icon: Heart, label: "Wishlist Items", value: "5" },
    { icon: CreditCard, label: "Total Spent", value: "$1,340" },
    { icon: Star, label: "Reviews Given", value: "8" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="text-center shadow-sm hover:shadow-md transition"
        >
          <CardContent className="p-6 space-y-2">
            <div className="flex justify-center">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
