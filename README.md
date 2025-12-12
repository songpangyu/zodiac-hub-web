# ✨ Zodiac Hub

A modern web application for exploring zodiac signs, horoscopes, and zodiac compatibility.

🔗 **Live Demo**: [https://zodiac-hub-web.vercel.app/](https://zodiac-hub-web.vercel.app/)

## 👥 Group 2 - Team Members

| Name | Role |
|------|------|
| Pangyu Song | Developer |
| Licheng Huang | Developer |
| Mason Wang | Developer |

## 📖 About This Project

Zodiac Hub is a comprehensive astrology web application built as the final project for **CPRG306 Web Dev 2**. The platform offers:

- 🌟 **Daily/Weekly/Monthly Horoscopes** - Get personalized horoscope readings for all 12 zodiac signs
- 💕 **Zodiac Compatibility** - Check the compatibility between any two zodiac signs with detailed analysis
- 📚 **Zodiac Encyclopedia** - Learn about personality traits, elements, and characteristics of each sign
- 👤 **User Profiles** - Create an account to save your zodiac sign and preferences
- 🔐 **Authentication** - Secure login with GitHub OAuth via Firebase

## 📸 Screenshots

### Zodiac Signs Overview
![Zodiac Signs](/screenshot-home.png)

### Compatibility Checker
![Compatibility](/screenshot-compatibility.png)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: CSS with custom design system
- **Authentication**: Firebase Auth with GitHub OAuth
- **Database**: Firebase Firestore
- **Deployment**: Vercel
- **API**: Horoscope App API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project with Auth and Firestore enabled

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/zodiac-hub-web.git
cd zodiac-hub-web
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file with your Firebase config
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📄 License

This project was created for educational purposes as part of CPRG306 Web Dev 2 course.

---

Made with ❤️ by Group 2
