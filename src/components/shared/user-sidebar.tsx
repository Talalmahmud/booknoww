"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, Heart, CalendarDays } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navList = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Bookings",
    href: "/profile/booking",
    icon: CalendarDays,
  },
  {
    label: "Wishlist",
    href: "/profile/wishlist",
    icon: Heart,
  },
];

const UserSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-white ">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed md:static top-12 left-0 z-40 bg-white border-r shadow-md h-full md:h-auto w-[230px] md:w-[250px] lg:w-[220px] p-4 flex flex-col gap-3 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="hidden md:flex items-center justify-center mb-4 border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">My Account</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 mt-2">
          {navList.map((nav) => {
            const Icon = nav.icon;
            const isActive = pathname === nav.href;
            return (
              <Link
                href={nav.href}
                key={nav.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-sm font-medium",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => setOpen(false)} // Close on mobile click
              >
                <Icon className="w-4 h-4" />
                {nav.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Background Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;
