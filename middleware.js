import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Next.js edge requires jose instead of jsonwebtoken
// Note: Since db.js uses fs, it won't work in Edge middleware. 
// We will only do basic JWT verification in middleware and do DB session check in API route or Server Component.

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Protect Dashboard and Reader
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/reader')) {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.redirect(new URL('/login', req.url));
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
            await jwtVerify(token, secret);
            // Valid token format, actual session check happens later
        } catch (e) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Protect Admin Dashboard
    if (pathname === '/admin') {
        const adminToken = req.cookies.get('admin_token')?.value;
        if (!adminToken) return NextResponse.redirect(new URL('/admin/login', req.url));
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
            const { payload } = await jwtVerify(adminToken, secret);
            if (payload.role !== 'admin') throw new Error('Not admin');
        } catch (e) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/reader/:path*', '/admin'],
};
