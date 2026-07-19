const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');
const { verifyAdmin } = require('../middleware/adminAuth');

router.use(verifyAdmin);

// --- USERS ---
router.get('/users', (req, res) => {
    res.json({ success: true, users: db.getUsers() });
});

router.post('/users', (req, res) => {
    const { name, phone, email, plan } = req.body;
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (db.findUser(u => u.phone === cleanPhone)) {
        return res.status(400).json({ success: false, message: 'Phone number already registered' });
    }

    const newUser = {
        id: `LG-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone: cleanPhone,
        email: email || '',
        purchaseDate: new Date().toISOString().split('T')[0],
        plan: plan || 'premium',
        status: 'Active',
        expiryDate: null,
        lastLogin: null,
        lastDevice: null,
        progress: { lastChapter: 1, bookmarks: [] },
        createdAt: new Date().toISOString()
    };

    db.addUser(newUser);
    res.json({ success: true, user: newUser });
});

router.put('/users/:id', (req, res) => {
    const updated = db.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: updated });
});

router.delete('/users/:id', (req, res) => {
    db.deleteUser(req.params.id);
    db.deleteSession(req.params.id);
    res.json({ success: true });
});

// --- SESSIONS ---
router.get('/sessions', (req, res) => {
    const sessions = db.getSessions();
    const activeUsers = Object.keys(sessions).map(userId => {
        const u = db.findUser(user => user.id === userId);
        return {
            userId,
            name: u ? u.name : 'Unknown',
            phone: u ? u.phone : '',
            ...sessions[userId]
        };
    });
    res.json({ success: true, sessions: activeUsers });
});

router.post('/sessions/:userId/logout', (req, res) => {
    db.deleteSession(req.params.userId);
    res.json({ success: true });
});

// --- ANNOUNCEMENTS ---
router.get('/announcements', (req, res) => {
    res.json({ success: true, announcements: db.getAnnouncements() });
});

router.post('/announcements', (req, res) => {
    const { title, message } = req.body;
    const ann = {
        id: uuidv4(),
        title,
        message,
        date: new Date().toISOString()
    };
    db.addAnnouncement(ann);
    res.json({ success: true, announcement: ann });
});

router.delete('/announcements/:id', (req, res) => {
    db.deleteAnnouncement(req.params.id);
    res.json({ success: true });
});

// --- STATS ---
router.get('/stats', (req, res) => {
    const users = db.getUsers();
    const sessions = db.getSessions();
    
    res.json({
        success: true,
        stats: {
            totalUsers: users.length,
            activeUsers: users.filter(u => u.status === 'Active').length,
            suspendedUsers: users.filter(u => u.status !== 'Active').length,
            activeSessions: Object.keys(sessions).length
        }
    });
});

module.exports = router;
