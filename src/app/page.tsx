import BannerCarousel from "@/components/BannerCarousel";
import MultipleCarousel from "@/components/MultipleCarousel";
import Link from "next/link";
import NewsList from "@/components/NewsList";
import HowtoCarousel from "@/components/HowtoCarousel";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col sticky top-0 md:hidden p-2 border-b-2 border-stink-900 z-10 gap-2 bg-white dark:bg-black">
        <div className="flex flex-col gap-1 text-2xl font-bold justify-start gradient-text">
          <h2 className="gradient-text">Good morning Guest</h2>
        </div>
        <ul className="flex flex-row justify-around items-center">
          <Link href="/dashboard">Profile</Link>
          <li>Inbox</li>
          <li>E-Code</li>
        </ul>
      </div>
      <BannerCarousel />
      <MultipleCarousel />
      <div className="flex flex-col justify-center gap-2 p-2">
        <NewsList int={3} />
        <Link
          href="/blog/news"
          className="border border-2 border-purple-800 rounded-lg text-center"
        >
          See All News
        </Link>
      </div>
      <HowtoCarousel/>
    </main>
  );
}
