const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'app', 'api');
if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir, { recursive: true });

// --- /api/auth/verify-otp ---
const verifyOtpPath = path.join(apiDir, 'auth', 'verify-otp');
fs.mkdirSync(verifyOtpPath, { recursive: true });
fs.writeFileSync(path.join(verifyOtpPath, 'route.js'), `
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../../../db/db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function generateFingerprint(req) {
    const userAgent = req.headers.get('user-agent') || '';
    const acceptLang = req.headers.get('accept-language') || '';
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    return crypto.createHash('sha256').update(\`\${userAgent}-\${acceptLang}-\${ip}\`).digest('hex');
}

export async function POST(req) {
    try {
        const body = await req.json();
        let { phone, otp } = body;
        if (!phone || !otp) return NextResponse.json({ success: false, message: 'Phone and OTP are required' }, { status: 400 });
        
        phone = phone.replace(/\\D/g, '');

        const otpRecord = db.getOTP(phone);
        if (!otpRecord) return NextResponse.json({ success: false, message: 'OTP expired or invalid.' }, { status: 400 });

        if (Date.now() > otpRecord.expiry) {
            db.deleteOTP(phone);
            return NextResponse.json({ success: false, message: 'OTP expired. Please request a new one.' }, { status: 400 });
        }

        otpRecord.attempts += 1;
        if (otpRecord.attempts > parseInt(process.env.MAX_OTP_ATTEMPTS || '5')) {
            db.deleteOTP(phone);
            return NextResponse.json({ success: false, message: 'Too many failed attempts. Please request a new OTP.' }, { status: 429 });
        }
        db.setOTP(phone, otpRecord); 

        const isMatch = await bcrypt.compare(otp.toString(), otpRecord.hash);
        if (!isMatch) return NextResponse.json({ success: false, message: 'Invalid OTP.' }, { status: 400 });

        db.deleteOTP(phone);

        const user = db.findUser(u => u.phone === phone);
        if (!user) return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });

        const sessionId = uuidv4();
        const deviceFP = generateFingerprint(req);
        const deviceInfo = req.headers.get('user-agent') || 'Unknown Device';

        const currentSession = db.getSession(user.id);
        const isNewDevice = currentSession && currentSession.deviceFP !== deviceFP;

        db.setSession(user.id, {
            sessionId,
            deviceFP,
            deviceInfo,
            ip: req.headers.get('x-forwarded-for') || '127.0.0.1',
            loginTime: new Date().toISOString()
        });

        db.updateUser(user.id, {
            lastLogin: new Date().toISOString(),
            lastDevice: deviceInfo
        });

        const token = jwt.sign(
            { userId: user.id, sessionId },
            process.env.JWT_SECRET,
            { expiresIn: (process.env.SESSION_DURATION_HOURS || '24') + 'h' }
        );

        const res = NextResponse.json({ 
            success: true, 
            redirect: '/dashboard',
            message: isNewDevice ? 'Logged in. Your previous session on another device was ended.' : 'Logged in successfully.'
        });
        
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.SESSION_DURATION_HOURS || '24') * 60 * 60
        });

        return res;

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
`);

// --- /api/auth/logout ---
const logoutPath = path.join(apiDir, 'auth', 'logout');
fs.mkdirSync(logoutPath, { recursive: true });
fs.writeFileSync(path.join(logoutPath, 'route.js'), `
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../../../../db/db';

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
`);

// --- /api/admin/login ---
const adminLoginPath = path.join(apiDir, 'admin', 'login');
fs.mkdirSync(adminLoginPath, { recursive: true });
fs.writeFileSync(path.join(adminLoginPath, 'route.js'), `
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
`);

console.log('API routes created');
