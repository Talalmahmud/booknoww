"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const RoomGallary = ({ images }: Props) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Display first 5 images as thumbnails
  const displayedThumbnails = images.slice(0, 4);
  const remainingImagesCount = images.length - 4;

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isGalleryOpen]);

  return (
    <div>
      {/* Mobile Layout */}
      <div className="grid gap-2 ">
        {/* First image full width */}
        <div
          className="rounded-lg overflow-hidden cursor-pointer h-56"
          onClick={() => openGallery(0)}
        >
          <Image
            src={images[0]}
            alt={images[0]}
            height={200}
            width={400}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Next 4 images in 2x2 grid */}
        <div className="grid grid-cols-3 gap-2">
          {displayedThumbnails.slice(1).map((image, index) => (
            <div
              key={index + 1}
              className="rounded-lg overflow-hidden relative cursor-pointer h-24"
              onClick={() => openGallery(index + 1)}
            >
              <Image
                src={image}
                alt={` ${index + 2}`}
                height={200}
                width={400}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
              {/* Show remaining images count on last thumbnail */}
              {index === 2 && remainingImagesCount > 0 && (
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
              src={images[currentImageIndex]}
              alt={` ${currentImageIndex + 1}`}
              height={1000}
              width={1600}
              priority
              className="max-h-[65vh] w-full object-contain rounded-lg shadow-lg transition-all duration-300"
            />
            <div className="text-white text-sm mt-3">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails Strip */}
          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center px-4">
            <div className="bg-black/40 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg max-w-[90%] overflow-x-auto scrollbar-hide">
              <div className="flex gap-3">
                {images.map((img, index) => (
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

export default RoomGallary;
