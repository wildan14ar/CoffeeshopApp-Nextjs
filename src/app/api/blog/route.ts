import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all blogs or by category
export async function GET(req) {
    try {
        // Extract category from query params
        const category = req.nextUrl.searchParams.get('category');
        
        // Fetch blogs, filter by category if query exists, and select specific fields
        const blogs = await prisma.blogs.findMany({
            where: category ? { category } : {},
            select: {
                id: true,
                name: true,
                description: true,
                image_url: true,
                category: true,
            },
        });

        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching blogs', error: error.message }, { status: 500 });
    }
}


// POST: Create new blog
export async function POST(request: Request) {
    try {
        const { name, description, image_url, content, category } = await request.json();

        // Validasi input
        if (!name || !description || !image_url || !content || !category) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const newBlog = await prisma.blogs.create({
            data: {
                name,
                description,
                image_url,
                content, // Konten HTML dari React Quill
                category, // Pastikan nilai sesuai dengan enum BlogCategory
            },
        });

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating blog', error: error.message }, { status: 500 });
    }
}
