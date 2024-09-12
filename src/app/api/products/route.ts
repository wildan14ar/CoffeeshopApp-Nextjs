// app/api/products/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                options: {
                    include: {
                        values: true,
                    },
                },
            },
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
    }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, description, base_price, image_url, options } = body
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        base_price: parseFloat(base_price),
        image_url,
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
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Error creating product', details: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}