import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // 🔥 REQUIRED IN NEXT 15+
  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const body = await req.json();

  const { id } = await context.params;

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
