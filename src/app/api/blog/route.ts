// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

// GET: Fetch all blogs or filter by category name
export async function GET(req: { nextUrl: { searchParams: { get: (arg0: string) => unknown; }; }; }) {
  try {
    const categoryName = req.nextUrl.searchParams.get('category');

    const blogs = await prisma.blogs.findMany({
      where: categoryName
        ? {
            categories: {
              some: {
                category: { name: categoryName }
              }
            }
          }
        : {},
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        categories: {
          select: {
            category: {
              select: { name: true }
            }
          }
        }
      }
    });

    // Format categories as array of names
    const result = blogs.map(blog => ({
      ...blog,
      categories: blog.categories.map(c => c.category.name)
    }));

    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Error fetching blogs', error: errorMessage }, { status: 500 });
  }
}

// POST: Create new blog entry (MANAGER only)
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // Authentication
  const SECRET = process.env.NEXTAUTH_SECRET as string;
  const token = await getToken({ req, secret: SECRET });
  if (!token?.sub || token.role !== 'MANAGER') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { title, description, imageUrl, content, categoryIds } = await req.json();

    if (!title || !description || !imageUrl || !content || !Array.isArray(categoryIds) || !categoryIds.length) {
      return NextResponse.json({ message: 'All fields and at least one categoryId are required' }, { status: 400 });
    }

    const newBlog = await prisma.blogs.create({
      data: {
        title,
        description,
        imageUrl,
        content,
        categories: {
          create: categoryIds.map(id => ({ category: { connect: { id } } }))
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        content: true,
        categories: {
          select: { category: { select: { name: true } } }
        }
      }
    });

    return NextResponse.json({
      ...newBlog,
      categories: newBlog.categories.map(c => c.category.name)
    }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Error creating blog', error: errorMessage }, { status: 500 });
  }
}

