"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  year: number;
  rating: number;
  category: string;
  trailer: string | null;
};

type Review = {
  id: number;
  user_id: number;
  name: string;
  rating: number;
  review: string;
  created_at: string;
};

export default function MovieDetailPage() {

  const router = useRouter();
  const params = useParams();

  const { user } = useUser();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [favorite, setFavorite] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);

  const [review, setReview] = useState("");

  const [rating, setRating] = useState(0);

  const [averageRating, setAverageRating] = useState(0);

  const [totalReviews, setTotalReviews] = useState(0);

  const [selectedReview, setSelectedReview] = useState<number | null>(null);

  useEffect(() => {

    getMovie();

    getReviews();

  }, []);

  useEffect(() => {

    if (movie && user) {

      checkFavorite();

    }

  }, [movie, user]);

  async function getMovie() {

    const res = await fetch(`/api/movies/${params.id}`);

    const data = await res.json();

    setMovie(data);

  }

  async function checkFavorite() {

    const res = await fetch(
      `/api/favorites?user_id=${user?.id}&movie_id=${params.id}`
    );

    const data = await res.json();

    setFavorite(data.favorite);

  }

  async function getReviews() {

    const res = await fetch(
      `/api/reviews?movie_id=${params.id}`
    );

    const data = await res.json();

    setReviews(data.reviews);

    setAverageRating(data.average);

    setTotalReviews(data.total);

  }

  async function addFavorite() {

    if (!user) {

       toast.error("Silakan login terlebih dahulu");

      return;

    }

    if (favorite) {

      await fetch("/api/favorites", {

        method: "DELETE",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          user_id: user.id,

          movie_id: movie?.id,

        }),

      });

      setFavorite(false);

      return;

    }

    const res = await fetch("/api/favorites", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        user_id: user.id,

        movie_id: movie?.id,

      }),

    });

    const data = await res.json();

    if (data.success) {

      setFavorite(true);

    }

  }

  async function submitReview() {

    if (!user) {

      toast.error("Silakan login terlebih dahulu");

      return;

    }

    if (rating === 0) {

      toast.error("Pilih rating terlebih dahulu");

      return;

    }

    const res = await fetch("/api/reviews", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        user_id: user.id,

        movie_id: movie?.id,

        rating,

        review,

      }),

    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      setReview("");
      setRating(0);
      getReviews();
    } 
  else {
    toast.error(data.message);
    }
  }

  async function deleteReview() {

    if (!user) return;

    const res = await fetch("/api/reviews", {

      method: "DELETE",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        user_id: user.id,

        movie_id: movie?.id,

      }),

    });

    const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setSelectedReview(null);
        setReview("");
        setRating(0);
        getReviews();
    }     
      else {
        toast.error(data.message);
      }

  }

  if (!movie) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">

        Loading...

      </div>

    );

  }

    return (

    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">

        {/* Tombol Kembali */}

        <button
          onClick={() => router.back()}
          className="fixed top-5 left-4 md:top-8 md:left-8 z-50 w-12 h-12 rounded-full bg-zinc-900 hover:bg-violet-600 border border-zinc-700 flex items-center justify-center text-2xl"
        >
          ✕
        </button>

       <div className="grid lg:grid-cols-2 gap-8 md:gap-16">

          {/* Poster */}

          <div>

            <img
              src={movie.image}
              alt={movie.title}
             className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-3xl border border-zinc-800 shadow-2xl"
            />

          </div>

          {/* Detail */}

          <div>

            <span className="text-violet-400 uppercase tracking-widest font-semibold">

              {movie.category}

            </span>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black mt-3">

              {movie.title}

            </h1>

            <div className="flex flex-wrap gap-4 mt-6 md:mt-8">

              <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">

                ⭐ {averageRating > 0 ? averageRating.toFixed(1) : movie.rating}

              </span>

              <span className="bg-zinc-800 px-5 py-2 rounded-full">

                {movie.year}

              </span>

            </div>

            <p className="text-zinc-300 text-base md:text-lg leading-7 md:leading-8 mt-10">

              {movie.description}

            </p>

            {/* Tombol */}

           <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">

              <button
                onClick={addFavorite}
                className={`px-8 py-4 rounded-xl font-semibold ${
                  favorite
                    ? "bg-green-600"
                    : "bg-violet-600"
                }`}
              >

                {favorite ? "❤️ Favorite" : "🤍 Favorite"}

              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("trailer")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="bg-zinc-800 px-8 py-4 rounded-xl font-semibold"
              >

                ▶ Watch Trailer

              </button>

            </div>
                        {/* Trailer */}

            <div
              id="trailer"
              className="mt-14 md:mt-20"
            >

              <h2 className="text-3xl font-bold mb-6">
                🎬 Official Trailer
              </h2>

              {movie.trailer ? (

                <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">

                  <iframe
                    src={movie.trailer}
                    title={movie.title}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                </div>

              ) : (

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl h-72 flex items-center justify-center text-zinc-500">

                  Trailer belum tersedia

                </div>

              )}

            </div>

            {/* Reviews */}

            <div className="mt-20">

              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                📝 Reviews
              </h2>

              {/* Rating */}

              <div className="flex gap-2 mb-6">

                {[1,2,3,4,5].map((star)=>(

                  <button
                    key={star}
                    type="button"
                    onClick={()=>setRating(star)}
                  >

                    <FaStar
                      size={24}
                      color={
                        rating >= star
                          ? "#facc15"
                          : "#52525b"
                      }
                    />

                  </button>

                ))}

              </div>

              {/* Form Review */}

              <textarea
                rows={5}
                value={review}
                onChange={(e)=>setReview(e.target.value)}
                placeholder="Bagikan pendapatmu tentang film ini..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-5 outline-none resize-none focus:border-violet-500"
              />

              <div className="mt-5">

                <button
                  onClick={submitReview}
                  className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl font-semibold"
                >
                  Submit Review
                </button>

              </div>
                            {/* Daftar Review */}

              <div className="space-y-6 mt-10">

                {reviews.length === 0 ? (

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">

                    <h3 className="text-xl font-semibold">
                      Belum ada review
                    </h3>

                    <p className="text-zinc-500 mt-2">
                      Jadilah pengguna pertama yang memberikan review.
                    </p>

                  </div>

                ) : (

                  reviews.map((item) => (

                    <div
                      key={item.id}
                      onClick={() => {
                        if (user?.id === item.user_id) {
                          setSelectedReview(item.id);
                        } else {
                          setSelectedReview(null);
                        }
                      }}
                      className={`bg-zinc-900 rounded-2xl border p-4 md:p-6 cursor-pointer ${
                        selectedReview === item.id
                          ? "border-red-500"
                          : "border-zinc-800"
                      }`}
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-bold text-violet-400">
                            {item.name}
                          </h3>

                          <p className="text-zinc-500 text-sm">
                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                          </p>

                        </div>

                        <div className="flex gap-1">

                          {[1,2,3,4,5].map((star)=>(
                            <FaStar
                              key={star}
                              size={18}
                              color={
                                item.rating >= star
                                  ? "#facc15"
                                  : "#52525b"
                              }
                            />
                          ))}

                        </div>

                      </div>

                      <p className="text-zinc-300 mt-5 leading-7">
                        {item.review}
                      </p>

                      {selectedReview === item.id &&
                        user?.id === item.user_id && (

                        <div className="mt-5">

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteReview();
                            }}
                            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold"
                          >
                            Hapus Review
                          </button>

                        </div>

                      )}

                    </div>

                  ))

                )}

              </div>
              </div>

          </div> 

        </div> 
      </div> 
    </div> 

  );

}