import { NextResponse } from "next/server";
import db from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // match exactly the form input names
    const name = formData.get("name");
    const email = formData.get("email");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const file = formData.get("image");

    if (!name || !email || !address || !city || !state || !contact) {
      return NextResponse.json({ error: "❌ All fields are required" }, { status: 400 });
    }

    // uploads directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    let filePath = null;
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = Date.now() + "-" + file.name;
      filePath = `/uploads/${fileName}`;
      await writeFile(path.join(uploadDir, fileName), buffer);
    }

    await db.query(
      "INSERT INTO schools (name, email, address, city, state, contact, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, address, city, state, contact, filePath]
    );

    return NextResponse.json({ message: "✅ School added successfully!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "❌ Duplicate entry: school with this email exists" }, { status: 400 });
    }
    console.error("Error adding school:", error);
    return NextResponse.json({ error: "❌ Failed to add school" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const search = searchParams.get("search");

    let sql = "SELECT * FROM schools WHERE 1=1";
    let params = [];

    if (city && city !== "All") {
      sql += " AND city = ?";
      params.push(city);
    }
    if (search) {
      sql += " AND name LIKE ?";
      params.push(`%${search}%`);
    }

    const [rows] = await db.query(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "❌ Failed to fetch schools" }, { status: 500 });
  }
}
