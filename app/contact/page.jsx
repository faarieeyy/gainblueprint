
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
const revEls = document.querySelectorAll('.reveal');
const doRev = () => { revEls.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight*0.85) el.classList.add('active'); }); };
window.addEventListener('scroll', doRev); doRev();


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

    }, []);

    return (
        <>
            

{/*  Navigation  */}
<nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
<div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
    <a href="/" className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface uppercase hover:text-primary transition-colors">GAIN BLUEPRINT</a>
    <div className="hidden md:flex items-center gap-8">
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/">Home</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/journey">Journey</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/ebook">eBook</a>
        <div className="relative group">
            <button className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm flex items-center gap-1">Fitness Tools <span className="material-symbols-outlined text-base">expand_more</span></button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/fitness-tools#bmi" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">monitor_weight</span> BMI Calculator</a>
                <a href="/fitness-tools#protein" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">egg</span> Protein Calculator</a>
                <a href="/fitness-tools#calories" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">local_fire_department</span> Calories Calculator</a>
                <a href="/fitness-tools#macro" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">pie_chart</span> Macro Calculator</a>
                <a href="/fitness-tools#water" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"><span className="material-symbols-outlined text-base text-primary">water_drop</span> Water Calculator</a>
            </div>
        </div>
        <a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-sm font-label-sm" href="/contact">Contact</a>
    </div>
    <a href="/ebook" className="bg-primary text-on-primary-container px-6 py-2.5 rounded-full font-bold text-label-sm hover:scale-95 transition-transform hidden md:block">Get eBook</a>
    <button className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl bg-white/5 border border-white/10" onClick={() => { document.getElementById('mob-menu').classList.toggle('hidden') }}>
        <span className="w-5 h-0.5 bg-on-surface"></span><span className="w-5 h-0.5 bg-on-surface"></span><span className="w-5 h-0.5 bg-on-surface"></span>
    </button>
</div>
<div className="md:hidden hidden bg-surface/95 border-t border-white/10" id="mob-menu">
    <div className="px-6 py-6 flex flex-col gap-4">
        <a className="text-on-surface-variant text-label-sm" href="/">Home</a>
        <a className="text-on-surface-variant text-label-sm" href="/journey">Journey</a>
        <a className="text-on-surface-variant text-label-sm" href="/ebook">eBook</a>
        <a className="text-on-surface-variant text-label-sm" href="/fitness-tools">Fitness Tools</a>
        <a className="text-primary font-bold text-label-sm" href="/contact">Contact</a>
    </div>
</div>
</nav>

{/*  Floating WhatsApp  */}
<a href="https://wa.me/6282253984?text=Hi%20Coach%2C%20I%20want%20to%20purchase%20the%20Lean%20Gain%20Blueprint%20for%20%E2%82%B9399." target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_30px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    <span className="absolute right-16 bg-surface/90 backdrop-blur-xl border border-white/10 text-on-surface text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">Chat with Coach</span>
</a>

<main className="pt-24">
{/*  Hero  */}
<section className="py-10 md:py-16 px-6 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"></div>
    <div className="max-w-2xl mx-auto reveal">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-label-sm mb-6 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight leading-tight">Let's <span className="text-primary">Connect</span></h1>
        <p className="text-on-surface-variant text-body-lg">Have a question? Want to purchase the guide? Or just want to chat about your fitness journey? I'm here to help.</p>
    </div>
</section>

{/*  Contact Cards  */}
<section className="py-12 px-6">
<div className="max-w-5xl mx-auto">
    <div className="flex flex-wrap justify-center gap-8 md:gap-12 reveal">
        {/*  WhatsApp  */}
        <a href="https://wa.me/6282253984?text=Hi%20Coach%2C%20I%20want%20to%20purchase%20the%20Lean%20Gain%20Blueprint%20for%20%E2%82%B9399.%20Please%20guide%20me." target="_blank" className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-surface-container-highest/80 hover:scale-110 transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] border border-white/5" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-8 h-8 md:w-10 md:h-10"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        {/*  Instagram  */}
        <a href="https://www.instagram.com/ii.ajza.l?igsh=MWd3d3JvOWRzd2wyaQ%3D%3D&utm_source=qr" target="_blank" className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-surface-container-highest/80 hover:scale-110 transition-all hover:shadow-[0_0_20px_rgba(220,39,67,0.3)] border border-white/5" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" fill="url(#ig-grad)" viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
                <defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor: '#f09433', }}/><stop offset="25%" style={{stopColor: '#e6683c', }}/><stop offset="50%" style={{stopColor: '#dc2743', }}/><stop offset="75%" style={{stopColor: '#cc2366', }}/><stop offset="100%" style={{stopColor: '#bc1888', }}/></linearGradient></defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        </a>
        {/*  Email  */}
        <a href="mailto:coach@gainblueprint.com" className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-surface-container-highest/80 hover:scale-110 transition-all hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] border border-white/5" title="Email">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary" style={{fontVariationSettings: "\'FILL\' 1"}}>mail</span>
        </a>

    </div>
