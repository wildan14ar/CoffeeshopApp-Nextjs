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

  const cart = await prisma.cart.findUnique({
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

  if (!cart) {
    return new Response("Cart not found", { status: 404 });
  }

  // Calculate total base price for each cart item including options
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

    // Tambahkan totalBasePrice ke totalPrice
    totalPrice += totalBasePrice;

    return {
      ...item,
      totalBasePrice
    };
  }));

  // Tambahkan total price ke response JSON
  return new Response(JSON.stringify({
    ...cart,
    totalPrice // Total harga dari semua item di keranjang
  }), { status: 200 });
}


export async function POST(req) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { productId, quantity = 1, options = [] } = await req.json();
  const userId = token.sub;

  // Temukan produk berdasarkan ID
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  // Temukan atau buat cart berdasarkan userId
  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  // Urutkan array options berdasarkan optionValueId
  const sortedOptions = [...options].sort((a, b) => a.optionValueId - b.optionValueId);

  // Hitung total base price
  const basePrice = product.base_price || 0;
  const optionsTotal = sortedOptions.reduce((total, option) => total + (option.additionalPrice || 0), 0);
  const totalBasePrice = (basePrice + optionsTotal) * quantity;

  if (isNaN(totalBasePrice) || totalBasePrice <= 0) {
    return new Response("Invalid totalBasePrice calculation", { status: 400 });
  }

  // Buat CartItem baru
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

    console.log("Request body:", { cartItemId, productId, quantity });

    // Temukan produk untuk mendapatkan base_price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    // Hitung total base price
    const basePrice = product.base_price || 0;
    const totalBasePrice = basePrice * quantity;

    if (isNaN(totalBasePrice) || totalBasePrice < 0) {
      return new Response("Invalid totalBasePrice calculation", { status: 400 });
    }

    if (quantity === 0) {
      // Hapus item dari keranjang jika kuantitasnya 0
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      return new Response("Cart item removed", { status: 200 });
    } else {
      // Update hanya kuantitas dan total base price dari CartItem
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

