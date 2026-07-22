const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'app', 'api');

// --- /api/content/route.js ---
const contentPath = path.join(apiDir, 'content');
fs.mkdirSync(contentPath, { recursive: true });
fs.writeFileSync(path.join(contentPath, 'route.js'), `
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req) {
    return NextResponse.json({ success: true, message: 'Content API ready' });
}
`);

// --- /api/admin/users/route.js ---
const adminUsersPath = path.join(apiDir, 'admin', 'users');
fs.mkdirSync(adminUsersPath, { recursive: true });
fs.writeFileSync(path.join(adminUsersPath, 'route.js'), `
import { NextResponse } from 'next/server';
import db from '../../../../../db/db';

export async function GET() {
    return NextResponse.json({ success: true, users: db.getUsers() });
}
`);

// --- /api/admin/sessions/route.js ---
const adminSessionsPath = path.join(apiDir, 'admin', 'sessions');
fs.mkdirSync(adminSessionsPath, { recursive: true });
fs.writeFileSync(path.join(adminSessionsPath, 'route.js'), `
import { NextResponse } from 'next/server';
import db from '../../../../../db/db';

export async function GET() {
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
    return NextResponse.json({ success: true, sessions: activeUsers });
}
`);

console.log('Admin & Content API routes created');
