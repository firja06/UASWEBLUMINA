import { NextResponse } from "next/server";
import db from "@/lib/db";

// ==========================
// GET REVIEWS
// ==========================

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const movie_id = searchParams.get("movie_id");

    if (!movie_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie ID wajib diisi",
        },
        { status: 400 }
      );
    }

    // Semua review movie
    const [reviews]: any = await db.query(
      `
      SELECT
        reviews.id,
        reviews.user_id,
        reviews.movie_id,
        reviews.rating,
        reviews.review,
        reviews.created_at,
        users.name

      FROM reviews

      INNER JOIN users
      ON reviews.user_id = users.id

      WHERE reviews.movie_id=?

      ORDER BY reviews.created_at DESC
      `,
      [movie_id]
    );

    // Rata-rata rating
    const [avg]: any = await db.query(
      `
      SELECT
        AVG(rating) AS average_rating,
        COUNT(*) AS total_reviews

      FROM reviews

      WHERE movie_id=?
      `,
      [movie_id]
    );

    return NextResponse.json({
      reviews,
      average: Number(avg[0].average_rating ?? 0),
      total: Number(avg[0].total_reviews ?? 0),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

// ==========================
// ADD / UPDATE REVIEW
// ==========================

export async function POST(req: Request) {
  try {
    const {
      user_id,
      movie_id,
      rating,
      review,
    } = await req.json();

    // Cek apakah user sudah pernah review
    const [rows]: any = await db.query(
      `
      SELECT id

      FROM reviews

      WHERE user_id=?
      AND movie_id=?
      `,
      [user_id, movie_id]
    );

    // Kalau sudah ada → UPDATE
    if (rows.length > 0) {
      await db.query(
        `
        UPDATE reviews

        SET
          rating=?,
          review=?

        WHERE
          user_id=?
          AND movie_id=?
        `,
        [
          rating,
          review,
          user_id,
          movie_id,
        ]
      );

      return NextResponse.json({
        success: true,
        message: "Review berhasil diperbarui",
      });
    }

    // Kalau belum ada → INSERT
    await db.query(
      `
      INSERT INTO reviews
      (
        user_id,
        movie_id,
        rating,
        review
      )

      VALUES
      (?,?,?,?)
      `,
      [
        user_id,
        movie_id,
        rating,
        review,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Review berhasil ditambahkan",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

/// ==========================
// DELETE REVIEW
// ==========================

export async function DELETE(req: Request) {
  try {

    const {
      user_id,
      movie_id,
    } = await req.json();

    await db.query(
      `
      DELETE FROM reviews

      WHERE
        user_id=?
        AND movie_id=?
      `,
      [
        user_id,
        movie_id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Review berhasil dihapus",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }
}