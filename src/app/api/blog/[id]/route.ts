// app/api/blogs/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

const SECRET = process.env.NEXTAUTH_SECRET;

// GET: Retrieve a single blog by ID
export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const blog = await prisma.blogs.findUnique({
      where: { id },
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
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...blog,
      categories: blog.categories.map(c => c.category.name)
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Error fetching blog', error: errMsg }, { status: 500 });
  }
}

// PUT: Update blog (MANAGER only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Authentication
  const token = await getToken({ req, secret: SECRET });
  if (!token?.sub || token.role !== 'MANAGER') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { id } = params;
    const { title, description, imageUrl, content, categoryIds } = await req.json();

    if (!title || !description || !imageUrl || !content || !Array.isArray(categoryIds) || !categoryIds.length) {
      return NextResponse.json({ message: 'All fields and at least one categoryId are required' }, { status: 400 });
    }

    const updated = await prisma.blogs.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        content,
        categories: {
          // replace old categories with new list
          deleteMany: {},
          create: categoryIds.map(cid => ({ category: { connect: { id: cid } } }))
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        content: true,
        categories: { select: { category: { select: { name: true } } } }
      }
    });

    return NextResponse.json({
      ...updated,
      categories: updated.categories.map(c => c.category.name)
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Error updating blog', error: errMsg }, { status: 500 });
  }
}

// DELETE: Remove blog (MANAGER only)
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: SECRET });
  if (!token?.sub || token.role !== 'MANAGER') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.blogs.delete({ where: { id } });
    return NextResponse.json({ message: 'Blog deleted' });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Error deleting blog', error: errMsg }, { status: 500 });
  }
}
