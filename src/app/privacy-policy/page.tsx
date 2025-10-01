// app/privacy-policy/page.tsx
"use client";

import Header from "@/components/shared/header";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div>
      {" "}
      <Header />{" "}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-10">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          booking platform.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may collect personal information including your name, email,
            phone number, payment details, and booking preferences.
            Additionally, we collect non-personal information such as browser
            type, device information, and cookies to improve your experience.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>To process and confirm your bookings</li>
            <li>To send important updates and notifications</li>
            <li>To improve our services and user experience</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>
        </section>
        <Separator className="my-6" />

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            3. Sharing of Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal information. We may share your details
            with trusted partners such as hotels, payment processors, or service
            providers to complete your booking. Your information may also be
            disclosed if required by law.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We use industry-standard encryption and security practices to
            protect your personal data. However, no method of transmission over
            the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or delete your personal
            information. Please contact our support team if you wish to exercise
            any of these rights.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            6. Changes to this Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with the updated date.
          </p>
        </section>
        <Separator className="my-6" />

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at:
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
