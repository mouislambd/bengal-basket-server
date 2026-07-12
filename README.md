# Bengal Basket – Server

Backend API for Bengal Basket, an authentic Bengali food & grocery delivery platform. Built with Express, TypeScript, and MongoDB.

🔗 **Live API:** https://bengal-basket-server.onrender.com
🔗 **Client Site:** https://bengal-basket-client.vercel.app
🔗 **Client Repository:** https://github.com/mouislambd/Bengal-basket-client

## Demo Credentials

**Admin**
- Email: `admin@gmail.com`
- Password: `1234567890`

**User**
- Email: `demo@bengalbasket.com`
- Password: `demo123456`

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript (run via `tsx`)
- **Database:** MongoDB (Mongoose)
- **Auth:** Better Auth (Email/Password + Google OAuth)
- **Payment:** SSLCommerz
- **Other:** CORS, Cookie Parser, dotenv

## Features

- 🔐 Authentication (email/password + Google OAuth) via Better Auth
- 🍛 Food items CRUD with category filter, search, and sorting
- ⭐ Reviews & ratings system per food item
- 🛒 Order creation and management
- 💳 SSLCommerz payment integration (init, success, fail, cancel, IPN)
- 📦 User order history endpoint
- 🛠️ Admin-only routes for managing all orders and updating delivery status
- 📧 Newsletter subscription endpoint

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A MongoDB Atlas cluster (or local MongoDB instance)

### Installation

```bash
git clone https://github.com/mouislambd/bengal-basket-server.git
cd bengal-basket-server
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
IMGBB_API_KEY=your_imgbb_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SSLCZ_STORE_ID=your_sslcommerz_store_id
SSLCZ_STORE_PASSWORD=your_sslcommerz_store_password
SSLCZ_IS_LIVE=false
```

### Run Locally

```bash
npm run dev
```

Server will run on `http://localhost:5000`.

### Production Start

```bash
npm start
```

## API Routes

| Route | Description |
|---|---|
| `/api/auth/*` | Authentication (Better Auth) |
| `/api/food` | Food items (CRUD, search, filter, sort) |
| `/api/reviews` | Reviews & ratings |
| `/api/orders` | Order creation, user & admin order management |
| `/api/payment` | SSLCommerz payment init/success/fail/cancel |
| `/api/newsletter` | Newsletter email subscription |

## Deployment

Deployed on [Render](https://render.com). Start command uses `tsx` to run TypeScript directly without a separate build step:

```
Build Command: npm install
Start Command: npx tsx index.ts
```

## Related Repository

Frontend source code: https://github.com/mouislambd/Bengal-basket-client

## License

This project was built for educational purposes as part of the Programming Hero SCIC-13 course.