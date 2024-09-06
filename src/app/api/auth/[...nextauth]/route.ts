import NextAuth from 'next-auth';
import { authOptions } from './authOptions'; // Pisahkan konfigurasi NextAuth

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
