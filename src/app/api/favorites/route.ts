import { NextResponse } from "next/server";
import db from "@/lib/db";

// =======================
// Cek Favorite
// =======================

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const user_id = searchParams.get("user_id");
  const movie_id = searchParams.get("movie_id");

  // Untuk cek satu movie
  if (movie_id) {

    const [rows]: any = await db.query(

      "SELECT * FROM favorites WHERE user_id=? AND movie_id=?",

      [user_id, movie_id]

    );

    return NextResponse.json({
      favorite: rows.length > 0,
    });

  }

  // Untuk halaman Favorite
  const [rows]: any = await db.query(

    `
    SELECT
      movies.*,
      categories.name AS category

    FROM favorites

    JOIN movies
      ON favorites.movie_id = movies.id

    LEFT JOIN categories
      ON movies.category_id = categories.id

    WHERE favorites.user_id=?

    ORDER BY favorites.id DESC
    `,

    [user_id]

  );

  return NextResponse.json(rows);

}

// =======================
// Tambah Favorite
// =======================

export async function POST(req: Request) {

  try {

    const {
      user_id,
      movie_id,
    } = await req.json();

    const [rows]: any = await db.query(

      "SELECT * FROM favorites WHERE user_id=? AND movie_id=?",

      [user_id, movie_id]

    );

    if (rows.length > 0) {

      return NextResponse.json({

        success: true,
        favorite: true,

      });

    }

    await db.query(

      "INSERT INTO favorites(user_id,movie_id) VALUES(?,?)",

      [user_id, movie_id]

    );

    return NextResponse.json({

      success: true,
      favorite: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

    });

  }

}

// =======================
// Hapus Favorite
// =======================

export async function DELETE(req: Request) {

  const {
    user_id,
    movie_id,
  } = await req.json();

  await db.query(

    "DELETE FROM favorites WHERE user_id=? AND movie_id=?",

    [user_id, movie_id]

  );

  return NextResponse.json({

    success: true,

  });

}