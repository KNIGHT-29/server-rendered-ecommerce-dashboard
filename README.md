# 🛒 Server-Rendered E-commerce Product Management Dashboard

A **server-side rendered (SSR)** admin dashboard built using **Next.js App Router** for managing products in an e-commerce system. The project focuses on **performance, security, and clean UI design**, enabling administrators to efficiently manage product data.

---

## 🚀 Project Overview

This project implements a real-world **admin dashboard** where authenticated administrators can log in and manage products. All dashboard pages are protected and rendered on the server to ensure better performance and security.

Administrators can create, view, update, and delete products, including managing product images and inventory details.

---

## ✨ Key Features

- **Server-Side Rendering (SSR)** using Next.js App Router  
- **Authentication & Authorization**
  - Secure admin login using JWT
  - HTTP-only cookies for session management
  - Protected dashboard routes
- **Product Management (CRUD)**
  - Create, Read, Update, Delete products
  - Product image support
- **Clean Admin UI**
  - Professional, readable interface using Tailwind CSS
- **Database Integration**
  - MongoDB Atlas with Mongoose
- **Production Deployment**
  - Fully deployed and working on Vercel

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|-----|-----------|
| Frontend | Next.js (App Router), React |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas |
| ORM | Mongoose |
| Authentication | JWT, HTTP-only Cookies |
| Styling | Tailwind CSS |
| Image Storage | Cloudinary |
| Deployment | Vercel |

---

## 🔐 Dummy Admin Credentials (MANDATORY)

Use the following credentials to access the dashboard:

Email: admin@example.com

Password: Admin@123
Role: super-admin

---

## 🧭 Application Workflow

1. User visits the application  
2. Redirected to `/login` if not authenticated  
3. Successful login sets a secure cookie  
4. Admin is redirected to `/products`  
5. Admin can:
   - View products
   - Create products
   - Edit products
   - Delete products  
6. Logout clears the authentication cookie

---


---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

> ⚠️ Ensure MongoDB Atlas **Network Access** allows `0.0.0.0/0` for serverless deployment.

---

## 🧪 Local Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
cp .env.example .env.local
npm run dev
```
### Live Deployment
server-rendered-ecommerce-dashboard.vercel.app
### demo video link 
https://drive.google.com/file/d/1n3YfnQrTNI1Oi-llsHg3Xhfrf3fpQaFk/view?usp=sharing
## author:ROMIT SINGH(24114082)
