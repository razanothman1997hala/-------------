/**
 * AI Antigravity - Smart Flavor Oracle
 * Mock AI Logic for Mood-Based Dish Recommendations
 */

// ============================================
// Menu Database (Mock Data)
// ============================================
const menuDatabase = {
    dishes: [
        {
            id: 1,
            name: "ستيك الانعدام الجاذبي",
            emoji: "🥩",
            description: "قطعة لحم واغيو فاخرة مشوية على حرارة النجوم، مع صلصة الكمأة الفضائية وبطاطس محمصة بالثوم الأسود.",
            price: 189,
            tags: ["لحوم", "فاخر", "مشويات"],
            moods: ["جائع", "احتفالي", "قوي"],
            weather: ["cold", "cloudy"],
            time: ["dinner", "lunch"],
            matchScore: 0
        },
        {
            id: 2,
            name: "سلمون الشفق القطبي",
            emoji: "🐟",
            description: "سلمون نرويجي مدخن بخشب الأرز، مع كريمة الأفوكادو وكافيار ذهبي على سرير من الكينوا.",
            price: 145,
            tags: ["مأكولات بحرية", "صحي", "خفيف"],
            moods: ["هادئ", "صحي", "مسترخي"],
            weather: ["sunny", "cloudy"],
            time: ["lunch", "dinner"],
            matchScore: 0
        },
        {
            id: 3,
            name: "برغر المجرة المزدوجة",
            emoji: "🍔",
            description: "طبقتان من لحم الأنغوس مع جبنة شيدر معتقة، مخلل مدخن، وصلصة السر الكونية.",
            price: 79,
            tags: ["برغر", "مشبع", "شعبي"],
            moods: ["جائع", "سعيد", "متحمس"],
            weather: ["sunny", "cloudy", "rainy"],
            time: ["lunch", "dinner", "snack"],
            matchScore: 0
        },
        {
            id: 4,
            name: "معكرونة الثقب الأسود",
            emoji: "🍝",
            description: "سباغيتي بالحبر الأسود مع روبيان ضخم وصلصة الطماطم المتبلة بالفلفل الحار.",
            price: 95,
            tags: ["باستا", "حار", "إيطالي"],
            moods: ["مغامر", "جريء", "متحمس"],
            weather: ["rainy", "cold"],
            time: ["lunch", "dinner"],
            matchScore: 0
        },
        {
            id: 5,
            name: "سلطة حديقة النجوم",
            emoji: "🥗",
            description: "خضروات طازجة عضوية مع جبنة فيتا، رمان، جوز محمص، وصلصة الرمان البلسمية.",
            price: 55,
            tags: ["سلطة", "صحي", "خفيف"],
            moods: ["هادئ", "صحي", "خفيف"],
            weather: ["sunny"],
            time: ["lunch", "breakfast"],
            matchScore: 0
        },
        {
            id: 6,
            name: "شوربة القمر الفضي",
            emoji: "🍲",
            description: "شوربة كريمية من الفطر البري مع الكمأة السوداء وقطع الخبز المحمص.",
            price: 45,
            tags: ["شوربة", "دافئ", "مريح"],
            moods: ["حنين", "متعب", "مريح"],
            weather: ["rainy", "cold"],
            time: ["lunch", "dinner"],
            matchScore: 0
        },
        {
            id: 7,
            name: "بيتزا درب التبانة",
            emoji: "🍕",
            description: "عجينة مخمرة 72 ساعة مع موزاريلا إيطالية، بيستو، طماطم مجففة، وجبنة البارميزان.",
            price: 85,
            tags: ["بيتزا", "إيطالي", "مشترك"],
            moods: ["سعيد", "احتفالي", "جماعي"],
            weather: ["sunny", "cloudy", "rainy"],
            time: ["lunch", "dinner"],
            matchScore: 0
        },
        {
            id: 8,
            name: "تشيز كيك الفضاء اللانهائي",
            emoji: "🍰",
            description: "تشيز كيك فاخر بنكهة التوت الأزرق مع صوص المانجو الذهبي وحلوى القطن.",
            price: 49,
            tags: ["حلويات", "حلو", "فاخر"],
            moods: ["سعيد", "احتفالي", "مدلل"],
            weather: ["sunny", "cloudy"],
            time: ["snack", "dinner"],
            matchScore: 0
        },
        {
            id: 9,
            name: "دجاج الأوريون المشوي",
            emoji: "🍗",
            description: "نصف دجاجة مشوية بالأعشاب العطرية مع أرز الزعفران والخضروات الموسمية.",
            price: 89,
            tags: ["دجاج", "مشويات", "عائلي"],
            moods: ["جائع", "عائلي", "دافئ"],
            weather: ["cold", "cloudy"],
            time: ["lunch", "dinner"],
            matchScore: 0
        },
        {
            id: 10,
            name: "آيس كريم السديم",
            emoji: "🍨",
            description: "ثلاث نكهات مختارة مع صوص الشوكولاتة الداكنة، كراميل مملح، ومكسرات محمصة.",
            price: 39,
            tags: ["حلويات", "بارد", "منعش"],
            moods: ["سعيد", "منعش", "صيفي"],
            weather: ["sunny"],
            time: ["snack", "dinner"],
            matchScore: 0
        }
    ]
};

