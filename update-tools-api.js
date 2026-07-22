const fs = require('fs');

let content = fs.readFileSync('app/fitness-tools/page.jsx', 'utf8');

// Replace calculateBMI
const oldBmi = `function calculateBMI() {
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
}`;

const newBmi = `async function calculateBMI() {
    let w = parseFloat(document.getElementById('bmi-weight').value);
    let h = parseFloat(document.getElementById('bmi-height').value);
    
    try {
        const res = await fetch('/api/calculator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'bmi', weight: w, height: h, unit: bmiUnit })
        });
        const result = await res.json();
        if (result.success) {
            const data = result.data;
            const circle = document.getElementById('bmi-circle');
            const circumference = 339.3;
            const pct = Math.min(data.bmi / 45, 1);
            if (circle) {
                circle.style.strokeDashoffset = circumference - (pct * circumference);
                circle.style.stroke = data.color;
            }
            document.getElementById('bmi-value').textContent = data.bmi;
            document.getElementById('bmi-value').style.color = data.color;
            document.getElementById('bmi-category').textContent = data.category;
            document.getElementById('bmi-advice').textContent = data.advice;
        }
    } catch (err) {
        console.error(err);
    }
}`;

// Replace calculateProtein
const oldProt = `function calculateProtein() {
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

    document.getElementById('prot-result').innerHTML = \`
        <h3 className="font-bold text-on-surface text-lg mb-1">Your Protein Targets</h3>
        <p className="text-xs text-on-surface-variant mb-4">Goal: <span className="text-primary font-bold">\${goalLabels[goal]}</span> &bull; Based on LBM, not total weight</p>

        {/*  LBM Stats Row  */}
        <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-white/5 rounded-xl p-2.5 text-center">
                <p className="text-xs text-on-surface-variant mb-0.5">Body Weight</p>
                <p className="font-extrabold text-on-surface text-sm">\${w} kg</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-primary mb-0.5">Lean Mass (LBM)</p>
                <p className="font-extrabold text-primary text-sm">\${lbm.toFixed(1)} kg</p>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 text-center">
                <p className="text-xs text-on-surface-variant mb-0.5">Est. Body Fat</p>
                <p className="font-extrabold text-sm \${bfColor}">\${bfPct}%</p>
            </div>
        </div>
        <p className="text-xs text-on-surface-variant mb-4 flex items-center gap-1"><span className="material-symbols-outlined text-base text-primary">info</span> Body Fat Category: <span className="font-bold \${bfColor} ml-1">\${bfLabel}</span></p>

        {/*  Protein Targets  */}
        <div className="space-y-3">
            <div className="bg-white/5 rounded-2xl p-3.5 flex justify-between items-center">
                <div><span className="text-on-surface-variant text-sm">Minimum</span><p className="text-xs text-on-surface-variant/60">\${minPkg.toFixed(1)}g per kg LBM</p></div>
                <span className="text-xl font-extrabold text-on-surface">\${minG}<span className="text-xs font-normal text-on-surface-variant ml-1">g/day</span></span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3.5 flex justify-between items-center">
                <div><span className="text-primary font-bold text-sm">Recommended ★</span><p className="text-xs text-primary/60">\${((minPkg+maxPkg)/2).toFixed(1)}g per kg LBM</p></div>
                <span className="text-xl font-extrabold text-primary">\${recG}<span className="text-xs font-normal text-primary/70 ml-1">g/day</span></span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3.5 flex justify-between items-center">
                <div><span className="text-on-surface-variant text-sm">Maximum</span><p className="text-xs text-on-surface-variant/60">\${maxPkg.toFixed(1)}g per kg LBM</p></div>
                <span className="text-xl font-extrabold text-on-surface">\${maxG}<span className="text-xs font-normal text-on-surface-variant ml-1">g/day</span></span>
            </div>
        </div>

        {/*  Per Meal Tip  */}
        <div className="mt-4 p-3 bg-white/5 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings: "'FILL' 1"}}>restaurant</span>
            <p className="text-xs text-on-surface-variant">Aim for <span className="font-bold text-on-surface">~\${perMeal}g per meal</span> across 4 meals for optimal muscle protein synthesis.</p>
        </div>
        <p className="text-xs text-on-surface-variant/50 mt-3">Formula: Boer LBM &bull; BMI: \${bmi}</p>\`;
}`;

