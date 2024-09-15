import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Jika pengguna mencoba mengakses halaman dashboard dan bukan "owner", redirect
    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/dashboard/:path*') && token.role === 'user') {
        return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect ke halaman unauthorized atau yang sesuai
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/cart/:path*'], 
};
