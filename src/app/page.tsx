"use client";

import { Suspense, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [keyword, setKeyword] = useState("");

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <Hero onSearch={setKeyword} />

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <MovieSection
          title="🔥 Film Populer"
          type="trending"
        />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <MovieSection
          title="⭐ Rating Tertinggi"
          type="top"
        />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <MovieSection
          title="🎬 Rilis Terbaru"
          type="new"
        />
      </Suspense>

      <Footer />
    </main>
  );
}