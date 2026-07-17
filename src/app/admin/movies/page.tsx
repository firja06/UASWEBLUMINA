"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import toast from "react-hot-toast";

type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  year: number;
  rating: number;
  category: string;
};

export default function AdminMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function getMovies() {
    const res = await fetch("/api/movies");
    const data = await res.json();

    setMovies(data);
  }

  async function deleteMovie(id: number) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {

  if (!deleteId) return;

  const res = await fetch(`/api/movies/${deleteId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.success) {
    toast.success(data.message);
    getMovies();
  } else {
    toast.error(data.message);
  }

  setShowDeleteModal(false);
  setDeleteId(null);

}

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <AdminGuard>

      <div className="min-h-screen bg-black text-white relative">

        {/* Tombol Close */}
        <Link
          href="/"
          className="fixed top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-800 hover:bg-violet-600 transition flex items-center justify-center text-xl md:text-2xl text-white shadow-lg z-50"
        >
          ✕
        </Link>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8 md:mb-10">

            <h1 className="text-3xl md:text-4xl font-bold text-violet-500">
              Movie Management
            </h1>

            <Link href="/admin/movies/add">
              <button className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl transition w-auto">
                + Add Movie
              </button>
            </Link>

          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-800">

          <table className="w-full text-xs md:text-base">

              <thead className="bg-zinc-900">

                <tr>

                  <th className="p-2 md:p-4 text-left">
                    Poster
                  </th>

                  <th className="text-left">
                    Title
                  </th>

                  <th className="text-left">
                    Genre
                  </th>

                  <th className="hidden md:table-cell text-left">
                    Rating
                  </th>

                  <th className="hidden md:table-cell text-left">
                    Year
                  </th>

                  <th className="text-center">
                    
                  </th>

                </tr>

              </thead>

              <tbody>

                {movies.map((movie) => (

                  <tr
                    key={movie.id}
                    className="border-t border-zinc-800 hover:bg-zinc-900 transition"
                  >

                    <td className="p-2 md:p-4">

                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-12 h-16 md:w-20 md:h-28 object-cover rounded-lg"/>

                      </td>

                    <td className="px-2 md:px-4 font-semibold">

                        <div className="max-w-[90px] md:max-w-none truncate">
                          {movie.title}
                    </div>

                    </td>

                    <td className="table-cell text-violet-400 px-2 md:px-4">
                      {movie.category}
                    </td>

                    <td className="hidden md:table-cell px-2 md:px-4">
                      ⭐ {movie.rating}
                    </td>

                    <td className="hidden md:table-cell">
                          {movie.year}
                    </td>
                    <td className="px-2 md:px-4">

                     <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">

                        <Link href={`/admin/movies/edit/${movie.id}`}>
                        <button className="w-16 md:w-20 bg-blue-600 hover:bg-blue-700 py-1.5 md:py-2 rounded-lg text-[11px] md:text-sm transition">
                        Edit
                    </button>
                    </Link>

                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className="w-16 md:w-20 bg-red-600 hover:bg-red-700 py-1.5 md:py-2 rounded-lg text-[11px] md:text-sm transition">
                      Delete
                  </button>

                </div>

                </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
                {showDeleteModal && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-[90%] max-w-md p-6">

      <h2 className="text-2xl font-bold text-white mb-3">
        Hapus Movie
      </h2>

      <p className="text-zinc-400 mb-8">
        Apakah kamu yakin ingin menghapus movie ini?
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          className="px-5 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition"
        >
          Batal
        </button>

        <button
          onClick={confirmDelete}
          className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
        >
          Hapus
        </button>

      </div>

    </div>

  </div>

)}
    </AdminGuard>
  );
}