/**
 * AI Antigravity - Management Command Center
 * Admin Dashboard Logic with Mock AI Analytics
 */

// ============================================
// Mock Data
// ============================================

// Inventory items
const inventoryData = [
    { id: 1, name: 'لحم واغيو', icon: '🥩', stock: 8, maxStock: 50, unit: 'كيلو', depletionHours: 3 },
    { id: 2, name: 'سلمون نرويجي', icon: '🐟', stock: 5, maxStock: 30, unit: 'كيلو', depletionHours: 4 },
    { id: 3, name: 'جبنة شيدر', icon: '🧀', stock: 12, maxStock: 40, unit: 'كيلو', depletionHours: 8 },
    { id: 4, name: 'خبز برغر', icon: '🍞', stock: 45, maxStock: 100, unit: 'قطعة', depletionHours: 12 },
    { id: 5, name: 'طماطم طازجة', icon: '🍅', stock: 25, maxStock: 60, unit: 'كيلو', depletionHours: 18 },
    { id: 6, name: 'كافيار ذهبي', icon: '🥄', stock: 2, maxStock: 10, unit: 'علبة', depletionHours: 2 },
    { id: 7, name: 'فطر بري', icon: '🍄', stock: 8, maxStock: 25, unit: 'كيلو', depletionHours: 6 },
    { id: 8, name: 'أرز زعفران', icon: '🍚', stock: 35, maxStock: 50, unit: 'كيلو', depletionHours: 24 }
];

// Chef performance data
const chefData = [
    { id: 1, name: 'الشيف أحمد', avatar: '👨‍🍳', completedOrders: 47, avgTime: 8.2, aiPredicted: 10, rating: 5 },
    { id: 2, name: 'الشيف سارة', avatar: '👩‍🍳', completedOrders: 42, avgTime: 9.5, aiPredicted: 10, rating: 4.5 },
    { id: 3, name: 'الشيف محمد', avatar: '👨‍🍳', completedOrders: 38, avgTime: 11.2, aiPredicted: 10, rating: 4 },
    { id: 4, name: 'الشيف نور', avatar: '👩‍🍳', completedOrders: 35, avgTime: 9.8, aiPredicted: 10, rating: 4.5 },
    { id: 5, name: 'الشيف خالد', avatar: '👨‍🍳', completedOrders: 31, avgTime: 12.5, aiPredicted: 10, rating: 3.5 }
];

// Sentiment data
const sentimentData = {
    happy: 156,
    neutral: 28,
    unhappy: 12
};

// Sample reviews
const recentReviewsData = [
    { sentiment: 'happy', text: 'طعام رائع! الستيك كان مطبوخ بشكل مثالي 🌟', time: 'منذ 5 دقائق' },
    { sentiment: 'happy', text: 'خدمة سريعة وأجواء مميزة، سأعود بالتأكيد!', time: 'منذ 12 دقيقة' },
    { sentiment: 'neutral', text: 'الطعام جيد لكن الانتظار كان طويلاً قليلاً', time: 'منذ 20 دقيقة' },
    { sentiment: 'unhappy', text: 'البرغر كان بارداً عند وصوله', time: 'منذ 35 دقيقة' },
    { sentiment: 'happy', text: 'تجربة لا تُنسى! السلمون كان طازجاً جداً', time: 'منذ 45 دقيقة' }
];

// ============================================
// DOM Elements
// ============================================
const todayRevenueEl = document.getElementById('todayRevenue');
const todayOrdersEl = document.getElementById('todayOrders');
const activeChefsEl = document.getElementById('activeChefs');
const inventoryListEl = document.getElementById('inventoryList');
const criticalItemsEl = document.getElementById('criticalItems');
const warningItemsEl = document.getElementById('warningItems');
const goodItemsEl = document.getElementById('goodItems');
const performanceTableEl = document.getElementById('performanceTable');
const bestChefEl = document.getElementById('bestChef');
const avgTeamTimeEl = document.getElementById('avgTeamTime');
const efficiencyRateEl = document.getElementById('efficiencyRate');
const happyCountEl = document.getElementById('happyCount');
const neutralCountEl = document.getElementById('neutralCount');
const unhappyCountEl = document.getElementById('unhappyCount');
const happyBarEl = document.getElementById('happyBar');
const neutralBarEl = document.getElementById('neutralBar');
const unhappyBarEl = document.getElementById('unhappyBar');
const overallScoreEl = document.getElementById('overallScore');
const recentReviewsEl = document.getElementById('recentReviews');

// Charts
let trafficChart, revenueChart, sentimentChart;

// ============================================
// Initialize Dashboard
// ============================================
function init() {
    updateQuickStats();
    initCharts();
    renderInventory();
    renderPerformanceTable();
    renderSentimentAnalysis();
    renderRecentReviews();

    // Start live updates
    setInterval(updateLiveData, 5000);

    console.log('🎯 Management Command Center initialized');
}

