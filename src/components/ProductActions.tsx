"use client";

import Link from "next/link";

export default function ProductActions({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href={`/products/${id}/edit`}
        className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium"
      >
        Edit
      </Link>

      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 hover:underline text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}
