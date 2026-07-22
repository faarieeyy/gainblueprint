
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        let selectedGender = 'male';

        function setGender(gender) {
            selectedGender = gender;
            const male = document.getElementById('btn-male');
            const female = document.getElementById('btn-female');
            if (male) male.classList.remove('selected');
            if (female) female.classList.remove('selected');
            if (gender === 'male' && male) {
                male.classList.add('selected');
            } else if (female) {
                female.classList.add('selected');
            }
        }

        // Set default gender on load
        setGender('male');

        async function calculateBMI() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;
            const age = parseInt(document.getElementById('age').value);

            if (!weight || !height || !age || height <= 0) return;

            try {
                const res = await fetch('/api/calculator', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'bmi', weight: weight, height: height, age, gender: selectedGender })
                });
                const result = await res.json();
                if (result.success) {
                    const data = result.data;
                    document.getElementById('bmi-value').textContent = data.bmi;
                    document.getElementById('bmi-category').textContent = data.category;
                    document.getElementById('bmi-category').style.color = data.color;
                    document.getElementById('bmi-message').textContent = data.advice;

                    const maxBMI = 40, minBMI = 10;
                    const circumference = 691;
                    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, data.bmi));
                    const progress = (clampedBMI - minBMI) / (maxBMI - minBMI);
                    const offset = circumference - (progress * circumference);

                    const ring = document.getElementById('bmi-ring');
                    if (ring) {
                        ring.style.stroke = data.color;
                        ring.style.strokeDashoffset = circumference;
                        setTimeout(() => {
                            ring.style.strokeDashoffset = offset;
                        }, 50);
                    }

                    document.getElementById('results-placeholder').classList.add('hidden');
                    document.getElementById('results-display').classList.remove('hidden');
                }
            } catch (err) {
                console.error(err);
            }
        }

        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                const menu = document.getElementById('mobile-menu');
                if (menu && menu.classList.contains('hidden')) {
                    menu.classList.remove('hidden');
                    menu.classList.add('flex');
                    this.innerHTML = '<span className="material-symbols-outlined">close</span>';
                } else if (menu) {
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
<nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-2xl">
<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
<a className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface uppercase" href="/">GAIN BLUEPRINT</a>
<div className="hidden md:flex gap-8 items-center">
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/">Home</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/journey">Journey</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/ebook">eBook</a>
<a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-sm font-label-sm" href="#">BMI</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/contact">Contact</a>
</div>
<div className="flex items-center gap-4">
<button className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded-full font-bold hover:scale-95 transition-transform text-label-sm font-label-sm">
                Get Started
            </button>
<button id="mobile-menu-btn" className="md:hidden text-on-surface p-2 flex items-center justify-center">
    <span className="material-symbols-outlined">menu</span>
</button>
</div>
</div>
<div id="mobile-menu" className="hidden md:hidden bg-surface-container-highest border-b border-white/10 w-full flex-col px-6 py-6 gap-6 shadow-2xl absolute top-full left-0">
    <a href="/" className="text-on-surface-variant font-medium text-lg block">Home</a>
    <a href="/journey" className="text-on-surface-variant font-medium text-lg block">Journey</a>
    <a href="/ebook" className="text-on-surface-variant font-medium text-lg block">eBook</a>
    <a href="#" className="text-primary font-bold text-lg block">BMI</a>
    <a href="/contact" className="text-on-surface-variant font-medium text-lg block">Contact</a>
    <button className="bg-primary text-on-primary-container px-6 py-3 mt-2 rounded-full font-headline-md font-bold text-label-sm w-full">
        Get Started
    </button>
</div>
</nav>
<main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative min-h-screen">
<header className="relative z-10 mb-16">
<h1 className="text-display-xl-mobile md:text-display-xl font-headline-lg text-primary tracking-tight">Precision Metrics</h1>
<p className="text-body-lg text-on-surface-variant max-w-2xl mt-4">Calculate your Body Mass Index with professional-grade accuracy. Our algorithm considers metabolic variance for high-performance athletes.</p>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
{/*  Input Form Section  */}
<section className="lg:col-span-5 space-y-6">
<div className="glass-card p-8 rounded-[24px]">
<h3 className="text-headline-md mb-8">Personal Parameters</h3>
<div className="space-y-8">
{/*  Gender Selection  */}
<div className="flex gap-4">
<button className="flex-1 py-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all flex flex-col items-center gap-2 group" id="btn-male" onClick={() => { setGender('male') }}>
<span className="material-symbols-outlined text-3xl group-hover:text-primary transition-colors">male</span>
<span className="text-label-sm uppercase tracking-widest opacity-60">Male</span>
</button>
<button className="flex-1 py-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all flex flex-col items-center gap-2 group" id="btn-female" onClick={() => { setGender('female') }}>
<span className="material-symbols-outlined text-3xl group-hover:text-primary transition-colors">female</span>
<span className="text-label-sm uppercase tracking-widest opacity-60">Female</span>
</button>
</div>
{/*  Numeric Inputs  */}
<div className="grid grid-cols-2 gap-6">
<div className="space-y-2">
<label className="text-label-sm uppercase tracking-widest text-on-surface-variant">Weight (kg)</label>
<input className="w-full bg-white/5 border-0 border-b border-white/20 focus:ring-0 focus:border-primary text-headline-md font-bold px-0 py-2 transition-all" id="weight" type="number" defaultValue="75"/>
</div>
<div className="space-y-2">
<label className="text-label-sm uppercase tracking-widest text-on-surface-variant">Height (cm)</label>
<input className="w-full bg-white/5 border-0 border-b border-white/20 focus:ring-0 focus:border-primary text-headline-md font-bold px-0 py-2 transition-all" id="height" type="number" defaultValue="180"/>
</div>
</div>
<div className="space-y-2">
<label className="text-label-sm uppercase tracking-widest text-on-surface-variant">Age</label>
<input className="w-full bg-white/5 border-0 border-b border-white/20 focus:ring-0 focus:border-primary text-headline-md font-bold px-0 py-2 transition-all" id="age" type="number" defaultValue="28"/>
</div>
<button className="w-full py-5 bg-primary text-on-primary font-bold rounded-full text-lg shadow-xl emerald-glow active:scale-95 transition-all" onClick={() => { calculateBMI() }}>
                            Analyze Composition
                        </button>
</div>
</div>

</section>
{/*  Results Section  */}
<section className="lg:col-span-7">
<div className="glass-card p-8 md:p-12 rounded-[32px] h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
{/*  Progress Ring Background Decoration  */}
<div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
<div className="space-y-6" id="results-placeholder">
<span className="material-symbols-outlined text-7xl text-white/10">monitoring</span>
<h3 className="text-headline-lg font-headline-lg">Analysis Pending</h3>
<p className="text-on-surface-variant max-w-sm">Enter your metrics to reveal your performance composition and categorization.</p>
</div>
<div className="hidden w-full space-y-10" id="results-display">
<div className="relative inline-flex items-center justify-center">
<svg className="w-64 h-64 transform -rotate-90">
<circle className="text-white/5" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="12"></circle></svg>
<div className="absolute flex flex-col items-center">
<span className="text-label-sm uppercase tracking-[0.3em] text-on-surface-variant mb-1">Your BMI</span>
<span className="text-7xl font-extrabold tracking-tighter text-on-surface" id="bmi-value">24.5</span>
</div>
</div>
<div className="space-y-2">
<h4 className="text-headline-lg text-primary uppercase tracking-widest font-bold" id="bmi-category">Optimal</h4>
<p className="text-body-lg text-on-surface-variant" id="bmi-message">Your current composition reflects a disciplined physiological state.</p>
</div>
<div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex">
<div className="h-full bg-blue-500 w-[18.5%] border-r border-background" title="Underweight"></div>
<div className="h-full bg-primary w-[25%] border-r border-background" title="Normal"></div>
<div className="h-full bg-yellow-500 w-[15%] border-r border-background" title="Overweight"></div>
<div className="h-full bg-red-500 flex-1" title="Obese"></div>
</div>
<div className="flex justify-between text-[10px] uppercase tracking-widest opacity-40 px-2">
<span>18.5</span>
<span>25.0</span>
<span>30.0</span>
</div>
</div>
</div>
</section>
</div>

{/*  All Fitness Calculators Grid  */}
<section className="mt-section-gap relative z-10">
<h3 className="text-headline-md mb-6 font-bold text-on-surface">More Fitness Calculators</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<a className="group glass-card p-6 rounded-2xl flex flex-col justify-between hover:bg-primary/5 border border-white/10 hover:border-primary/40 transition-all gap-4" href="/fitness-tools#protein">
<div className="space-y-2">
<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined text-xl">egg</span>
</div>
<h5 className="text-lg font-bold group-hover:text-primary transition-colors">Protein Calculator</h5>
<p className="text-xs text-on-surface-variant leading-relaxed">Calculate daily protein requirement based on body weight and activity level.</p>
</div>
<span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">Calculate Protein &rarr;</span>
</a>

<a className="group glass-card p-6 rounded-2xl flex flex-col justify-between hover:bg-primary/5 border border-white/10 hover:border-primary/40 transition-all gap-4" href="/fitness-tools#calories">
<div className="space-y-2">
<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined text-xl">local_fire_department</span>
</div>
<h5 className="text-lg font-bold group-hover:text-primary transition-colors">Calories & TDEE</h5>
<p className="text-xs text-on-surface-variant leading-relaxed">Determine your exact maintenance calories and energy expenditure.</p>
</div>
<span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">Calculate Calories &rarr;</span>
</a>

<a className="group glass-card p-6 rounded-2xl flex flex-col justify-between hover:bg-primary/5 border border-white/10 hover:border-primary/40 transition-all gap-4" href="/fitness-tools#macro">
<div className="space-y-2">
<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined text-xl">pie_chart</span>
</div>
<h5 className="text-lg font-bold group-hover:text-primary transition-colors">Macro Calculator</h5>
<p className="text-xs text-on-surface-variant leading-relaxed">Optimal breakdown of carbs, protein, and fats for your specific fitness goal.</p>
</div>
<span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">Calculate Macros &rarr;</span>
</a>

<a className="group glass-card p-6 rounded-2xl flex flex-col justify-between hover:bg-primary/5 border border-white/10 hover:border-primary/40 transition-all gap-4" href="/fitness-tools#water">
<div className="space-y-2">
<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined text-xl">water_drop</span>
</div>
<h5 className="text-lg font-bold group-hover:text-primary transition-colors">Water Intake</h5>
<p className="text-xs text-on-surface-variant leading-relaxed">Optimal daily hydration baseline based on body weight & workout intensity.</p>
</div>
<span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">Calculate Water &rarr;</span>
</a>
</div>
</section>
</main>

{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-white/5 w-full">
<div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
<div className="col-span-1 md:col-span-1">
<span className="text-headline-sm font-headline-sm font-bold text-on-surface uppercase">GAIN BLUEPRINT</span>
<p className="mt-4 text-on-surface-variant text-label-sm font-label-sm leading-relaxed">Defining the nexus of luxury aesthetics and physiological excellence.</p>
</div>
<div className="space-y-4">
<h6 className="text-on-surface font-bold text-label-sm uppercase tracking-widest">Resources</h6>
<ul className="space-y-2">
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="/fitness-tools">Fitness Calculators</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="/ebook">eBook Guide</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="/dashboard">Client Portal</a></li>
</ul>
</div>
<div className="space-y-4">
<h6 className="text-on-surface font-bold text-label-sm uppercase tracking-widest">Company</h6>
<ul className="space-y-2">
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="#">Privacy Policy</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="#">Terms of Service</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="/contact">Contact</a></li>
</ul>
</div>
<div className="space-y-4 text-right">
<h6 className="text-on-surface font-bold text-label-sm uppercase tracking-widest">Connect</h6>
<div className="flex justify-end gap-4">
<span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">public</span>
<span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">share</span>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center">
<p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">© 2024 GAIN BLUEPRINT PERFORMANCE. ALL RIGHTS RESERVED.</p>
</div>
</footer>
</>
    );
}
