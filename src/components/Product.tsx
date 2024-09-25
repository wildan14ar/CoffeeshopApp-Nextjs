import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const Product: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-row h-[95px] p-2 gap-2 bg-zinc-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 items-stretch">
      {/* Image */}
      <img
        src={product.image_url}
        alt={product.name}
        className="h-full object-cover rounded w-1/5"
      />
      {/* Product details */}
      <div className="flex flex-col w-4/5 gap-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        {/* Icons */}
        <h3>{product.base_price}</h3>
      </div>
    </div>
  );
};

export default Product;
