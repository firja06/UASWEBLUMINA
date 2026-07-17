"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import toast from "react-hot-toast";

type Category = {
  id: number;
  name: string;
};

export default function AddMoviePage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [trailer, setTrailer] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function getCategory() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    getCategory();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        image,
        year,
        rating,
        trailer,
        category_id: category,
      }),
    });

    const data = await res.json();

    if (data.success) {

    toast.success(data.message);

    setTimeout(() => {
    router.push("/admin/movies");
    }, 500);

    } else {

    toast.error(data.message);

}
  }

  return (
    <AdminGuard>

      <div className="min-h-screen bg-black text-white">

        {/* Close */}

        <button
          type="button"
          onClick={() => router.push("/admin/movies")}
          className="fixed top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900 hover:bg-violet-600 transition flex items-center justify-center text-xl md:text-2xl z-50"
        >
          ✕
        </button>

        <div className="max-w-2xl mx-auto py-14 px-4 md:px-0">

          <h1 className="text-4xl font-bold text-violet-500 mb-10">
            Add Movie
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 md:space-y-4">

            <input
              placeholder="Title"
              className="w-full bg-zinc-900 p-3 md:p-4 rounded-xl text-base"
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>

            <textarea
              rows={2}
              placeholder="Description"
              className="w-full bg-zinc-900 p-5 md:p-5 rounded-xl text-base resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}/>

            <input
              placeholder="/posters/movie.jpg"
              className="w-full bg-zinc-900 p-3 md:p-4 rounded-xl text-base"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <input
              placeholder="Year"
              className="w-full bg-zinc-900 p-3 md:p-4 rounded-xl text-base"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <input
              placeholder="Rating"
              className="w-full bg-zinc-900 p-3 md:p-4 rounded-xl text-base"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <input
              placeholder="YouTube Trailer Embed"
              className="w-full bg-zinc-900 p-3 md:p-4 rounded-xl text-base"
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
            />

            <select
              className="w-full bg-zinc-900 p-3 md:p-4 rounded-xl text-base"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <div className="flex flex-col md:flex-row gap-4">

              <button
                type="submit"
                className="w-full md:w-auto bg-violet-600 hover:bg-violet-700 px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base">
                Save Movie
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/movies")}
                className="w-full md:w-auto bg-zinc-700 hover:bg-zinc-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base">
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </AdminGuard>
  );
}