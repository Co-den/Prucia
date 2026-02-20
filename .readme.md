# PRUCIA Fashion App 👗

PRUCIA is a full-featured mobile fashion application built for a designer brand to showcase collections, manage bookings, and sell fashion products through a seamless and branded digital experience. The app combines eCommerce, appointment booking, and user personalization into one cohesive platform.

## 📱 Overview

PRUCIA is designed to:
- Showcase fashion collections
- Enable product purchases (eCommerce)
- Allow users to book fashion appointments
- Provide a personalized user profile system
- Deliver a smooth, modern, and brand-focused UI/UX

The application focuses on scalability, clean architecture, and real-world business functionality rather than just a basic demo project.

## 🚀 Features

### 🛍️ eCommerce Functionality
- Product listings with images and details
- Product details screen with Add to Cart
- Shopping cart system
- Save for Later feature
- Secure checkout flow
- Payment integration (Paystack)
- Automated receipt generation

### 🎨 Fashion Brand Experience
- Branded onboarding screens
- Collection showcase for designer pieces
- Image-based UI for a premium fashion feel
- Custom signup screen with designer branding

### 👤 User Management
- User authentication (Signup/Login)
- Custom signup fields:
  - First Name
  - Last Name
  - Email
  - Password
  - State
  - Country
- User profile with:
  - Profile photo
  - Name
  - Date of Birth
  - Location
- Account management (including delete account)

### 📅 Booking System
- Appointment booking for fashion consultations
- Booking screen integration
- Future support for schedule management

### 📊 Additional Functionalities
- Order management system
- User dashboard
- Payment receipts sent to users
- Scalable backend API structure

## 🧠 Tech Stack

### Frontend (Mobile)
- React Native
- Tailwind CSS (or styled components depending on setup)
- Custom UI components
- ImageBackground for branded screens

### Backend
- Node.js
- Express.js
- RESTful API architecture
- JWT Authentication

### Database
- MongoDB (for users, orders, products, bookings)

### Payment Integration
- Paystack API (secure online payments)

### Tools & Technologies
- Git & GitHub (Version Control)
- Postman (API Testing)
- Firebase / Cloud Storage (optional for images)
- AI integration (planned)

## 📂 Project Structure

prucia-app/ │ ├── frontend/ │   ├── screens/ │   ├── components/ │   ├── navigation/ │   ├── assets/ │   └── utils/ │ ├── backend/ │   ├── controllers/ │   ├── routes/ │   ├── models/ │   ├── middleware/ │   └── config/ │ └── README.md

## 🔐 Authentication Flow
- User signs up with custom branded form
- Backend validates and stores user data securely
- JWT token-based authentication
- Session persistence on app load
- Protected routes for sensitive features (orders, profile, bookings)

## 💳 Payment Flow
1. User adds products to cart
2. Proceeds to checkout
3. Payment processed via Paystack
4. Order stored in database
5. Receipt generated and sent to user

## 🖌️ UI/UX Design Goals
- Elegant and fashion-focused interface
- Smooth navigation experience
- Brand-consistent colors and visuals
- Mobile-first responsive design
- Intuitive user journey from discovery to purchase

## 🔮 Future Improvements
- AI-powered fashion recommendations
- Admin dashboard for product & order management
- Push notifications
- Wishlist system
- Analytics & user behavior tracking
- Multi-vendor support (optional expansion)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js
- npm or yarn
- MongoDB
- React Native CLI or Expo (depending on setup)

### Clone the Repository
```bash
git clone https://github.com/your-username/prucia-app.git
cd prucia-app

Install Dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install

Run the App

Start Backend Server

npm run dev

Start Frontend (React Native)

npx react-native run-android

📌 Project Purpose

PRUCIA was built as a production-level fashion app to demonstrate full-stack mobile development skills, including authentication, payments, booking systems, and scalable API architecture. It reflects real-world business use cases for designer brands transitioning into digital commerce.

👨‍💻 Author

Agugbue Ikenna Nzubechi
Full Stack Developer (React, Node.js, React Native)

📄 License

This project is for educational and portfolio purposes.