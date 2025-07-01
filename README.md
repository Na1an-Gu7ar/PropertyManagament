
# 🏠 Real Estate Property Management Web Application

A full-stack MERN web application that allows users to manage real estate property listings — built using React, Node.js, Express, MongoDB, and Material-UI. Features include user authentication, property management (CRUD), and deployment on Render + Vercel.

---

## 🚀 Live Demo

Backend: [https://propertymanagament.onrender.com/api](https://propertymanagament.onrender.com/api)  
Frontend: [https://property-managament-8fq4.vercel.app/](https://property-managament-8fq4.vercel.app/)

---

## 🧰 Tech Stack

| Layer       | Tech Used                                  |
|-------------|---------------------------------------------|
| Frontend    | React.js, Vite, Material-UI, Axios, React Router |
| Backend     | Node.js, Express.js                         |
| Database    | MongoDB + Mongoose                          |
| Auth        | JWT (JSON Web Tokens)                       |
| Deployment  | Vercel (Frontend), Render (Backend)         |

---

## ✨ Features

- 🔐 User Signup, Login, Logout (JWT-based)
- 🏡 Add, View, Edit, and Delete Property Listings
- 🔍 Search Properties by Title or Location
- ✅ Protected Routes (only authenticated users can add/delete)
- 🌍 Fully deployed on Vercel + Render

---

## 📦 Installation (Local Setup)

```bash
# Install backend dependencies
cd backend
npm install

# Create .env file in /backend
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Start backend
npm start
```

```bash
# Install frontend dependencies
cd frontend
npm install

# (Optional) Create .env for API URL
VITE_API_BASE_URL=http://localhost:5000/api

# Start frontend
npm run dev
```

---

## 🗂️ Folder Structure

```
backend/      → Node.js + Express + MongoDB
frontend/     → React + MUI + Vite
```

---
