import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Update order status to 'paid'
export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(params.id) },
            data: { status: 'paid' }
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating order status' }, { status: 500 });
    }
}

