# 🎨 StyleDecor - Smart Home & Ceremony Decoration Booking System

## 📋 Project Overview

**StyleDecor** is a modern appointment management system for a local decoration company that offers both in-studio consultations and on-site decoration services for homes and ceremonies. The platform enables users to explore decoration packages, check decorator availability, book services, make secure payments, and track their service status in real-time.

## 🎯 Purpose

This project solves critical problems faced by local decoration businesses:

- **Eliminates walk-in crowds** and long waiting times for consultations
- Provides an **online booking system** for decoration services
- Manages **multiple decorators** and their specialties efficiently
- Coordinates **on-site service assignments** seamlessly
- Offers **real-time project status updates** for transparency
- Integrates **secure payment processing** for packages and services
- Delivers **powerful analytics** and business insights through admin dashboard

## 🌐 Live URL

**Live URL:**   https://smart-home-decoration-service.web.app/

<p align="center">
  <img src="./StyleDecor cover page.png" width="100%" alt="Banner" />
</p>

---

## 🛠️ Technology Stack

| **React.js**                 | **DaisyUI 5.4.7**            |
| **Node.js**                  | **Firebase 12.5.0**          |
| **Express.js**               | **React Router 7.9.5**       |
| **MongoDB**                  | **Swiper 12.0.3**            | 
| **Vite**                     | **React Hot Toast 2.6.0**    | 
| **Tailwind CSS 4.1.17**      | **React Icons 5.5.0**        | 

---

## 📦 Dependencies

```json
{
    "@headlessui/react": "^2.2.9",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.5.3",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "daisyui": "^5.5.8",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.25",
    "lucide-react": "^0.561.0",
    "motion": "^12.23.25",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-leaflet": "^5.0.0-rc.2",
    "react-router": "^7.10.1",
    "react-spinners": "^0.17.0",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.10",
    "tailwindcss": "^4.1.17"
  }
```
---

## 🚀 Installation & Setup Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/maimuna03134/Smart-Home-Ceremony-Decoration-Service-Client-.git
```

### Step 2: Install Dependencies

Using npm:

```bash
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` 

### Step 4: Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist` folder.

### Step 5: Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in the project:

```bash
firebase init
```

4. Build the project:

```bash
npm run build
```

5. Deploy to Firebase:

```bash
firebase deploy
```
---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Email/Password Authentication** with Firebase
- **Social Login** support (Google, Facebook, etc.)
- **JWT Token-based** secure authentication
- **Role-based access control** (Admin, Decorator, User)
- Profile image upload via ImageBB/Cloudinary

### 🏠 User Features
- **Browse Services** - Explore decoration packages with beautiful card layouts
- **Advanced Search & Filter** - Search by name, filter by category, and price range
- **Service Booking** - Book consultations or on-site decoration services
- **Real-time Availability** - Check decorator availability and expertise
- **Payment Integration** - Secure Stripe payment gateway
- **Booking Management** - View, update, or cancel bookings
- **Payment History** - Track all transactions and receipts
- **Service Coverage Map** - Interactive map using React Leaflet

### 👨‍💼 Admin Features
- **Decorator Management** - Approve, disable, or manage decorator accounts
- **Service CRUD Operations** - Create, update, delete decoration services/packages
- **Booking Management** - Monitor all bookings and payment status
- **Decorator Assignment** - Assign decorators to paid on-site services
- **Revenue Monitoring** - Track total, paid, and pending revenue
- **Analytics Dashboard** - Service demand charts and business insights
- **User Management** - Manage user roles and permissions

### 🎨 Decorator Features
- **Assigned Projects** - View all assigned decoration projects
- **Today's Schedule** - Daily schedule of active bookings
- **Status Updates** - Update project status step-by-step (Assigned → In Progress → Completed)
- **Earnings Summary** - Track completed projects and earnings
- **Payment History** - View detailed payment records

### 🎯 Additional Features
- **Animated Hero Section** with Framer Motion
- **Top Decorators Showcase** with ratings and specialties
- **Mobile Responsive Design** with Tailwind CSS & DaisyUI
- **Loading States** - Spinners and skeletons for better UX
- **Toast Notifications** - Success/error feedback with React Hot Toast
- **Global Error Handling** - Custom error pages
- **Real-time Data Fetching** with TanStack Query

## 📦 NPM Packages Used
axios
daisyui
firebase
framer-motion
lucide-react
motion
react
react-router
react-hook-form
react-hot-toast
react-icons
react-leaflet
react-router
react-spinners
recharts
sweetalert2