// ============================================
// Mood Analysis Engine (Mock AI)
// ============================================
const moodKeywords = {
    happy: ["سعيد", "فرحان", "مبسوط", "سعادة", "فرح", "متحمس", "حماس", "نشيط", "إيجابي", "رائع", "ممتاز"],
    calm: ["هادئ", "مسترخي", "مرتاح", "سكينة", "هدوء", "راحة", "استرخاء", "بسيط", "خفيف"],
    tired: ["متعب", "مرهق", "تعب", "إرهاق", "نعسان", "خمول", "كسول"],
    hungry: ["جائع", "جوعان", "جوع", "أكل", "مشبع", "طعام"],
    celebration: ["احتفال", "احتفالي", "مناسبة", "عيد", "فرحة", "مميز", "خاص", "عزيمة"],
    nostalgic: ["حنين", "ذكريات", "ماضي", "طفولة", "أمي", "بيت", "تقليدي"],
    adventurous: ["مغامرة", "جديد", "غريب", "مختلف", "جريء", "شجاع", "تجربة"],
    healthy: ["صحي", "دايت", "خفيف", "رجيم", "صحة", "طازج"]
};

const moodResponses = {
    happy: "مزاجك مشرق كالنجوم! 🌟 دعني أختار لك أطباقاً تعزز هذه الطاقة الإيجابية...",
    calm: "أشعر بسكينتك الداخلية 🧘 إليك أطباق تحافظ على هذا التوازن الجميل...",
    tired: "أفهم أنك بحاجة للطاقة 💫 هذه الأطباق ستعيد شحن بطارياتك...",
    hungry: "جوعك يناديني! 🍽️ إليك أطباق مشبعة ستسعد معدتك...",
    celebration: "وقت الاحتفال! 🎉 هذه الأطباق مثالية للمناسبات المميزة...",
    nostalgic: "أشعر بحنينك للماضي الجميل 💝 إليك أطباق تعيد ذكرياتك...",
    adventurous: "روح المغامرة تسري فيك! 🚀 جرب هذه الأطباق الجريئة...",
    healthy: "اختيار ذكي للصحة! 🥗 هذه الأطباق ستغذي جسمك وروحك...",
    default: "تحليل مزاجك اكتمل! ✨ إليك اقتراحاتي المخصصة لك..."
};

// ============================================
// DOM Elements
// ============================================
const moodInput = document.getElementById('moodInput');
const charCount = document.getElementById('charCount');
const weatherSelect = document.getElementById('weatherSelect');
const timeSelect = document.getElementById('timeSelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingSection = document.getElementById('loadingSection');
const loadingText = document.getElementById('loadingText');
const resultsSection = document.getElementById('resultsSection');
const moodAnalysis = document.getElementById('moodAnalysis');
const recommendationsGrid = document.getElementById('recommendationsGrid');
const resetBtn = document.getElementById('resetBtn');
const moodChips = document.querySelectorAll('.mood-chip');

// ============================================
// Event Listeners
// ============================================

// Character counter
moodInput.addEventListener('input', () => {
    const count = moodInput.value.length;
    charCount.textContent = `${count} / 200`;
    if (count > 200) {
        moodInput.value = moodInput.value.substring(0, 200);
        charCount.textContent = '200 / 200';
    }
});

// Mood chips selection
moodChips.forEach(chip => {
    chip.addEventListener('click', () => {
        moodChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        moodInput.value = chip.dataset.mood;
        charCount.textContent = `${moodInput.value.length} / 200`;
    });
});

// Analyze button
analyzeBtn.addEventListener('click', analyzeMood);

// Reset button
resetBtn.addEventListener('click', resetInterface);

// ============================================
// Core Functions
// ============================================

function analyzeMood() {
    const mood = moodInput.value.trim();
    const weather = weatherSelect.value;
    const time = timeSelect.value;
    
    if (!mood) {
        shakeElement(moodInput.parentElement);
        return;
    }
    
    // Show loading
    document.querySelector('section:not(#loadingSection):not(#resultsSection)').style.opacity = '0.3';
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    
    // Animate loading text
    animateLoadingText();
    
    // Simulate AI processing
    setTimeout(() => {
        const analysis = performMoodAnalysis(mood);
        const recommendations = getRecommendations(analysis.detectedMoods, weather, time);
        displayResults(analysis, recommendations);
    }, 2800);
}

function performMoodAnalysis(moodText) {
    const text = moodText.toLowerCase();
    const detectedMoods = [];
    let primaryMood = 'default';
    let highestScore = 0;
    
    // Analyze mood from text
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        let score = 0;
        keywords.forEach(keyword => {
            if (text.includes(keyword)) {
                score += 1;
            }
        });
        
        if (score > 0) {
            detectedMoods.push({ mood, score });
            if (score > highestScore) {
                highestScore = score;
                primaryMood = mood;
            }
        }
    }
    
    // Default if no mood detected
    if (detectedMoods.length === 0) {
        detectedMoods.push({ mood: 'happy', score: 1 });
        primaryMood = 'happy';
    }
    
    return {
        detectedMoods,
        primaryMood,
        response: moodResponses[primaryMood] || moodResponses.default
    };
}

