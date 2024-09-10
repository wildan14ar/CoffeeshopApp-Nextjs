import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="p-2 flex flex-col gap-2">
        <Image src="/latte.jpg" alt="Product Image" className="rounded w-full mx-auto min-h-auto" width={500} height={500} />
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl">Latte</h1>
        <p className="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem temporibus voluptate unde molestias alias eaque perspiciatis quasi tempore accusamus dignissimos, sit deserunt sapiente obcaecati magnam dolore doloremque! Expedita, cumque doloremque?</p>
        <p>Price Product</p>
      </div>
    </div>
  );
}
