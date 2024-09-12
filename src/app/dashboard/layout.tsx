export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-center font-bold py-2">Dashboard</h1>
      {children}
    </div>
  );
}
