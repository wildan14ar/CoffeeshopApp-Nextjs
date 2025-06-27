import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust based on your prisma setup

export async function GET(req: NextRequest, props: { params: { id: string } }) {
  const params = await props.params;
  try {
      const token = await getToken({ req });
      if (!token) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const userId = token.sub;
      if (!userId) {
          return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
      }
      const productId = parseInt(params.id, 10);
      
      // Check if productId is a valid number
      if (isNaN(productId)) {
          return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
      }

      const review = await prisma.reviewProduct.findUnique({
          where: {
              userId_productId: {
                  userId,
                  productId: productId.toString(),
              },
          },
      });

      if (!review) {
          return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      }

      return NextResponse.json(review);
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}


// PATCH: Create or update the review or favorite status
export async function PATCH(req: NextRequest, props: { params: { id: string } }) {
  const params = await props.params;
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = token.sub;
    if (!userId) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }
    const productId = parseInt(params.id, 10);

    // Check if productId is valid
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const { favorite, message } = await req.json();

    // Check if the review already exists
    const existingReview = await prisma.reviewProduct.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: productId.toString(), // Ensure productId is a string
        },
      },
    });

    if (existingReview) {
      // Update the existing review
      const updatedReview = await prisma.reviewProduct.update({
        where: {
          userId_productId: {
            userId,
            productId: productId.toString(), // Ensure productId is a string
          },
        },
        data: {
          favorite: favorite !== undefined ? favorite : existingReview.favorite,
          message: message !== undefined ? message : existingReview.message,
        },
      });

      return NextResponse.json(updatedReview);
    } else {
      // Create a new review if none exists
      const newReview = await prisma.reviewProduct.create({
        data: {
          userId,
          productId: productId.toString(),
          favorite: favorite !== undefined ? favorite : false, // Default value if not provided
          message: message || null, // Optional message
        },
      });

      return NextResponse.json(newReview);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