const newProt = `async function calculateProtein() {
    const w = parseFloat(document.getElementById('prot-weight').value);
    const h = parseFloat(document.getElementById('prot-height').value);
    const goal = document.getElementById('prot-goal').value;
    const activity = document.getElementById('prot-activity').value;

    if (!w || w <= 0) { alert('Please enter a valid weight.'); return; }
    if (!h || h <= 0) { alert('Please enter your height.'); return; }

    try {
        const res = await fetch('/api/calculator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'protein', weight: w, height: h, gender: protGender, goal, activity })
        });
        const result = await res.json();
        if (result.success) {
            const d = result.data;
            const goalLabels = { fatloss: 'Fat Loss', maintenance: 'Maintenance', leanbulk: 'Lean Bulk', musclegain: 'Muscle Gain' };

            document.getElementById('prot-result').innerHTML = \`
                <h3 className="font-bold text-on-surface text-lg mb-1">Your Protein Targets (API Calculated)</h3>
                <p className="text-xs text-on-surface-variant mb-4">Goal: <span className="text-primary font-bold">\${goalLabels[d.goal] || d.goal}</span> &bull; Based on Boer Lean Body Mass</p>

                <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="bg-white/5 rounded-xl p-2.5 text-center">
                        <p className="text-xs text-on-surface-variant mb-0.5">Body Weight</p>
                        <p className="font-extrabold text-on-surface text-sm">\${d.weightKg} kg</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 text-center">
                        <p className="text-xs text-primary mb-0.5">Lean Mass (LBM)</p>
                        <p className="font-extrabold text-primary text-sm">\${d.lbmKg} kg</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2.5 text-center">
                        <p className="text-xs text-on-surface-variant mb-0.5">Est. Body Fat</p>
                        <p className="font-extrabold text-sm text-primary">\${d.bodyFatPct}%</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="bg-white/5 rounded-2xl p-3.5 flex justify-between items-center">
                        <div><span className="text-on-surface-variant text-sm">Minimum</span></div>
                        <span className="text-xl font-extrabold text-on-surface">\${d.range.min}<span className="text-xs font-normal text-on-surface-variant ml-1">g/day</span></span>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3.5 flex justify-between items-center">
                        <div><span className="text-primary font-bold text-sm">Recommended Target ★</span></div>
                        <span className="text-xl font-extrabold text-primary">\${d.targetGrams}<span className="text-xs font-normal text-primary/70 ml-1">g/day</span></span>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3.5 flex justify-between items-center">
                        <div><span className="text-on-surface-variant text-sm">Maximum</span></div>
                        <span className="text-xl font-extrabold text-on-surface">\${d.range.max}<span className="text-xs font-normal text-on-surface-variant ml-1">g/day</span></span>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">restaurant</span>
                    <p className="text-xs text-on-surface-variant">Aim for <span className="font-bold text-on-surface">~\${d.perMealGrams}g per meal</span> across 4 meals for optimal muscle synthesis.</p>
                </div>\`;
        }
    } catch (err) {
        console.error(err);
    }
}`;

// Replace calculateCalories
const oldCal = `function calculateCalories() {
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
    document.getElementById('cal-result').innerHTML = \`
        <h3 className="font-bold text-on-surface text-lg mb-6">Your Calorie Targets</h3>
        <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-blue-400 font-bold text-sm">Fat Loss</p><p className="text-xs text-on-surface-variant">\${tdee} - 400 kcal</p></div>
                <span className="text-2xl font-extrabold text-blue-400">\${fatLoss}</span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-primary font-bold text-sm">Maintenance ★</p><p className="text-xs text-on-surface-variant">Your TDEE</p></div>
                <span className="text-2xl font-extrabold text-primary">\${tdee}</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-yellow-400 font-bold text-sm">Lean Bulk</p><p className="text-xs text-on-surface-variant">\${tdee} + 250 kcal</p></div>
                <span className="text-2xl font-extrabold text-yellow-400">\${leanBulk}</span>
            </div>
        </div>
        <p className="text-xs text-on-surface-variant mt-4">Formula: Mifflin-St Jeor. BMR = \${Math.round(bmr)} kcal.</p>\`;
}`;

