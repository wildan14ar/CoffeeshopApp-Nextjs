// /app/api/cart/route.js
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

// Secret for JWT token, make sure it's set in your environment variables
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = token.sub;

  // Fetch all carts for the user, grouped by store
  const carts = await prisma.cart.findMany({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: true,
          options: {
            include: {
              optionValue: true // Include option value details
            }
          }
        }
      }
    }
  });

  // Calculate total base price for each cart item including options
  for (const cart of carts) {
    let totalPrice = 0;

    cart.cartItems = await Promise.all(cart.cartItems.map(async (item) => {
      const optionValues = await prisma.productOptionValue.findMany({
        where: {
          id: {
            in: item.options.map(opt => opt.optionValueId)
          }
        },
        select: {
          id: true,
          additional_price: true
        }
      });

      const totalAdditionalPrice = optionValues.reduce((sum, optionValue) => {
        return sum + optionValue.additional_price;
      }, 0);

      const basePrice = item.product.base_price + totalAdditionalPrice;
      const totalBasePrice = basePrice * item.quantity;

      totalPrice += totalBasePrice;

      return {
        ...item,
        totalBasePrice
      };
    }));

    cart.totalPrice = totalPrice; // Add total price to each cart
  }

  return new Response(JSON.stringify(carts), { status: 200 });
}

export async function POST(req) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { productId, quantity = 1, options = [] } = await req.json();
  const userId = token.sub;

  // Find the product based on ID
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      store: true // Include the store relation
    }
  });

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  // Find or create a cart based on userId and storeId
  let cart = await prisma.cart.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId: product.storeId // Get storeId from the product
      }
    }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        storeId: product.storeId // Set storeId when creating the cart
      }
    });
  }

  // Sort the array of options based on optionValueId
  const sortedOptions = [...options].sort((a, b) => a.optionValueId - b.optionValueId);

  // Calculate the total base price
  const basePrice = product.base_price || 0;
  const optionsTotal = sortedOptions.reduce((total, option) => total + (option.additionalPrice || 0), 0);
  const totalBasePrice = (basePrice + optionsTotal) * quantity;

  if (isNaN(totalBasePrice) || totalBasePrice <= 0) {
    return new Response("Invalid totalBasePrice calculation", { status: 400 });
  }

  // Create a new CartItem
  const newCartItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      totalBasePrice,
      options: {
        create: sortedOptions.map(option => ({
          optionValueId: option.optionValueId,
        })),
      },
    },
  });

  return new Response(JSON.stringify(newCartItem), { status: 200 });
}

export async function PATCH(req) {
  try {
    const token = await getToken({ req, secret });

    if (!token || !token.sub) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { cartItemId, productId, quantity } = await req.json();

    if (!productId) {
      return new Response("Product ID is required", { status: 400 });
    }

    if (!cartItemId) {
      return new Response("Cart Item ID is required", { status: 400 });
    }

    if (typeof quantity !== 'number' || quantity < 0) {
      return new Response("Invalid quantity", { status: 400 });
    }

    // Find product to get base_price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    // Calculate total base price
    const basePrice = product.base_price || 0;
    const totalBasePrice = basePrice * quantity;

    if (isNaN(totalBasePrice) || totalBasePrice < 0) {
      return new Response("Invalid totalBasePrice calculation", { status: 400 });
    }

    if (quantity === 0) {
      // Remove item from cart if quantity is 0
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      return new Response("Cart item removed", { status: 200 });
    } else {
      // Update only quantity and total base price of CartItem
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: {
          quantity,
          totalBasePrice,
        },
      });

      return new Response(JSON.stringify(updatedCartItem), { status: 200 });
    }

  } catch (error) {
    console.error("Error in PATCH /api/cart:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
