// app/rewards/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Star, Medal } from "lucide-react";
import Header from "@/components/shared/header";

export default function RewardsTiersPage() {
  const tiers = [
    {
      id: "diamond",
      title: "Diamond",
      icon: <Crown className="w-8 h-8 text-indigo-600" />,
      color: "bg-indigo-50",
      description:
        "Exclusive top-tier membership with maximum perks for loyal travelers.",
      benefits: [
        "Free room upgrades (when available)",
        "Priority check-in & late checkout",
        "Access to VIP lounges",
        "Dedicated concierge support",
        "Earn 2x points on all bookings",
      ],
    },
    {
      id: "gold",
      title: "Gold",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-50",
      description:
        "Premium benefits for frequent travelers with added convenience.",
      benefits: [
        "Complimentary breakfast",
        "Early check-in (subject to availability)",
        "Earn 1.5x points on all bookings",
        "Dedicated customer support",
      ],
    },
    {
      id: "silver",
      title: "Silver",
      icon: <Medal className="w-8 h-8 text-gray-500" />,
      color: "bg-gray-50",
      description: "Entry-level membership with essential rewards and savings.",
      benefits: [
        "5% discount on all bookings",
        "Standard customer support",
        "Earn 1x points on all bookings",
      ],
    },
  ];

  return (
    <div>
      {" "}
      <Header />
      <div className="max-w-6xl mx-auto px-4 md:px-2 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Membership Rewards Tiers
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`shadow-lg rounded-2xl border border-gray-200 ${tier.color}`}
            >
              <CardHeader className="flex flex-col items-center">
                <div className="mb-3">{tier.icon}</div>
                <CardTitle className="text-xl font-semibold">
                  {tier.title}
                </CardTitle>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Benefits:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
