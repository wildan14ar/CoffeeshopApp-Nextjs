import { FaUser } from "react-icons/fa";
import { ButtonThemeBox } from "@/components/atoms/ButtonTheme";
import BackButton from "@/components/atoms/ButtonBack";
import ButtonLogout from "@/components/atoms/ButtonLogout";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-1 text-xl font-bold sticky top-0 justify-start p-2 md:hidden border-b-2 border-stink-900 z-10 bg-white dark:bg-black">
        <BackButton />
        <h2>Dashboard</h2>
      </div>
      <FaUser className="mx-auto rounded-full text-6xl my-4 text-center" />
      <ul className="flex flex-col justify-center items-center gap-3 px-3 text-center text-black">
        <li className="rounded bg-slate-200 p-2 w-full">
          Transaction History
        </li>
        <Link href="/profile" className="rounded bg-slate-200 p-2 w-full">
          Personal
        </Link>
        <li className="rounded bg-slate-200 p-2 w-full">Setting</li>
        <ButtonThemeBox />
        <ButtonLogout />
      </ul>
    </div>
  );
}
