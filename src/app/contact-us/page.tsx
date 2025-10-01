// app/contact/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/shared/header";

export default function ContactPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We’d love to hear from you. Whether you have a question about your
            booking, rewards, or anything else — our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
              <form className="space-y-4">
                <Input placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <Textarea placeholder="Your Message" rows={5} required />
                <Button type="submit" className="w-full rounded-xl">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 shadow-md rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>support@bookingplatform.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>123 Travel Street, New York, USA</span>
                </div>
              </div>
            </Card>

            {/* Support Note */}
            <Card className="p-6 shadow-md rounded-2xl bg-blue-50 border border-blue-200">
              <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
              <p className="text-gray-700 mb-4">
                Our support team is available 24/7 to assist you with bookings,
                cancellations, or any inquiries.
              </p>
              {/* <Button variant="default" className="rounded-xl">
                Live Chat
              </Button> */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
