import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    console.log("REGISTER API DIPANGGIL");

    const { name, email, password } = await req.json();

    console.log(name, email);

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?)",
      [name, email, hash]
    );

    return NextResponse.json({
      success: true,
      message: "Register berhasil",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
      message: String(err),
    });
  }
}