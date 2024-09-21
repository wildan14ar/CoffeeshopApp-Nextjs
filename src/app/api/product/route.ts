import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { getToken } from "next-auth/jwt";

// GET Products grouped by Store
export async function GET() {
  try {
      const products = await prisma.product.findMany({
          select: {
              id: true,
              name: true,
              base_price: true,
              image_url: true,
              store: {
                  select: {
                      id: true,
                      name: true,
                  },
              },
          },
      })

      // Group products by store
      const groupedProducts = products.reduce((acc, product) => {
          const storeId = product.store.id;
          if (!acc[storeId]) {
              acc[storeId] = {
                  store: product.store,
                  products: [],
              };
          }
          acc[storeId].products.push(product);
          return acc;
      }, {});

      return NextResponse.json(groupedProducts);
  } catch (error) {
      return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}


// Create Product
export async function POST(request: NextRequest) {
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

    // Buat produk baru dengan menyertakan storeId
    const product = await prisma.product.create({
      data: {
        name,
        description,
        base_price: parseFloat(base_price),
        image_url,
        storeId: store.id, // Tambahkan storeId yang ditemukan
        options: {
          create: options.map(option => ({
            name: option.name,
            values: {
              create: option.values.map(value => ({
                value: value.value,
                additional_price: parseFloat(value.additional_price),
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
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

