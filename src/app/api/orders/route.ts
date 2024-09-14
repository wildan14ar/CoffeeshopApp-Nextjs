import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Checkout and create order from cart
export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.product.base_price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalPrice: totalPrice,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.base_price,
          }))
        },
        status: 'pending',
      }
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
