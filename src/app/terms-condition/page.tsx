// app/terms/page.tsx
"use client";

import Header from "@/components/shared/header";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-600 mb-10">
          Please read these Terms & Conditions carefully before using our
          booking platform. By accessing or using our services, you agree to be
          bound by these terms.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            1. Use of Our Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use our booking platform only for lawful purposes. You
            must not misuse the platform, engage in fraudulent activity, or
            interfere with its normal operation.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">2. Booking Policy</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>All bookings are subject to availability and confirmation.</li>
            <li>
              Cancellations and modifications depend on the property’s policy.
            </li>
            <li>
              You are responsible for providing accurate information during
              booking.
            </li>
          </ul>
        </section>
        <Separator className="my-6" />

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. Payments</h2>
          <p className="text-gray-700 leading-relaxed">
            Payment terms, including prepayment requirements, will be displayed
            at checkout. We are not responsible for additional charges imposed
            by banks or payment providers.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            4. User Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You are responsible for maintaining the confidentiality of your
            account and password. Any activity under your account is your
            responsibility.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for any damages, losses, or expenses arising from
            the use of our platform, including but not limited to service
            interruptions, errors, or cancellations made by third-party
            providers.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms & Conditions at any time. The updated
            terms will be effective as soon as they are published on this page.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions regarding these Terms & Conditions, please
            contact us at:
          </p>
          <p className="mt-2 text-gray-700">
            Email:{" "}
            <span className="font-medium">support@bookingplatform.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
