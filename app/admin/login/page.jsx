
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('error') === 'session_ended') {
            const errDiv = document.getElementById('error-msg');
            errDiv.textContent = "Your session was ended.";
            errDiv.classList.remove('hidden');
        }

        async function verifyAdmin() {
            const phone = document.getElementById('phone').value;
            const pin = document.getElementById('pin').value;
            const btn = document.getElementById('btn-verify');
            
            btn.innerHTML = 'Verifying...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/auth/admin/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, pin })
                });
                const data = await res.json();
                
                if (data.success) {
                    window.location.href = data.redirect;
                } else {
                    document.getElementById('error-msg').textContent = data.message;
                    document.getElementById('error-msg').classList.remove('hidden');
                    btn.innerHTML = 'Login to Admin';
                    btn.disabled = false;
                }
            } catch (err) {
                alert('Something went wrong');
                btn.innerHTML = 'Login to Admin';
                btn.disabled = false;
            }
        }
    
    }, []);

    return (
        <>
            
    <div className="glass-card w-full max-w-sm p-8 rounded-2xl">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-1">Admin Portal</h1>
            <p className="text-gray-400 text-sm">Secure Access</p>
        </div>
        
        <div id="error-msg" className="hidden mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center"></div>

        <div className="space-y-4">
            <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Admin Phone</label>
                <input type="tel" id="phone" placeholder="6282253984" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#4be277]" />
            </div>
            <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">6-Digit PIN</label>
                <input type="password" id="pin" placeholder="••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#4be277]" />
            </div>
            <button onClick={() => { verifyAdmin() }} id="btn-verify" className="w-full py-4 mt-4 bg-[#4be277] text-black font-bold rounded-xl hover:bg-[#3dcd64] transition-colors">
                Login to Admin
            </button>
        </div>
    </div>

    

        </>
    );
}
