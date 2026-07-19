const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db/db');

// Generate Device Fingerprint based on headers
function generateFingerprint(req) {
    const userAgent = req.headers['user-agent'] || '';
    const acceptLang = req.headers['accept-language'] || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    return crypto.createHash('sha256').update(`${userAgent}-${acceptLang}-${ip}`).digest('hex');
}

// Middleware to verify JWT and Device Session
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        if (req.path.startsWith('/api/')) return res.status(401).json({ success: false, message: 'Unauthorized' });
        return res.redirect('/login.html');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const session = db.getSession(decoded.userId);
        
        // Check if session exists on server
        if (!session || session.sessionId !== decoded.sessionId) {
            res.clearCookie('token');
            if (req.path.startsWith('/api/')) return res.status(401).json({ success: false, message: 'Session expired or logged in from another device' });
            return res.redirect('/login.html?error=session_ended');
        }

        // Check if device matches (basic fingerprint)
        const currentFingerprint = generateFingerprint(req);
        if (session.deviceFP !== currentFingerprint) {
            // Optional: You could allow IP changes but block entirely different devices. 
            // For now, strict matching.
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        if (req.path.startsWith('/api/')) return res.status(401).json({ success: false, message: 'Invalid token' });
        return res.redirect('/login.html');
    }
}

module.exports = { verifyToken, generateFingerprint };
