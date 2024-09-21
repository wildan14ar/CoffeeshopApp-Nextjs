import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch blog by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const blog = await prisma.blogs.findUnique({
            where: { id: params.id },
            select: {
                name: true,
                image_url: true,
                content: true,
                description: true, // Corrected field
                category: true,
            },
        });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching blog', error: error.message }, { status: 500 });
    }
}

// PUT: Update blog by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name, description, image_url, content, category } = await request.json();

        // Validasi input
        if (!name || !description || !image_url || !content || !category) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const updatedBlog = await prisma.blogs.update({
            where: { id: params.id },
            data: {
                name,
                description,
                image_url,
                content,
                category,
            },
        });

        return NextResponse.json(updatedBlog);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
    }
}

// DELETE: Delete blog by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.blogs.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Blog deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting blog', error: error.message }, { status: 500 });
    }
}
