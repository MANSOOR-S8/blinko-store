<div align="center">

# 🛍️ Blinko Store

**A modern, full-stack e-commerce platform built for performance, scalability, and a seamless shopping experience.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) •
[Tech Stack](#️-tech-stack) •
[Getting Started](#️-getting-started) •
[API Reference](#-api-reference) •
[Roadmap](#-roadmap) •
[Contributors](#-contributors)

</div>

---

## 📖 Overview

**Blinko Store** is a production-style e-commerce application that replicates the core experience of a modern online store — from browsing and searching products to checkout and order management. It's built with a clean separation between a **Next.js/TypeScript frontend** and a **Node.js/Express/MongoDB backend**, using **Redux Toolkit** for predictable, centralized state management.

The project is designed as both a learning resource and a portfolio-grade application, following real-world patterns like JWT authentication with refresh tokens, role-based access control, and a modular, scalable folder structure.

---

## ✨ Features

### 👤 Authentication & Authorization
- User registration & login
- Secure logout with session invalidation
- JWT-based authentication (access + refresh tokens)
- Automatic token refresh flow
- Protected routes (client & server)
- Role-based access control (Admin / User)

### 🛒 Shopping Experience
- Browse all products
- Detailed product pages
- Product search
- Category-based filtering
- Wishlist management
- Shopping cart with quantity control
- Checkout flow
- Order summary

### 📦 Product Management (Admin)
- Create, update, and delete products
- Stock/inventory management
- Multiple product image support
- Flags for Featured, Trending, New Arrival, and Best Seller products

### ❤️ User Account
- Profile management
- Address book management
- Change password
- Wishlist
- Cart persistence
- Product reviews & ratings

### 🎨 UI / UX
- Fully responsive design (mobile-first)
- Modern, clean dashboard UI
- Pagination
- Breadcrumb navigation
- Star rating component
- Toast notifications
- Error boundaries
- Image fallback handling
- Loading & skeleton states

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js, React, TypeScript, Redux Toolkit, Axios, Tailwind CSS, Lucide React |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Auth & Security** | JWT (Access + Refresh Tokens), Express Validator, Cookie Parser |
| **File Handling** | Multer |

---

## 📂 Project Structure

```
blinko-store/
│
├── backend/
│   ├── controllers/     # Request handlers / business logic
│   ├── middleware/      # Auth, validation, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   ├── config/          # Environment & app configuration
│   ├── utils/           # Helper functions
│   ├── scripts/         # Seed scripts & one-off tasks
│   └── server.ts        # Backend entry point
│
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service layer (Axios)
│   ├── store/            # Redux Toolkit slices & store config
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Frontend helper functions
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas connection string)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/MANSOOR-S8/blinko-store.git
cd blinko-store
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder with the following variables:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
```

> ⚠️ **Never commit your `.env` file to version control.** Make sure it's listed in `.gitignore`.

---

## ▶️ Running the Project

Run the backend and frontend in two separate terminal windows.

### Start the Backend
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:5000`.

### Start the Frontend
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### (Optional) Seed the Database
If a seed script is available in `backend/scripts`, you can populate the database with sample categories, brands, and products:
```bash
cd backend
npm run seed
```

---

## 🌐 API Reference

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive tokens |
| `POST` | `/api/auth/logout` | Log out and invalidate session |
| `POST` | `/api/auth/refresh` | Refresh the access token |
| `GET` | `/api/auth/me` | Get current authenticated user |
| `PATCH` | `/api/auth/me` | Update current user's profile |

### Products
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:slug` | Get a single product by slug |
| `POST` | `/api/products` | Create a new product *(admin only)* |
| `PATCH` | `/api/products/:id` | Update a product *(admin only)* |
| `DELETE` | `/api/products/:id` | Delete a product *(admin only)* |
| `PATCH` | `/api/products/:id/stock` | Update product stock *(admin only)* |

### Uploads
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/uploads/single` | Upload a single image |
| `POST` | `/api/uploads/multiple` | Upload multiple images |

---

## 📸 Screenshots

> Add screenshots or GIFs below to showcase the UI.

| Home Page | Product Details |
|---|---|
| _add screenshot_ | _add screenshot_ |

| Admin Dashboard | Shopping Cart |
|---|---|
| _add screenshot_ | _add screenshot_ |

| Checkout |
|---|
| _add screenshot_ |

---

## 📈 Roadmap

- [ ] Payment gateway integration (Stripe)
- [ ] Order tracking system
- [ ] Email verification on signup
- [ ] Forgot password / password reset flow
- [ ] Product reviews & ratings enhancements
- [ ] Discount coupons & promo codes
- [ ] Sales analytics dashboard
- [ ] Admin reports & exports
- [ ] Real-time notifications
- [ ] Dark mode support

---

## 🤝 Contributors

| Name | Role |
|---|---|
| **Mansoor** | Project Owner |
| **Shah Fahad** | Contributor — Frontend & Backend Improvements |

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues) if you'd like to contribute.

---

## 📄 License

This project is developed for **educational and portfolio purposes**.

---

<div align="center">

### ⭐ Support This Project

If you find this project useful, please consider giving it a star — it helps a lot!

</div>