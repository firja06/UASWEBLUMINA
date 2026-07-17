"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Movie={
  id:number;
  title:string;
  image:string;
  category:string;
  year:number;
  rating:number;
};

export default function SearchDropdown({
  keyword,
}:{keyword:string}){

  const [movies,setMovies]=useState<Movie[]>([]);
  const [loading,setLoading]=useState(false);
  const [open,setOpen]=useState(false);

  const wrapperRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{

    function handleClickOutside(e:MouseEvent){

      if(
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ){

        setOpen(false);

      }

    }

    document.addEventListener("mousedown",handleClickOutside);

    return()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  },[]);

  useEffect(()=>{

     const text=keyword.trim();

    if(text.length<2){

      setMovies([]);
      setOpen(false);

      return;

    }

    const timer=setTimeout(async()=>{

      setLoading(true);

      try{

        const res=await fetch(`/api/movies?q=${keyword}`);

        const data=await res.json();

        setMovies(data);

        setOpen(true);

      }catch(err){

        console.log(err);

      }

      setLoading(false);

    },300);

    return()=>clearTimeout(timer);

  },[keyword]);

  if(keyword.trim()==="") return null;

  return(

    <div
        ref={wrapperRef}
        className="absolute left-0 right-0 mt-3 z-50"
        >

        {open&&(

        <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl max-h-[420px] overflow-y-auto">

          {loading&&(

            <div className="py-8 text-center text-zinc-400">

              Mencari film...

            </div>

          )}

          {!loading&&movies.length===0&&(

            <div className="py-8 text-center text-zinc-500">

              Film tidak ditemukan

            </div>

          )}

          {!loading&&movies.slice(0,5).map(movie=>(

            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              onClick={()=>setOpen(false)}
            >

              <div className="mx-2 my-1 flex items-center gap-4 rounded-xl px-4 py-3 hover:bg-violet-500/15 transition cursor-pointer">
                <img
                  src={movie.image}
                  alt={movie.title}
                 className="w-16 h-24 rounded-xl object-cover shadow-md"
                />

                <div className="flex-1">

                  <h3 className="font-bold text-white text-lg">

                    {movie.title}

                  </h3>

                  <p className="text-sm text-zinc-400">

                    {movie.category} • {movie.year}

                  </p>

                </div>

                {movies.length>5&&(

                <div className="py-4 text-center text-violet-400 font-semibold border-t border-zinc-700">

                Masih ada {movies.length-5} film lainnya...

                </div>

                )}

                <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-full">

                  <span className="text-yellow-400">

                    ⭐

                  </span>

                  <span className="font-semibold">

                    {movie.rating}

                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>

  );

}