const newCal = `async function calculateCalories() {
    const age = parseFloat(document.getElementById('cal-age').value);
    const gender = document.getElementById('cal-gender').value;
    const w = parseFloat(document.getElementById('cal-weight').value);
    const h = parseFloat(document.getElementById('cal-height').value);
    const actVal = document.getElementById('cal-activity').value;
    if (!age||!w||!h) { alert('Please fill all fields.'); return; }

    const activityMap = { '1.2': 'sedentary', '1.375': 'light', '1.55': 'moderate', '1.725': 'very_active', '1.9': 'extra_active' };
    const activity = activityMap[actVal] || 'moderate';

    try {
        const res = await fetch('/api/calculator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'calories', weight: w, height: h, age, gender, activity })
        });
        const result = await res.json();
        if (result.success) {
            const d = result.data;
            document.getElementById('cal-result').innerHTML = \`
                <h3 className="font-bold text-on-surface text-lg mb-6">Your Calorie Targets (API Calculated)</h3>
                <div className="space-y-3">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex justify-between items-center">
                        <div><p className="text-blue-400 font-bold text-sm">Fat Loss (20% Deficit)</p><p className="text-xs text-on-surface-variant">Optimal fat loss target</p></div>
                        <span className="text-2xl font-extrabold text-blue-400">\${d.cutCalories}</span>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex justify-between items-center">
                        <div><p className="text-primary font-bold text-sm">Maintenance TDEE ★</p><p className="text-xs text-on-surface-variant">Daily maintenance requirement</p></div>
                        <span className="text-2xl font-extrabold text-primary">\${d.tdee}</span>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex justify-between items-center">
                        <div><p className="text-yellow-400 font-bold text-sm">Lean Bulk (15% Surplus)</p><p className="text-xs text-on-surface-variant">Hypertrophy target</p></div>
                        <span className="text-2xl font-extrabold text-yellow-400">\${d.bulkCalories}</span>
                    </div>
                </div>
                <p className="text-xs text-on-surface-variant mt-4">Mifflin-St Jeor API Formula &bull; Base BMR: \${d.bmr} kcal/day.</p>\`;
        }
    } catch (err) {
        console.error(err);
    }
}`;

// Replace calculateWater
const oldWat = `function calculateWater() {
    const w = parseFloat(document.getElementById('wat-weight').value);
    const workout = parseFloat(document.getElementById('wat-workout').value);
    const weather = parseFloat(document.getElementById('wat-weather').value);
    if (!w) { alert('Please enter your weight.'); return; }
    const base = w * 0.033;
    const total = (base + workout + weather).toFixed(1);
    const glasses = Math.round(total / 0.25);
    document.getElementById('wat-result').innerHTML = \`
        <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-primary mb-4 block" style={{fontVariationSettings: "'FILL' 1"}}>water_drop</span>
            <div className="text-5xl font-extrabold text-primary mb-1">\${total}L</div>
            <div className="text-on-surface-variant mb-4">Daily Water Target</div>
            <div className="text-2xl font-bold text-on-surface mb-2">\${glasses} Glasses</div>
            <p className="text-xs text-on-surface-variant mb-6">of ~250ml each</p>
            <div className="space-y-2 text-sm text-left">
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Drink a glass of water first thing in the morning.</span></div>
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Sip 500ml before, during, and after your workout.</span></div>
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Pale yellow urine = well hydrated.</span></div>
            </div>
        </div>\`;
}`;

const newWat = `async function calculateWater() {
    const w = parseFloat(document.getElementById('wat-weight').value);
    const workoutMinutes = (parseFloat(document.getElementById('wat-workout').value) || 0) * 60; // hours to mins
    if (!w) { alert('Please enter your weight.'); return; }

    try {
        const res = await fetch('/api/calculator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'water', weight: w, workoutMinutes: workoutMinutes })
        });
        const result = await res.json();
        if (result.success) {
            const d = result.data;
            document.getElementById('wat-result').innerHTML = \`
                <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-primary mb-4 block">water_drop</span>
                    <div className="text-5xl font-extrabold text-primary mb-1">\${d.liters}L</div>
                    <div className="text-on-surface-variant mb-4">API Calculated Hydration Target</div>
                    <div className="text-2xl font-bold text-on-surface mb-2">\${d.glasses} Glasses</div>
                    <p className="text-xs text-on-surface-variant mb-6">of ~250ml each (\${d.oz} fl oz)</p>
                    <div className="space-y-2 text-sm text-left">
                        <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Drink 1 glass (250ml) immediately upon waking.</span></div>
                        <div className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span><span className="text-on-surface-variant">Hydrate with 500ml before and during intensive physical activity.</span></div>
                    </div>
                </div>\`;
        }
    } catch (err) {
        console.error(err);
    }
}`;

content = content.replace(oldBmi, newBmi);
content = content.replace(oldProt, newProt);
content = content.replace(oldCal, newCal);
content = content.replace(oldWat, newWat);

fs.writeFileSync('app/fitness-tools/page.jsx', content);
console.log('Updated fitness-tools calculation functions to use API');
