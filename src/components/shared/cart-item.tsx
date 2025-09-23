"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "../card-provider";

const CartItems = () => {
  const { cart, removeBooking } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">🛒 Your cart is empty</p>
      </div>
    );
  }

  // ✅ Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-4">
      {cart.map((item, index) => (
        <div
          key={index}
          className="flex relative flex-col sm:flex-row sm:items-center justify-between border p-3 rounded-lg shadow-sm bg-white hover:shadow-md transition"
        >
          <button
            onClick={() => removeBooking(index)}
            className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs sm:text-sm absolute top-1 right-1"
          >
            <Trash2 size={16} /> <span className="sm:hidden">Remove</span>
          </button>
          {/* Left Section */}
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex-shrink-0">
              <Image
                src={item.thumbImg}
                alt={item.title}
                fill
                className="rounded-md object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">Check-In:{item.checkIn}</p>
              <p className="text-xs text-gray-500">Check-Out:{item.checkOut}</p>
              <p className="text-xs text-gray-500">
                👥 {item.adult + item.child} guests | 🛏 {item.roomQuantity} room
                {item.roomQuantity > 1 ? "s" : ""}
              </p>
              <div className="flex  items-center sm:items-end justify-between  gap-2 sm:gap-1">
                <p className="font-bold text-green-600 text-sm sm:text-base">
                  ৳ {item.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
        </div>
      ))}

      {/* ✅ Total Summary */}
      <div className="border-t pt-4 flex justify-between items-center">
        <p className="font-semibold text-gray-700 text-lg">Total</p>
        <p className="font-bold text-green-700 text-xl">
          ৳ {totalPrice.toLocaleString()}
        </p>
      </div>

      {/* ✅ Checkout button */}
      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartItems;
