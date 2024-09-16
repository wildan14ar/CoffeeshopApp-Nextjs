import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Daftar rute login yang perlu diakses oleh pengguna yang belum login
    const loginRoutes = ['/profile', '/cart', '/dashboard'];
    // Cek apakah pathname dimulai dengan salah satu rute login
    const isLoginRoute = loginRoutes.some(route => pathname.startsWith(route));

    if (!token && isLoginRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Daftar rute publik yang seharusnya tidak diakses oleh pengguna yang sudah login
    const publicRoutes = ['/login', '/register'];
    // Cek apakah pathname dimulai dengan salah satu rute publik
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Cek hak akses untuk rute dashboard
    if (pathname.startsWith('/owner') && token?.role !== 'OWNER') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/manager') && token?.role !== 'MANAGER') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/cart/:path*', '/login/:path*', '/register/:path*'],
};
