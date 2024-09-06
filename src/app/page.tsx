import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <Image
        src="/Banner-ST-01.jpg"
        alt="Description of image"
        className="rounded p-2 mx-auto"
        width={400}
        height={230}
      />
    </main>
  );
}
