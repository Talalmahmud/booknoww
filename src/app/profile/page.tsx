"use client";

import { ProfileCard } from "@/components/shared/profile-card";
import { ProfileStats } from "@/components/shared/profile-stats";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileCard />
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileStats />
        </CardContent>
      </Card>
    </div>
  );
}
