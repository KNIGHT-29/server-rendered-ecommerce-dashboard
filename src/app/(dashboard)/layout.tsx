export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
