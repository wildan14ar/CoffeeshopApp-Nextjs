import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

// Get Product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        if (!params || !params.id) {
            return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(params.id, 10) },
            include: {
                options: {
                    include: {
                        values: true,
                    },
                },
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error); // Log the error
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}



// Update Product
export async function PUT(request: NextRequest, { params }) {
    try {
        const body = await request.json();
        const { name, description, base_price, image_url, options } = body;

        // Dapatkan token menggunakan request yang benar
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        // Pastikan token ada
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Cari storeId berdasarkan userId menggunakan findFirst
        const store = await prisma.store.findFirst({
            where: {
                userId: token.sub, // Menggunakan token.sub sebagai userId
            },
        });

        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        // Pastikan produk tersebut milik store yang sesuai
        const product = await prisma.product.findFirst({
            where: {
                id: parseInt(params.id),
                storeId: store.id, // Pastikan produk milik store yang sesuai
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found or does not belong to your store' }, { status: 404 });
        }

        // Update product data
        await prisma.product.update({
            where: { id: product.id },
            data: {
                name,
                description,
                base_price: parseFloat(base_price),
                image_url,
            },
        });

        // Delete existing options and values
        await prisma.productOptionValue.deleteMany({
            where: { optionId: { in: (await prisma.productOption.findMany({ where: { productId: product.id }, select: { id: true } })).map(opt => opt.id) } },
        });

        await prisma.productOption.deleteMany({
            where: { productId: product.id },
        });

        // Create new options and values
        await Promise.all(
            options.map(async (option) => {
                await prisma.productOption.create({
                    data: {
                        name: option.name,
                        productId: product.id,
                        values: {
                            create: option.values.map((value) => ({
                                value: value.value,
                                additional_price: parseFloat(value.additional_price),
                            })),
                        },
                    },
                });
            })
        );

        // Fetch the updated product with options
        const updatedProduct = await prisma.product.findUnique({
            where: { id: product.id },
            include: { options: { include: { values: true } } },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Error updating product', details: error.message }, { status: 500 });
    }
}


// Delete Product
export async function DELETE(request, { params }) {
    try {
        // Dapatkan token menggunakan request yang benar
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        // Pastikan token ada
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Cari storeId berdasarkan userId menggunakan findFirst
        const store = await prisma.store.findFirst({
            where: {
                userId: token.sub, // Menggunakan token.sub sebagai userId
            },
        });

        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        // Pastikan produk tersebut milik store yang sesuai
        const product = await prisma.product.findFirst({
            where: {
                id: parseInt(params.id),
                storeId: store.id, // Pastikan produk milik store yang sesuai
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found or does not belong to your store' }, { status: 404 });
        }

        // Hapus produk
        await prisma.product.delete({
            where: { id: product.id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: 'Error deleting product', details: error.message }, { status: 500 });
    }
}
