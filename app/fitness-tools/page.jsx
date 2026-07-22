
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
// === REVEAL ===
const revealEls = document.querySelectorAll('.reveal');
const doReveal = () => {
    const trigger = window.innerHeight * 0.85;
    revealEls.forEach(el => { if (el.getBoundingClientRect().top < trigger) el.classList.add('active'); });
};
window.addEventListener('scroll', doReveal);
doReveal();

// === BMI ===
let bmiUnit = 'metric';
function setBmiUnit(unit, btn) {
    bmiUnit = unit;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const wSlider = document.getElementById('bmi-weight');
    const hSlider = document.getElementById('bmi-height');
    if (unit === 'imperial') {
        wSlider.min=66; wSlider.max=440; wSlider.value=154;
        hSlider.min=39; hSlider.max=98; hSlider.value=69;
    } else {
        wSlider.min=30; wSlider.max=200; wSlider.value=70;
        hSlider.min=100; hSlider.max=250; hSlider.value=175;
    }
    updateBmiSlider('weight'); updateBmiSlider('height');
}
function updateBmiSlider(type) {
    const w = document.getElementById('bmi-weight').value;
    const h = document.getElementById('bmi-height').value;
    const wUnit = bmiUnit === 'metric' ? 'kg' : 'lb';
    const hUnit = bmiUnit === 'metric' ? 'cm' : 'in';
    if (type === 'weight') document.getElementById('bmi-weight-display').textContent = `${w} ${wUnit}`;
    if (type === 'height') document.getElementById('bmi-height-display').textContent = `${h} ${hUnit}`;
}
function calculateBMI() {
    let w = parseFloat(document.getElementById('bmi-weight').value);
    let h = parseFloat(document.getElementById('bmi-height').value);
    if (bmiUnit === 'imperial') { w = w * 0.453592; h = h * 2.54; }
    const hM = h / 100;
    const bmi = (w / (hM * hM)).toFixed(1);
    const circle = document.getElementById('bmi-circle');
    const circumference = 339.3;
    const pct = Math.min(bmi / 45, 1);
    circle.style.strokeDashoffset = circumference - (pct * circumference);
    document.getElementById('bmi-value').textContent = bmi;
    let cat, advice, color;
    if (bmi < 18.5) { cat = 'Underweight'; advice = 'Focus on increasing calorie intake with a lean bulk approach.'; color = '#60a5fa'; }
    else if (bmi < 25) { cat = 'Healthy Weight ✓'; advice = 'Great! Maintain with balanced nutrition and consistent training.'; color = '#4be277'; }
    else if (bmi < 30) { cat = 'Overweight'; advice = 'A modest calorie deficit with high protein intake can help.'; color = '#facc15'; }
    else { cat = 'Obese'; advice = 'Consult a healthcare professional and start with a structured fat loss plan.'; color = '#f87171'; }
    circle.style.stroke = color;
    document.getElementById('bmi-value').style.color = color;
    document.getElementById('bmi-category').textContent = cat;
    document.getElementById('bmi-advice').textContent = advice;
}
updateBmiSlider('weight'); updateBmiSlider('height');

