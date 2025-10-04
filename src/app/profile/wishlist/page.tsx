"use client";

import { WishlistCard } from "@/components/shared/wishlist-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WishlistPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <WishlistCard />
        </CardContent>
      </Card>
    </div>
  );
}
