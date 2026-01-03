import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();

  let imageUrl = "";

  const image = formData.get("image") as File | null;

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    imageUrl = uploadResult.secure_url;
  }

  const product = await Product.create({
    name: formData.get("name"),
    sku: formData.get("sku"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    category: formData.get("category"),
    description: formData.get("description"),
    image: imageUrl,
  });

  return NextResponse.json(product, { status: 201 });
}
