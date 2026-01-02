import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import Admin from "@/models/admin.model";

async function seed() {
  await connectDB();

  const exists = await Admin.findOne({ email: "admin@example.com" });
  if (exists) {
    console.log("Admin already exists");
    return;
  }

  const hashed = await bcrypt.hash("Admin@123", 10);

  await Admin.create({
    email: "admin@example.com",
    password: hashed,
    role: "super-admin",
  });

  console.log("Dummy admin created");
}

seed();
