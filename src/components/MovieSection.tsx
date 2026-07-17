"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "./MovieCard";

type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  year: number;
  rating: number;
  category: string;
};

type MovieSectionProps = {
  title: string;
  type: string;
};

export default function MovieSection({
  title,
  type,
}: MovieSectionProps) {

  const searchParams = useSearchParams();

  const keyword = searchParams.get("search") || "";

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {

    getMovies();

  }, [type, keyword]);

  async function getMovies() {

    let url = `/api/movies?type=${type}`;

    if (type === "search") {

    url = `/api/movies?q=${keyword}`;

    }

    else if (keyword) {

    url = `/api/movies?type=${type}&q=${keyword}`;

    }

    const res = await fetch(url);

    const data = await res.json();

    setMovies(data);

  }

  return (

    <section
    id={type}
    className={`${
    type === "search"? "pt-24 md:pt-32 pb-10 md:pb-14": "py-6 md:py-10"}`}
    >

      <div className="w-full px-4 md:px-10 lg:px-16">

        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">

          {keyword
            ? `Hasil Pencarian : "${keyword}"`
            : title}

        </h2>

        {movies.length === 0 ? (

          <div className="bg-zinc-900 rounded-2xl p-6 md:p-10 text-center text-zinc-400">

            Film tidak ditemukan.

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">

            {movies.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </div>

        )}

      </div>

    </section>

  );

}