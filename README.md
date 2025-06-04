# 📚 AI Study Material Generator

Welcome to **AI Study Material Generator** – a modern SaaS platform that leverages advanced AI to create personalized study materials. Whether you're a student, teacher, or lifelong learner, this app helps simplify your study process with smart summaries, flashcards, quizzes, and more – all generated in seconds.

---

## 📋 Table of Contents

- [📘 About the Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠 Technologies Used](#-technologies-used)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
- [📚 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📞 Contact](#-contact)

---

## 📘 About the Project

**AI Study Material Generator** merges cutting-edge AI with serverless SaaS architecture to generate high-quality study content tailored to individual learning needs.

Powered by **Gemini AI**, this app dynamically creates quizzes, summaries, and flashcards – ideal for students and institutions alike.

### 🔍 Project Goals

- Automate the creation of personalized study material
- Deliver a seamless and secure learning experience
- Provide a scalable and fast SaaS infrastructure for education

---

## ✨ Key Features

- 🤖 **AI-Powered Content**: Generate quizzes, flashcards, and summaries with Gemini AI
- 🔐 **Clerk Authentication**: Secure and easy user management
- ⚙️ **Serverless Backend**: Inngest-powered background tasks and workflows
- 💳 **Stripe Integration**: Handle subscriptions and payments
- 🎨 **Beautiful UI**: Responsive design with Tailwind CSS
- ⚡ **Next.js SSR & API Routes**: Fast, SEO-friendly pages and powerful backend

---

## 🛠 Technologies Used

| Category       | Tech Stack                                  |
|----------------|----------------------------------------------|
| Frontend       | Next.js, React, Tailwind CSS                |
| Backend        | Serverless API Routes (Next.js)             |
| Database       | Neon (PostgreSQL)                           |
| AI Integration | Gemini AI                                   |
| Auth           | Clerk                                       |
| Payments       | Stripe                                      |
| Serverless     | Inngest                                     |

---

## 🚀 Getting Started

### 🔧 Prerequisites

Ensure you have these tools and services set up:

- Node.js (v16+)
- npm / yarn / bun / pnpm
- Stripe account
- Clerk account
- Neon database
- Inngest account
- Gemini AI or OpenAI API key

---

### ⚙️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/YourUsername/AI-Study-Material-Generator.git
   cd AI-Study-Material-Generator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root and add:

   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEON_DATABASE_URL=your_neon_database_url
   INNGEST_API_KEY=your_inngest_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the App**

   ```bash
   npm run dev
   ```

5. **Build for Production**

   ```bash
   npm run build
   ```

---

## 📚 Usage

- 🔐 **Sign In**: Use Clerk to create or log in to your account
- 📄 **Generate Material**: Enter your topic, and let the AI do the rest
- 💎 **Upgrade**: Unlock premium features via Stripe payments
- 🔁 **Real-Time Actions**: Enjoy instant updates via Inngest workflows

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork the Repository**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

2. **Commit Changes**

   ```bash
   git commit -m "Add: Your Feature Description"
   ```

3. **Push to Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

4. **Create a Pull Request**

   Open a PR describing your changes. We’ll review it ASAP.

---


## 📞 Contact

Atharva Deshmukh  
📧 Email: atharvad1775@gmail.com 
💻 GitHub: https://github.com/AtharvaD7

---
