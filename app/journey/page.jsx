
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        // Simple intersection observer for reveal animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-x-10', '-translate-x-10');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up').forEach(el => observer.observe(el));

        // Track scroll for header transparency
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('py-3');
                header.classList.remove('py-4');
            } else {
                header.classList.add('py-4');
                header.classList.remove('py-3');
            }
        });
    

        // Mobile Menu Toggle
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
            <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface">
                GAIN BLUEPRINT
            </div>
            <div className="hidden md:flex items-center space-x-8">
                <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm"
                    href="/">Home</a>
                <a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-sm font-label-sm"
                    href="#">Journey</a>
                <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm"
                    href="/ebook">eBook</a>
                <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm"
                    href="/bmi">BMI</a>
                <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm"
                    href="/contact">Contact</a>
            </div>
        <div className="flex items-center gap-4">
            <button
                className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm font-bold active:scale-95 transition-all duration-300 hover:shadow-[0_0_20px_rgba(75,226,119,0.4)]">
                Get Started
            </button>
            <button id="mobile-menu-btn" className="md:hidden text-on-surface p-2 flex items-center justify-center">
                <span className="material-symbols-outlined">menu</span>
            </button>
        </div>
        </nav>
        <div id="mobile-menu" className="hidden md:hidden bg-surface-container-highest border-b border-white/10 w-full flex-col px-6 py-6 gap-6 shadow-2xl absolute top-full left-0">
            <a href="/" className="text-on-surface-variant font-medium text-lg block">Home</a>
            <a href="/journey" className="text-primary font-bold text-lg block">Journey</a>
            <a href="/ebook" className="text-on-surface-variant font-medium text-lg block">eBook</a>
            <a href="/bmi" className="text-on-surface-variant font-medium text-lg block">BMI</a>
            <a href="/contact" className="text-on-surface-variant font-medium text-lg block">Contact</a>
            <button className="bg-primary text-on-primary-container px-6 py-3 mt-2 rounded-full font-headline-md font-bold text-label-sm w-full">
                Get Started
            </button>
        </div>
    </header>
    <main className="pt-24">
        {/*  Hero Section  */}
        <section className="relative h-[921px] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10">
                </div>
                <img className="w-full h-full object-cover" alt="Fitness transformation cinematic photograph"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnNBJ-AMRO9o8WNSHEgUsjX208oFD9Bv06JlarepB-WQHCNUsJ-xAbNxJyyt5ckeNnbHhY_ivEauwcxNpYNdqi-no2YMBUNqB4H5woxPlul2aKHiAwtCTiV1V4WEtAJxmnzQdn-vQQoVm2sXNN7B6ltJmwpNvppfSuHa0XZ8u7M8RxqW3lIHpvcL7i_-bJomb0Ywz3n2iRdPueWN4Xwn0iwgRrzrDIHjIk818zFYToy96TtL2uIooNfkhfL-u9S_zwgJgBRe4-pps" />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full -mt-20 md:-mt-32">
                <div className="max-w-2xl">
                    <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest mb-4 block">THE
                        JOURNEY BEHIND THE BLUEPRINT</span>
                    <h1
                        className="text-display-xl-mobile md:text-[52px] font-display-xl text-on-surface leading-tight mb-6">
                        My <span className="text-primary">Transformation</span> Journey</h1>

                    <div className="flex gap-4">
                        <a href="#journey"
                            className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold transition-all hover:scale-105 text-center flex items-center justify-center">View
                            My Journey</a>
                        <a href="/ebook"
                            className="glass-card px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-all text-center flex items-center justify-center">The
                            Blueprint</a>
                    </div>
                </div>
            </div>
            {/*  Decorative Glow  */}
            <div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mb-64">
            </div>
        </section>
        {/*  Biography Section  */}
        <section id="journey" className="py-10 md:py-section-gap max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-headline-lg font-headline-lg text-on-surface">Built Through Research. Proven Through
                        My Journey.</h2>
                    <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                        Eight months ago, I started with one goal: to build a physique through discipline and
                        consistency. I spent countless hours researching training, nutrition, and muscle growth,
                        learning from every mistake along the way. Gain Blueprint is built from the knowledge I gained
                        and the methods I personally used to transform my physique.
                    </p>
                    <div className="glass-card p-6 flex items-center gap-6 border-l-4 border-primary">
                        <div className="text-display-xl-mobile font-display-xl text-primary">8</div>
                        <div>
                            <div className="text-on-surface font-bold">Months Transformation Journey</div>
                            <div className="text-on-surface-variant text-label-sm">Driven by research, discipline &amp;
                                consistency.</div>
                        </div>
                    </div>
                </div>
                <div className="relative group max-w-xl mx-auto">
                    <div
                        className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-all duration-700">
                    </div>
                    <img className="relative z-10 rounded-2xl w-full h-[480px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                        alt="Professional fitness coach editorial portrait" src="assets/my_journey.jpg" />
                </div>
            </div>
        </section>
        {/*  Timeline Section  */}
        <section className="py-section-gap bg-surface-container-low overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-headline-lg font-headline-lg text-on-surface">THE ROADMAP</h2>
                    <p className="text-on-surface-variant mt-2 font-bold">Every step taught me something that shaped the
                        person I am today.</p>
                </div>
                <div className="relative">
                    {/*  Vertical Line  */}
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 timeline-line"></div>
                    <div className="space-y-12 md:space-y-16 relative">
                        {/*  Step 1  */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                            <div className="w-full md:w-1/2 md:pr-16 text-center md:text-right order-2 md:order-1 relative z-10 bg-surface-container-low py-4 md:py-0 md:bg-transparent opacity-0 -translate-x-10 transition-all duration-1000 slide-in-left">
                                <span className="text-primary font-bold text-label-sm tracking-widest mb-2 block">PHASE
                                    01</span>
                                <h3 className="text-2xl md:text-headline-md font-headline-md text-on-surface mb-2">Starting From Zero
                                </h3>
                                <p className="text-on-surface-variant text-body-md">I started with motivation but very
                                    little knowledge. I trained hard, but I quickly realized that effort alone wasn't
                                    enough.</p>
                            </div>
                            <div
                                className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full emerald-gradient border-4 border-surface shadow-[0_0_20px_rgba(75,226,119,0.5)] order-1 md:order-2">
                            </div>
                            <div className="w-full md:w-1/2 md:pl-16 order-3"></div>
                        </div>
                        {/*  Step 2  */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                            <div className="w-full md:w-1/2 md:pr-16 order-2 md:order-1"></div>
                            <div
                                className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full emerald-gradient border-4 border-surface shadow-[0_0_20px_rgba(75,226,119,0.5)] order-1 md:order-2">
                            </div>
                            <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left order-3 relative z-10 bg-surface-container-low py-4 md:py-0 md:bg-transparent opacity-0 translate-x-10 transition-all duration-1000 slide-in-right">
                                <span className="text-primary font-bold text-label-sm tracking-widest mb-2 block">PHASE
                                    02</span>
                                <h3 className="text-2xl md:text-headline-md font-headline-md text-on-surface mb-2">Learning Every Day
                                </h3>
                                <p className="text-on-surface-variant text-body-md">Instead of giving up, I spent hours
                                    researching training, nutrition, recovery, and muscle growth. The more I learned,
                                    the more confident I became.</p>
                            </div>
                        </div>
                        {/*  Step 3  */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                            <div className="w-full md:w-1/2 md:pr-16 text-center md:text-right order-2 md:order-1 relative z-10 bg-surface-container-low py-4 md:py-0 md:bg-transparent opacity-0 -translate-x-10 transition-all duration-1000 slide-in-left">
                                <span className="text-primary font-bold text-label-sm tracking-widest mb-2 block">PHASE
                                    03</span>
                                <h3 className="text-2xl md:text-headline-md font-headline-md text-on-surface mb-2">Trusting the Process
                                </h3>
                                <p className="text-on-surface-variant text-body-md">I stopped chasing shortcuts and focused
                                    on consistency. Better workouts, better nutrition, and patience slowly turned
                                    knowledge into results.</p>
                            </div>
                            <div
                                className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full emerald-gradient border-4 border-surface shadow-[0_0_20px_rgba(75,226,119,0.5)] order-1 md:order-2">
                            </div>
                            <div className="w-full md:w-1/2 md:pl-16 order-3"></div>
                        </div>
                        {/*  Step 4  */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                            <div className="w-full md:w-1/2 md:pr-16 order-2 md:order-1"></div>
                            <div
                                className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full emerald-gradient border-4 border-surface shadow-[0_0_20px_rgba(75,226,119,0.5)] order-1 md:order-2">
                            </div>
                            <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left order-3 relative z-10 bg-surface-container-low py-4 md:py-0 md:bg-transparent opacity-0 translate-x-10 transition-all duration-1000 slide-in-right">
                                <span className="text-primary font-bold text-label-sm tracking-widest mb-2 block">PHASE
                                    04</span>
                                <h3 className="text-2xl md:text-headline-md font-headline-md text-on-surface mb-2">My Transformation
                                </h3>
                                <p className="text-on-surface-variant text-body-md">After eight months of learning,
                                    applying, and staying disciplined, I built the physique I had always wanted. It
                                    wasn't perfect—but it proved that the right approach works.</p>
                            </div>
                        </div>
                        {/*  Step 5  */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                            <div className="w-full md:w-1/2 md:pr-16 text-center md:text-right order-2 md:order-1 relative z-10 bg-surface-container-low py-4 md:py-0 md:bg-transparent opacity-0 -translate-x-10 transition-all duration-1000 slide-in-left">
                                <span
                                    className="text-primary font-bold text-label-sm tracking-widest mb-2 block">TODAY</span>
                                <h3 className="text-2xl md:text-headline-md font-headline-md text-on-surface mb-2">Sharing My Blueprint
                                </h3>
                                <p className="text-on-surface-variant text-body-md">Gain Blueprint is everything I learned
                                    throughout my journey, brought together in one place. My goal is simple: help others
                                    skip the confusion, train with confidence, and build a physique they're proud of.
                                </p>
                            </div>
                            <div
                                className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full emerald-gradient border-4 border-surface shadow-[0_0_20px_rgba(75,226,119,0.5)] order-1 md:order-2">
                            </div>
                            <div className="w-full md:w-1/2 md:pl-16 order-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Gallery Grid  */}
        <section className="py-10 md:py-section-gap">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-headline-lg font-headline-lg text-on-surface">Visual Archive</h2>
                    <p className="text-on-surface-variant">Moments from the journey and the daily grind.</p>
                </div>
                <div className="hidden md:flex gap-2">
                    <button
                        className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                        className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-[600px]">
                <div className="col-span-1 h-full opacity-0 -translate-x-10 transition-all duration-1000 slide-in-left">
                    <img className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                        alt="Meal prep in minimalist dark kitchen"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA5bASab2SfwsJHR826sFDh8PDYh4Mh2kOTK2m6YD8LX-yb_pyLePsoag7dU2eu1UOnKVWHOxKkkXXmsxs60KjFF7bYHD-pPMk0twbHrTIe7ezxeUla1VdVTrpXcjIN7FoMjbECF1tU9VccM1ibwMJvi-zcmqghBu4uLgHvGhd0_PeN5-PicnpAcgembNaiLda_38rzW6-XRhHdjWVYIK3Dx8mico_JDm0r6KHFfXGKz937HBgjaWI-NGVqXzPuEE_eIQp218FJa4" />
                </div>
                <div className="col-span-1 grid grid-rows-2 gap-4 h-full opacity-0 translate-y-10 transition-all duration-1000 slide-in-up">
                    <img className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-500" alt="Smartwatch displaying fitness data"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwOKbr7oxxpWqFFY-MMf3-DirEfViPDoqPDr69DFyNAxqF4hZ9s1HpAm6a_QLdEmJb-TvAKBKBrxwEHnh9Xa3yfgwNyBbVj25sUOZJxz0aDIW2MNCrov2cLeMXppRcS3Jod16R1pa5on-rn73zGPuj4KITEhikYUV7piC8-3NzcGXGmbcsxmGVKiWAbH6LX-XuWDxXx_SkeaOCg-mmmQDYOuhMODNerKB92j_tEOfKVlMH0H1TAcDIaYqN6vvGYLA19Me5Fzkqyr0" />
                    <img className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-500" alt="Heavy barbell deadlift in dark gym"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7WDpgnHPp4lQLuFR2N3iE5uO5smnVMst_7LjAXjqD-njRTFeHFOv0DPsgBwfgvLJQUcir6xnZcQjJXQryOEszdBunVvV92sF20bP1c4SMEy6EU-oxImztaf6UVT2JDr1Br0U2RTWRS-gFHMq2riGD6onPkLVFXIGBCiJ81BJdZBLBynZPsbrUAfYth7QB9fxGSV-vIbDdYZnsvXIIvQvja5HDrA9Y3JMZOPeXSkrOQvcGPmLUnSHak7MRi_bLcAufEjqmtzVBCX0" />
                </div>
                <div className="col-span-2 h-full opacity-0 translate-x-10 transition-all duration-1000 slide-in-right">
                    <img className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                        alt="Modern luxury gym at night with emerald LED lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCig1qPW9w6FMJxyO3rOF9_A2lI1PXdhNXSQbcb_YqpbbzBNULsfapQbVCHhin5CRnEuCMn6TG_PsrxF90rHk5W0LiSlHX34CGB4iwLk71tenbOiLNSiRzMyd07wXD1aO1qozM094cO4xRtbWPrYQmJ4HmK93OWGvZ27QEjz-RJ3cazyTgfW8n-yVSxc3ZF9R6JGpVpB7X5a4O7QsTELTcTXRcRgpQMjsVBMxsrSen-IMjTWnRTb8J8zCWCtn-IEFR-U8t3dfvYEtc" />
                </div>
            </div>
        </section>
        {/*  Motivational Quote  */}
        <section className="py-32 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-surface-container-highest/30"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <blockquote
                    className="text-2xl md:text-headline-lg font-display-xl italic text-on-surface leading-tight">
                    "Great physiques are not created by luck. They are engineered through discipline, patience, and a
                    blueprint followed every single day."
                </blockquote>
                <cite className="mt-8 block text-on-surface-variant font-label-sm tracking-widest uppercase">— FOUNDER, GAIN
                    BLUEPRINT</cite>
            </div>
        </section>
        {/*  CTA Section  */}
        <section className="py-10 md:py-section-gap max-w-7xl mx-auto px-6">
            <div
                className="glass-card max-w-4xl mx-auto p-6 md:p-10 text-center relative overflow-hidden border-2 border-primary/20">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
                <h2
                    className="text-3xl md:text-display-xl font-display-xl text-on-surface mb-6 relative z-10 leading-tight">
                    <span className="text-primary">The Blueprint</span> I Wish I Had
                </h2>
                <p className="text-sm md:text-body-lg font-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto relative z-10">
                    Years of mistakes, lessons, and progress turned into one simple system — built to help you train
                    smarter, eat better, and create a body you’re proud of.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                    <button
                        className="bg-primary text-on-primary px-8 py-3 md:px-12 md:py-5 rounded-full font-bold text-sm md:text-lg hover:shadow-[0_0_30px_rgba(75,226,119,0.5)] transition-all flex items-center justify-center gap-2 md:gap-3">
                        <span className="material-symbols-outlined text-base md:text-xl">download</span>
                        Download the eBook
                    </button>
                </div>
            </div>
        </section>
    </main>
    {/*  Footer  */}
    <footer className="bg-surface-container-lowest border-t border-white/5 mt-section-gap">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
                <div className="text-headline-sm font-headline-sm font-bold text-on-surface mb-6">GAIN BLUEPRINT</div>
                <p className="text-on-surface-variant text-body-md">Redefining human performance through scientific
                    precision and editorial luxury.</p>
            </div>
            <div className="col-span-1">
                <h4 className="text-on-surface font-bold mb-6">Navigation</h4>
                <ul className="space-y-4">
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="/">Home</a></li>
                    <li><a className="text-primary font-label-sm font-label-sm" href="#">Journey</a></li>
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="#">eBook</a></li>
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="#">BMI</a></li>
                </ul>
            </div>
            <div className="col-span-1">
                <h4 className="text-on-surface font-bold mb-6">Legal</h4>
                <ul className="space-y-4">
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="#">Privacy Policy</a></li>
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="#">Terms of Service</a></li>
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="#">Disclaimer</a></li>
                    <li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm"
                            href="#">Affiliate Program</a></li>
                </ul>
            </div>
            <div className="col-span-1">
                <h4 className="text-on-surface font-bold mb-6">Social</h4>
                <div className="flex gap-4">
                    <a className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary transition-colors"
                        href="#">
                        <span className="material-symbols-outlined text-sm">share</span>
                    </a>
                    <a className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary transition-colors"
                        href="#">
                        <span className="material-symbols-outlined text-sm">groups</span>
                    </a>
                    <a className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary transition-colors"
                        href="#">
                        <span className="material-symbols-outlined text-sm">mail</span>
                    </a>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center">
            <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">© 2024 GAIN
                BLUEPRINT PERFORMANCE. ALL RIGHTS RESERVED.</p>
        </div>
    </footer>
    
    

        </>
    );
}
