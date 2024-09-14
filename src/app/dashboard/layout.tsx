import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-row gap-5 items-start">
      <ul className="flex flex-col gap-3 font-bold w-1/5 p-6">
        <Link href="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link href="/dashboard/products">
          <li>Products</li>
        </Link>
        <Link href="/dashboard/orders">
          <li>Orders</li>
        </Link>
      </ul>
      <div className="w-4/5 p-6">{children}</div>
    </div>
  );
}
