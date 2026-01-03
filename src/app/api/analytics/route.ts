import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";

export async function GET() {
  await connectDB();

  const products = await Product.find().lean();

  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, p: any) => sum + (p.stock || 0),
    0
  );

  const categoryMap: Record<string, number> = {};

  products.forEach((p: any) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return NextResponse.json({
    totalProducts,
    totalStock,
    categoryData,
  });
}
