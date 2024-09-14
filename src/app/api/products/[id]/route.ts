// app/api/products/[id]/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                options: {
                    include: {
                        values: true,
                    },
                },
            },
        })
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const { name, description, base_price, image_url, options } = body;

        // Update product data
        await prisma.product.update({
            where: { id: parseInt(params.id) },
            data: {
                name,
                description,
                base_price,
                image_url,
            },
        });

        // Delete existing options and values
        await prisma.productOptionValue.deleteMany({
            where: { optionId: { in: (await prisma.productOption.findMany({ where: { productId: parseInt(params.id) }, select: { id: true } })).map(opt => opt.id) } }
        });

        await prisma.productOption.deleteMany({
            where: { productId: parseInt(params.id) }
        });

        // Create new options and values
        const createdOptions = await Promise.all(options.map(async (option) => {
            const createdOption = await prisma.productOption.create({
                data: {
                    name: option.name,
                    productId: parseInt(params.id),
                    values: {
                        create: option.values.map(value => ({
                            value: value.value,
                            additional_price: value.additional_price,
                        })),
                    },
                },
            });
            return createdOption;
        }));

        // Fetch the updated product with options
        const updatedProduct = await prisma.product.findUnique({
            where: { id: parseInt(params.id) },
            include: { options: { include: { values: true } } },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Error updating product', details: error.message }, { status: 500 });
    }
}


export async function DELETE(request, { params }) {
    try {
        await prisma.product.delete({
            where: { id: parseInt(params.id) },
        })
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
    }
}