"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  async function handleRegister(e:React.FormEvent){

    e.preventDefault();

    if(password!==confirmPassword){
      alert("Password tidak sama");
      return;
    }

    const res=await fetch("/api/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data=await res.json();

    if (data.success) {
    toast.success(data.message);
    } else {
    toast.error(data.message);
}

  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl">

        {/* Close */}
        <Link
          href="/"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-800 hover:bg-violet-600 transition flex items-center justify-center text-xl text-white"
        >
          ✕
        </Link>

        <h1 className="text-4xl font-bold text-center text-violet-500 mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full bg-zinc-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full bg-zinc-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-zinc-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full bg-zinc-800 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 font-semibold transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-zinc-400 mt-6">
          Sudah punya akun?
          <Link
            href="/login"
            className="text-violet-500 ml-2 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}