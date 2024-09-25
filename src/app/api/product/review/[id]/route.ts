import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust based on your prisma setup

export async function GET(req, { params }) {
    try {
      const token = await getToken({ req });
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const userId = token.sub; // Assuming `sub` contains the user ID
      const productId = parseInt(params.productId, 10);
  
      const review = await prisma.reviewProduct.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
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
export async function PATCH(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub; // Assuming `sub` contains the user ID
    const productId = parseInt(params.productId, 10);
    const { review, favorite, message } = await req.json();

    // Check if the review already exists
    const existingReview = await prisma.reviewProduct.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingReview) {
      // Update the existing review
      const updatedReview = await prisma.reviewProduct.update({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        data: {
          review: review !== undefined ? review : existingReview.review,
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
          productId,
          review: review !== undefined ? review : 0, // Default value if not provided
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
