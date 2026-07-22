
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('error') === 'session_ended') {
            const errDiv = document.getElementById('error-msg');
            errDiv.textContent = "Your session was ended because your account logged in from another device.";
            errDiv.classList.remove('hidden');
        }

        async function requestOTP() {
            const phone = document.getElementById('phone').value;
            if (phone.length < 10) return alert('Enter a valid phone number');
            
            const btn = document.getElementById('btn-request');
            btn.innerHTML = '<span className="material-symbols-outlined animate-spin">autorenew</span>';
            btn.disabled = true;

            try {
                const res = await fetch('/api/auth/request-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone })
                });
                const data = await res.json();
                if (data.success) {
                    document.getElementById('error-msg').classList.add('hidden');
                    document.getElementById('step-phone').classList.add('hidden');
                    document.getElementById('step-otp').classList.remove('hidden');
                    document.getElementById('display-phone').textContent = phone;
                    if (data.devOtp) { document.getElementById('display-phone').textContent += ' (OTP: ' + data.devOtp + ')'; }
                } else {
                    document.getElementById('error-msg').textContent = data.message;
                    document.getElementById('error-msg').classList.remove('hidden');
                }
            } catch (err) {
                alert('Something went wrong');
            } finally {
                btn.innerHTML = 'Send OTP <span className="material-symbols-outlined">arrow_forward</span>';
                btn.disabled = false;
            }
        }

        async function verifyOTP() {
            const phone = document.getElementById('phone').value;
            const otp = document.getElementById('otp').value;
            if (otp.length !== 6) return alert('Enter 6 digit OTP');

            const btn = document.getElementById('btn-verify');
            btn.innerHTML = 'Verifying...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, otp })
                });
                const data = await res.json();
                
                if (data.success) {
                    window.location.href = data.redirect;
                } else {
                    document.getElementById('error-msg').textContent = data.message;
                    document.getElementById('error-msg').classList.remove('hidden');
                    btn.innerHTML = 'Verify & Login';
                    btn.disabled = false;
                }
            } catch (err) {
                alert('Something went wrong');
                btn.innerHTML = 'Verify & Login';
                btn.disabled = false;
            }
        }

        function resetFlow() {
            document.getElementById('step-otp').classList.add('hidden');
            document.getElementById('step-phone').classList.remove('hidden');
            document.getElementById('otp').value = '';
            document.getElementById('error-msg').classList.add('hidden');
        }
    
    }, []);

    return (
        <>
            

    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
    
    <div className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Gain Blueprint</h1>
            <p className="text-gray-400 text-sm">Premium Member Login</p>
        </div>

        <div id="error-msg" className="hidden mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center"></div>
        <div id="success-msg" className="hidden mb-6 p-3 bg-primary/10 border border-primary/20 text-primary text-sm rounded-lg text-center"></div>

        {/*  Step 1: Phone  */}
        <div id="step-phone">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Mobile Number</label>
            <div className="flex gap-2 mb-6">
                <input type="text" defaultValue="+91" disabled readOnly className="w-16 bg-white/5 border border-white/10 rounded-xl px-3 text-center text-white" />
                <input type="tel" id="phone" placeholder="6282253984" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
            <button onClick={() => { requestOTP() }} id="btn-request" className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:scale-[0.98] transition-transform emerald-glow flex justify-center items-center gap-2">
                Send OTP <span className="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>

        {/*  Step 2: OTP  */}
        <div id="step-otp" className="hidden">
            <p className="text-sm text-gray-400 mb-6 text-center">We've sent a 6-digit code to <br /><strong id="display-phone" className="text-white"></strong></p>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold text-center">Enter OTP</label>
            <input type="text" id="otp" placeholder="••••••" maxlength="6" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-primary transition-colors mb-6" />
            
            <button onClick={() => { verifyOTP() }} id="btn-verify" className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:scale-[0.98] transition-transform emerald-glow mb-4">
                Verify & Login
            </button>
            <button onClick={() => { resetFlow() }} className="w-full text-xs text-gray-500 hover:text-white transition-colors">Change Number</button>
        </div>
    </div>

    

        </>
    );
}
