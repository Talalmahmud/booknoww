// app/careers/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/header";

export default function CareersPage() {
  const jobs = [
    {
      title: "Digital Marketer",
      location: "Remote / Dhaka, Bangladesh",
      type: "Full-Time",
      description:
        "We’re looking for a creative and data-driven Digital Marketer to join our team. You’ll manage campaigns, SEO/SEM, social media, email marketing, and paid ads.",
      requirements: [
        "2+ years experience in digital marketing",
        "Strong knowledge of SEO, SEM, Google Ads & Analytics",
        "Experience with Meta Ads, LinkedIn Ads",
        "Excellent communication and analytical skills",
      ],
    },
    {
      title: "Graphics Designer",
      location: "Remote / Dhaka, Bangladesh",
      type: "Full-Time",
      description:
        "We’re seeking a talented Graphics Designer with a strong sense of branding and visual storytelling. You’ll design marketing assets, social media creatives, and UI/UX visuals.",
      requirements: [
        "2+ years experience in graphic design",
        "Proficiency in Adobe Creative Suite / Figma",
        "Strong portfolio with branding and marketing projects",
        "Basic motion graphics knowledge is a plus",
      ],
    },
  ];

  return (
    <div>
      <Header />
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Careers</h1>
        <p className="text-center text-gray-600 mb-12">
          Join our team of innovators and help shape the future of digital
          experiences. Currently, we’re hiring for the following positions:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {job.title}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {job.location} • {job.type}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{job.description}</p>

                <h3 className="font-medium mb-2">Requirements:</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>

                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
