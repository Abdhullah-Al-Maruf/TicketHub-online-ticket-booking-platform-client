# 🎫 TicketHub

A full-stack MERN ticket marketplace where vendors can sell transport tickets, users can book and purchase tickets, and administrators manage the entire platform.

---

## 🚀 Live Demo

* **Frontend:** https://ticket-hub-client-pink.vercel.app/


---

## 📌 Project Overview

TicketHub is a transport ticket booking platform that allows vendors to publish tickets for Bus, Train, Flight, and Launch services. Users can browse available tickets, submit booking requests, complete secure payments using Stripe Checkout, and manage their bookings. Administrators oversee users, vendors, ticket approvals, advertisements, and platform security.

---

# ✨ Features

## 👤 User

* Register & Login
* Browse approved tickets
* View ticket details
* Book tickets
* View booking history
* Pay approved bookings using Stripe Checkout
* Cancel unpaid bookings
* View payment status

---

## 🧑‍💼 Vendor

* Add tickets
* Update own tickets
* Delete own tickets
* View own tickets
* Receive booking requests
* Approve booking requests
* Reject booking requests
* View revenue dashboard

---

## 👨‍💻 Admin

### User Management

* View all users
* Change user roles
* Mark vendor as Fraud
* Remove Fraud status

### Ticket Management

* Approve tickets
* Reject tickets
* Advertise tickets
* Remove advertisement
* Maximum 6 advertised tickets
* View all submitted tickets

---

## 🚫 Fraud Protection

When a vendor is marked as fraud:

* Cannot add new tickets
* Cannot edit tickets
* Cannot delete tickets
* All tickets become invisible
* Tickets disappear from public pages
* Add Ticket form is hidden from the vendor dashboard

---

## 💳 Payment

* Stripe Checkout
* Secure payment processing
* Payment history
* Vendor revenue calculation

---

# 🛠 Tech Stack

### Frontend

* Next.js 15
* React.js
* Tailwind CSS v4
* HeroUI
* React Query
* React Hook Form
* Zod
* Better Auth
* Stripe

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Better Auth
* Stripe
* CORS

---

# 📂 Folder Structure

```text
tickethub/

├── client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── public/
│
├── server/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---

# 🗄 Database Collections

## Users

```js
{
  name,
  email,
  role,
  isFraud,
  createdAt,
  updatedAt
}
```

---

## Tickets

```js
{
  title,
  image,
  transportType,
  pricePerSeat,
  quantityAvailable,

  vendor:{
      name,
      email
  },

  route,
  schedule,

  status,
  advertised,
  isVisible,

  createdAt,
  updatedAt
}
```

---

## Bookings

```js
{
  ticketId,
  ticketTitle,
  image,
  transportType,

  quantity,
  pricePerSeat,
  totalPrice,

  vendor,
  user,

  route,
  schedule,

  status,
  paymentStatus,

  createdAt,
  updatedAt
}
```

---

## Payments

```js
{
  bookingId,
  transactionId,
  amount,
  paymentStatus,
  paidAt
}
```

---

# 🔄 Workflow

```text
Vendor
   │
   ▼
Add Ticket
   │
   ▼
Pending Approval
   │
   ▼
Admin Approves
   │
   ▼
Public Ticket Page
   │
   ▼
User Booking Request
   │
   ▼
Vendor Approval
   │
   ▼
Stripe Payment
   │
   ▼
Revenue Dashboard
```

---

# 🔐 Authentication & Authorization

* Better Auth Authentication
* JWT Authorization
* Protected Routes
* Role-based Access Control
* Admin Route Protection
* Vendor Route Protection
* User Route Protection

---

# 📡 API Endpoints

## Public APIs

```http
GET /api/tickets

GET /api/ticket/:id

GET /api/home/advertised
```

---

## User APIs

```http
POST /api/booking

GET /api/bookings/:email

PATCH /api/bookings/:id/cancel
```

---

## Vendor APIs

```http
POST /api/add-ticket

GET /api/tickets/vendor/:email

PATCH /api/tickets/:id

DELETE /api/tickets/:id

GET /api/vendor/bookings/:email

PATCH /api/vendor/bookings/:id/approve

PATCH /api/vendor/bookings/:id/reject
```

---

## Admin APIs

```http
GET /api/admin/users

PATCH /api/admin/users/:id/fraud

PATCH /api/admin/users/:id/unfraud

GET /api/admin/tickets

PATCH /api/admin/tickets/:id/approve

PATCH /api/admin/tickets/:id/reject

PATCH /api/admin/tickets/:id/advertise

PATCH /api/admin/tickets/:id/unadvertise
```

---

# 💳 Stripe Payment Flow

```text
User

↓

Book Ticket

↓

Vendor Approves

↓

Click Pay Now

↓

Stripe Checkout

↓

Payment Successful

↓

Booking Status Updated

↓

Vendor Revenue Updated
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/tickethub.git
```

### Frontend

```bash
cd client

npm install

npm run dev
```

### Backend

```bash
cd server

npm install

npm start
```

---

# 🔑 Environment Variables

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Backend (.env)

```env
PORT=

MONGODB_URI=

JWT_SECRET=

BETTER_AUTH_SECRET=

STRIPE_SECRET_KEY=
```

---


# 🚀 Future Improvements


* Email Notifications
* Booking Invoice
* PDF Ticket Download
* Admin Analytics Dashboard
* Wishlist
* Reviews & Ratings

---

# 👨‍💻 Author

**Md Maruf**

Diploma in Computer Science & Technology (CST)

Bangladesh

---

# 📄 License

This project is developed for educational and portfolio purposes.
