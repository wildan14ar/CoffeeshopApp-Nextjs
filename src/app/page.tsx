import BannerCarousel from "@/components/BannerCarousel";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col sticky top-0 p-2 border-b-2 border-stink-900 bg-black z-10 gap-2">
        <div className="flex flex-col gap-1 text-xl font-bold justify-start">
          <h2>Good morning Guest</h2>
        </div>
        <ul className="flex flex-row justify-around items-center">
          <li>Profile</li>
          <li>Inbox</li>
          <li>E-Code</li>
        </ul>
      </div>
      <BannerCarousel />
    </main>
  );
}
