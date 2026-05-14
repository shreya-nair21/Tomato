# Tomato - Food Delivery Platform

A full-stack food delivery web application built with the MERN stack. Customers can browse food items, add them to cart, and place orders with Razorpay payment integration. An admin dashboard is included for managing food items and tracking order statuses.

**Live Demo:** [tomato-frontend-rho.vercel.app](https://tomato-frontend-rho.vercel.app)

---

## Features

- User authentication with JWT (signup, login, logout)
- Browse food items by category
- Add to cart and manage quantities
- Place orders with Razorpay payment gateway
- Track order status in real-time
- Admin panel for adding/removing food items
- Admin order management with status updates
- Responsive design for all devices
- Cloud-based image storage with Cloudinary

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, React Router |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Payments | Razorpay |
| Image Storage | Cloudinary |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
Tomato/
├── backend/          # Express REST API
│   ├── config/       # Database and Cloudinary configuration
│   ├── controllers/  # Route handlers
│   ├── middleware/    # Authentication middleware
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API route definitions
│   └── server.js     # Entry point
├── frontend/         # React customer-facing app
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
└── admin/            # React admin dashboard
    └── src/
        ├── components/
        └── pages/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Razorpay account (test mode)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shreya-nair21/Tomato.git
   cd Tomato
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Create `backend/.env`:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Seed the database:
   ```bash
   node seed.js
   ```

5. Start the backend:
   ```bash
   npm run server
   ```

6. Set up the frontend (new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

7. Set up the admin panel (new terminal):
   ```bash
   cd admin
   npm install
   npm run dev
   ```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/food/list` | Get all food items |
| POST | `/api/food/add` | Add a food item (with image upload) |
| POST | `/api/food/remove` | Remove a food item |
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login user |
| POST | `/api/cart/add` | Add item to cart |
| POST | `/api/cart/remove` | Remove item from cart |
| POST | `/api/cart/get` | Get cart data |
| POST | `/api/order/place` | Place a new order |
| POST | `/api/order/userorders` | Get user's orders |
| GET | `/api/order/list` | Get all orders (admin) |
| POST | `/api/order/status` | Update order status (admin) |

---

## Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com)
- **Admin Panel** is deployed on [Vercel](https://vercel.com)
- **Backend** is deployed on [Render](https://render.com)
- **Database** is hosted on [MongoDB Atlas](https://cloud.mongodb.com)
- **Images** are stored on [Cloudinary](https://cloudinary.com)

---

## License

This project is for educational purposes.
