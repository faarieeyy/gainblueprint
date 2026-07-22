
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../../../db/db';

export async function POST(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                db.deleteSession(decoded.userId);
            } catch (e) { }
        }
        const res = NextResponse.json({ success: true, message: 'Logged out' });
        res.cookies.delete('token');
        return res;
    } catch (err) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
