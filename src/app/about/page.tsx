// app/about/page.tsx
"use client";

import Header from "@/components/shared/header";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, HeartHandshake, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We’re a global booking platform dedicated to making travel simple,
            affordable, and rewarding for everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To connect travelers with their perfect stays by offering
                seamless booking experiences, transparent pricing, and rewarding
                loyalty benefits.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become the world’s most trusted travel companion, making
                every journey memorable and accessible to all.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Card className="p-6 shadow-md rounded-2xl">
              <Users className="w-10 h-10 mx-auto text-blue-600 mb-3" />
              <h3 className="font-semibold">Customer First</h3>
              <p className="text-sm text-gray-600">
                We put travelers at the heart of every decision we make.
              </p>
            </Card>
            <Card className="p-6 shadow-md rounded-2xl">
              <Globe className="w-10 h-10 mx-auto text-green-600 mb-3" />
              <h3 className="font-semibold">Global Reach</h3>
              <p className="text-sm text-gray-600">
                We provide stays in destinations across the globe.
              </p>
            </Card>
            <Card className="p-6 shadow-md rounded-2xl">
              <HeartHandshake className="w-10 h-10 mx-auto text-pink-600 mb-3" />
              <h3 className="font-semibold">Trust & Transparency</h3>
              <p className="text-sm text-gray-600">
                We ensure honest pricing and secure bookings.
              </p>
            </Card>
            <Card className="p-6 shadow-md rounded-2xl">
              <Award className="w-10 h-10 mx-auto text-yellow-600 mb-3" />
              <h3 className="font-semibold">Excellence</h3>
              <p className="text-sm text-gray-600">
                We constantly innovate to deliver the best travel experience.
              </p>
            </Card>
          </div>
        </div>

        {/* Closing Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">
            Join Us on the Journey
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you’re planning a weekend getaway or a long adventure, we’re
            here to make your booking smooth and rewarding.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
