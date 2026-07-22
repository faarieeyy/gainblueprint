
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { phone, pin } = await req.json();
    
    if (phone === process.env.ADMIN_PHONE && pin === process.env.ADMIN_PIN) {
        const token = jwt.sign(
            { role: 'admin', phone },
            process.env.JWT_SECRET,
            { expiresIn: (process.env.ADMIN_SESSION_HOURS || '24') + 'h' }
        );
        const res = NextResponse.json({ success: true, redirect: '/admin' });
        res.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.ADMIN_SESSION_HOURS || '24') * 60 * 60
        });
        return res;
    }
    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
}
