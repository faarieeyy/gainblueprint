import { NextResponse } from 'next/server';

/**
 * Precision Fitness & Health Calculator API
 */
export async function POST(req) {
    try {
        const body = await req.json();
        const { type } = body;

        if (!type) {
            return NextResponse.json({ success: false, message: 'Calculator type is required.' }, { status: 400 });
        }

        switch (type) {
            case 'bmi':
                return handleBMI(body);
            case 'protein':
                return handleProtein(body);
            case 'calories':
                return handleCalories(body);
            case 'macro':
                return handleMacro(body);
            case 'water':
                return handleWater(body);
            default:
                return NextResponse.json({ success: false, message: 'Invalid calculator type.' }, { status: 400 });
        }
    } catch (err) {
        console.error('Calculator API Error:', err);
        return NextResponse.json({ success: false, message: 'Server calculation error.' }, { status: 500 });
    }
}

// ----------------------------------------------------
// 1. BMI CALCULATOR (Deurenberg & Ponderal Index)
// ----------------------------------------------------
function handleBMI(data) {
    let { weight, height, unit = 'metric', age = 25, gender = 'male' } = data;
    weight = parseFloat(weight);
    height = parseFloat(height);

    if (!weight || weight <= 0 || !height || height <= 0) {
        return NextResponse.json({ success: false, message: 'Valid weight and height are required.' }, { status: 400 });
    }

    // Convert imperial to metric for calculation
    if (unit === 'imperial') {
        weight = weight * 0.453592; // lbs to kg
        height = height * 2.54;     // inches to cm
    }

    const heightM = height / 100;
    const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
    const ponderalIndex = parseFloat((weight / Math.pow(heightM, 3)).toFixed(2));
    const bmiPrime = parseFloat((bmi / 25).toFixed(2));

    // Deurenberg Body Fat % formula
    const genderFactor = gender === 'male' ? 1 : 0;
    const estimatedBodyFat = parseFloat(((1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4).toFixed(1));

    // Healthy weight bounds (18.5 - 24.9 BMI)
    const minHealthyWeight = parseFloat((18.5 * heightM * heightM).toFixed(1));
    const maxHealthyWeight = parseFloat((24.9 * heightM * heightM).toFixed(1));

    let category = 'Normal';
    let advice = 'Great! Your composition is within a healthy, athletic baseline.';
    let color = '#4be277';

    if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Focus on structured hyper-caloric nutrition and strength training.';
        color = '#60a5fa';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Optimal';
        advice = 'Excellent metabolic balance. Focus on muscle maintenance or lean bulk.';
        color = '#4be277';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        advice = 'A modest calorie deficit with high protein will optimize body composition.';
        color = '#facc15';
    } else {
        category = 'Obese';
        advice = 'Follow a targeted caloric deficit protocol and consult a professional.';
        color = '#f87171';
    }

    return NextResponse.json({
        success: true,
        type: 'bmi',
        data: {
            bmi,
            category,
            advice,
            color,
            bmiPrime,
            ponderalIndex,
            estimatedBodyFat: Math.max(5, Math.min(60, estimatedBodyFat)),
            healthyWeightRange: { min: minHealthyWeight, max: maxHealthyWeight, unit: 'kg' }
        }
    });
}

// ----------------------------------------------------
// 2. PROTEIN CALCULATOR (Boer Formula Lean Mass)
// ----------------------------------------------------
function handleProtein(data) {
    let { weight, height, gender = 'male', goal = 'maintenance', activity = 'moderate' } = data;
    weight = parseFloat(weight);
    height = parseFloat(height);

    if (!weight || weight <= 0 || !height || height <= 0) {
        return NextResponse.json({ success: false, message: 'Valid weight and height are required.' }, { status: 400 });
    }

    // Boer Formula LBM
    let lbm = gender === 'male'
        ? (0.407 * weight) + (0.267 * height) - 19.2
        : (0.252 * weight) + (0.473 * height) - 48.3;

    lbm = Math.max(lbm, weight * 0.6); // Floor safety
    const bodyFatPct = Math.round(((weight - lbm) / weight) * 100);

    const activityMults = { low: 0, moderate: 0.1, high: 0.2, athlete: 0.3 };
    const mult = activityMults[activity] || 0.1;

    const baseRanges = {
        fatloss:     [2.0 + mult, 2.4 + mult],
        maintenance: [1.8 + mult, 2.2 + mult],
        leanbulk:    [1.8 + mult, 2.2 + mult],
        musclegain:  [2.0 + mult, 2.4 + mult]
    };

    const [minPkg, maxPkg] = baseRanges[goal] || baseRanges.maintenance;
    const minGrams = Math.round(minPkg * lbm);
    const maxGrams = Math.round(maxPkg * lbm);
    const targetGrams = Math.round(((minPkg + maxPkg) / 2) * lbm);
    const perMealGrams = Math.round(targetGrams / 4);

    return NextResponse.json({
        success: true,
        type: 'protein',
        data: {
            weightKg: weight,
            lbmKg: parseFloat(lbm.toFixed(1)),
            bodyFatPct,
            targetGrams,
            range: { min: minGrams, max: maxGrams },
            perMealGrams,
            goal
        }
    });
}

