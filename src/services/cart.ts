type BookingItem = {
  propertyType: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  roomQuantity: number;
};

export const storeBooking = (
  propertyType: string,
  roomId: string,
  checkIn: string,
  checkOut: string,
  roomQuantity: number
) => {
  const todayKey = new Date().toISOString().split("T")[0]; // e.g. 2025-09-15

  // get existing storage
  const storage = JSON.parse(localStorage.getItem("bookings") || "{}");

  // ensure today's key is an array
  if (!Array.isArray(storage[todayKey])) {
    storage[todayKey] = [];
  }

  // check if booking already exists
  const existingIndex = storage[todayKey].findIndex(
    (b: BookingItem) =>
      b.propertyType === propertyType &&
      b.roomId === roomId &&
      b.checkIn === checkIn &&
      b.checkOut === checkOut
  );

  if (existingIndex !== -1) {
    // update quantity
    storage[todayKey][existingIndex].roomQuantity = roomQuantity;
  } else {
    // push new booking
    storage[todayKey].push({
      propertyType,
      roomId,
      checkIn,
      checkOut,
      roomQuantity,
    });
  }

  // save back to localStorage
  localStorage.setItem("bookings", JSON.stringify(storage));
};
