
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        async function loadDashboard() {
            try {
                // 1. Get User Data
                const res = await fetch('/api/content/dashboard-data');
                if (res.status === 401) return window.location.href = '/login';
                const data = await res.json();
                
                if (data.success) {
                    document.getElementById('user-name').textContent = `Welcome, ${data.user.name.split(' ')[0]}`;
                    document.getElementById('device-info').textContent = data.activeDevice;
                }

                // 2. Get Chapters
                const chRes = await fetch('/api/content/chapters');
                const chData = await chRes.json();
                
                if (chData.success) {
                    const list = document.getElementById('chapter-list');
                    list.innerHTML = '';
                    
                    let lastChTitle = 'Chapter 1';
                    
                    chData.chapters.forEach((ch, idx) => {
                        const num = idx + 1;
                        if (num === data.user.progress.lastChapter) lastChTitle = ch.title;
                        
                        const isCurrent = num === data.user.progress.lastChapter;
                        const isRead = num < data.user.progress.lastChapter;
                        const isBookmarked = data.user.progress.bookmarks.includes(num);

                        list.innerHTML += `
                            <a href="/reader?ch=${num}" className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-primary/50 transition-colors group ${isCurrent ? 'bg-primary/5 border-primary/20' : ''}">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold ${isCurrent ? 'text-primary' : 'text-gray-500'} w-6">${num.toString().padStart(2, '0')}</span>
                                    <span className="font-bold text-white group-hover:text-primary transition-colors">${ch.title}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    ${isBookmarked ? '<span className="material-symbols-outlined text-yellow-500 text-sm" style={{fontVariationSettings: "\'FILL\' 1"}}>bookmark</span>' : ''}
                                    ${isRead ? '<span className="material-symbols-outlined text-primary text-sm">check_circle</span>' : ''}
                                </div>
                            </a>
                        `;
                    });

                    document.getElementById('last-chapter-title').textContent = lastChTitle;
                    document.getElementById('continue-btn').href = `/reader?ch=${data.user.progress.lastChapter}`;
                }
            } catch (err) {
                console.error(err);
            }
        }

        async function logout() {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
        }

        window.onload = loadDashboard;
    
    }, []);

    return (
        <>
            

    {/*  Navbar  */}
    <header className="w-full bg-[#121912] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/dashboard" className="text-xl font-black uppercase tracking-tighter text-white">GAIN BLUEPRINT</a>
            <div className="flex items-center gap-6">
                <span id="user-name" className="hidden md:block text-sm font-bold text-primary"></span>
                <button onClick={() => { logout() }} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">logout</span> Logout
                </button>
            </div>
        </div>
    </header>

    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/*  Left Col: Reading  */}
        <div className="lg:col-span-2 space-y-10">
            {/*  Continue Reading  */}
            <section className="glass-card p-8 rounded-2xl border-l-4 border-l-primary relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-[200px]" style={{fontVariationSettings: "\'FILL\' 1"}}>menu_book</span>
                </div>
                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Pick Up Where You Left Off</h2>
                <h3 id="last-chapter-title" className="text-2xl font-black text-white mb-6">Chapter 1: The Foundation</h3>
                <a id="continue-btn" href="/reader?ch=1" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Continue Reading <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            </section>

            {/*  Chapter Index  */}
            <section>
                <h2 className="text-xl font-bold text-white mb-6">Table of Contents</h2>
                <div id="chapter-list" className="space-y-3">
                    <div className="text-center py-10"><span className="material-symbols-outlined animate-spin text-primary">autorenew</span></div>
                </div>
            </section>
        </div>

        {/*  Right Col: Sidebar  */}
        <div className="space-y-6">
            {/*  Plan Info  */}
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Membership</h3>
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "\'FILL\' 1"}}>verified</span>
                    <span className="font-bold text-white text-lg">Premium Access</span>
                </div>
                <p className="text-sm text-gray-400">You have lifetime access to the blueprint and all future updates.</p>
            </div>

            {/*  Active Device Info  */}
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Security</h3>
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-gray-400">devices</span>
                    <div>
                        <p className="text-sm text-white font-bold">Active Session</p>
                        <p id="device-info" className="text-xs text-gray-400 mt-1">Loading...</p>
                        <p className="text-[10px] text-gray-500 mt-2">Only one device can be active at a time.</p>
                    </div>
                </div>
            </div>

            {/*  Support  */}
            <a href="https://wa.me/6282253984?text=Hi%20Coach,%20I%20am%20a%20Premium%20Member%20and%20need%20help." target="_blank" className="block w-full p-6 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl hover:bg-[#25D366]/20 transition-colors group">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#25D366]">forum</span>
                    <div>
                        <p className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">WhatsApp Support</p>
                        <p className="text-xs text-gray-400 mt-0.5">Priority coaching response</p>
                    </div>
                </div>
            </a>
        </div>
    </main>

    

        </>
    );
}
