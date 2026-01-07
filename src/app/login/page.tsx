"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Invalid credentials");
      setLoading(false);
      return;
    }

    // HARD REDIRECT (correct for cookie-based auth)
    window.location.href = "/products";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       text-sm text-slate-800 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       text-sm text-slate-800 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 text-white py-2
                       text-sm font-medium hover:bg-indigo-700
                       disabled:opacity-60 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
