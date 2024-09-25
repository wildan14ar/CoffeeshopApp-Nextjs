import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <ul className="w-full lg:w-1/5 bg-slate-900 p-4 space-y-4 lg:space-y-6">
        <Link href="/">
          <li className="text-white text-lg hover:text-gray-400 cursor-pointer">Home</li>
        </Link>
        <Link href="/dashboard/admin">
          <li className="text-white text-lg hover:text-gray-400 cursor-pointer">Dashboard</li>
        </Link>
        <Link href="/dashboard/admin/product">
          <li className="text-white text-lg hover:text-gray-400 cursor-pointer">Blogs</li>
        </Link>
      </ul>
      
      {/* Content */}
      <div className="w-full lg:w-4/5 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
