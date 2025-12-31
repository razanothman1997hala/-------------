/* ================================
   Smart POS - Cashier Dashboard JavaScript
   نقطة البيع الذكية
   ================================ */

// Menu Items Data
const menuItems = [
    // مقبلات
    { id: 1, name: 'سلطة سيزر', emoji: '🥗', price: 28, category: 'appetizers' },
    { id: 2, name: 'حمص بالطحينة', emoji: '🧆', price: 18, category: 'appetizers' },
    { id: 3, name: 'متبل باذنجان', emoji: '🍆', price: 20, category: 'appetizers' },
    { id: 4, name: 'تبولة', emoji: '🥬', price: 22, category: 'appetizers' },
    { id: 5, name: 'فتوش', emoji: '🥙', price: 20, category: 'appetizers' },

    // أطباق رئيسية
    { id: 6, name: 'ستيك لحم', emoji: '🥩', price: 95, category: 'main' },
    { id: 7, name: 'دجاج مشوي', emoji: '🍗', price: 65, category: 'main' },
    { id: 8, name: 'سمك سلمون', emoji: '🐟', price: 85, category: 'main' },
    { id: 9, name: 'برغر كلاسيك', emoji: '🍔', price: 45, category: 'main' },
    { id: 10, name: 'باستا ألفريدو', emoji: '🍝', price: 55, category: 'main' },
    { id: 11, name: 'ريزوتو الفطر', emoji: '🍄', price: 58, category: 'main' },
    { id: 12, name: 'كباب مشكل', emoji: '🍢', price: 75, category: 'main' },

    // مشروبات
    { id: 13, name: 'عصير برتقال', emoji: '🍊', price: 15, category: 'drinks' },
    { id: 14, name: 'موهيتو', emoji: '🍹', price: 22, category: 'drinks' },
    { id: 15, name: 'قهوة عربية', emoji: '☕', price: 12, category: 'drinks' },
    { id: 16, name: 'شاي أخضر', emoji: '🍵', price: 10, category: 'drinks' },
    { id: 17, name: 'سموثي تروبيكال', emoji: '🥤', price: 25, category: 'drinks' },
    { id: 18, name: 'ليموناضة منعشة', emoji: '🍋', price: 18, category: 'drinks' },

    // حلويات
    { id: 19, name: 'تشيز كيك', emoji: '🍰', price: 32, category: 'desserts' },
    { id: 20, name: 'كريم بروليه', emoji: '🍮', price: 28, category: 'desserts' },
    { id: 21, name: 'آيس كريم', emoji: '🍨', price: 20, category: 'desserts' },
    { id: 22, name: 'براوني شوكولا', emoji: '🍫', price: 26, category: 'desserts' },
    { id: 23, name: 'كنافة نابلسية', emoji: '🧁', price: 35, category: 'desserts' },
];

// Cart State
let cart = [];
let currentCategory = 'all';
let todaySalesCount = 0;
let todayTotalSales = 0;

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const todaySalesEl = document.getElementById('todaySales');
const todayTotalEl = document.getElementById('todayTotal');
const currentTimeEl = document.getElementById('currentTime');
const paymentModal = document.getElementById('paymentModal');
const modalTotal = document.getElementById('modalTotal');
const paidAmountInput = document.getElementById('paidAmount');
const changeAmountEl = document.getElementById('changeAmount');
const successToast = document.getElementById('successToast');
const toastMessage = document.getElementById('toastMessage');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupEventListeners();
    updateTime();
    setInterval(updateTime, 1000);
    loadSalesData();
});

// Render Menu Items
function renderMenu(category = 'all') {
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-id="${item.id}" onclick="addToCart(${item.id})">
            <span class="menu-item-emoji">${item.emoji}</span>
            <p class="menu-item-name">${item.name}</p>
            <p class="menu-item-price">${item.price} ر.س</p>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Category Buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderMenu(currentCategory);
        });
    });

    // Order Type Buttons
    document.querySelectorAll('.order-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Clear Cart
    document.getElementById('clearCart').addEventListener('click', clearCart);

    // Payment Buttons
    document.getElementById('payCash').addEventListener('click', () => openPaymentModal('cash'));
    document.getElementById('payCard').addEventListener('click', () => processCardPayment());

    // Modal Controls
    document.getElementById('closeModal').addEventListener('click', closePaymentModal);
    document.getElementById('confirmPayment').addEventListener('click', confirmPayment);
    paidAmountInput.addEventListener('input', calculateChange);

    // Action Buttons
    document.getElementById('sendToKitchen').addEventListener('click', sendToKitchen);
    document.getElementById('printReceipt').addEventListener('click', printReceipt);

    // Close modal on overlay click
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) closePaymentModal();
    });
}

// Add Item to Cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    renderCart();
    updateTotals();

    // Visual feedback
    const menuItem = document.querySelector(`[data-id="${itemId}"]`);
    menuItem.style.transform = 'scale(0.9)';
    setTimeout(() => {
        menuItem.style.transform = '';
    }, 150);
}

// Update Item Quantity
function updateQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== itemId);
    }

    renderCart();
    updateTotals();
}

// Remove Item from Cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    renderCart();
    updateTotals();
}

