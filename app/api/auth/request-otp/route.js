import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '../../../../db/db';

async function sendOTP(phone, otp) {
    if (process.env.SMS_PROVIDER === 'console' || process.env.NODE_ENV === 'development') {
        console.log(`\n================================`);
        console.log(`📱 SMS TO: ${phone}`);
        console.log(`🔑 OTP: ${otp}`);
        console.log(`================================\n`);
        return true;
    }
    return true;
}

export async function POST(req) {
    try {
        const body = await req.json();
        let { phone } = body;
        
        if (!phone) return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
        
        phone = phone.replace(/\D/g, ''); 

        if (phone === process.env.ADMIN_PHONE) {
             return NextResponse.json({ success: true, message: 'Admin login handled differently' }); 
        }

        const user = db.findUser(u => u.phone === phone);
        if (!user) return NextResponse.json({ success: false, message: 'Account not found. Please contact the coach to purchase the Premium Guide.' }, { status: 404 });
        if (user.status !== 'Active') return NextResponse.json({ success: false, message: 'Account suspended.' }, { status: 403 });

        db.cleanExpiredOTPs();

        const existingOTP = db.getOTP(phone);
        if (existingOTP && (Date.now() - existingOTP.lastRequest < 60000)) {
            return NextResponse.json({ success: false, message: 'Please wait 60 seconds before requesting another OTP.' }, { status: 429 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        const expiry = Date.now() + parseInt(process.env.OTP_EXPIRY_MINUTES || '10') * 60 * 1000;

        db.setOTP(phone, {
            hash: hashedOtp,
            expiry,
            attempts: 0,
            lastRequest: Date.now()
        });

        await sendOTP(phone, otp);

        const responseData = { success: true, message: 'OTP sent successfully to your mobile number.' };
        if (process.env.NODE_ENV === 'development') {
            responseData.devOtp = otp;
        }
        return NextResponse.json(responseData);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
