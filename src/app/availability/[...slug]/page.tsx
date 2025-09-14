import { Star, MapPin, Siren, ShoppingCart } from "lucide-react";
import Header from "@/components/shared/header";
import PropertyGallery from "@/components/shared/property-image-gellary";
import RoomGallary from "@/components/shared/room-image-gallery";
import Image from "next/image";

const HotelDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  console.log(slug);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search-availability/?propertyId=${slug[0]}`
  );
  const property = await res.json();
  console.log(property);
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
  console.log(property.data.roomTypes[0]);

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hotel Name and Rating */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {property.data.title}
          </h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(property.data.ratings)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-700">
                {property.data.ratings} ({property.data.reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 mr-1" />
          <span>{property.data.address}</span>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <PropertyGallery
            images={[property.data.thumbImg, ...property.data.propertyImages]}
          />
        </div>

        {/* Description and Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              About This {property.data.propertyType.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.data.descriptions}
            </p>
          </div>

          {/* room Card */}
        </div>

        <div className=" flex gap-6">
          <div className=" w-full space-y-4">
            {property.data.roomTypes.map((item, index) => (
              <div
                key={index}
                className=" bg-white p-2 rounded-md w-full flex flex-col md:flex-row gap-2"
              >
                {" "}
                <RoomGallary images={[item.thumbImg, ...item.roomImages]} />
                <div className=" w-2/3 space-y-2">
                  <div className=" flex flex-col gap-1">
                    <p className=" font-bold text-[20px]">{item.title}</p>
                    <p className=" font-bold text-[14px]">Facilities</p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {property.data.facilities?.map((facility) => (
                        <div
                          key={facility.facilityIcon?.id}
                          className="flex items-center gap-[2px] text-sm text-gray-600"
                        >
                          <Image
                            src={facility.facilityIcon.iconUrl}
                            alt={facility.facilityIcon.title}
                            height={16}
                            width={16}
                          />{" "}
                          <span>{facility.facilityIcon?.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-1">
                    <p className=" font-bold text-[20px]">Meal Plan</p>
                    <div className=" grid grid-cols-1 gap-1"></div>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
          {/* <div className=" bg-white p-2 rounded-md w-full flex flex-col md:flex-row gap-2">
            {" "}
            <RoomGallary images={hotel.images} />
            <div className=" w-2/3 space-y-2">
              <p className=" flex items-center text-[18px] font-sans font-semibold text-orange-500">
                <Siren className=" h-8 w-8 text-red-600 pr-2" /> Hurry up 4
                rooms are available
              </p>
              <div className=" flex flex-col gap-1">
                <p className=" font-bold text-[20px]">Facilities</p>
                <div className=" grid grid-cols-2 justify-between items-center"></div>
              </div>
              <div className=" flex flex-col gap-1">
                <p className=" font-bold text-[20px]">Meal Plan</p>
                <div className=" grid grid-cols-1 gap-1"></div>
              </div>
            </div>
          </div> */}
          <div className=" hidden md:block w-[400px] h-20 bg-white sticky top-20 right-0"></div>
        </div>
        <div className=" h-[800px] w-full bg-amber-300"></div>
      </div>
      <div className=" fixed w-full  bottom-4 flex justify-center items-center">
        <div className=" h-12 w-12 bg-blue-200 flex justify-center items-center rounded-full ">
          <ShoppingCart className=" h-8 w-8 text-red-700" />
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
