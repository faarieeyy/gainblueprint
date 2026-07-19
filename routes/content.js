const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../db/db');
const { verifyToken } = require('../middleware/auth');

// Protect all content routes
router.use(verifyToken);

// GET /api/content/chapters
router.get('/chapters', (req, res) => {
    try {
        const chaptersPath = path.join(__dirname, '..', 'content', 'premium', 'chapters.json');
        if (!fs.existsSync(chaptersPath)) {
            return res.json({ chapters: [] });
        }
        const chapters = JSON.parse(fs.readFileSync(chaptersPath, 'utf8'));
        
        // Merge with user progress
        const user = db.findUser(u => u.id === req.user.userId);
        res.json({
            success: true,
            chapters,
            progress: user.progress || { lastChapter: 1, bookmarks: [] }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to load chapters' });
    }
});

// GET /api/content/chapter/:id
router.get('/chapter/:id', (req, res) => {
    try {
        const chapterId = req.params.id;
        // Validate chapterId to prevent path traversal
        if (!/^\d+$/.test(chapterId)) {
            return res.status(400).send('Invalid chapter ID');
        }

        const paddedId = chapterId.padStart(2, '0');
        const filePath = path.join(__dirname, '..', 'content', 'premium', `ch${paddedId}.html`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Chapter not found');
        }

        let htmlContent = fs.readFileSync(filePath, 'utf8');
        const user = db.findUser(u => u.id === req.user.userId);

        // Security headers - very strict caching
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');

        // Dynamic Watermark Injection
        // We inject a div that CSS will repeat diagonally across the screen
        const partialPhone = user.phone.substring(0, 3) + '***' + user.phone.substring(user.phone.length - 4);
        const loginTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        
        const watermarkHTML = `
        <div class="wm-overlay" aria-hidden="true" style="
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            pointer-events: none; z-index: 9999; 
            opacity: 0.04; 
            display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-around;
            transform: rotate(-15deg) scale(1.5);
            font-family: monospace; font-size: 14px; color: #fff; font-weight: bold;
            user-select: none;
        ">
            ${Array(100).fill(`<span>Purchased by ${user.name} &middot; ID: ${user.id} &middot; ${partialPhone} &middot; ${loginTime}</span>`).join('')}
        </div>
        `;

        // Inject right after opening <body>, or at the top if no body tag
        if (htmlContent.includes('<body')) {
            htmlContent = htmlContent.replace(/(<body[^>]*>)/i, `$1\n${watermarkHTML}`);
        } else {
            htmlContent = watermarkHTML + htmlContent;
        }

        // Update user progress
        const progress = user.progress || { lastChapter: 1, bookmarks: [] };
        progress.lastChapter = parseInt(chapterId);
        db.updateUser(user.id, { progress });

        res.send(htmlContent);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /api/content/progress
router.post('/progress', (req, res) => {
    try {
        const { lastChapter, toggleBookmark } = req.body;
        const user = db.findUser(u => u.id === req.user.userId);
        
        let progress = user.progress || { lastChapter: 1, bookmarks: [] };
        
        if (lastChapter) progress.lastChapter = parseInt(lastChapter);
        
        if (toggleBookmark) {
            const bId = parseInt(toggleBookmark);
            if (progress.bookmarks.includes(bId)) {
                progress.bookmarks = progress.bookmarks.filter(id => id !== bId);
            } else {
                progress.bookmarks.push(bId);
            }
        }

        db.updateUser(user.id, { progress });
        res.json({ success: true, progress });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// GET /api/content/dashboard-data
router.get('/dashboard-data', (req, res) => {
    try {
        const user = db.findUser(u => u.id === req.user.userId);
        const session = db.getSession(req.user.userId);
        const announcements = db.getAnnouncements();
        
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                plan: user.plan,
                expiryDate: user.expiryDate,
                progress: user.progress || { lastChapter: 1, bookmarks: [] }
            },
            activeDevice: session.deviceInfo,
            announcements: announcements.slice(0, 3) // latest 3
        });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;
