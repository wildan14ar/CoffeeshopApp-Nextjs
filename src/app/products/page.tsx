import Product from "@/components/Product";
import { products } from "@/sample";

export default function ProductsPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <ul className="flex flex-row border-b-2 border-slate-200 p-2 justify-around items-center">
        <li>Menu</li>
        <li>Featured</li>
        <li>Previous</li>
        <li>Favorites</li>
      </ul>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overscroll-y-auto">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
