// /app/api/payment/callback/route.js
import prisma from '@/lib/prisma';

export async function POST(req) {
    const payload = await req.json();

    const { external_id, status } = payload;

    try {
        const orderId = external_id.split('-')[1];

        // Update transaction status
        const transaction = await prisma.transaction.update({
            where: { orderId: parseInt(orderId) },
            data: { status }
        });

        // Update order status based on payment
        if (status === 'paid') {
            await prisma.order.update({
                where: { id: parseInt(orderId) },
                data: { status: 'paid' }
            });
        }

        return new Response(JSON.stringify({ message: 'Payment status updated' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Failed to update payment status' }), { status: 500 });
    }
}
