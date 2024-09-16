import BannerCarousel from "@/components/BannerCarousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col sticky top-0 md:hidden p-2 border-b-2 border-stink-900 z-10 gap-2 bg-black">
        <div className="flex flex-col gap-1 text-xl font-bold justify-start">
          <h2>Good morning Guest</h2>
        </div>
        <ul className="flex flex-row justify-around items-center">
          <Link href="/dashboard">Profile</Link>
          <li>Inbox</li>
          <li>E-Code</li>
        </ul>
      </div>
      <div className="flex flex-row justify-between px-2 pt-2">
        <h4 className="text-sm">Programs and Promotions</h4>
        <Link href="/programs" className="text-sm font-bold">See All</Link>
      </div>
      <BannerCarousel />
    </main>
  );
}
