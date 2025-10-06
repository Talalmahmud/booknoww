"use client";
import React from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react"; // example icon, you can replace

const SearchReward2 = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-md  w-fullshadow-lg p-2">
      {/* Header */}

      {/* Feature */}
      <div className="flex flex-col md:flex-row items-end  gap-1">
        <p className="text-gray-800 text-sm flex-1 ">
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

export default SearchReward2;
