import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH - Update cart item quantity
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { quantity } = await req.json();

  try {
    const updatedItem = await prisma.cartItem.update({
      where: { id: parseInt(params.id) },
      data: { quantity: quantity }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating cart item' }, { status: 500 });
  }
}

// DELETE - Remove item from cart
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.cartItem.delete({
      where: { id: parseInt(params.id) }
    });

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    return NextResponse.json({ error: 'Error removing cart item' }, { status: 500 });
  }
}