</div>
</section>

{/*  Business Hours & Info  */}
<section className="py-12 px-6 bg-surface-container-lowest">
<div className="max-w-lg mx-auto">
    {/*  Buy Guide CTA  */}
    <div className="reveal text-center flex flex-col items-center">
        <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-3">Most Popular</span>
        <h3 className="font-bold text-on-surface text-xl mb-2">Lean Gain Blueprint</h3>
        <div className="flex items-baseline gap-1 mb-3">
            <span className="text-4xl font-extrabold text-primary">₹399</span>
            <span className="text-on-surface-variant text-xs">one-time</span>
        </div>
        <p className="text-on-surface-variant text-sm max-w-sm mx-auto mb-6">The complete muscle-building nutrition guide. Get instant access after WhatsApp payment verification.</p>
        
        <button onClick={() => { openBuyModal() }}
           className="px-8 py-3 bg-primary text-on-primary-container font-bold rounded-full text-center hover:shadow-[0_0_20px_rgba(75,226,119,0.4)] transition-all flex items-center justify-center gap-2 text-sm w-full md:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Buy on WhatsApp
        </button>
    </div>
</div>
</section>

{/*  Instagram Follow Section  */}
<section className="py-10 md:py-16 px-6 text-center">
<div className="max-w-3xl mx-auto reveal">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="url(#ig-grad2)" viewBox="0 0 24 24" className="w-8 h-8">
            <defs><linearGradient id="ig-grad2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor: '#f09433', }}/><stop offset="100%" style={{stopColor: '#bc1888', }}/></linearGradient></defs>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
    </div>
    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Follow the Journey</h2>
    <p className="text-on-surface-variant mb-8">Daily fitness content, meal ideas, transformation updates, and training tips. Stay motivated every day.</p>
    <a href="https://www.instagram.com/ii.ajza.l?igsh=MWd3d3JvOWRzd2wyaQ%3D%3D&utm_source=qr" target="_blank" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] transition-all hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        Follow @ii.ajza.l
    </a>
</div>
</section>
</main>

{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-white/5 py-10 px-6">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
    <div>
        <a href="/" className="font-extrabold text-on-surface uppercase tracking-tighter hover:text-primary transition-colors">GAIN BLUEPRINT</a>
        <p className="text-on-surface-variant text-xs mt-1">© 2024 GAIN BLUEPRINT. ALL RIGHTS RESERVED.</p>
    </div>
    <div className="flex gap-6 text-sm text-on-surface-variant">
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Refund Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
    </div>
    <div className="flex gap-3">
        <a href="https://www.instagram.com/ii.ajza.l?igsh=MWd3d3JvOWRzd2wyaQ%3D%3D&utm_source=qr" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-pink-500/40 transition-all"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-pink-400"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
        <a href="https://wa.me/6282253984" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#25D366]/40 transition-all"><svg xmlns="http://www.w3.org/2000/svg" fill="#25D366" viewBox="0 0 24 24" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
        <a href="mailto:coach@gainblueprint.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/40 transition-all text-primary"><span className="material-symbols-outlined text-base">mail</span></a>
    </div>
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
