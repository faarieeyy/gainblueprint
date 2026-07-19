const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
    const adminToken = req.cookies.admin_token;
    if (!adminToken) {
        if (req.path.startsWith('/api/')) return res.status(401).json({ success: false, message: 'Admin unauthorized' });
        return res.redirect('/admin/login.html');
    }

    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        if (decoded.role !== 'admin' || decoded.phone !== process.env.ADMIN_PHONE) {
            throw new Error('Invalid admin role');
        }
        req.admin = decoded;
        next();
    } catch (err) {
        res.clearCookie('admin_token');
        if (req.path.startsWith('/api/')) return res.status(401).json({ success: false, message: 'Admin token invalid' });
        return res.redirect('/admin/login.html');
    }
}

module.exports = { verifyAdmin };
