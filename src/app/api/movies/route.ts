import { NextResponse } from "next/server";
import db from "@/lib/db";

// ======================
// GET ALL MOVIES
// ======================

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");

    const q = searchParams.get("q");

    let sql = `
      SELECT
        movies.*,
        categories.name AS category
      FROM movies
      LEFT JOIN categories
      ON movies.category_id = categories.id
    `;

    const params: any[] = [];

    // Search + Type
    if (type && q) {

      sql += `
        WHERE movies.type=?
        AND movies.title LIKE ?
      `;

      params.push(type);
      params.push(`%${q}%`);

    }

    // Search saja
    else if (q) {

      sql += `
        WHERE movies.title LIKE ?
      `;

      params.push(`%${q}%`);

    }

    // Type saja
    else if (type) {

      sql += `
        WHERE movies.type=?
      `;

      params.push(type);

    }

    sql += `
      ORDER BY movies.id DESC
    `;

    const [rows]: any = await db.query(sql, params);

    return NextResponse.json(rows);

  } catch (error) {

    console.log(error);

    return NextResponse.json([]);

  }

}

// ======================
// ADD MOVIE
// ======================

export async function POST(req: Request) {

  try {

    const {

      title,
      description,
      image,
      year,
      rating,
      trailer,
      category_id,
      type,

    } = await req.json();

    await db.query(

      `
      INSERT INTO movies
      (
        title,
        description,
        image,
        year,
        rating,
        trailer,
        category_id,
        type
      )
      VALUES (?,?,?,?,?,?,?,?)
      `,

      [

        title,
        description,
        image,
        year,
        rating,
        trailer,
        category_id,
        type ?? "trending",

      ]

    );

    return NextResponse.json({

      success: true,

      message: "Movie berhasil ditambahkan",

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