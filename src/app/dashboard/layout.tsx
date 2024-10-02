"use client";

import Link from "next/link";
import { ButtonThemeBox } from "@/components/atoms/ButtonTheme";
import { useSession } from "next-auth/react";
import ButtonLogout from "@/components/atoms/ButtonLogout";
import Loader from "@/components/atoms/Loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // If the session is still loading
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/5 bg-slate-900 p-6">
        <Link href="/">
          <div className="font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 p-4 mx-[-6] my-3 rounded-t-md text-center text-3xl">
            <h2>Vapmart</h2>
          </div>
        </Link>
        <ul className="space-y-4 bg-slate-800">
          <Link href="/dashboard">
            <li className="text-white text-lg hover:bg-slate-700 p-3 rounded-lg transition duration-200 cursor-pointer">
              Dashboard
            </li>
          </Link>

          {session?.user?.role === "ADMIN" && (
            <>
              <Link href="/dashboard/product">
                <li className="text-white text-lg hover:bg-slate-700 p-3 rounded-lg transition duration-200 cursor-pointer">
                  Products
                </li>
              </Link>
              <Link href="/dashboard/order">
                <li className="text-white text-lg hover:bg-slate-700 p-3 rounded-lg transition duration-200 cursor-pointer">
                  Orders
                </li>
              </Link>
            </>
          )}

          {session?.user?.role === "MANAGER" && (
            <>
              <Link href="/dashboard/user">
                <li className="text-white text-lg hover:bg-slate-700 p-3 rounded-lg transition duration-200 cursor-pointer">
                  Users
                </li>
              </Link>
              <Link href="/dashboard/blog">
                <li className="text-white text-lg hover:bg-slate-700 p-3 rounded-lg transition duration-200 cursor-pointer">
                  Blogs
                </li>
              </Link>
            </>
          )}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <ButtonThemeBox />
          <ButtonLogout />
        </div>
      </aside>

      {/* Content */}
      <div className="w-full md:w-4/5 overflow-y-auto p-5">{children}</div>
    </div>
  );
}