// ----------------------------------------------------
// 3. CALORIES & TDEE (Mifflin-St Jeor Formula)
// ----------------------------------------------------
function handleCalories(data) {
    let { weight, height, age = 25, gender = 'male', activity = 'moderate', goal = 'maintain' } = data;
    weight = parseFloat(weight);
    height = parseFloat(height);
    age = parseInt(age);

    if (!weight || !height || !age) {
        return NextResponse.json({ success: false, message: 'Weight, height, and age are required.' }, { status: 400 });
    }

    // Mifflin-St Jeor BMR
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very_active: 1.725,
        extra_active: 1.9
    };

    const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));

    let targetCalories = tdee;
    if (goal === 'cut') targetCalories = Math.round(tdee * 0.80);        // 20% deficit
    else if (goal === 'bulk') targetCalories = Math.round(tdee * 1.15);  // 15% surplus

    return NextResponse.json({
        success: true,
        type: 'calories',
        data: {
            bmr: Math.round(bmr),
            tdee,
            targetCalories,
            cutCalories: Math.round(tdee * 0.80),
            maintainCalories: tdee,
            bulkCalories: Math.round(tdee * 1.15),
            goal
        }
    });
}

// ----------------------------------------------------
// 4. MACRO SPLIT CALCULATOR
// ----------------------------------------------------
function handleMacro(data) {
    let { weight, height, age = 25, gender = 'male', activity = 'moderate', goal = 'maintain', dietType = 'balanced' } = data;
    weight = parseFloat(weight);
    height = parseFloat(height);
    age = parseInt(age);

    // Get TDEE first
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
    const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, very_active: 1.725, extra_active: 1.9 };
    const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));

    let targetCalories = tdee;
    if (goal === 'cut') targetCalories = Math.round(tdee * 0.80);
    else if (goal === 'bulk') targetCalories = Math.round(tdee * 1.15);

    // Split percentages (Protein / Carbs / Fats)
    const splits = {
        balanced:     { p: 0.30, c: 0.40, f: 0.30 },
        low_carb:     { p: 0.40, c: 0.20, f: 0.40 },
        high_protein: { p: 0.40, c: 0.35, f: 0.25 },
        keto:         { p: 0.25, c: 0.05, f: 0.70 }
    };

    const ratio = splits[dietType] || splits.balanced;

    const proteinGrams = Math.round((targetCalories * ratio.p) / 4);
    const carbsGrams   = Math.round((targetCalories * ratio.c) / 4);
    const fatsGrams    = Math.round((targetCalories * ratio.f) / 9);

    return NextResponse.json({
        success: true,
        type: 'macro',
        data: {
            totalCalories: targetCalories,
            protein: { grams: proteinGrams, calories: proteinGrams * 4, pct: Math.round(ratio.p * 100) },
            carbs:   { grams: carbsGrams,   calories: carbsGrams * 4,   pct: Math.round(ratio.c * 100) },
            fats:    { grams: fatsGrams,    calories: fatsGrams * 9,    pct: Math.round(ratio.f * 100) }
        }
    });
}

// ----------------------------------------------------
// 5. WATER INTAKE CALCULATOR
// ----------------------------------------------------
function handleWater(data) {
    let { weight, workoutMinutes = 45, climate = 'temperate' } = data;
    weight = parseFloat(weight);
    workoutMinutes = parseFloat(workoutMinutes) || 0;

    if (!weight || weight <= 0) {
        return NextResponse.json({ success: false, message: 'Valid weight is required.' }, { status: 400 });
    }

    let liters = weight * 0.035; // Base hydration 35ml/kg
    liters += (workoutMinutes / 30) * 0.35; // Add 350ml per 30m exercise
    if (climate === 'hot_humid') liters += 0.5;

    liters = parseFloat(liters.toFixed(2));
    const glasses = Math.round((liters * 1000) / 250); // 250ml glass
    const oz = Math.round(liters * 33.814);

    return NextResponse.json({
        success: true,
        type: 'water',
        data: {
            liters,
            glasses,
            oz
        }
    });
}
