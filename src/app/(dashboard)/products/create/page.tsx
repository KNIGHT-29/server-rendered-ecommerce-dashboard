"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/utils/product.schema";

export default function CreateProductPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      sku: formData.get("sku"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: formData.get("category"),
      description: formData.get("description"),
    };

    const parsed = productSchema.safeParse(data);

    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      setError("Failed to create product");
      return;
    }

    router.push("/products");
  }

  return (
    <div className="max-w-xl bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" className="input" required />
        <input name="sku" placeholder="SKU" className="input" required />
        <input name="price" type="number" placeholder="Price" className="input" required />
        <input name="stock" type="number" placeholder="Stock" className="input" required />
        <input name="category" placeholder="Category" className="input" required />
        <textarea name="description" placeholder="Description" className="input" />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
}
