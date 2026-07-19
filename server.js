require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // We'll disable CSP for now to not break existing styles/scripts
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`);
        else
            next();
    });
}

// Block direct access to content folder explicitly (just in case)
app.use('/content', (req, res) => {
    res.status(403).send('Forbidden: Access to this directory is denied.');
});

// Routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for non-api routes (e.g., 404s)
app.use((req, res, next) => {
    if (!req.path.startsWith('/api/')) {
        res.redirect('/index.html');
    } else {
        res.status(404).json({ success: false, message: 'API route not found' });
    }
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n================================`);
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🔒 Admin Phone: ${process.env.ADMIN_PHONE}`);
        console.log(`🔑 Admin PIN:   ${process.env.ADMIN_PIN}`);
        console.log(`================================\n`);
    });
}

module.exports = app;
