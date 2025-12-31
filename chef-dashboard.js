/**
 * AI Antigravity - Smart KDS (Kitchen Display System)
 * Chef Dashboard Logic
 */

// ============================================
// Order Database (Mock Data)
// ============================================
const mockOrders = [
    {
        id: 1,
        orderNumber: '#1247',
        customerMood: 'hungry',
        moodIcon: '🤤',
        moodLabel: 'جائع',
        dish: {
            name: 'برغر المجرة المزدوجة',
            emoji: '🍔',
            description: 'طبقتان من لحم الأنغوس مع جبنة شيدر',
            complexity: 2
        },
        prepTimeMinutes: 8,
        isUrgent: false,
        isCombinable: true,
        combinableWith: ['بطاطس', 'صلصة'],
        isVIP: false,
        createdAt: new Date()
    },
    {
        id: 2,
        orderNumber: '#1248',
        customerMood: 'celebration',
        moodIcon: '🎉',
        moodLabel: 'احتفالي',
        dish: {
            name: 'ستيك الانعدام الجاذبي',
            emoji: '🥩',
            description: 'قطعة لحم واغيو فاخرة مع صلصة الكمأة',
            complexity: 3
        },
        prepTimeMinutes: 15,
        isUrgent: true,
        isCombinable: false,
        combinableWith: [],
        isVIP: true,
        createdAt: new Date()
    },
    {
        id: 3,
        orderNumber: '#1249',
        customerMood: 'calm',
        moodIcon: '😌',
        moodLabel: 'هادئ',
        dish: {
            name: 'سلمون الشفق القطبي',
            emoji: '🐟',
            description: 'سلمون نرويجي مدخن بخشب الأرز',
            complexity: 2
        },
        prepTimeMinutes: 12,
        isUrgent: false,
        isCombinable: true,
        combinableWith: ['أرز', 'خضروات'],
        isVIP: false,
        createdAt: new Date()
    }
];

// Available dishes for random order generation
const availableDishes = [
    { name: 'برغر المجرة المزدوجة', emoji: '🍔', description: 'طبقتان من لحم الأنغوس', complexity: 2, time: 8 },
    { name: 'ستيك الانعدام الجاذبي', emoji: '🥩', description: 'لحم واغيو فاخر', complexity: 3, time: 15 },
    { name: 'سلمون الشفق القطبي', emoji: '🐟', description: 'سلمون نرويجي مدخن', complexity: 2, time: 12 },
    { name: 'معكرونة الثقب الأسود', emoji: '🍝', description: 'سباغيتي بالحبر الأسود', complexity: 2, time: 10 },
    { name: 'بيتزا درب التبانة', emoji: '🍕', description: 'عجينة مخمرة 72 ساعة', complexity: 2, time: 12 },
    { name: 'دجاج الأوريون المشوي', emoji: '🍗', description: 'دجاجة مشوية بالأعشاب', complexity: 2, time: 14 },
    { name: 'سلطة حديقة النجوم', emoji: '🥗', description: 'خضروات طازجة عضوية', complexity: 1, time: 5 },
    { name: 'شوربة القمر الفضي', emoji: '🍲', description: 'شوربة كريمية من الفطر', complexity: 1, time: 7 },
    { name: 'تشيز كيك الفضاء', emoji: '🍰', description: 'تشيز كيك بالتوت الأزرق', complexity: 1, time: 5 },
    { name: 'آيس كريم السديم', emoji: '🍨', description: 'ثلاث نكهات مختارة', complexity: 1, time: 3 }
];

const moods = [
    { key: 'hungry', icon: '🤤', label: 'جائع' },
    { key: 'celebration', icon: '🎉', label: 'احتفالي' },
    { key: 'calm', icon: '😌', label: 'هادئ' },
    { key: 'happy', icon: '😊', label: 'سعيد' },
    { key: 'tired', icon: '😴', label: 'متعب' }
];

// ============================================
// State Management
// ============================================
let activeOrders = [];
let completedCount = 0;
let orderCounter = 1249;
let timerIntervals = {};

// ============================================
// DOM Elements
// ============================================
const ordersGrid = document.getElementById('ordersGrid');
const emptyState = document.getElementById('emptyState');
const totalOrdersEl = document.getElementById('totalOrders');
const urgentOrdersEl = document.getElementById('urgentOrders');
const completedOrdersEl = document.getElementById('completedOrders');
const avgTimeEl = document.getElementById('avgTime');
const addDemoBtn = document.getElementById('addDemoOrder');

// ============================================
// Initialize
// ============================================
function init() {
    // Add initial mock orders
    mockOrders.forEach(order => {
        addOrder(order);
    });

    updateStats();

    // Event listener for demo button
    addDemoBtn.addEventListener('click', addRandomOrder);

    console.log('👨‍🍳 Smart KDS - Chef Dashboard initialized');
}

// ============================================
// Order Management
// ============================================
function addOrder(order) {
    activeOrders.push(order);
    renderOrderCard(order);
    startTimer(order);
    updateEmptyState();
    updateStats();
}

function removeOrder(orderId) {
    const card = document.querySelector(`[data-order-id="${orderId}"]`);
    if (card) {
        card.classList.add('completing');

        // Clear timer
        if (timerIntervals[orderId]) {
            clearInterval(timerIntervals[orderId]);
            delete timerIntervals[orderId];
        }

        setTimeout(() => {
            card.remove();
            activeOrders = activeOrders.filter(o => o.id !== orderId);
            completedCount++;
            updateStats();
            updateEmptyState();
            showToast('✅ تم إكمال الطلب بنجاح!');
        }, 500);
    }
}

