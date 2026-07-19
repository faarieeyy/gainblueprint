const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const db = require('../db/db');
const { generateFingerprint } = require('../middleware/auth');

// Rate limiting
const otpRequestLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3, // 3 requests per IP per window
    message: { success: false, message: 'Too many OTP requests from this IP, please try again after 10 minutes' }
});

const otpVerifyLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many failed verification attempts, please try again later' }
});

// Helper: Send OTP
async function sendOTP(phone, otp) {
    if (process.env.SMS_PROVIDER === 'console' || process.env.NODE_ENV === 'development') {
        console.log(`\n================================`);
        console.log(`📱 SMS TO: ${phone}`);
        console.log(`🔑 OTP: ${otp}`);
        console.log(`================================\n`);
        return true;
    }
    // Fast2SMS or Twilio logic can be added here later
    return true;
}

// 1. Request OTP
router.post('/request-otp', otpRequestLimiter, async (req, res) => {
    try {
        let { phone } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required' });
        
        phone = phone.replace(/\D/g, ''); // strip non-digits

        // Admin override login
        if (phone === process.env.ADMIN_PHONE) {
             return res.json({ success: true, message: 'Admin login handled differently' }); // Or allow admin to get OTP, but we use PIN for admin
        }

        const user = db.findUser(u => u.phone === phone);
        if (!user) return res.status(404).json({ success: false, message: 'Account not found. Please contact the coach to purchase the Premium Guide.' });
        if (user.status !== 'Active') return res.status(403).json({ success: false, message: 'Account suspended.' });

        // Clean expired OTPs first
        db.cleanExpiredOTPs();

        // Check if user recently requested (debounce 60s)
        const existingOTP = db.getOTP(phone);
        if (existingOTP && (Date.now() - existingOTP.lastRequest < 60000)) {
            return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting another OTP.' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        const expiry = Date.now() + parseInt(process.env.OTP_EXPIRY_MINUTES) * 60 * 1000;

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
        res.json(responseData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 2. Verify OTP
router.post('/verify-otp', otpVerifyLimiter, async (req, res) => {
    try {
        let { phone, otp } = req.body;
        if (!phone || !otp) return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
        
        phone = phone.replace(/\D/g, '');

        const otpRecord = db.getOTP(phone);
        if (!otpRecord) return res.status(400).json({ success: false, message: 'OTP expired or invalid.' });

        if (Date.now() > otpRecord.expiry) {
            db.deleteOTP(phone);
            return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
        }

        otpRecord.attempts += 1;
        if (otpRecord.attempts > parseInt(process.env.MAX_OTP_ATTEMPTS)) {
            db.deleteOTP(phone);
            return res.status(429).json({ success: false, message: 'Too many failed attempts. Please request a new OTP.' });
        }
        db.setOTP(phone, otpRecord); // update attempts

        const isMatch = await bcrypt.compare(otp.toString(), otpRecord.hash);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid OTP.' });

        // Success!
        db.deleteOTP(phone);

        const user = db.findUser(u => u.phone === phone);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        // Generate Session ID & Fingerprint
        const sessionId = uuidv4();
        const deviceFP = generateFingerprint(req);
        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';

        // Check for existing session and "terminate" it by overwriting
        // The old device will fail the auth check on its next request
        const currentSession = db.getSession(user.id);
        const isNewDevice = currentSession && currentSession.deviceFP !== deviceFP;

        db.setSession(user.id, {
            sessionId,
            deviceFP,
            deviceInfo,
            ip: req.ip || req.connection.remoteAddress,
            loginTime: new Date().toISOString()
        });

        // Update User
        db.updateUser(user.id, {
            lastLogin: new Date().toISOString(),
            lastDevice: deviceInfo
        });

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, sessionId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.SESSION_DURATION_HOURS + 'h' }
        );

        // Set Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.SESSION_DURATION_HOURS) * 60 * 60 * 1000
        });

        res.json({ 
            success: true, 
            redirect: '/dashboard.html',
            message: isNewDevice ? 'Logged in. Your previous session on another device was ended.' : 'Logged in successfully.'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 3. Logout
router.post('/logout', (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                db.deleteSession(decoded.userId);
            } catch (e) { /* ignore invalid token on logout */ }
        }
        res.clearCookie('token');
        res.json({ success: true, message: 'Logged out' });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// --- ADMIN AUTH ---
const adminLoginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
router.post('/admin/login', adminLoginLimiter, (req, res) => {
    const { phone, pin } = req.body;
    
    if (phone === process.env.ADMIN_PHONE && pin === process.env.ADMIN_PIN) {
        const token = jwt.sign(
            { role: 'admin', phone },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ADMIN_SESSION_HOURS + 'h' }
        );
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.ADMIN_SESSION_HOURS) * 60 * 60 * 1000
        });
        return res.json({ success: true, redirect: '/admin/index.html' });
    }
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

router.post('/admin/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
});

module.exports = router;
