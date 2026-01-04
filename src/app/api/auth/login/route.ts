import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/admin.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: admin._id.toString(), role: admin.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({ success: true });

  // ✅ MUST MATCH DASHBOARD + LOGOUT
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
