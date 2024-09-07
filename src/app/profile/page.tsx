import { FaUser } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <div className="w-full h-full p-2">
      <FaUser className="mx-auto rounded-full text-6xl my-4 text-center" />
      <ul className="flex flex-col justify-center items-center gap-3 text-center text-black">
        <li className="rounded-md bg-slate-200 p-2 w-full">Setting</li>
        <li className="rounded-md bg-slate-200 p-2 w-full">Dark Mode</li>
        <li className="rounded-md bg-slate-200 p-2 w-full">Setting</li>
        <li className="rounded-md bg-slate-200 p-2 w-full">Dark Mode</li>
        <li className="rounded-md bg-slate-200 p-2 w-full">Setting</li>
        <li className="rounded-md bg-slate-200 p-2 w-full">Dark Mode</li>
      </ul>
    </div>
  );
}