// === PROTEIN GENDER ===
let protGender = 'male';
function setProtGender(gender, btn) {
    protGender = gender;
    document.querySelectorAll('#prot-gender-male, #prot-gender-female').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// === PROTEIN (LBM-Based via Boer Formula) ===
function calculateProtein() {
    const w = parseFloat(document.getElementById('prot-weight').value);
    const h = parseFloat(document.getElementById('prot-height').value);
    const goal = document.getElementById('prot-goal').value;
    const activity = document.getElementById('prot-activity').value;

    if (!w || w <= 0) { alert('Please enter a valid weight.'); return; }
    if (!h || h <= 0) { alert('Please enter your height.'); return; }

    // === Boer Formula for Lean Body Mass (LBM) ===
    // More accurate than James/Hume for athletic populations
    let lbm;
    if (protGender === 'male') {
        lbm = (0.407 * w) + (0.267 * h) - 19.2;
    } else {
        lbm = (0.252 * w) + (0.473 * h) - 48.3;
    }
    lbm = Math.max(lbm, w * 0.6); // Safety floor — LBM can't be less than 60% of body weight

    // === Estimated Body Fat % ===
    const bfPct = Math.round(((w - lbm) / w) * 100);
    const bmi = (w / ((h/100) ** 2)).toFixed(1);

    // === Activity multiplier on top of base range ===
    // Base ranges per kg of LBM (higher than per total BW as it's per lean tissue)
    const activityMult = { low: 0, moderate: 0.1, high: 0.2, athlete: 0.3 };
    const mult = activityMult[activity];

    // Goal-based ranges per kg LBM
    const baseRanges = {
        fatloss:     [2.0 + mult, 2.4 + mult],
        maintenance: [1.8 + mult, 2.2 + mult],
        leanbulk:    [1.8 + mult, 2.2 + mult],
        musclegain:  [2.0 + mult, 2.4 + mult]
    };
    const goalLabels = {
        fatloss: 'Fat Loss', maintenance: 'Maintenance',
        leanbulk: 'Lean Bulk', musclegain: 'Muscle Gain'
    };

    const [minPkg, maxPkg] = baseRanges[goal];
    const minG = Math.round(minPkg * lbm);
    const maxG = Math.round(maxPkg * lbm);
    const recG = Math.round(((minPkg + maxPkg) / 2) * lbm);

    // Meals distribution (4 meals = ~25% each for muscle protein synthesis)
    const perMeal = Math.round(recG / 4);

    // Body fat category
    let bfLabel, bfColor;
    if (protGender === 'male') {
        if (bfPct < 10) { bfLabel = 'Very Lean (Athletic)'; bfColor = 'text-blue-400'; }
        else if (bfPct < 20) { bfLabel = 'Fit Range'; bfColor = 'text-primary'; }
        else if (bfPct < 25) { bfLabel = 'Average'; bfColor = 'text-yellow-400'; }
        else { bfLabel = 'Excess Body Fat'; bfColor = 'text-red-400'; }
    } else {
        if (bfPct < 20) { bfLabel = 'Very Lean (Athletic)'; bfColor = 'text-blue-400'; }
        else if (bfPct < 28) { bfLabel = 'Fit Range'; bfColor = 'text-primary'; }
        else if (bfPct < 35) { bfLabel = 'Average'; bfColor = 'text-yellow-400'; }
        else { bfLabel = 'Excess Body Fat'; bfColor = 'text-red-400'; }
    }

    document.getElementById('prot-result').innerHTML = `
        <h3 className="font-bold text-on-surface text-lg mb-1">Your Protein Targets</h3>
        <p className="text-xs text-on-surface-variant mb-4">Goal: <span className="text-primary font-bold">${goalLabels[goal]}</span> &bull; Based on LBM, not total weight</p>

        {/*  LBM Stats Row  */}
        <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-white/5 rounded-xl p-2.5 text-center">
                <p className="text-xs text-on-surface-variant mb-0.5">Body Weight</p>
                <p className="font-extrabold text-on-surface text-sm">${w} kg</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-primary mb-0.5">Lean Mass (LBM)</p>
                <p className="font-extrabold text-primary text-sm">${lbm.toFixed(1)} kg</p>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 text-center">
                <p className="text-xs text-on-surface-variant mb-0.5">Est. Body Fat</p>
                <p className="font-extrabold text-sm ${bfColor}">${bfPct}%</p>
            </div>
        </div>
        <p className="text-xs text-on-surface-variant mb-4 flex items-center gap-1"><span className="material-symbols-outlined text-base text-primary">info</span> Body Fat Category: <span className="font-bold ${bfColor} ml-1">${bfLabel}</span></p>

        {/*  Protein Targets  */}
        <div className="space-y-3">
            <div className="bg-white/5 rounded-2xl p-3.5 flex justify-between items-center">
                <div><span className="text-on-surface-variant text-sm">Minimum</span><p className="text-xs text-on-surface-variant/60">${minPkg.toFixed(1)}g per kg LBM</p></div>
                <span className="text-xl font-extrabold text-on-surface">${minG}<span className="text-xs font-normal text-on-surface-variant ml-1">g/day</span></span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3.5 flex justify-between items-center">
                <div><span className="text-primary font-bold text-sm">Recommended ★</span><p className="text-xs text-primary/60">${((minPkg+maxPkg)/2).toFixed(1)}g per kg LBM</p></div>
                <span className="text-xl font-extrabold text-primary">${recG}<span className="text-xs font-normal text-primary/70 ml-1">g/day</span></span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3.5 flex justify-between items-center">
                <div><span className="text-on-surface-variant text-sm">Maximum</span><p className="text-xs text-on-surface-variant/60">${maxPkg.toFixed(1)}g per kg LBM</p></div>
                <span className="text-xl font-extrabold text-on-surface">${maxG}<span className="text-xs font-normal text-on-surface-variant ml-1">g/day</span></span>
            </div>
        </div>

        {/*  Per Meal Tip  */}
        <div className="mt-4 p-3 bg-white/5 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings: "\'FILL\' 1"}}>restaurant</span>
            <p className="text-xs text-on-surface-variant">Aim for <span className="font-bold text-on-surface">~${perMeal}g per meal</span> across 4 meals for optimal muscle protein synthesis.</p>
        </div>
        <p className="text-xs text-on-surface-variant/50 mt-3">Formula: Boer LBM &bull; BMI: ${bmi}</p>`;
}

// === CALORIES ===
function calculateCalories() {
    const age = parseFloat(document.getElementById('cal-age').value);
    const gender = document.getElementById('cal-gender').value;
    const w = parseFloat(document.getElementById('cal-weight').value);
    const h = parseFloat(document.getElementById('cal-height').value);
    const act = parseFloat(document.getElementById('cal-activity').value);
    if (!age||!w||!h) { alert('Please fill all fields.'); return; }
    let bmr;
    if (gender==='male') bmr = 10*w + 6.25*h - 5*age + 5;
    else bmr = 10*w + 6.25*h - 5*age - 161;
    const tdee = Math.round(bmr * act);
    const fatLoss = Math.round(tdee - 400);
    const leanBulk = Math.round(tdee + 250);
    document.getElementById('cal-result').innerHTML = `
        <h3 className="font-bold text-on-surface text-lg mb-6">Your Calorie Targets</h3>
        <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-blue-400 font-bold text-sm">Fat Loss</p><p className="text-xs text-on-surface-variant">${tdee} - 400 kcal</p></div>
                <span className="text-2xl font-extrabold text-blue-400">${fatLoss}</span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-primary font-bold text-sm">Maintenance ★</p><p className="text-xs text-on-surface-variant">Your TDEE</p></div>
                <span className="text-2xl font-extrabold text-primary">${tdee}</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-yellow-400 font-bold text-sm">Lean Bulk</p><p className="text-xs text-on-surface-variant">${tdee} + 250 kcal</p></div>
                <span className="text-2xl font-extrabold text-yellow-400">${leanBulk}</span>
            </div>
        </div>
        <p className="text-xs text-on-surface-variant mt-4">Formula: Mifflin-St Jeor. BMR = ${Math.round(bmr)} kcal.</p>`;
}

// === MACRO ===
function calculateMacros() {
    const cals = parseFloat(document.getElementById('mac-calories').value);
    const goal = document.getElementById('mac-goal').value;
    const w = parseFloat(document.getElementById('mac-weight').value) || 70;
    if (!cals) { alert('Please enter your daily calories.'); return; }
    const splits = { fatloss:[0.40,0.35,0.25], maintenance:[0.30,0.40,0.30], leanbulk:[0.30,0.45,0.25], musclegain:[0.25,0.50,0.25] };
    const [pPct,cPct,fPct] = splits[goal];
    const protein = Math.round((cals*pPct)/4);
    const carbs = Math.round((cals*cPct)/4);
    const fat = Math.round((cals*fPct)/9);
    const fiber = Math.round(w * 0.14);
    const bar = (pct, color) => `<div className="h-2 rounded-full ${color} result-bar" style={{width: '${pct*100}%', }}></div>`;
    document.getElementById('mac-result').innerHTML = `
        <h3 className="font-bold text-on-surface text-lg mb-5">Your Daily Macros</h3>
        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-primary font-bold">Protein</span><span className="font-bold text-on-surface">${protein}g <span className="text-on-surface-variant font-normal text-xs">(${Math.round(pPct*100)}%)</span></span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-2 bg-primary rounded-full result-bar" style={{width: '0', }} data-w="${pPct*100}"></div></div>
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-yellow-400 font-bold">Carbohydrates</span><span className="font-bold text-on-surface">${carbs}g <span className="text-on-surface-variant font-normal text-xs">(${Math.round(cPct*100)}%)</span></span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-2 bg-yellow-400 rounded-full result-bar" style={{width: '0', }} data-w="${cPct*100}"></div></div>
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-orange-400 font-bold">Fats</span><span className="font-bold text-on-surface">${fat}g <span className="text-on-surface-variant font-normal text-xs">(${Math.round(fPct*100)}%)</span></span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-2 bg-orange-400 rounded-full result-bar" style={{width: '0', }} data-w="${fPct*100}"></div></div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between text-sm">
                <span className="text-on-surface-variant">Fiber (recommended)</span>
                <span className="font-bold text-on-surface">${fiber}g/day</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Total Calories</span>
                <span className="font-bold text-on-surface">${Math.round(protein*4+carbs*4+fat*9)} kcal</span>
            </div>
        </div>`;
    setTimeout(() => {
        document.querySelectorAll('[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; });
    }, 50);
}

// === WATER ===
function calculateWater() {
    const w = parseFloat(document.getElementById('wat-weight').value);
    const workout = parseFloat(document.getElementById('wat-workout').value);
    const weather = parseFloat(document.getElementById('wat-weather').value);
    if (!w) { alert('Please enter your weight.'); return; }
    const base = w * 0.033;
    const total = (base + workout + weather).toFixed(1);
    const glasses = Math.round(total / 0.25);
    document.getElementById('wat-result').innerHTML = `
        <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-primary mb-4 block" style={{fontVariationSettings: "\'FILL\' 1"}}>water_drop</span>
            <div className="text-5xl font-extrabold text-primary mb-1">${total}L</div>
            <div className="text-on-surface-variant mb-4">Daily Water Target</div>
            <div className="text-2xl font-bold text-on-surface mb-2">${glasses} Glasses</div>
            <p className="text-xs text-on-surface-variant mb-6">of ~250ml each</p>
            <div className="space-y-2 text-sm text-left">
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Drink a glass of water first thing in the morning.</span></div>
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Sip 500ml before, during, and after your workout.</span></div>
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Pale yellow urine = well hydrated.</span></div>
            </div>
        </div>`;
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
            <button className="text-primary font-bold border-b-2 border-primary pb-1 text-label-sm font-label-sm flex items-center gap-1">
                Fitness Tools <span className="material-symbols-outlined text-base">expand_more</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <a href="#bmi" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">monitor_weight</span> BMI Calculator</a>
                <a href="#protein" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">egg</span> Protein Calculator</a>
                <a href="#calories" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">local_fire_department</span> Calories Calculator</a>
                <a href="#macro" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border-b border-white/5"><span className="material-symbols-outlined text-base text-primary">pie_chart</span> Macro Calculator</a>
                <a href="#water" className="flex items-center gap-3 px-4 py-3 text-label-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"><span className="material-symbols-outlined text-base text-primary">water_drop</span> Water Calculator</a>
            </div>
        </div>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/contact">Contact</a>
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
        <a className="text-primary font-bold text-label-sm" href="#bmi">BMI Calculator</a>
        <a className="text-on-surface-variant text-label-sm" href="#protein">Protein Calculator</a>
        <a className="text-on-surface-variant text-label-sm" href="#calories">Calories Calculator</a>
        <a className="text-on-surface-variant text-label-sm" href="#macro">Macro Calculator</a>
        <a className="text-on-surface-variant text-label-sm" href="#water">Water Calculator</a>
    </div>
</div>
</nav>

{/*  Floating WhatsApp  */}
<a href="https://wa.me/6282253984?text=Hi%20Coach%2C%20I%20want%20to%20purchase%20the%20Lean%20Gain%20Blueprint%20for%20%E2%82%B9399." target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_30px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<main className="pt-24">
{/*  Hero  */}
<section className="py-10 md:py-16 px-6 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
    <div className="max-w-3xl mx-auto reveal">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-label-sm mb-6 uppercase tracking-widest">Free Fitness Tools</span>
        <h1 className="font-display-xl text-4xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">Your Personal <span className="text-primary">Fitness Hub</span></h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mx-auto">Science-backed calculators to help you understand your body, plan your nutrition, and reach your goals faster.</p>
    </div>
    {/*  Quick Nav Pills  */}
    <div className="flex flex-wrap justify-center gap-3 mt-10 reveal">
        <a href="#bmi" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-label-sm hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">monitor_weight</span>BMI</a>
        <a href="#protein" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-label-sm hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">egg</span>Protein</a>
        <a href="#calories" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-label-sm hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">local_fire_department</span>Calories</a>
        <a href="#macro" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-label-sm hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">pie_chart</span>Macros</a>
        <a href="#water" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-label-sm hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">water_drop</span>Water</a>
    </div>
</section>

{/*  ===== BMI CALCULATOR =====  */}
<section id="bmi" className="py-10 md:py-16 px-6 bg-surface-container-lowest scroll-mt-24">
<div className="max-w-4xl mx-auto">
    <div className="text-center mb-12 reveal">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4"><span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "\'FILL\' 1"}}>monitor_weight</span></div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">BMI Calculator</h2>
        <p className="text-on-surface-variant mt-2">Body Mass Index — a quick measure of weight relative to height.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        {/*  Inputs  */}
        <div className="glass-card p-8 space-y-6">
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Unit System</label>
                <div className="flex gap-2">
                    <button className="tab-btn active flex-1 py-2.5 rounded-xl border border-white/10 text-label-sm font-bold transition-all" onClick={() => { setBmiUnit('metric', this) }}>Metric (kg/cm)</button>
                    <button className="tab-btn flex-1 py-2.5 rounded-xl border border-white/10 text-label-sm font-bold transition-all" onClick={() => { setBmiUnit('imperial', this) }}>Imperial (lb/in)</button>
                </div>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Weight — <span id="bmi-weight-display">70 kg</span></label>
                <input type="range" id="bmi-weight" min="30" max="200" value="70" className="w-full" onChange={() => { updateBmiSlider('weight') }}/>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Height — <span id="bmi-height-display">175 cm</span></label>
                <input type="range" id="bmi-height" min="100" max="250" value="175" className="w-full" onChange={() => { updateBmiSlider('height') }}/>
            </div>
            <button onClick={() => { calculateBMI() }} className="w-full py-3 bg-primary text-on-primary-container font-bold rounded-xl hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] transition-all">Calculate BMI</button>
        </div>
        {/*  Result  */}
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center" id="bmi-result-card">
            <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12"/>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#4be277" strokeWidth="12" strokeLinecap="round" strokeDasharray="339.3" strokeDashoffset="339.3" id="bmi-circle" style={{transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)', }}/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-primary" id="bmi-value">—</span>
                    <span className="text-xs text-on-surface-variant">BMI</span>
                </div>
            </div>
            <div className="text-2xl font-bold text-on-surface mb-2" id="bmi-category">Enter your details</div>
            <p className="text-on-surface-variant text-sm" id="bmi-advice">Adjust the sliders and click Calculate.</p>
            <div className="grid grid-cols-4 gap-1 w-full mt-6">
                <div className="text-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20"><div className="text-xs text-blue-400 font-bold">Under</div><div className="text-xs text-on-surface-variant">&lt;18.5</div></div>
                <div className="text-center p-2 rounded-lg bg-primary/10 border border-primary/20"><div className="text-xs text-primary font-bold">Normal</div><div className="text-xs text-on-surface-variant">18.5–24.9</div></div>
                <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20"><div className="text-xs text-yellow-400 font-bold">Over</div><div className="text-xs text-on-surface-variant">25–29.9</div></div>
                <div className="text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20"><div className="text-xs text-red-400 font-bold">Obese</div><div className="text-xs text-on-surface-variant">≥30</div></div>
            </div>
        </div>
    </div>
</div>
</section>

{/*  ===== PROTEIN CALCULATOR =====  */}
<section id="protein" className="py-10 md:py-16 px-6 scroll-mt-24">
<div className="max-w-4xl mx-auto">
    <div className="text-center mb-12 reveal">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4"><span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "\'FILL\' 1"}}>egg</span></div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Protein Calculator</h2>
        <p className="text-on-surface-variant mt-2">Uses your <strong className="text-primary">Lean Body Mass</strong> (via height + weight) for accurate, science-backed results — not just total body weight.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        <div className="glass-card p-8 space-y-5">
            {/*  Gender  */}
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Gender</label>
                <div className="flex gap-2">
                    <button id="prot-gender-male" className="tab-btn active flex-1 py-2.5 rounded-xl border border-white/10 text-label-sm font-bold transition-all" onClick={() => { setProtGender('male', this) }}>Male</button>
                    <button id="prot-gender-female" className="tab-btn flex-1 py-2.5 rounded-xl border border-white/10 text-label-sm font-bold transition-all" onClick={() => { setProtGender('female', this) }}>Female</button>
                </div>
            </div>
            {/*  Weight  */}
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Body Weight (kg)</label>
                <input type="number" id="prot-weight" placeholder="e.g. 70" className="w-full" min="30" max="250"/>
            </div>
            {/*  Height  */}
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Height (cm)</label>
                <input type="number" id="prot-height" placeholder="e.g. 175" className="w-full" min="100" max="250"/>
            </div>
            {/*  Goal  */}
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Your Goal</label>
                <select id="prot-goal">
                    <option value="fatloss">Fat Loss — High protein to protect muscle</option>
                    <option value="maintenance">Maintenance — Stay lean & strong</option>
                    <option value="leanbulk" selected>Lean Bulk — Build muscle, stay lean</option>
                    <option value="musclegain">Aggressive Muscle Gain</option>
                </select>
            </div>
            {/*  Activity  */}
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Training Intensity</label>
                <select id="prot-activity">
                    <option value="low">Beginner / Low (1–2x/week)</option>
                    <option value="moderate" selected>Intermediate (3–4x/week)</option>
                    <option value="high">Advanced (5–6x/week)</option>
                    <option value="athlete">Athlete / 2-a-days</option>
                </select>
            </div>
            <button onClick={() => { calculateProtein() }} className="w-full py-3 bg-primary text-on-primary-container font-bold rounded-xl hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] transition-all">Calculate Protein</button>
        </div>
        <div className="glass-card p-8 space-y-4" id="prot-result">
            <div className="text-center py-6">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-3" style={{fontVariationSettings: "\'FILL\' 1"}}>egg</span>
                <p className="text-on-surface-variant">Enter your details to get your personalised protein targets.</p>
            </div>
        </div>
    </div>
    {/*  Why LBM Banner  */}
    <div className="glass-card p-5 mt-4 reveal flex items-start gap-4 border-primary/20">
        <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5" style={{fontVariationSettings: "\'FILL\' 1"}}>science</span>
        <div>
            <p className="font-bold text-on-surface text-sm mb-1">Why We Use Lean Body Mass (LBM)</p>
            <p className="text-on-surface-variant text-xs leading-relaxed">Protein builds and repairs muscle — not fat. Calculating protein based on your LBM (estimated from height + weight using the Boer formula) gives a far more accurate target than total body weight, especially if you carry extra fat or have a heavier/lighter build.</p>
        </div>
    </div>
    {/*  Food Sources  */}
    <div className="glass-card p-6 mt-6 reveal">
        <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">restaurant</span> Top High-Protein Foods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Chicken Breast</p><p className="text-xs text-on-surface-variant">31g per 100g</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Eggs</p><p className="text-xs text-on-surface-variant">13g per 100g</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Paneer</p><p className="text-xs text-on-surface-variant">18g per 100g</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Tuna</p><p className="text-xs text-on-surface-variant">30g per 100g</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Greek Yogurt</p><p className="text-xs text-on-surface-variant">10g per 100g</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Lentils</p><p className="text-xs text-on-surface-variant">9g per 100g</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Whey Protein</p><p className="text-xs text-on-surface-variant">24g per scoop</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><p className="font-bold text-primary">Salmon</p><p className="text-xs text-on-surface-variant">25g per 100g</p></div>
        </div>
    </div>
</div>
</section>

{/*  ===== CALORIES CALCULATOR =====  */}
<section id="calories" className="py-10 md:py-16 px-6 bg-surface-container-lowest scroll-mt-24">
<div className="max-w-4xl mx-auto">
    <div className="text-center mb-12 reveal">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4"><span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "\'FILL\' 1"}}>local_fire_department</span></div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Calories Calculator</h2>
        <p className="text-on-surface-variant mt-2">Using the Mifflin-St Jeor formula — the most accurate TDEE estimation method.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        <div className="glass-card p-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Age</label>
                    <input type="number" id="cal-age" placeholder="e.g. 22" className="w-full"/>
                </div>
                <div>
                    <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Gender</label>
                    <select id="cal-gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Weight (kg)</label>
                    <input type="number" id="cal-weight" placeholder="e.g. 70"/>
                </div>
                <div>
                    <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Height (cm)</label>
                    <input type="number" id="cal-height" placeholder="e.g. 175"/>
                </div>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Activity Level</label>
                <select id="cal-activity">
                    <option value="1.2">Sedentary (desk job, no exercise)</option>
                    <option value="1.375">Light (1–3 days/week)</option>
                    <option value="1.55" selected>Moderate (3–5 days/week)</option>
                    <option value="1.725">Active (6–7 days/week)</option>
                    <option value="1.9">Very Active (2x/day training)</option>
                </select>
            </div>
            <button onClick={() => { calculateCalories() }} className="w-full py-3 bg-primary text-on-primary-container font-bold rounded-xl hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] transition-all">Calculate Calories</button>
        </div>
        <div className="glass-card p-8 space-y-4" id="cal-result">
            <p className="text-on-surface-variant text-center py-8">Fill in your details to get your calorie targets.</p>
        </div>
    </div>
</div>
</section>

{/*  ===== MACRO CALCULATOR =====  */}
<section id="macro" className="py-10 md:py-16 px-6 scroll-mt-24">
<div className="max-w-4xl mx-auto">
    <div className="text-center mb-12 reveal">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4"><span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "\'FILL\' 1"}}>pie_chart</span></div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Macro Calculator</h2>
        <p className="text-on-surface-variant mt-2">Break your daily calories into protein, carbs, and fats.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        <div className="glass-card p-8 space-y-4">
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Daily Calories</label>
                <input type="number" id="mac-calories" placeholder="e.g. 2500"/>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Goal</label>
                <select id="mac-goal">
                    <option value="fatloss">Fat Loss (high protein)</option>
                    <option value="maintenance">Maintenance (balanced)</option>
                    <option value="leanbulk" selected>Lean Bulk (moderate carbs)</option>
                    <option value="musclegain">Muscle Gain (high carbs)</option>
                </select>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Body Weight (kg)</label>
                <input type="number" id="mac-weight" placeholder="e.g. 70"/>
            </div>
            <button onClick={() => { calculateMacros() }} className="w-full py-3 bg-primary text-on-primary-container font-bold rounded-xl hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] transition-all">Calculate Macros</button>
        </div>
        <div className="glass-card p-8" id="mac-result">
            <p className="text-on-surface-variant text-center py-8">Enter your calories and goal to get your macros.</p>
        </div>
    </div>
</div>
</section>

{/*  ===== WATER INTAKE CALCULATOR =====  */}
<section id="water" className="py-10 md:py-16 px-6 bg-surface-container-lowest scroll-mt-24">
<div className="max-w-4xl mx-auto">
    <div className="text-center mb-12 reveal">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4"><span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "\'FILL\' 1"}}>water_drop</span></div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Water Intake Calculator</h2>
        <p className="text-on-surface-variant mt-2">Stay optimally hydrated for performance, recovery, and fat loss.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        <div className="glass-card p-8 space-y-4">
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Body Weight (kg)</label>
                <input type="number" id="wat-weight" placeholder="e.g. 70"/>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Workout Duration</label>
                <select id="wat-workout">
                    <option value="0">No workout today</option>
                    <option value="0.3">30 minutes</option>
                    <option value="0.5" selected>45–60 minutes</option>
                    <option value="0.7">60–90 minutes</option>
                    <option value="1.0">90+ minutes</option>
                </select>
            </div>
            <div>
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">Climate / Weather</label>
                <select id="wat-weather">
                    <option value="0">Cool / AC Environment</option>
                    <option value="0.3" selected>Moderate (normal weather)</option>
                    <option value="0.6">Hot & Humid</option>
                    <option value="1.0">Extreme Heat</option>
                </select>
            </div>
            <button onClick={() => { calculateWater() }} className="w-full py-3 bg-primary text-on-primary-container font-bold rounded-xl hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] transition-all">Calculate Water Intake</button>
        </div>
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center" id="wat-result">
            <p className="text-on-surface-variant py-8">Enter your details to calculate your daily water target.</p>
        </div>
    </div>
</div>
</section>

{/*  CTA  */}
<section className="py-10 md:py-16 px-6 text-center">
<div className="max-w-2xl mx-auto glass-card p-12 reveal">
    <span className="material-symbols-outlined text-5xl text-primary mb-4 block" style={{fontVariationSettings: "\'FILL\' 1"}}>menu_book</span>
    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Want the Complete Nutrition System?</h2>
    <p className="text-on-surface-variant mb-8">The Lean Gain Blueprint eBook includes personalized meal plans, supplement guides, grocery lists, and much more — all in one premium guide.</p>
    <a href="/ebook" className="inline-block bg-primary text-on-primary-container px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(75,226,119,0.4)] transition-all hover:scale-105">Get the eBook — ₹399</a>
</div>
</section>
</main>

{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-white/5 py-10 px-6 text-center">
<a href="/" className="font-extrabold text-on-surface uppercase tracking-tighter hover:text-primary transition-colors">GAIN BLUEPRINT</a>
<p className="text-on-surface-variant text-sm mt-2 mb-4">The Lean Gain Blueprint — Natural Performance, Science-Based.</p>
<div className="flex justify-center gap-4 mb-6">
    <a href="/" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Home</a>
    <a href="/journey" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Journey</a>
    <a href="/ebook" className="text-on-surface-variant hover:text-primary text-sm transition-colors">eBook</a>
    <a href="/contact" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Contact</a>
</div>
<p className="text-on-surface-variant text-xs opacity-60">© 2024 GAIN BLUEPRINT. ALL RIGHTS RESERVED.</p>
</footer>



        </>
    );
}
