import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";
import DashboardCharts from "@/components/DashboardCharts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  const products = await Product.find().lean();

  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum: number, p: any) => sum + (p.stock || 0),
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Analytics</h2>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Total Products</p>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Total Stock</p>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white p-6 shadow rounded">
        <DashboardCharts data={categoryData} />
      </div>
    </div>
  );
}
