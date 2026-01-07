import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center">
        <h1 className="text-lg font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <a
          href="/products"
          className="ml-8 text-sm font-medium text-slate-600 hover:text-indigo-600"
        >
          Products
        </a>

        <form action="/api/auth/logout" method="POST" className="ml-auto">
          <button className="btn btn-outline">Logout</button>
        </form>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
