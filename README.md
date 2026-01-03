# 🧠 Hala Neural Cuisine | مطبخ حلا العصبي

> **حيث تُلتقي العاطفة بالخوارزميات** - Where Emotion Meets Algorithms

A futuristic AI-powered restaurant management system with mood-based dish recommendations, real-time order tracking, and a complete multi-interface ecosystem.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)
![RTL](https://img.shields.io/badge/Language-Arabic%20RTL-blue)

---

## ✨ Features

### 🔮 AI Mood-Based Recommendations
- **Smart Mood Analysis**: Analyzes customer mood through text input or quick mood chips
- **Context-Aware Suggestions**: Considers weather conditions and time of day
- **Voice Assistant**: Arabic speech recognition for hands-free ordering
- **Personalized Experience**: Matches dishes to emotional states

### 🏪 Multi-Interface System

| Interface | Description |
|-----------|-------------|
| 🔮 **Customer Portal** | Mood-based ordering with AI recommendations |
| 📋 **Menu Browser** | Full catalog with filtering and search |
| 💳 **Cashier Dashboard** | Payment processing and order management |
| 👨‍🍳 **Kitchen Display (KDS)** | Real-time order queue for chefs |
| 📊 **Admin Command Center** | Analytics, inventory, and team performance |

### 🔄 Real-Time Order System
- **Live Order Tracking**: Customers can track order status in real-time
- **Firebase Sync**: All interfaces update instantly via Firestore
- **Status Workflow**: New → Paid → Preparing → Ready → Served
- **Notification Sounds**: Audio alerts for new orders and status changes

### 🎨 Premium UI/UX
- **Futuristic Space Theme**: Neon glows, animated stars, floating orbs
- **Light/Dark Mode**: Toggle between themes for accessibility
- **Glassmorphism Effects**: Modern translucent cards
- **Smooth Animations**: Micro-interactions and transitions
- **Fully Responsive**: Works on all devices

---

## 📁 Project Structure

```
موقع مطعم حلا/
├── 🏠 Customer Interface
│   ├── index.html              # Main customer portal
│   ├── script.js               # AI recommendation engine
│   ├── styles.css              # Space theme styles
│   ├── voice-assistant.js      # Speech recognition
│   └── light-mode.css          # Light theme
│
├── 📋 Menu System
│   ├── menu.html               # Full menu browser
│   └── menu.js                 # Menu logic
│
├── 💳 Cashier Dashboard
│   ├── cashier-dashboard.html
│   ├── cashier-dashboard.js
│   └── cashier-styles.css
│
├── 👨‍🍳 Kitchen Display (KDS)
│   ├── chef-dashboard.html
│   ├── chef-dashboard.js
│   └── chef-styles.css
│
├── 📊 Admin Dashboard
│   ├── admin-dashboard.html
│   ├── admin-dashboard.js
│   └── admin-styles.css
│
├── 🔥 Firebase Integration
│   ├── firebase-config.js      # Firebase configuration
│   ├── firebase-orders.js      # Order management module
│   └── firebase.json           # Hosting config
│
└── 🎨 Assets
    └── assets/
        └── logo.png            # Brand logo
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5/CSS3** | Structure and styling |
| **JavaScript (ES6+)** | Application logic |
| **Tailwind CSS** | Utility-first styling |
| **Firebase Firestore** | Real-time database |
| **Firebase Hosting** | Deployment |
| **Web Speech API** | Voice recognition |
| **Cairo Font** | Arabic typography |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (for Firebase CLI)
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "موقع مطعم حلا"
   ```

2. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Update `firebase-config.js` with your credentials

3. **Run locally**
   ```bash
   # Using any local server, e.g.:
   npx serve .
   # Or open index.html directly in browser
   ```

4. **Deploy to Firebase**
   ```bash
   firebase login
   firebase deploy
   ```

---

## 📱 Interface Overview

### Customer Experience Flow
```
1️⃣ Enter mood or select quick emotion
       ⬇️
2️⃣ AI analyzes mood + weather + time
       ⬇️
3️⃣ Personalized dish recommendations
       ⬇️
4️⃣ Add to cart & checkout
       ⬇️
5️⃣ Real-time order tracking
```

### Order Status Flow
```
📝 NEW → 💳 PAID → 👨‍🍳 PREPARING → ✨ READY → 🍽️ SERVED
```

---

## 🎨 Theme Customization

The system supports multiple themes:

- **Dark Galactic** (Default): Deep space with neon accents
- **Light Minimalist**: Clean white with subtle shadows
- **Premium Dark**: Obsidian with electric blue highlights

Toggle themes via the interface or modify CSS variables.

---

## 🌐 Localization

- Primary Language: **Arabic (RTL)**
- Full right-to-left support
- Cairo font for optimal Arabic rendering
- Bilingual branding (Arabic + English)

---

## 📊 Admin Features

- 📈 Predictive analytics (traffic & revenue)
- 📦 Smart inventory monitoring with alerts
- 😊 Customer sentiment analysis
- 👨‍🍳 Team performance metrics
- 📋 Order history and reports

---

## 🔮 AI Features

The mock AI engine includes:
- Mood keyword detection (happy, tired, hungry, etc.)
- Weather-based recommendations
- Time-of-day meal matching
- Dish scoring algorithm
- Personalized response messages

---

## 📄 License

© 2024-2026 Hala Neural Cuisine | مطبخ حلا العصبي

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

---

<div align="center">
  <h3>🧠 حيث تُلتقي العاطفة بالخوارزميات</h3>
  <p><em>Where Emotion Meets Algorithms</em></p>
</div>
# Hala-Neural-Cuisine
