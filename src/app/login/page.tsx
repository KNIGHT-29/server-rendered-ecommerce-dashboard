"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    // ✅ THIS IS THE REDIRECT (CRITICAL)
    router.replace("/products");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input mb-4"
          required
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