// ============================================
// Quick Stats
// ============================================
function updateQuickStats() {
    // Animate counting
    animateNumber(todayRevenueEl, 0, 24750, 2000);
    animateNumber(todayOrdersEl, 0, 193, 1500);
    activeChefsEl.textContent = '5';
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current.toLocaleString('ar-SA');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

// ============================================
// Charts
// ============================================
function initCharts() {
    // Traffic Prediction Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    const hours = ['الآن', '+1س', '+2س', '+3س', '+4س', '+5س', '+6س'];
    const trafficData = [45, 62, 78, 95, 82, 65, 48];

    trafficChart = new Chart(trafficCtx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'توقع الطلبات',
                data: trafficData,
                borderColor: '#00f5ff',
                backgroundColor: 'rgba(0, 245, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00f5ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: 'rgba(255,255,255,0.5)' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                y: {
                    ticks: { color: 'rgba(255,255,255,0.5)' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueHours = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const revenueData = [1200, 1800, 2400, 2100, 1500, 1800, 2800, 3500, 4200, 3800, 2900, 1750];

    revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: revenueHours,
            datasets: [{
                label: 'الإيرادات (ر.س)',
                data: revenueData,
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(191, 0, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(0, 245, 255, 0.4)');
                    return gradient;
                },
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: 'rgba(255,255,255,0.5)' },
                    grid: { display: false }
                },
                y: {
                    ticks: {
                        color: 'rgba(255,255,255,0.5)',
                        callback: (value) => value.toLocaleString()
                    },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });

    // Sentiment Doughnut Chart
    const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');

    sentimentChart = new Chart(sentimentCtx, {
        type: 'doughnut',
        data: {
            labels: ['سعيد', 'محايد', 'غير راضٍ'],
            datasets: [{
                data: [sentimentData.happy, sentimentData.neutral, sentimentData.unhappy],
                backgroundColor: ['#00ff64', '#ffcc00', '#ff4444'],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// ============================================
// Inventory
// ============================================
function renderInventory() {
    let critical = 0, warning = 0, good = 0;

    inventoryListEl.innerHTML = inventoryData.map(item => {
        const percentage = (item.stock / item.maxStock) * 100;
        let status, statusClass;

        if (percentage <= 20) {
            status = 'critical';
            critical++;
        } else if (percentage <= 50) {
            status = 'warning';
            warning++;
        } else {
            status = 'good';
            good++;
        }

        const needsOrder = percentage <= 20;

        return `
            <div class="inventory-item ${status}">
                <div class="inventory-info">
                    <span class="inventory-icon">${item.icon}</span>
                    <div>
                        <div class="inventory-name">${item.name}</div>
                        <div class="inventory-stock">${item.stock} ${item.unit} من ${item.maxStock}</div>
                    </div>
                </div>
                <div class="inventory-status">
                    ${needsOrder ? `<button class="order-now-btn">🛒 اطلب الآن</button>` : ''}
                    <div class="depletion-time">ينفد خلال ${item.depletionHours} ساعة</div>
                    <div class="inventory-progress">
                        <div class="inventory-progress-fill ${status}" style="width: ${percentage}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    criticalItemsEl.textContent = critical;
    warningItemsEl.textContent = warning;
    goodItemsEl.textContent = good;
}

// ============================================
// Performance Table
// ============================================
function renderPerformanceTable() {
    performanceTableEl.innerHTML = chefData.map(chef => {
        const diff = chef.aiPredicted - chef.avgTime;
        let diffClass, diffText, diffIcon;

        if (diff > 0) {
            diffClass = 'faster';
            diffText = `أسرع بـ ${diff.toFixed(1)} د`;
            diffIcon = '⬆️';
        } else if (diff < 0) {
            diffClass = 'slower';
            diffText = `أبطأ بـ ${Math.abs(diff).toFixed(1)} د`;
            diffIcon = '⬇️';
        } else {
            diffClass = 'same';
            diffText = 'مطابق';
            diffIcon = '➡️';
        }

        const stars = '★'.repeat(Math.floor(chef.rating)) + (chef.rating % 1 ? '½' : '');

        return `
            <tr>
                <td>
                    <div class="chef-info">
                        <div class="chef-avatar">${chef.avatar}</div>
                        <span class="chef-name">${chef.name}</span>
                    </div>
                </td>
                <td>${chef.completedOrders}</td>
                <td>${chef.avgTime.toFixed(1)} د</td>
                <td>${chef.aiPredicted} د</td>
                <td><span class="time-diff ${diffClass}">${diffIcon} ${diffText}</span></td>
                <td><span class="rating-stars">${stars}</span></td>
            </tr>
        `;
    }).join('');

    // Calculate team stats
    const bestChef = chefData.reduce((best, chef) =>
        (chef.aiPredicted - chef.avgTime) > (best.aiPredicted - best.avgTime) ? chef : best
    );
    const avgTime = chefData.reduce((sum, chef) => sum + chef.avgTime, 0) / chefData.length;
    const avgPredicted = chefData.reduce((sum, chef) => sum + chef.aiPredicted, 0) / chefData.length;
    const efficiency = ((avgPredicted / avgTime) * 100).toFixed(0);

    bestChefEl.textContent = bestChef.name;
    avgTeamTimeEl.textContent = `${avgTime.toFixed(1)} د`;
    efficiencyRateEl.textContent = `${efficiency}%`;
}

// ============================================
// Sentiment Analysis
// ============================================
function renderSentimentAnalysis() {
    const total = sentimentData.happy + sentimentData.neutral + sentimentData.unhappy;
    const happyPercent = (sentimentData.happy / total) * 100;
    const neutralPercent = (sentimentData.neutral / total) * 100;
    const unhappyPercent = (sentimentData.unhappy / total) * 100;

    // Overall score (weighted)
    const overallScore = Math.round(
        (sentimentData.happy * 100 + sentimentData.neutral * 50 + sentimentData.unhappy * 0) / total
    );

    happyCountEl.textContent = sentimentData.happy;
    neutralCountEl.textContent = sentimentData.neutral;
    unhappyCountEl.textContent = sentimentData.unhappy;

    happyBarEl.style.width = `${happyPercent}%`;
    neutralBarEl.style.width = `${neutralPercent}%`;
    unhappyBarEl.style.width = `${unhappyPercent}%`;

    overallScoreEl.textContent = `${overallScore}%`;
    overallScoreEl.style.color = overallScore >= 70 ? '#00ff64' : overallScore >= 50 ? '#ffcc00' : '#ff4444';
}

function renderRecentReviews() {
    recentReviewsEl.innerHTML = recentReviewsData.map(review => `
        <div class="review-item ${review.sentiment}">
            <span class="review-emoji">${review.sentiment === 'happy' ? '😊' : review.sentiment === 'neutral' ? '😐' : '😞'}</span>
            <div class="review-content">
                <div class="review-text">${review.text}</div>
                <div class="review-time">${review.time}</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// Live Updates
// ============================================
function updateLiveData() {
    // Simulate live data changes
    const newOrders = parseInt(todayOrdersEl.textContent.replace(/,/g, '')) + Math.floor(Math.random() * 3);
    const newRevenue = parseInt(todayRevenueEl.textContent.replace(/,/g, '')) + Math.floor(Math.random() * 500);

    todayOrdersEl.textContent = newOrders.toLocaleString('ar-SA');
    todayRevenueEl.textContent = newRevenue.toLocaleString('ar-SA');

    // Update charts with slight variations
    if (trafficChart) {
        trafficChart.data.datasets[0].data = trafficChart.data.datasets[0].data.map(
            val => val + (Math.random() - 0.5) * 5
        );
        trafficChart.update('none');
    }
}

// ============================================
// Theme Toggle Functionality
// ============================================
const themeToggleBtn = document.getElementById('themeToggle');
let isLightMode = localStorage.getItem('adminTheme') === 'light';

function updateChartColors() {
    const textColor = isLightMode ? '#4B5563' : 'rgba(255, 255, 255, 0.5)';
    const gridColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.05)';

    // Update Traffic Chart
    if (trafficChart) {
        trafficChart.options.scales.x.ticks.color = textColor;
        trafficChart.options.scales.y.ticks.color = textColor;
        trafficChart.options.scales.x.grid.color = gridColor;
        trafficChart.options.scales.y.grid.color = gridColor;

        // Update line colors for better contrast in light mode
        if (isLightMode) {
            trafficChart.data.datasets[0].borderColor = '#9c27b0';
            trafficChart.data.datasets[0].backgroundColor = 'rgba(156, 39, 176, 0.1)';
            trafficChart.data.datasets[0].pointBackgroundColor = '#9c27b0';
        } else {
            trafficChart.data.datasets[0].borderColor = '#00f5ff';
            trafficChart.data.datasets[0].backgroundColor = 'rgba(0, 245, 255, 0.1)';
            trafficChart.data.datasets[0].pointBackgroundColor = '#00f5ff';
        }
        trafficChart.update('none');
    }

    // Update Revenue Chart
    if (revenueChart) {
        revenueChart.options.scales.x.ticks.color = textColor;
        revenueChart.options.scales.y.ticks.color = textColor;
        revenueChart.options.scales.y.grid.color = gridColor;
        revenueChart.update('none');
    }
}

function toggleTheme() {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);
    localStorage.setItem('adminTheme', isLightMode ? 'light' : 'dark');

    // Update toggle button icon
    if (themeToggleBtn) {
        themeToggleBtn.textContent = isLightMode ? '🌙' : '☀️';
    }

    // Update chart colors
    updateChartColors();

    // Update sentiment score color based on theme
    const overallScoreEl = document.getElementById('overallScore');
    if (overallScoreEl && isLightMode) {
        const score = parseInt(overallScoreEl.textContent);
        overallScoreEl.style.color = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
    }
}

function initTheme() {
    if (isLightMode) {
        document.body.classList.add('light-mode');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '🌙';
        }
    } else {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '☀️';
        }
    }
}

// Add event listener for theme toggle
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// ============================================
// Start Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    init();

    // Apply chart colors after charts are initialized
    setTimeout(() => {
        updateChartColors();
    }, 100);
});
