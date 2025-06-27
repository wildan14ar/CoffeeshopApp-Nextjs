import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

// Get Product by ID
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        if (!params || !params.id) {
            return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({
            where: { id: params.id },
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
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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
                id: params.id,
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
                basePrice: parseFloat(base_price),
                imageUrl: image_url,
            },
        });

        // Delete existing options and values
        await prisma.productOptionValue.deleteMany({
            where: { optionId: { in: (await prisma.productOption.findMany({ where: { productId: product.id }, select: { id: true } })).map(opt => opt.id) } },
        });

        await prisma.productOption.deleteMany({
            where: { productId: product.id },
        });

        // Define types for option and value
        interface OptionValue {
            value: string;
            additional_price: string | number;
        }
        interface Option {
            name: string;
            values: OptionValue[];
        }

        // Create new options and values
        await Promise.all(
            (options as Option[]).map(async (option: Option) => {
                await prisma.productOption.create({
                    data: {
                        name: option.name,
                        productId: product.id,
                        values: {
                            create: option.values.map((value) => ({
                                value: value.value,
                                additional_price: parseFloat(value.additional_price as string),
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
        const errorMessage = typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : String(error);
        return NextResponse.json({ error: 'Error updating product', details: errorMessage }, { status: 500 });
    }
}


// Delete Product
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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
                id: params.id,
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
        const errorMessage = typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : String(error);
        return NextResponse.json({ error: 'Error deleting product', details: errorMessage }, { status: 500 });
    }
}
