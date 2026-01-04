import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // cookies() is async in Next.js 15+
  const cookieStore = await cookies();

  // MUST match login cookie name
  const token = cookieStore.get("admin-token");

  // Protect all dashboard routes
  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex gap-6 items-center">
        <a href="/dashboard" className="font-semibold">
          Dashboard
        </a>

        <a href="/products" className="font-semibold">
          Products
        </a>

        <form action="/api/auth/logout" method="POST" className="ml-auto">
          <button
            type="submit"
            className="text-red-600 font-semibold"
          >
            Logout
          </button>
        </form>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