function addRandomOrder() {
    orderCounter++;
    const randomDish = availableDishes[Math.floor(Math.random() * availableDishes.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    const newOrder = {
        id: Date.now(),
        orderNumber: `#${orderCounter}`,
        customerMood: randomMood.key,
        moodIcon: randomMood.icon,
        moodLabel: randomMood.label,
        dish: {
            name: randomDish.name,
            emoji: randomDish.emoji,
            description: randomDish.description,
            complexity: randomDish.complexity
        },
        prepTimeMinutes: randomDish.time,
        isUrgent: Math.random() < 0.3,
        isCombinable: Math.random() < 0.5,
        combinableWith: ['مكونات مشتركة'],
        isVIP: Math.random() < 0.2,
        createdAt: new Date()
    };

    addOrder(newOrder);
    showToast('📥 طلب جديد وصل!');
}

// ============================================
// Render Order Card
// ============================================
function renderOrderCard(order) {
    const card = document.createElement('div');
    card.className = `order-card ${order.isUrgent ? 'urgent' : ''}`;
    card.dataset.orderId = order.id;

    // Generate complexity dots
    let complexityDots = '';
    for (let i = 1; i <= 3; i++) {
        complexityDots += `<span class="complexity-dot ${i <= order.dish.complexity ? 'active' : ''}"></span>`;
    }

    // Generate priority tags
    let priorityTags = '';
    if (order.isUrgent) {
        priorityTags += '<span class="priority-tag urgent">🔴 مستعجل</span>';
    }
    if (order.isVIP) {
        priorityTags += '<span class="priority-tag vip">⭐ VIP</span>';
    }
    if (order.isCombinable) {
        priorityTags += '<span class="priority-tag combinable">🔵 قابل للدمج</span>';
    }

    const timeString = order.createdAt.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

    card.innerHTML = `
        <div class="order-header">
            <div>
                <div class="order-number">${order.orderNumber}</div>
                <div class="order-time">⏰ ${timeString}</div>
            </div>
            <div class="mood-badge ${order.customerMood}">
                <span>${order.moodIcon}</span>
                <span>${order.moodLabel}</span>
            </div>
        </div>
        
        <div class="dish-info">
            <div class="dish-name">
                <span class="dish-emoji-lg">${order.dish.emoji}</span>
                <span>${order.dish.name}</span>
            </div>
            <p class="dish-details">${order.dish.description}</p>
            <div class="complexity">
                <span>التعقيد:</span>
                <div class="complexity-dots">
                    ${complexityDots}
                </div>
            </div>
        </div>
        
        <div class="priority-tags">
            ${priorityTags}
        </div>
        
        <div class="prep-timer">
            <div class="timer-header">
                <span class="timer-label">⏱️ مؤقت التحضير الذكي</span>
                <span class="timer-value" id="timer-${order.id}">${order.prepTimeMinutes}:00</span>
            </div>
            <div class="timer-bar">
                <div class="timer-progress green" id="progress-${order.id}" style="width: 100%;"></div>
            </div>
        </div>
        
        <button class="complete-btn" onclick="removeOrder(${order.id})">
            <span>✅</span>
            <span>تم التحضير</span>
        </button>
    `;

    ordersGrid.appendChild(card);
}

// ============================================
// Timer Logic
// ============================================
function startTimer(order) {
    const totalSeconds = order.prepTimeMinutes * 60;
    let remainingSeconds = totalSeconds;

    timerIntervals[order.id] = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            clearInterval(timerIntervals[order.id]);
        }

        updateTimerDisplay(order.id, remainingSeconds, totalSeconds);
    }, 1000);
}

function updateTimerDisplay(orderId, remainingSeconds, totalSeconds) {
    const timerEl = document.getElementById(`timer-${orderId}`);
    const progressEl = document.getElementById(`progress-${orderId}`);

    if (!timerEl || !progressEl) return;

    // Update time display
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Calculate progress percentage
    const percentage = (remainingSeconds / totalSeconds) * 100;
    progressEl.style.width = `${percentage}%`;

    // Update color based on percentage
    progressEl.classList.remove('green', 'yellow', 'red');
    if (percentage > 50) {
        progressEl.classList.add('green');
    } else if (percentage > 20) {
        progressEl.classList.add('yellow');
    } else {
        progressEl.classList.add('red');
    }
}

// ============================================
// Stats Update
// ============================================
function updateStats() {
    totalOrdersEl.textContent = activeOrders.length;
    urgentOrdersEl.textContent = activeOrders.filter(o => o.isUrgent).length;
    completedOrdersEl.textContent = completedCount;

    // Calculate average prep time
    if (activeOrders.length > 0) {
        const avgTime = Math.round(activeOrders.reduce((sum, o) => sum + o.prepTimeMinutes, 0) / activeOrders.length);
        avgTimeEl.textContent = `${avgTime} د`;
    } else {
        avgTimeEl.textContent = '--';
    }
}

function updateEmptyState() {
    if (activeOrders.length === 0) {
        emptyState.classList.add('show');
        ordersGrid.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        ordersGrid.style.display = 'grid';
    }
}

// ============================================
// Toast Notification
// ============================================
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Start Application
// ============================================
document.addEventListener('DOMContentLoaded', init);
