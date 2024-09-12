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
        const body = await request.json()
        const { name, description, base_price, image_url, options } = body
        const product = await prisma.product.update({
            where: { id: parseInt(params.id) },
            data: {
                name,
                description,
                base_price,
                image_url,
                options: {
                    deleteMany: {},
                    create: options.map(option => ({
                        name: option.name,
                        values: {
                            create: option.values.map(value => ({
                                value: value.value,
                                additional_price: value.additional_price,
                            })),
                        },
                    })),
                },
            },
            include: {
                options: {
                    include: {
                        values: true,
                    },
                },
            },
        })
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
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