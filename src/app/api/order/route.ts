// /app/api/order/route.js
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function POST(req) {
  const token = await getToken({ req });
  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { storeId } = await req.json();

  try {
    const userId = token.sub;

    // Retrieve the user's cart with items
    const cart = await prisma.cart.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId
        }
      },
      include: {
        cartItems: {
          include: {
            product: true,
            options: {
              include: {
                optionValue: true
              }
            }
          }
        }
      }
    });

    if (!cart || cart.cartItems.length === 0) {
      return new Response(JSON.stringify({ message: 'Cart is empty' }), { status: 400 });
    }

    // Calculate total price
    const totalPrice = cart.cartItems.reduce((sum, item) => {
      return sum + (item.totalBasePrice + item.options.reduce((optSum, option) => optSum + option.optionValue.additional_price, 0)) * item.quantity;
    }, 0);

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        storeId,
        totalPrice,
        status: 'pending',
        orderItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.totalBasePrice + item.options.reduce((optSum, option) => optSum + option.optionValue.additional_price, 0),
            options: {
              create: item.options.map((option) => ({
                optionValueId: option.optionValueId
              }))
            }
          }))
        }
      }
    });

    // Clear the user's cart after order creation
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    });

    // Returning the created order
    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to create order' }), { status: 500 });
  }
}
