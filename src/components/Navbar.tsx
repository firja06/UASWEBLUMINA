"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Navbar() {

  const { user, setUser } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {

    setMenuOpen(false);

    setUser(null);

    localStorage.removeItem("user");

    window.location.href = "/";

  }

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">

      <div className="relative w-full px-8 lg:px-14">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
          href="/"
          onClick={() => setMenuOpen(false)}>

            <h1 className="text-4xl font-extrabold text-violet-500 cursor-pointer">

              Lumina

            </h1>

          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex gap-10 text-zinc-300 font-medium">

            <Link
              href="/"
              className="hover:text-violet-400 transition"
            >
              Home
            </Link>

            <Link
              href="/"
              className="hover:text-violet-400 transition"
            >
              Movies
            </Link>

            <Link
              href="/favorite"
              className="hover:text-violet-400 transition"
            >
              Favorite
            </Link>

            {user?.role === "admin" && (

              <Link
                href="/admin/movies"
                className="text-violet-400 hover:text-violet-300 transition"
              >
                Dashboard
              </Link>

            )}

          </div>

          {/* Desktop Right */}

          <div className="hidden md:flex gap-3 items-center">

            {!user ? (

              <>

                <Link href="/login">

                  <button className="px-6 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">

                    Login

                  </button>

                </Link>

                <Link href="/register">

                  <button className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 transition">

                    Register

                  </button>

                </Link>

              </>

            ) : (

              <>

                <span className="text-violet-400">

                  👤 {user.name}

                </span>

                <button
                  onClick={logout}
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                >

                  Logout

                </button>

              </>

            )}

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-12 h-12 rounded-xl bg-zinc-900 hover:bg-violet-600 transition flex items-center justify-center text-2xl"
          >

            {menuOpen ? "✕" : "☰"}

          </button>

        </div>

      </div>
            {/* Mobile Menu */}

      {menuOpen && (
  <div className="absolute top-20 left-0 w-full md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 shadow-2xl">

    <div className="px-5 py-5 space-y-2">

      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="block rounded-xl px-4 py-3 hover:bg-zinc-800 transition"
      >
        🏠 Home
      </Link>

      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="block rounded-xl px-4 py-3 hover:bg-zinc-800 transition"
      >
        🎬 Movies
      </Link>

      <Link
        href="/favorite"
        onClick={() => setMenuOpen(false)}
        className="block rounded-xl px-4 py-3 hover:bg-zinc-800 transition"
      >
        ❤️ Favorite
      </Link>

      {user?.role === "admin" && (
        <Link
          href="/admin/movies"
          onClick={() => setMenuOpen(false)}
          className="block rounded-xl px-4 py-3 text-violet-400 hover:bg-zinc-800 transition"
        >
          🛠 Dashboard
        </Link>
      )}

      <div className="border-t border-zinc-800 my-2"></div>

      {!user ? (
        <>
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
              Login
            </button>
          </Link>

          <Link href="/register" onClick={() => setMenuOpen(false)}>
            <button className="mt-3 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition">
              Register
            </button>
          </Link>
        </>
      ) : (
        <>
          <p className="px-2 text-violet-400">
            👤 {user.name}
          </p>

          <button
            onClick={logout}
            className="mt-3 w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </>
      )}

    </div>

  </div>
)}

    </nav>

  );

}