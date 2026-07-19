/**
 * Simple JSON file-based database helper
 * No external dependencies — just fs + JSON
 */
const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname);

const FILES = {
    users: 'users.json',
    sessions: 'sessions.json',
    otp_store: 'otp_store.json',
    announcements: 'announcements.json'
};

function readDB(collection) {
    const filepath = path.join(DB_DIR, FILES[collection]);
    if (!fs.existsSync(filepath)) return collection === 'sessions' || collection === 'otp_store' ? {} : [];
    try {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch {
        return collection === 'sessions' || collection === 'otp_store' ? {} : [];
    }
}

function writeDB(collection, data) {
    const filepath = path.join(DB_DIR, FILES[collection]);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// Users (array)
function getUsers() { return readDB('users'); }
function findUser(predicate) { return getUsers().find(predicate); }
function addUser(user) {
    const users = getUsers();
    users.push(user);
    writeDB('users', users);
}
function updateUser(id, updates) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...updates };
    writeDB('users', users);
    return users[idx];
}
function deleteUser(id) {
    const users = getUsers().filter(u => u.id !== id);
    writeDB('users', users);
}

// Sessions (object: { [userId]: { sessionId, deviceFP, deviceInfo, loginTime, expiresAt } })
function getSessions() { return readDB('sessions'); }
function getSession(userId) { return getSessions()[userId] || null; }
function setSession(userId, sessionData) {
    const sessions = getSessions();
    sessions[userId] = sessionData;
    writeDB('sessions', sessions);
}
function deleteSession(userId) {
    const sessions = getSessions();
    delete sessions[userId];
    writeDB('sessions', sessions);
}

// OTP Store (object: { [phone]: { otp, expiry, attempts, lastRequest } })
function getOTPStore() { return readDB('otp_store'); }
function getOTP(phone) { return getOTPStore()[phone] || null; }
function setOTP(phone, data) {
    const store = getOTPStore();
    store[phone] = data;
    writeDB('otp_store', store);
}
function deleteOTP(phone) {
    const store = getOTPStore();
    delete store[phone];
    writeDB('otp_store', store);
}
function cleanExpiredOTPs() {
    const store = getOTPStore();
    const now = Date.now();
    let changed = false;
    Object.keys(store).forEach(phone => {
        if (store[phone].expiry < now) { delete store[phone]; changed = true; }
    });
    if (changed) writeDB('otp_store', store);
}

// Announcements (array)
function getAnnouncements() { return readDB('announcements'); }
function addAnnouncement(ann) {
    const anns = getAnnouncements();
    anns.unshift(ann);
    writeDB('announcements', anns);
}
function deleteAnnouncement(id) {
    const anns = getAnnouncements().filter(a => a.id !== id);
    writeDB('announcements', anns);
}

module.exports = {
    getUsers, findUser, addUser, updateUser, deleteUser,
    getSessions, getSession, setSession, deleteSession,
    getOTP, setOTP, deleteOTP, cleanExpiredOTPs,
    getAnnouncements, addAnnouncement, deleteAnnouncement
};
