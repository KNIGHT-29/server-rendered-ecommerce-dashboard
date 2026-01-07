import { connectDB } from "@/lib/db";
import Product from "@/models/product.model";
import Link from "next/link";
import ProductActions from "@/components/ProductActions";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="card">
      {/* HEADER */}
      <div className="card-header flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Products
        </h2>

        <Link
          href="/products/create"
          className="btn btn-primary"
        >
          + Create Product
        </Link>
      </div>

      {/* BODY */}
      <div className="card-body">
        {products.length === 0 && (
          <p className="text-slate-500 text-sm">
            No products found.
          </p>
        )}

        {products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="th">Image</th>
                  <th className="th">Name</th>
                  <th className="th">SKU</th>
                  <th className="th">Price</th>
                  <th className="th">Stock</th>
                  <th className="th">Category</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product: any) => (
                  <tr key={product._id.toString()}>
                    {/* IMAGE */}
                    <td className="td">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover border border-slate-200"
                        />
                      ) : (
                        <span className="text-slate-400 text-sm">
                          No image
                        </span>
                      )}
                    </td>

                    <td className="td font-medium">
                      {product.name}
                    </td>

                    <td className="td text-slate-600">
                      {product.sku}
                    </td>

                    <td className="td">
                      ₹{product.price}
                    </td>

                    <td className="td">
                      {product.stock}
                    </td>

                    <td className="td">
                      {product.category}
                    </td>

                    {/* ACTIONS */}
                    <td className="td">
                      <ProductActions
                        id={product._id.toString()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
