import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";
import Link from "next/link";
import ProductActions from "@/components/ProductActions";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {/* CREATE PRODUCT BUTTON */}
      <div className="mb-4">
        <Link
          href="/products/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Product
        </Link>
      </div>

      {products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      {products.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">SKU</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product: any) => (
                <tr key={product._id.toString()} className="border-t">
                  {/* IMAGE */}
                  <td className="p-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </td>

                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.category}</td>

                  {/* ACTIONS (CLIENT COMPONENT) */}
                  <td className="p-3">
                    <ProductActions id={product._id.toString()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
