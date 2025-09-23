"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// === BookingItem Type ===
export type BookingItem = {
  propertyId: string;
  roomTypeId: string;
  roomAvailabilityId: string;
  mealOptionId: string;
  checkIn: string; // ISO date string (YYYY-MM-DD)
  checkOut: string;
  adult: number;
  child: number;
  guest: number;
  roomQuantity: number;
  mealPrice: number;
  totalPrice: number;
  title: string;
  thumbImg: string;
};

// === Context Type ===
type CartContextType = {
  cart: BookingItem[];
  addBooking: (item: BookingItem) => void;
  removeBooking: (index: number) => void;
  clearCart: () => void;
};

// === Create Context ===
const CartContext = createContext<CartContextType | undefined>(undefined);

// === Provider ===
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<BookingItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as BookingItem[];
    const today = new Date();

    // ✅ Remove expired bookings (checkIn < today)
    const validBookings = stored.filter((item) => {
      const checkInDate = new Date(item.checkIn);
      return checkInDate >= new Date(today.toDateString()); // ignore time part
    });

    setCart(validBookings);
    localStorage.setItem("cart", JSON.stringify(validBookings));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // === Add booking (update if exists) ===
  const addBooking = (bookingItem: BookingItem) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) =>
          item.propertyId === bookingItem.propertyId &&
          item.roomTypeId === bookingItem.roomTypeId &&
          item.roomAvailabilityId === bookingItem.roomAvailabilityId &&
          item.checkIn === bookingItem.checkIn &&
          item.checkOut === bookingItem.checkOut
      );

      if (index > -1) {
        // ✅ Update existing booking
        const updated = [...prevCart];
        updated[index] = {
          ...updated[index],
          adult: bookingItem.adult,
          child: bookingItem.child,
          guest: bookingItem.guest,
          roomQuantity: bookingItem.roomQuantity,
          mealOptionId: bookingItem.mealOptionId,
          mealPrice: bookingItem.mealPrice,
          totalPrice: bookingItem.totalPrice,
        };
        return updated;
      }

      // ✅ Add new booking
      return [...prevCart, bookingItem];
    });
  };

  // === Remove booking by index ===
  const removeBooking = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // === Clear cart ===
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addBooking, removeBooking, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// === Hook to use cart ===
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
