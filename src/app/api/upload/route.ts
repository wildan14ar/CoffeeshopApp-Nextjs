import { promises as fs } from 'fs';
import path from 'path';
import cuid from 'cuid';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop(); // Ekstensi file
    const fileName = `${cuid()}.${fileExtension}`; // Nama file unik menggunakan cuid
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);

    try {
        // Simpan file ke direktori uploads
        await fs.writeFile(uploadPath, buffer);

        // Simpan metadata ke database
        const image = await prisma.image.create({
            data: {
                fileName,
                fileUrl: `/uploads/${fileName}`,
            },
        });

        return NextResponse.json({ url: image.fileUrl }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
    }
};


export const PUT = async (req) => {
    const formData = await req.formData();
    const file = formData.get('file');
    const oldFileName = formData.get('oldFileName');

    if (!file || !oldFileName) {
        return NextResponse.json({ error: 'File or old file name not provided' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop();
    const newFileName = `${cuid()}.${fileExtension}`; // Gunakan cuid untuk nama file baru
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadPath = path.join(process.cwd(), 'public', 'uploads', newFileName);
    const oldFilePath = path.join(process.cwd(), 'public', 'uploads', oldFileName);

    try {
        // Hapus file lama dari sistem
        await fs.unlink(oldFilePath);

        // Simpan file baru
        await fs.writeFile(uploadPath, buffer);

        // Update metadata di database
        const updatedImage = await prisma.image.update({
            where: { fileName: oldFileName },
            data: {
                fileName: newFileName,
                fileUrl: `/uploads/${newFileName}`,
            },
        });

        return NextResponse.json({ url: updatedImage.fileUrl }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'File update failed' }, { status: 500 });
    }
};

export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('file');

    if (!fileName) {
        return NextResponse.json({ error: 'No file specified' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    try {
        // Hapus file dari sistem
        await fs.unlink(filePath);

        // Hapus metadata dari database
        await prisma.image.delete({
            where: { fileName },
        });

        return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'File not found or cannot be deleted' }, { status: 500 });
    }
};