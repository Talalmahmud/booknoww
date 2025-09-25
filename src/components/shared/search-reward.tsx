"use client";
import React from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react"; // example icon, you can replace

const SearchReward = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-xl shadow-lg p-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Star className="text-yellow-400 w-5 h-5" />
        <p className="text-xl font-bold text-gray-900">Rewards</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb1">
        Sign in to save money and unlock exclusive member-only deals.
      </p>

      {/* Feature */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-gray-800 text-sm md:flex-1">
          Unlock <span className="font-semibold text-blue-600">5% off</span>{" "}
          your first booking and enjoy special discounts reserved for members.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all duration-200">
            Sign In
          </Button>
          <Button variant={"outline"}>Register</Button>
        </div>
      </div>

      {/* Footer Note */}
      {/* <p className="mt-4 text-xs text-gray-500">
        Rewards are applied automatically upon sign in. T&Cs apply.
      </p> */}
    </div>
  );
};

export default SearchReward;
