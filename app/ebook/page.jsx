
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        // Micro-interaction for table of contents
        document.querySelectorAll('.group').forEach(item => {
            const chapterNum = item.querySelector('.chapter-num');
            if (!chapterNum) return;
            item.addEventListener('mouseenter', () => {
                chapterNum.classList.replace('opacity-40', 'opacity-100');
            });
            item.addEventListener('mouseleave', () => {
                chapterNum.classList.replace('opacity-100', 'opacity-40');
            });
        });

        // Sticky Navbar subtle animation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('header');
            if (window.scrollY > 50) {
                nav.classList.add('py-2');
                nav.classList.remove('py-4');
            } else {
                nav.classList.add('py-4');
                nav.classList.remove('py-2');
            }
        });
    

    function openBuyModal() {
        const modal = document.getElementById('buyModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    
    function closeBuyModal() {
        const modal = document.getElementById('buyModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    function submitBuyForm(e) {
        e.preventDefault();
        const name = document.getElementById('buyName').value;
        const phone = document.getElementById('buyPhone').value;
        const email = document.getElementById('buyEmail').value;
        const query = document.getElementById('buyQuery').value;
        
        const message = `Hi Coach, I want to purchase the Lean Gain Blueprint.\n\n*Name:* ${name}\n*Mobile:* ${phone}\n*Email:* ${email}\n*Query:* ${query}`;
        
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/6282253984?text=${encodedMessage}`;
        
        window.open(waLink, '_blank');
        closeBuyModal();
    }


    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                menu.classList.add('flex');
                this.innerHTML = '<span className="material-symbols-outlined">close</span>';
            } else {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                this.innerHTML = '<span className="material-symbols-outlined">menu</span>';
            }
        });
    }

    }, []);

    return (
        <>
            

{/*  TopNavBar  */}
<header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-2xl">
<nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
<a className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface" href="/">
                GAIN BLUEPRINT
            </a>
<div className="hidden md:flex items-center space-x-8">
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/">Home</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/journey">Journey</a>
<a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-sm font-label-sm" href="#">eBook</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/bmi">BMI</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/contact">Contact</a>
</div>
<div className="flex items-center gap-4">
<button onClick={() => { openBuyModal() }} className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold hover:scale-95 transition-transform text-label-sm font-label-sm">
                Get Started
            </button>
<button id="mobile-menu-btn" className="md:hidden text-on-surface p-2 flex items-center justify-center">
    <span className="material-symbols-outlined">menu</span>
</button>
</div>
</nav>
<div id="mobile-menu" className="hidden md:hidden bg-surface-container-highest border-b border-white/10 w-full flex-col px-6 py-6 gap-6 shadow-2xl absolute top-full left-0">
    <a href="/" className="text-on-surface-variant font-medium text-lg block">Home</a>
    <a href="/journey" className="text-on-surface-variant font-medium text-lg block">Journey</a>
    <a href="#" className="text-primary font-bold text-lg block">eBook</a>
    <a href="/bmi" className="text-on-surface-variant font-medium text-lg block">BMI</a>
    <a href="/contact" className="text-on-surface-variant font-medium text-lg block">Contact</a>
    <button onClick={() => { openBuyModal() }} className="bg-primary text-on-primary-container px-6 py-3 mt-2 rounded-full font-headline-md font-bold text-label-sm w-full">
        Get Started
    </button>
</div>
</header>
<main className="pt-32">
{/*  Hero Section  */}
<section className="relative min-h-[92vh] flex items-center justify-start overflow-hidden -mt-32">
<div className="absolute inset-0 z-0">
    {/*  Strong dark-to-transparent gradient on the left so text is readable, image shows clearly on right  */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0e150e] from-30% via-[#0e150e]/70 via-55% to-transparent z-10"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0e150e]/40 via-transparent to-[#0e150e] z-10"></div>
    <img className="w-full h-full object-cover object-center" alt="Gain Blueprint background" src="./assets/images/ebook-bg.jpg"/>
</div>
<div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-40 pb-24">
    <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-label-sm font-label-sm tracking-wider uppercase text-white/80">Best Seller 2024</span>
        </div>
        <h1 className="text-display-xl-mobile md:text-display-xl font-display-xl mb-6 leading-tight text-white">
            Gain <span className="text-primary">Blueprint</span>
        </h1>
        <p className="text-body-lg font-body-lg text-white/80 mb-8 max-w-md">
            The ultimate professional guide to building high-density muscle mass while maintaining a razor-sharp aesthetic. Scientifically structured for peak natural performance.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => { openBuyModal() }} className="w-full sm:w-auto bg-primary text-black px-10 py-5 rounded-full text-lg font-bold emerald-glow hover:scale-[0.98] transition-transform flex items-center justify-center gap-3">
                Buy Now — ₹399
                <span className="material-symbols-outlined">arrow_forward</span>
            </button>

        </div>
    </div>
</div>
</section>
{/*  What's Included Grid  */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-section-gap">
<div className="text-center mb-16">
<h2 className="text-headline-lg font-headline-lg mb-4">What's <span className="text-primary">Included</span></h2>
<p className="text-on-surface-variant max-w-2xl mx-auto">A comprehensive system that leaves no stone unturned in your pursuit of a world-class physique.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/*  Card 1  */}
<div className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500">
<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary">fitness_center</span>
</div>
<h3 className="text-headline-md font-headline-md mb-3">Hypertrophy Cycles</h3>
<p className="text-on-surface-variant font-body-md">Detailed 12-week block periodization focusing on mechanical tension and metabolic stress for maximum growth.</p>
</div>
{/*  Card 2  */}
<div className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500">
<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary">restaurant</span>
</div>
<h3 className="text-headline-md font-headline-md mb-3">Macro Manual</h3>
<p className="text-on-surface-variant font-body-md">Calculate your specific metabolic needs with our custom formulas designed for clean bulking without the fat.</p>
</div>
{/*  Card 3  */}
<div className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500">
<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary">insights</span>
</div>
<h3 className="text-headline-md font-headline-md mb-3">Recovery Science</h3>
<p className="text-on-surface-variant font-body-md">Optimizing sleep cycles, nervous system recovery, and supplement protocols for professional-grade results.</p>
</div>
</div>
</section>
{/*  Table of Contents & Feature Details  */}
<section className="bg-black relative py-16 md:py-section-gap overflow-hidden">
<div className="absolute inset-0 z-0">
    <div className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] bg-primary/5 blur-[120px] rounded-full"></div>
    <div className="absolute -bottom-[500px] -left-[500px] w-[1000px] h-[1000px] bg-primary/5 blur-[120px] rounded-full"></div>
</div>
<div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
{/*  Table of Contents  */}
<div className="lg:col-span-3">
<h3 className="text-4xl md:text-5xl font-extrabold mb-10 text-white tracking-tight">Table of <span className="text-[#4ADE80]">Contents</span></h3>
<div className="space-y-2.5">
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">01</span>
            <span className="text-white font-bold text-base">Welcome</span>
        </div>
        <span className="text-gray-400 text-xs">Page 02</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">02</span>
            <span className="text-white font-bold text-base">Training Splits</span>
        </div>
        <span className="text-gray-400 text-xs">Page 02</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">03</span>
            <span className="text-white font-bold text-base">Bro Split</span>
        </div>
        <span className="text-gray-400 text-xs">Page 02</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">04</span>
            <span className="text-white font-bold text-base">Push • Pull • Legs</span>
        </div>
        <span className="text-gray-400 text-xs">Page 04</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">05</span>
            <span className="text-white font-bold text-base">Diet Plan</span>
        </div>
        <span className="text-gray-400 text-xs">Page 05</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">06</span>
            <span className="text-white font-bold text-base">Nutrition</span>
        </div>
        <span className="text-gray-400 text-xs">Page 05</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">07</span>
            <span className="text-white font-bold text-base">Recovery</span>
        </div>
        <span className="text-gray-400 text-xs">Page 06</span>
    </div>
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E2320] border border-primary/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center gap-5">
            <span className="text-[#4ADE80] font-bold text-base w-5">08</span>
            <span className="text-white font-bold text-base">Final Tips</span>
        </div>
        <span className="text-gray-400 text-xs">Page 06</span>
    </div>
</div>
</div>
{/*  Bento Style Sidebar  */}
<div className="lg:col-span-2 space-y-6 lg:sticky lg:top-32">
<div className="glass-card p-8 rounded-2xl overflow-hidden relative">
<div className="absolute top-0 right-0 p-4">
<span className="material-symbols-outlined text-[#4ADE80] text-4xl opacity-20">verified</span>
</div>
<h4 className="text-2xl font-bold text-white mb-4">Elite Support</h4>
<p className="text-gray-300 mb-6">Gain access to our private community of aesthetic-driven athletes for peer support and weekly Q&amp;As.</p>
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-[#4ADE80] w-[85%] rounded-full shadow-[0_0_10px_rgba(74,222,128,0.4)]"></div>
</div>
<p className="mt-4 text-xs font-bold uppercase tracking-tighter text-[#4ADE80]">85% Success Rate Reported</p>
</div>
<div className="bg-[#4ADE80] p-8 rounded-2xl text-black shadow-[0_0_30px_rgba(74,222,128,0.2)]">
<h4 className="text-2xl font-black mb-2">Buy Once, Own Forever</h4>
<p className="font-medium opacity-90 mb-6 text-black/80">Receive all future editions and supplemental guides free of charge.</p>
<button onClick={() => { openBuyModal() }} className="w-full bg-black text-[#4ADE80] py-4 rounded-xl font-bold hover:scale-[0.98] transition-transform">
                            Claim My Access
                        </button>
</div>
</div>
</div>
</section>
{/*  Final CTA  */}
<section className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
<h2 className="text-display-xl-mobile md:text-display-xl font-display-xl mb-8">Ready to <span className="text-primary italic">Transform?</span></h2>
<p className="text-body-lg font-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto">Stop guessing and start following a blueprint that has been refined by professionals for elite results.</p>
<div className="relative inline-block group">
<div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#22c55e] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
<button onClick={() => { openBuyModal() }} className="relative bg-primary text-on-primary px-16 py-6 rounded-full text-xl font-extrabold flex items-center gap-4 hover:scale-105 transition-all">
                    GET THE BLUEPRINT NOW
                    <span className="material-symbols-outlined">download</span>
</button>
</div>
<div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12 opacity-50">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined">security</span>
<span className="text-label-sm font-label-sm">SECURE PAYMENTS</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined">verified_user</span>
<span className="text-label-sm font-label-sm">30-DAY GUARANTEE</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined">bolt</span>
<span className="text-label-sm font-label-sm">INSTANT DOWNLOAD</span>
</div>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-white/5">
<div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
<div className="md:col-span-1">
<a className="text-headline-sm font-headline-sm font-bold text-on-surface mb-6 block" href="/">
                    GAIN BLUEPRINT
                </a>
<p className="text-on-surface-variant text-body-md">
                    Professional fitness coaching and nutritional blueprints for high-performance individuals.
                </p>
</div>
<div className="space-y-4">
<h5 className="text-on-surface font-bold">Programs</h5>
<ul className="space-y-2">
<li><a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Mass Foundation</a></li>
<li><a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Hyper-Cut Cycle</a></li>
<li><a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Peak Performance</a></li>
</ul>
</div>
<div className="space-y-4">
<h5 className="text-on-surface font-bold">Resources</h5>
<ul className="space-y-2">
<li><a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Free Articles</a></li>
<li><a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Podcast</a></li>
<li><a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">BMI Calculator</a></li>
</ul>
</div>
<div className="space-y-4">
<h5 className="text-on-surface font-bold">Company</h5>
<div className="flex flex-col space-y-2">
<a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Terms of Service</a>
<a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Disclaimer</a>
<a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary transition-colors" href="#">Affiliate Program</a>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center md:text-left">
<p className="text-label-sm font-label-sm text-on-surface-variant">© 2024 GAIN BLUEPRINT PERFORMANCE. ALL RIGHTS RESERVED.</p>
</div>
</footer>

{/*  Buy Modal  */}
<div id="buyModal" className="fixed inset-0 z-[100] hidden items-center justify-center">
    {/*  Backdrop  */}
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { closeBuyModal() }}></div>
    {/*  Modal Content  */}
    <div className="relative bg-surface border border-white/10 rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl transform transition-all">
        {/*  Header  */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Purchase Details</h3>
            <button onClick={() => { closeBuyModal() }} className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        {/*  Form  */}
        <form onSubmit={(e) => { e.preventDefault(); submitBuyForm(e); }} className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input type="text" id="buyName" required className="w-full bg-[#1E2320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your Name" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
                <input type="tel" id="buyPhone" required className="w-full bg-[#1E2320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your Mobile Number" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input type="email" id="buyEmail" required className="w-full bg-[#1E2320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="you@example.com" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">What are you looking for?</label>
                <textarea id="buyQuery" required rows="3" className="w-full bg-[#1E2320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="I want to purchase the Lean Gain Blueprint..."></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-black font-bold text-lg py-4 rounded-xl hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(75,226,119,0.3)]">
                Continue to WhatsApp
                <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
        </form>
    </div>
</div>




        </>
    );
}
