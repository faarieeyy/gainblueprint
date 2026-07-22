
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        let currentChapter = 1;
        const totalChapters = 15; // Should be dynamic based on API, hardcoded for UI brevity

        async function loadChapter() {
            const urlParams = new URLSearchParams(window.location.search);
            currentChapter = parseInt(urlParams.get('ch')) || 1;
            
            document.getElementById('reading-progress').textContent = `Chapter ${currentChapter} of ${totalChapters}`;
            document.getElementById('btn-prev').disabled = currentChapter === 1;
            document.getElementById('btn-next').innerHTML = currentChapter === totalChapters ? 
                'Finish Book <span className="material-symbols-outlined text-sm">check</span>' : 
                'Next Chapter <span className="material-symbols-outlined text-sm">arrow_forward</span>';

            try {
                const res = await fetch(`/api/content/chapter/${currentChapter}`);
                if (res.status === 401 || res.status === 403) {
                    window.location.href = '/login';
                    return;
                }
                const html = await res.text();
                
                // Inject the raw HTML which already contains the server-side watermark
                document.getElementById('content-area').innerHTML = html;
                document.getElementById('reader-scroll').scrollTop = 0;
            } catch (err) {
                document.getElementById('content-area').innerHTML = '<p className="text-red-400 text-center py-20">Failed to load content. Ensure you are connected to the internet.</p>';
            }
        }

        function navChapter(dir) {
            const next = currentChapter + dir;
            if (next >= 1 && next <= totalChapters) {
                window.location.href = `/reader?ch=${next}`;
            } else if (next > totalChapters) {
                window.location.href = '/dashboard';
            }
        }

        async function toggleBookmark() {
            const icon = document.getElementById('bm-icon');
            const isBookmarked = icon.textContent === 'bookmark';
            icon.textContent = isBookmarked ? 'bookmark_border' : 'bookmark';
            icon.style.fontVariationSettings = isBookmarked ? "'FILL' 0" : "'FILL' 1";
            icon.classList.toggle('text-yellow-400', !isBookmarked);
            
            // Just a visual toggle here for speed, actual save handled by dashboard load or explicit API
            await fetch('/api/content/progress', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ toggleBookmark: currentChapter })
            });
        }

        // --- SECURITY PROTECTIONS ---
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            const blockedKeys = ['c', 'p', 's', 'a', 'u'];
            if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))) {
                e.preventDefault();
            }
        });
        document.addEventListener('dragstart', e => e.preventDefault());
        document.addEventListener('copy', e => e.preventDefault());
        document.addEventListener('cut', e => e.preventDefault());

        // Blur content if window loses focus
        window.addEventListener('blur', () => {
            document.body.style.filter = 'blur(10px)';
            document.body.style.opacity = '0.5';
        });
        window.addEventListener('focus', () => {
            document.body.style.filter = 'none';
            document.body.style.opacity = '1';
        });

        window.onload = loadChapter;
    
    }, []);

    return (
        <>
            

    {/*  Navbar  */}
    <header className="w-full bg-[#121912] border-b border-white/10 flex-shrink-0 z-50">
        <div className="px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold font-['Outfit']">
                    <span className="material-symbols-outlined text-base">arrow_back</span> Dashboard
                </a>
            </div>
            <div className="flex items-center gap-4">
                <span id="reading-progress" className="text-xs font-bold text-gray-500 uppercase tracking-widest font-['Outfit']">Chapter 1 of 15</span>
                <button onClick={() => { toggleBookmark() }} className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <span id="bm-icon" className="material-symbols-outlined">bookmark_border</span>
                </button>
            </div>
        </div>
    </header>

    <div className="flex flex-1 overflow-hidden">
        {/*  Content Area  */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth" id="reader-scroll">
            <div className="max-w-3xl mx-auto px-8 py-16">
                <div id="content-area" className="prose max-w-none">
                    <div className="text-center py-20 text-gray-600 flex flex-col items-center">
                        <span className="material-symbols-outlined animate-spin text-4xl mb-4 text-[#4be277]">autorenew</span>
                        <p className="font-['Outfit'] uppercase tracking-widest text-xs font-bold">Decrypting Chapter...</p>
                    </div>
                </div>
                
                {/*  Navigation Footer  */}
                <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center font-['Outfit'] pb-20">
                    <button id="btn-prev" onClick={() => { navChapter(-1) }} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold disabled:opacity-30 disabled:hover:text-gray-400">
                        <span className="material-symbols-outlined text-sm">arrow_back</span> Previous
                    </button>
                    <button id="btn-next" onClick={() => { navChapter(1) }} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Next Chapter <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </main>
    </div>

    

        </>
    );
}
