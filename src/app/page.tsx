import Product from '@/components/Product';
import { products } from '@/sample';
import Carousel from '@/components/Carousel';

export default function HomePage() {
  return (
    <main>
      <Carousel />
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
    </main>
  );
}
