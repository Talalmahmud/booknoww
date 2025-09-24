"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, X } from "lucide-react";

const SignupOffer = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4 shadow-xl border bg-white animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Header with Icon */}
        <div className="h-40 w-full bg-gradient-to-r from-pink-500 to-yellow-400 flex items-center justify-center">
          <Gift className="h-16 w-16 text-white drop-shadow-lg" />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Sign Up & Claim Your Reward!
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            Join today and enjoy{" "}
            <span className="font-semibold text-pink-600">$50 OFF</span> your
            first booking.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">
              Claim Reward
            </Button>
            <Button
              variant="outline"
              className="rounded-lg border-gray-300 font-semibold hover:bg-gray-50"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOffer;
