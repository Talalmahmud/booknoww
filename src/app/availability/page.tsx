"use client";
import React, { useState } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

const HotelDetailsPage = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample hotel data
  const hotel = {
    name: "Grand Luxury Resort & Spa",
    address: "123 Beachfront Avenue, Miami, FL 33139",
    rating: 4.8,
    reviewCount: 427,
    description:
      "Experience unparalleled luxury at our beachfront resort. Featuring stunning ocean views, world-class amenities, and exceptional service for the perfect getaway.",
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    ],
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  // Display first 5 images as thumbnails
  const displayedThumbnails = hotel.images.slice(0, 5);
  const remainingImagesCount = hotel.images.length - 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hotel Name and Rating */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(hotel.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-700">
                {hotel.rating} ({hotel.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 mr-1" />
          <span>{hotel.address}</span>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          {/* Mobile Layout */}
          <div className="grid gap-4 md:hidden">
            {/* First image full width */}
            <div
              className="rounded-lg overflow-hidden cursor-pointer h-64"
              onClick={() => openGallery(0)}
            >
              <Image
                src={hotel.images[0]}
                alt={hotel.name}
                height={200}
                width={400}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Next 4 images in 2x2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {displayedThumbnails.slice(1).map((image, index) => (
                <div
                  key={index + 1}
                  className="rounded-lg overflow-hidden relative cursor-pointer h-32"
                  onClick={() => openGallery(index + 1)}
                >
                  <Image
                    src={image}
                    alt={`${hotel.name} ${index + 2}`}
                    height={200}
                    width={400}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Show remaining images count on last thumbnail */}
                  {index === 3 && remainingImagesCount > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-[20px] font-semibold">
                        +{remainingImagesCount}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4 h-96">
            {/* Main image */}
            <div
              className="md:col-span-2 md:row-span-2 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openGallery(0)}
            >
              <Image
                src={hotel.images[0]}
                alt={hotel.name}
                height={200}
                width={400}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Thumbnails */}
            {displayedThumbnails.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className="rounded-lg overflow-hidden relative cursor-pointer"
                onClick={() => openGallery(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${hotel.name} ${index + 2}`}
                  height={200}
                  width={400}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
                {index === 3 && remainingImagesCount > 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-[30px] font-semibold">
                      +{remainingImagesCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Description and Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">About This Hotel</h2>
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>

            {/* Amenities */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Free WiFi",
                  "Swimming Pool",
                  "Spa",
                  "Fitness Center",
                  "Restaurant",
                  "Room Service",
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-6">
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${hotel.price}
              </span>
              <span className="text-gray-600"> / night</span>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Check-in</span>
                <span className="text-gray-700">Check-out</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Thu, Oct 12</span>
                <span className="font-semibold">Sun, Oct 15</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Guests</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
              </select>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Book Now
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              No credit card needed to reserve
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
          >
            <X className="h-7 w-7 text-white" />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 p-3 rounded-full bg-black/60 hover:bg-black/80 transition"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 p-3 rounded-full bg-black/60 hover:bg-black/80 transition"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>

          {/* Main Image */}
          <div className="max-w-5xl w-full px-4 flex flex-col items-center">
            <Image
              src={hotel.images[currentImageIndex]}
              alt={`${hotel.name} ${currentImageIndex + 1}`}
              height={1000}
              width={1600}
              priority
              className="max-h-[70vh] w-full object-contain rounded-lg shadow-lg transition-all duration-300"
            />
            <div className="text-white text-sm mt-3">
              {currentImageIndex + 1} / {hotel.images.length}
            </div>
          </div>

          {/* Thumbnails Strip */}
          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center px-4">
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg max-w-[90%] overflow-x-auto scrollbar-hide">
              <div className="flex gap-3">
                {hotel.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 ${
                      index === currentImageIndex
                        ? "ring-2 ring-blue-500 scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      height={200}
                      width={200}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetailsPage;
