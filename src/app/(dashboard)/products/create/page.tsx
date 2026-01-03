"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData, // IMPORTANT: multipart/form-data
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
        <input
          name="name"
          placeholder="Product Name"
          className="input"
          required
        />

        <input
          name="sku"
          placeholder="SKU"
          className="input"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="input"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="input"
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="input"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="input"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
}
