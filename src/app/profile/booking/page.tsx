import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingTable } from "@/components/shared/booking-table";

export default function BookingListPage() {
  return (
    <div className=" p-3">
      <Card className="shadow-md">
        <CardHeader className="flex md:flex-row flex-col justify-between items-center">
          <CardTitle className="text-2xl font-bold">Booking List</CardTitle>
          <Button>Add Booking</Button>
        </CardHeader>
        <CardContent>
          <BookingTable />
        </CardContent>
      </Card>
    </div>
  );
}
