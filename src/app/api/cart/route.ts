import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Add item to cart
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  try {
    let cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { items: true }
    });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: userId } });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        }
      });
    }

    return NextResponse.json({ message: 'Item added to cart' });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding item to cart' }, { status: 500 });
  }
}

// GET - Fetch user cart
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId || '0') },
      include: { items: { include: { product: true } } }
    });

    if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 });

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching cart' }, { status: 500 });
  }
}
