export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex gap-6">
  <a href="/dashboard" className="font-semibold">
    Dashboard
  </a>
  <a href="/products" className="font-semibold">
    Products
  </a>
</nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
