"use client";

import Link from "next/link";

type MovieProps = {
  movie: {
    id: number;
    title: string;
    description: string;
    image: string;
    year: number;
    rating: number;
    category: string;
  };
};

export default function MovieCard({ movie }: MovieProps) {
  return (
    <Link href={`/movie/${movie.id}`}>

      <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-violet-500 transition cursor-pointer">

        {/* Poster */}

        <div className="relative overflow-hidden">

          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-56 sm:h-72 md:h-80 lg:h-[340px] object-cover"
          />

          {/* Rating */}

          <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs md:text-sm font-bold">

            ⭐ {movie.rating}

          </div>

        </div>

        {/* Content */}

        <div className="p-4 md:p-5">

          <h2 className="text-lg md:text-xl font-bold text-white line-clamp-1">

            {movie.title}

          </h2>

          <p className="text-zinc-400 text-sm mt-2 line-clamp-1 md:line-clamp-2">

            {movie.description}

          </p>

          <div className="flex justify-between items-center mt-4">

            <span className="text-violet-400 text-sm md:text-base font-medium">

              {movie.category}

            </span>

            <span className="text-zinc-500 text-sm">

              {movie.year}

            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}