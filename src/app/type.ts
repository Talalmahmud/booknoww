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
