"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Booking = {
  id: string;
  guestName: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  total: string;
};

const bookings: Booking[] = [
  {
    id: "BKG-1001",
    guestName: "John Doe",
    property: "Ocean View Resort",
    checkIn: "2025-10-10",
    checkOut: "2025-10-15",
    status: "Confirmed",
    total: "$650",
  },
  {
    id: "BKG-1002",
    guestName: "Jane Smith",
    property: "Mountain Escape Lodge",
    checkIn: "2025-11-01",
    checkOut: "2025-11-03",
    status: "Pending",
    total: "$420",
  },
  {
    id: "BKG-1003",
    guestName: "Alex Johnson",
    property: "City Center Apartment",
    checkIn: "2025-09-20",
    checkOut: "2025-09-22",
    status: "Cancelled",
    total: "$0",
  },
];

export function BookingTable() {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Booking ID</th>
            <th className="px-4 py-3">Guest</th>
            <th className="px-4 py-3">Property</th>
            <th className="px-4 py-3">Check-In</th>
            <th className="px-4 py-3">Check-Out</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {booking.id}
              </td>
              <td className="px-4 py-3">{booking.guestName}</td>
              <td className="px-4 py-3">{booking.property}</td>
              <td className="px-4 py-3">{booking.checkIn}</td>
              <td className="px-4 py-3">{booking.checkOut}</td>
              <td className="px-4 py-3">
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </td>
              <td className="px-4 py-3 font-semibold">{booking.total}</td>
              <td className="px-4 py-3 flex justify-center gap-2">
                <Button size="sm" variant="outline">
                  View
                </Button>
                <Button size="sm" variant="destructive">
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
