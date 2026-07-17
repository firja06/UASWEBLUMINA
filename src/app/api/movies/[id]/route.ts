import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET satu movie
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [rows]: any = await db.query(
    `
    SELECT
      movies.*,
      categories.name AS category

    FROM movies

    LEFT JOIN categories
      ON movies.category_id = categories.id

    WHERE movies.id = ?
    `,
    [id]
  );

  return NextResponse.json(rows[0]);
}

// UPDATE movie
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const {
    title,
    description,
    image,
    year,
    rating,
    trailer,
    category_id,
  } = await req.json();

  await db.query(
    `UPDATE movies
     SET title=?,description=?,image=?,year=?,rating=?,trailer=?,category_id=?
     WHERE id=?`,
    [
      title,
      description,
      image,
      year,
      rating,
      trailer,      
      category_id,
      id,
    ]
  );

  return NextResponse.json({
    success:true,
    message:"Movie berhasil diupdate",
  });
}

// DELETE Movie

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  await db.query(

    "DELETE FROM movies WHERE id=?",

    [id]

  );

  return NextResponse.json({

    success:true,

    message:"Movie berhasil dihapus"

  });


}