function getRecommendations(detectedMoods, weather, time) {
    // Clone dishes and calculate scores
    const scoredDishes = menuDatabase.dishes.map(dish => {
        let score = 0;
        
        // Mood matching (highest weight)
        detectedMoods.forEach(({ mood, score: moodScore }) => {
            const moodMap = {
                happy: ["سعيد", "متحمس"],
                calm: ["هادئ", "مسترخي"],
                tired: ["متعب", "مريح"],
                hungry: ["جائع", "مشبع"],
                celebration: ["احتفالي", "فاخر"],
                nostalgic: ["حنين", "دافئ"],
                adventurous: ["مغامر", "جريء"],
                healthy: ["صحي", "خفيف"]
            };
            
            const mappedMoods = moodMap[mood] || [];
            mappedMoods.forEach(m => {
                if (dish.moods.some(dm => dm.includes(m) || m.includes(dm))) {
                    score += moodScore * 3;
                }
            });
        });
        
        // Weather matching
        if (dish.weather.includes(weather)) {
            score += 2;
        }
        
        // Time matching
        if (dish.time.includes(time)) {
            score += 2;
        }
        
        // Add some randomness for variety
        score += Math.random() * 1.5;
        
        return { ...dish, matchScore: Math.min(Math.round((score / 10) * 100), 98) };
    });
    
    // Sort by score and return top 4
    scoredDishes.sort((a, b) => b.matchScore - a.matchScore);
    return scoredDishes.slice(0, 4);
}

function displayResults(analysis, recommendations) {
    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    document.querySelector('section:not(#loadingSection):not(#resultsSection)').style.opacity = '1';
    
    // Set mood analysis text
    moodAnalysis.textContent = analysis.response;
    
    // Clear previous recommendations
    recommendationsGrid.innerHTML = '';
    
    // Add dish cards with staggered animation
    recommendations.forEach((dish, index) => {
        const card = createDishCard(dish);
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        recommendationsGrid.appendChild(card);
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.innerHTML = `
        <span class="match-score">✨ ${dish.matchScore}% تطابق</span>
        <span class="dish-price">${dish.price} ر.س</span>
        <div class="card-content">
            <span class="dish-emoji">${dish.emoji}</span>
            <h4 class="dish-title">${dish.name}</h4>
            <p class="dish-description">${dish.description}</p>
            <div class="dish-tags">
                ${dish.tags.map(tag => `<span class="dish-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        // Future: Add to cart functionality
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }, 150);
    });
    
    return card;
}

function resetInterface() {
    resultsSection.classList.add('hidden');
    moodInput.value = '';
    charCount.textContent = '0 / 200';
    moodChips.forEach(c => c.classList.remove('active'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Helper Functions
// ============================================

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    element.style.borderColor = '#ff4444';
    setTimeout(() => {
        element.style.animation = '';
        element.style.borderColor = '';
    }, 500);
}

const loadingMessages = [
    "جاري تحليل مزاجك...",
    "أستشعر طاقتك الآن...",
    "أبحث في قائمتنا الكونية...",
    "أختار الأطباق المثالية لك...",
    "الشيف الذكي يفكر..."
];

function animateLoadingText() {
    let index = 0;
    const interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[index];
        
        if (resultsSection.classList.contains('hidden') === false) {
            clearInterval(interval);
        }
    }, 500);
}

// Add shake keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// Initialize
// ============================================
console.log('🚀 AI Antigravity - Flavor Oracle initialized');
console.log('✨ Ready to analyze your mood and recommend dishes!');
