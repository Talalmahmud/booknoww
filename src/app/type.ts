export interface Property {
  id: string;
  title: string;
  thumbImg: string;
  price: number;
  ratings: number;
  isFeatured: boolean;

  // Relations
  city?: {
    id: string;
    name: string;
  } | null;

  country?: {
    id: string;
    name: string;
  } | null;

  district?: {
    id: string;
    name: string;
  } | null;

  area?: {
    id: string;
    name: string;
  } | null;

  propertyType?: {
    id: string;
    name: string;
  } | null;

  facilities?: {
    facilityIcon: {
      id: string;
      title: string;
      iconUrl: string;
    };
  }[];

  roomTypes?: {
    id: string;
    title: string;
    price: number;
    guest: number;
    child: number;
  }[];

  reviews?: {
    id: string;
    rating: number;
    comments: string;
  }[];
}

export interface FacilityIcon {
  id: string;
  title: string;
  iconUrl: string;
}

export interface RoomFacility {
  id: string;
  facilityIcon: FacilityIcon;
}

export interface MealType {
  id: string;
  name: string;
}

export interface MealOption {
  id: string;
  mealType: MealType;
  price: number;
}

export interface RoomAvailability {
  id: string;
  date: string;
  rooms: number;
  mealOptions: MealOption[];
}

export interface RoomType {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  guest: number;
  child: number;
  thumbImg: string;
  roomImages: string[];
  facilities: RoomFacility[];
  roomAvailability: RoomAvailability[];
}

export interface Review {
  id: string;
  rating: number;
  comments: string;
  user: { id: string; name: string };
  createdAt: string;
}

export interface Hotel {
  id: string;
  title: string;
  descriptions: string;
  address: string;
  locationLat: number;
  locationLon: number;
  checkIn: string;
  checkOut: string;
  ratings: number;
  price: number;
  discount: number;
  thumbImg: string;
  propertyImages: string[];
  country: { name: string };
  district: { name: string };
  city: { name: string };
  area: { name: string };
  propertyType: { name: string };
  facilities: { id: string; facilityIcon: FacilityIcon }[];
  host: { id: string; name: string; email: string; phone: string };
  roomTypes: RoomType[];
  reviews: Review[];
}

