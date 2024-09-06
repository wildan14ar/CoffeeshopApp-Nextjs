import Image from "next/image";
import Product from '@/components/Product';
import { products } from '@/sample';

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
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
    </main>
  );
}
