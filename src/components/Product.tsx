import React from "react";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai"; // Example icons

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
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-16 h-16 object-cover rounded-full"
        />
      </div>

      {/* Product details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 text-gray-400">
        <AiOutlineHeart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
        <AiOutlinePlus className="w-5 h-5 hover:text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default Product;
