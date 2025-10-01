// app/faq/page.tsx
"use client";

import Header from "@/components/shared/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I make a booking?",
      answer:
        "Simply search for your desired destination, select your dates, choose a property, and complete the booking through our secure checkout.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, most bookings can be modified or canceled depending on the hotel's policy. Please check your booking confirmation for details.",
    },
    {
      question: "Do I need to pay in advance?",
      answer:
        "Some properties require prepayment while others allow pay-at-hotel options. You’ll see the payment details during checkout.",
    },
    {
      question: "Are there hidden fees?",
      answer:
        "No hidden fees. All taxes and charges are shown upfront before you confirm your booking.",
    },
    {
      question: "How do I earn reward points?",
      answer:
        "You earn reward points every time you complete a booking through our platform. Points can be redeemed for discounts or free stays.",
    },
  ];

  return (
    <div>
      {" "}
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Find answers to common questions about booking, payments, and rewards.
        </p>

        {/* Accordion FAQ */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-xl px-4 shadow-sm"
            >
              <AccordionTrigger className="text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
