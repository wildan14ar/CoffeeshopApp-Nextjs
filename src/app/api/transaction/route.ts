// /app/api/transaction/route.js
import prisma from '@lib/prisma';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';

export async function POST(req) {
    const token = await getToken({ req });
    if (!token) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { orderId, amount } = await req.json();

    try {
        const userId = token.sub;

        // Get the order details
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { store: true }
        });

        if (!order) {
            return new Response(JSON.stringify({ message: 'Order not found' }), { status: 404 });
        }

        // Create a payment request to Xendit
        const paymentResponse = await axios.post(
            'https://api.xendit.co/v2/invoices',
            {
                external_id: `order-${order.id}`,
                amount,
                payer_email: token.email,
                description: `Payment for Order ${order.id}`,
                success_redirect_url: `${process.env.NEXTAUTH_URL}/payment/success`,
                failure_redirect_url: `${process.env.NEXTAUTH_URL}/payment/failed`
            },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(process.env.XENDIT_API_KEY).toString('base64')}`
                }
            }
        );

        const paymentUrl = paymentResponse.data.invoice_url;

        // Create a transaction entry
        const transaction = await prisma.transaction.create({
            data: {
                orderId,
                userId,
                storeId: order.storeId,
                amount,
                status: 'pending',
                paymentProvider: 'Xendit'
            }
        });

        return new Response(JSON.stringify({ transaction, paymentUrl }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Failed to create transaction' }), { status: 500 });
    }
}