// Render Cart
function renderCart() {
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCart);
        return;
    }

    emptyCart.style.display = 'none';
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span class="cart-item-emoji">${item.emoji}</span>
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">${item.price * item.quantity} ر.س</p>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');
}

// Update Totals
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    subtotalEl.textContent = `${subtotal.toFixed(2)} ر.س`;
    taxEl.textContent = `${tax.toFixed(2)} ر.س`;
    totalEl.textContent = `${total.toFixed(2)} ر.س`;
}

// Clear Cart
function clearCart() {
    cart = [];
    renderCart();
    updateTotals();
}

// Open Payment Modal
function openPaymentModal(type) {
    if (cart.length === 0) {
        showToast('السلة فارغة!', 'warning');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.15;

    modalTotal.textContent = `${total.toFixed(2)} ر.س`;
    paidAmountInput.value = '';
    changeAmountEl.textContent = '0.00 ر.س';

    paymentModal.classList.remove('hidden');
    paidAmountInput.focus();
}

// Close Payment Modal
function closePaymentModal() {
    paymentModal.classList.add('hidden');
}

// Calculate Change
function calculateChange() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.15;
    const paid = parseFloat(paidAmountInput.value) || 0;
    const change = paid - total;

    changeAmountEl.textContent = `${Math.max(0, change).toFixed(2)} ر.س`;
    changeAmountEl.style.color = change >= 0 ? '#00ff64' : '#ff6b6b';
}

// Confirm Payment
function confirmPayment() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.15;
    const paid = parseFloat(paidAmountInput.value) || 0;

    if (paid < total) {
        showToast('المبلغ المدفوع غير كافٍ!', 'warning');
        return;
    }

    // Record sale
    todaySalesCount++;
    todayTotalSales += total;
    saveSalesData();
    updateSalesDisplay();

    // Clear cart and close modal
    closePaymentModal();
    clearCart();
    showToast('✅ تمت عملية الدفع بنجاح!');
}

// Process Card Payment
function processCardPayment() {
    if (cart.length === 0) {
        showToast('السلة فارغة!', 'warning');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.15;

    // Simulate card payment
    showToast('💳 جاري معالجة البطاقة...');

    setTimeout(() => {
        todaySalesCount++;
        todayTotalSales += total;
        saveSalesData();
        updateSalesDisplay();
        clearCart();
        showToast('✅ تم الدفع بالبطاقة بنجاح!');
    }, 1500);
}

// Send to Kitchen
function sendToKitchen() {
    if (cart.length === 0) {
        showToast('السلة فارغة!', 'warning');
        return;
    }

    // Simulate sending to kitchen
    showToast('👨‍🍳 تم إرسال الطلب للمطبخ!');

    // In a real app, this would send data to the kitchen display
    console.log('Order sent to kitchen:', cart);
}

// Print Receipt
function printReceipt() {
    if (cart.length === 0) {
        showToast('لا يوجد طلب للطباعة!', 'warning');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    // Create receipt content
    let receipt = `
═══════════════════════════════
      🧠 Hala Neural Cuisine
    حيث تُلتقي العاطفة بالخوارزميات
═══════════════════════════════
${new Date().toLocaleString('ar-SA')}
───────────────────────────────
`;

    cart.forEach(item => {
        receipt += `${item.emoji} ${item.name} x${item.quantity}
   ${(item.price * item.quantity).toFixed(2)} ر.س
`;
    });

    receipt += `───────────────────────────────
المجموع الفرعي:    ${subtotal.toFixed(2)} ر.س
الضريبة (15%):     ${tax.toFixed(2)} ر.س
───────────────────────────────
الإجمالي:          ${total.toFixed(2)} ر.س
═══════════════════════════════
     شكراً لزيارتكم! 🌟
`;

    console.log(receipt);
    showToast('🖨️ تم إرسال الفاتورة للطباعة!');
}

// Show Toast Notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    successToast.classList.remove('hidden');
    successToast.classList.add('show');

    setTimeout(() => {
        successToast.classList.remove('show');
        setTimeout(() => {
            successToast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Update Time Display
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTimeEl.textContent = `${hours}:${minutes}`;
}

// Save Sales Data to LocalStorage
function saveSalesData() {
    const today = new Date().toDateString();
    localStorage.setItem('halaPOS_date', today);
    localStorage.setItem('halaPOS_salesCount', todaySalesCount.toString());
    localStorage.setItem('halaPOS_totalSales', todayTotalSales.toString());
}

// Load Sales Data from LocalStorage
function loadSalesData() {
    const savedDate = localStorage.getItem('halaPOS_date');
    const today = new Date().toDateString();

    if (savedDate === today) {
        todaySalesCount = parseInt(localStorage.getItem('halaPOS_salesCount')) || 0;
        todayTotalSales = parseFloat(localStorage.getItem('halaPOS_totalSales')) || 0;
    } else {
        // New day, reset sales
        todaySalesCount = 0;
        todayTotalSales = 0;
        saveSalesData();
    }

    updateSalesDisplay();
}

// Update Sales Display
function updateSalesDisplay() {
    todaySalesEl.textContent = todaySalesCount;
    todayTotalEl.textContent = todayTotalSales.toFixed(0);
}
