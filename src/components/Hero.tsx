"use client";

import { useState, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";

type HeroProps = {
  onSearch: (keyword: string) => void;
};

export default function Hero({ onSearch }: HeroProps) {

  const [keyword, setKeyword] = useState("");

  useEffect(() => {

    const delay = setTimeout(() => {

      onSearch(keyword);

    }, 300);

    return () => clearTimeout(delay);

  }, [keyword, onSearch]);

  return (

    <section className="pt-26 md:pt-40 pb-8 md:pb-12">

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          Temukan <span className="text-violet-500">Film Favorite Anda</span>
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-7 md:leading-9 text-zinc-400">
          Jelajahi film dari berbagai genre. Temukan film populer,
          simpan ke daftar favorit, dan nikmati pengalaman menonton yang menyenangkan.
        </p>

        {/* Search */}

        <div className="relative mt-8 md:mt-12 max-w-3xl mx-auto">

       <input
        type="text"
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder="🔍 Cari Film..."
        className="w-full h-12 md:h-14 rounded-2xl bg-zinc-900 border border-zinc-700 px-5 md:px-6 text-sm md:text-base md:text-lg outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition"
        />

        <SearchDropdown keyword={keyword} />

      </div>

        {/* Button */}

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row justify-center gap-4 md:gap-5">

          <button
            onClick={() =>
              document
                .getElementById("trending")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="w-full md:w-auto px-10 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-semibold transition"
          >
            Jelajahi Film
          </button>

          <button
            onClick={() =>
              document
                .getElementById("trending")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="w-full md:w-auto px-10 py-4 rounded-2xl border border-zinc-700 hover:border-violet-500 hover:text-violet-400 font-semibold transition"
          >
            Film Populer
          </button>

        </div>

      </div>

    </section>

  );

}