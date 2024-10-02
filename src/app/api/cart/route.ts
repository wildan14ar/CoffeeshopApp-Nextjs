import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = token.sub;
  const storeId = req.nextUrl.searchParams.get('storeId'); // Ambil storeId dari query jika ada

  try {
    let carts;

    if (storeId) {
      // Jika storeId tersedia, ambil cart untuk store tersebut
      carts = await prisma.cart.findUnique({
        where: {
          userId_storeId: {
            userId,
            storeId: parseInt(storeId, 10),
          },
        },
        include: {
          store: {
            select: {
              name: true,
              address: true,
            },
          },
          cartItems: {
            include: {
              product: true,
              options: {
                include: {
                  optionValue: true,
                },
              },
            },
          },
        },
      });

      if (!carts) {
        return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
      }

      if (!carts.cartItems || carts.cartItems.length === 0) {
        return NextResponse.json({ message: 'Cart is empty' });
      }

      return NextResponse.json({
        storeName: carts.store.name, // Menyertakan nama store
        ...carts,
      });
    } else {
      // Jika storeId tidak ada, ambil semua cart dengan userId
      carts = await prisma.cart.findMany({
        where: {
          userId,
        },
        include: {
          store: {
            select: {
              name: true,
            },
          },
          cartItems: {
            include: {
              product: true,
              options: {
                include: {
                  optionValue: true,
                },
              },
            },
          },
        },
      });

      if (!carts || carts.length === 0) {
        return NextResponse.json({ message: 'No carts found' });
      }

      return NextResponse.json(carts);
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
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
