import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // pastikan ini menuju file Prisma Client-mu
import bcrypt from 'bcrypt'; // untuk hashing password

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description, address, phone, email, image_url, latitude, longitude, whatsapp, instagram, facebook, userName, userEmail, userPassword } = body;

    // Validasi input untuk user
    if (!userName || !userEmail || !userPassword) {
      return NextResponse.json({ error: 'Nama, email, dan password pengguna wajib diisi' }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        name: userName,
        email: userEmail,
        hashedPassword,
      },
    });

    // Buat store baru
    const store = await prisma.store.create({
      data: {
        name,
        description,
        address,
        phone,
        email,
        image_url,
        userId: newUser.id, // Gunakan id user yang baru dibuat
        details: {
          create: {
            latitude,
            longitude,
            whatsapp,
            instagram,
            facebook,
          },
        },
      },
    });

    return NextResponse.json({ user: newUser, store }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mendaftarkan user dan store' }, { status: 500 });
  }
}
