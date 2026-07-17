"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";

export default function Home() {

  const [keyword, setKeyword] = useState("");

  return (

    <main className="bg-black text-white min-h-screen">

      <Navbar />

      {/* Hero */}
      <Hero onSearch={setKeyword} />

      {/* Movie Section */}
      <MovieSection
        title="🔥 Film Populer"
        type="trending"
      />

      <MovieSection
        title="⭐ Rating Tertinggi"
        type="top"
      />

      <MovieSection
        title="🎬 Rilis Terbaru"
        type="new"
      />

      <Footer />

    </main>

  );

}