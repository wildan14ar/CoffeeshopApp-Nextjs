import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET semua order
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
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
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
    }
}

// POST order baru
export async function POST(request) {
    const body = await request.json();
    const { customer_name, items } = body;

    try {
        const total_price = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const newOrder = await prisma.order.create({
            data: {
                customer_name,
                total_price,
                items: {
                    create: items.map(item => ({
                        productId: item.product_id,
                        quantity: item.quantity,
                        price: item.price,
                        options: {
                            create: item.options.map(option => ({
                                optionValueId: option.option_value_id,
                                additional_price: option.additional_price
                            }))
                        }
                    }))
                }
            }
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }
}
