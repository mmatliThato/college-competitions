# 🏆 TechNova: Inter-College Competition Platform

![Build Status](https://github.com/mmatliThato/college-competitions/actions/workflows/ci-cd.yml/badge.svg)

TechNova is a comprehensive full-stack management system designed to streamline inter-college competitions. It provides specialized dashboards for students to participate and for admins to manage reviews and statistics in real-time.

## 🚀 Live Demo
- **Frontend**: [Your Render/Vercel URL Here]
- **Backend API**: [Your Render Backend URL Here]

## ✨ Key Features
- **Role-Based Access Control**: Secure login and distinct interfaces for Students and College Admins.
- **Dynamic Hall of Fame**: A dedicated home page banner announcing competition winners.
- **Admin Analytics**: Real-time dashboard showing total participants and pending review counts.
- **Modern State Management**: Built using **Angular Signals** for high-performance UI updates.

## 🛠️ Tech Stack
- **Frontend**: Angular 19, Bootstrap 5, RxJS, Angular Signals.
- **Backend**: Node.js, Express.js, JWT (JSON Web Tokens).
- **Database**: MongoDB Atlas (Cloud).
- **DevOps**: GitHub Actions (CI/CD).

## ⚙️ CI/CD Pipeline
This project implements a professional **Continuous Integration and Deployment** workflow:
1. **Automated Testing**: Every push to `main` triggers a build check via GitHub Actions.
2. **Environment Security**: Sensitive credentials (MongoDB URI, JWT Secret) are managed through GitHub Repository Secrets.
3. **Auto-Deployment**: Successful builds are automatically prepared for deployment to the cloud.

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/mmatliThato/college-competitions.git](https://github.com/mmatliThato/college-competitions.git)
