"use client";
import Link from "next/link";
import React from "react";

const navList = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Bookings",
    href: "/profile/booking",
  },
  {
    label: "Wishlist",
    href: "/profile/wishlist",
  },
];

const UserSidebar = () => {
  return (
    <div className=" bg-white border-r-[1px] shadow-md  pl-2 w-[200px] md:w-[250px] lg:w-[200px] flex flex-col gap-4 py-4 text-gray-700 text-[15px]">
      {navList.map((nav) => (
        <Link href={nav.href} key={nav.href}>
          {nav.label}
        </Link>
      ))}
    </div>
  );
};

export default UserSidebar;
