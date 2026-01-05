"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { productSchema } from "@/utils/product.schema";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        setError("Failed to load product");
        return;
      }

      const product = await res.json();

      (
        document.querySelector("input[name='name']") as HTMLInputElement
      ).value = product.name;
      (
        document.querySelector("input[name='sku']") as HTMLInputElement
      ).value = product.sku;
      (
        document.querySelector("input[name='price']") as HTMLInputElement
      ).value = product.price;
      (
        document.querySelector("input[name='stock']") as HTMLInputElement
      ).value = product.stock;
      (
        document.querySelector("input[name='category']") as HTMLInputElement
      ).value = product.category;
      (
        document.querySelector("textarea[name='description']") as HTMLTextAreaElement
      ).value = product.description || "";

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

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
      setError(parsed.error.issues[0].message); // ✅ FIXED
      return;
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      setError("Failed to update product");
      return;
    }

    router.push("/products");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" className="input" required />
        <input name="sku" placeholder="SKU" className="input" required />
        <input name="price" type="number" placeholder="Price" className="input" required />
        <input name="stock" type="number" placeholder="Stock" className="input" required />
        <input name="category" placeholder="Category" className="input" required />
        <textarea name="description" placeholder="Description" className="input" />

        <button className="bg-black text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
