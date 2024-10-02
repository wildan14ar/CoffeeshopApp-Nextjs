"use client";

import { FaUser } from "react-icons/fa";
import { ButtonThemeBox } from "@/components/atoms/ButtonTheme";
import HeadingPhone from "@/components/atoms/HeadingPhone";
import ButtonLogout from "@/components/atoms/ButtonLogout";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loader from "@/components/atoms/Loader";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // If the session is still loading
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="w-full h-full">
      <HeadingPhone name="Dashboard" />
      <div className="my-5 text-center flex flex-col justify-center items-center gap-2 font-bold">
        <FaUser className="text-6xl rounded-full" />
        <h1 className="text-xl">{session.user.email}</h1>
      </div>
      <ul className="flex flex-col justify-center items-center gap-3 px-3 text-center font-bold text-black">
        <Link
          href="/dashboard/profile"
          className="rounded bg-purple-500 p-2 w-full text-white"
        >
          Personal
        </Link>
        {session.user.role === "MEMBER" && (
          <Link
            href="/"
            className="rounded bg-purple-500 p-2 w-full text-white"
          >
            Transaction History
          </Link>
        )}
        {session.user.role === "ADMIN" && (
          <Link
            href="/dashboard"
            className="rounded bg-purple-500 p-2 w-full text-white"
          >
            Admin Dashboard
          </Link>
        )}
        {session.user.role === "MANAGER" && (
          <Link
            href="/dashboard"
            className="rounded bg-purple-500 p-2 w-full text-white"
          >
            Manager Dashboard
          </Link>
        )}
        <li className="rounded bg-purple-500 p-2 w-full text-white">Setting</li>
        <ButtonThemeBox />
        <ButtonLogout />
      </ul>
    </div>
  );
}
