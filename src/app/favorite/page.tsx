"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import MovieCard from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  year: number;
  rating: number;
  category: string;
};

export default function FavoritePage() {

  const router = useRouter();
  const { user } = useUser();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      getFavorites();
    } else {
      setLoading(false);
    }

  }, [user]);

  async function getFavorites() {

    const res = await fetch(
      `/api/favorites?user_id=${user?.id}`
    );

    const data = await res.json();

    setMovies(data);

    setLoading(false);

  }

  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white">

      {/* Tombol X */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full bg-zinc-900 hover:bg-violet-600 border border-zinc-700 transition flex items-center justify-center text-2xl">
        ✕
      </button>

      {/* Sama seperti Home */}
      <section className="py-10 md:py-14">

        <div className="w-full px-4 md:px-10 lg:px-16">

          <h1 className="text-2xl md:text-4xl font-black mb-6 md:mb-10">

            ❤️ My Favorite Movie
          </h1>

          {movies.length === 0 ? (

            <div className="bg-zinc-900 rounded-2xl p-6 md:p-12 text-center">

              <h2 className="text-xl md:text-2xl font-bold mb-3">

                Belum ada film favorit

              </h2>

              <p className="text-sm md:text-base text-zinc-400">

                Tambahkan film favoritmu dari halaman Detail Movie.

              </p>

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

    </div>

  );

}