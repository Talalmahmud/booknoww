import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { CartProvider } from "@/components/card-provider";
import SignupOffer from "@/components/shared/signup-offer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "BookNoww - Your Premier Booking Platform | Hotels, Resorts & Apartment",
  description:
    "Discover the easiest way to book Hotels, Resorts , Apartment and experiences worldwide. Best prices guaranteed, 24/7 customer support, and seamless booking experience.",
  keywords:
    "booking, hotels, resorts, apartment, flights, travel, reservations, vacation, trips",
  openGraph: {
    title: "BookNoww - Your Premier Booking Platform",
    description:
      "Discover the easiest way to book hotels, flights, and experiences worldwide.",
    url: "https://booknoww-beige.vercel.app/",
    siteName: "BookNoww",
    images: [
      {
        url: "https://booknoww-beige.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "BookNoww - Your Premier Booking Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookNoww - Your Premier Booking Platform",
    description:
      "Discover the easiest way to book Hotels, Resorts , Apartment and experiences worldwide.",
    images: ["https://booknoww-beige.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <CartProvider>{children}</CartProvider>
        <Footer />
        <SignupOffer />
      </body>
    </html>
  );
}
