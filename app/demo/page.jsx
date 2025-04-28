"use client";

import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Website Demo</h1>
      <p className="text-gray-600 text-lg text-center max-w-2xl mb-6">
        Explore how our AI-powered Cloud Service Advisor can help you optimize cloud costs and infrastructure.
      </p>

      {/* Embedded Video (Replace with your YouTube/Vimeo link) */}
      <div className="w-full max-w-2xl aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/MzbgCh5L6Cc?si=bgr8YNmMEtHJXerp"
          title="Website Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Call to Action */}
      <Link
        href="/auth/sign-up"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
      >
        Get Started for Free
      </Link>
    </div>
  );
}
