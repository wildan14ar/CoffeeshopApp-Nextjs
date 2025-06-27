import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { status } = await req.json();
    const orderId = parseInt(params.id);

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
            status,
            statusHistory: {
                create: { status },
            },
        },
    });

    // Here, broadcast real-time update via WebSocket (optional)
    return NextResponse.json(updatedOrder);
}
