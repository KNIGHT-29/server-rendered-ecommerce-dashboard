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
    <div className="space-x-3">
      <Link
        href={`/products/${id}/edit`}
        className="text-blue-600 hover:underline"
      >
        Edit
      </Link>

      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
