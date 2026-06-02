# SplitLah

A bill-splitting and payment tracker web application built with **Laravel** (backend) and **Next.js** (frontend).

---

## Tech Stack

- **Backend** — Laravel (PHP)
- **Frontend** — Next.js (React)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- PHP >= 8.1 & Composer
- Node.js >= 18 & npm
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SplitLah.git
cd SplitLah
```

> Replace `your-username` with your actual GitHub username.

---

### 2. Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure your database in .env, then run migrations
php artisan migrate

# Start the development server
php artisan serve
```

The backend will run at `http://localhost:8000`

> **Note:** Open `.env` and fill in your database credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) before running migrations.

---

### 3. Frontend Setup (Next.js)

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will run at `http://localhost:3000`

> **Note:** Open `.env` and set `NEXT_PUBLIC_API_URL` (or equivalent) to point to your Laravel backend URL.

---

## Project Structure

```
SplitLah/
├── backend/     # Laravel API
└── frontend/    # Next.js app
```

## Features

### Organiser
- **Create Bills** — Set a title, description, total amount, due date, and add participants with individual amounts owed
- **Shareable Payment Links** — Each participant gets a unique token-based payment URL to share via WhatsApp or any channel
- **Receipt / Attachment Upload** — Attach a bill image or receipt (stored securely on private disk)
- **Track Payment Status** — View and toggle each participant's status between `Unpaid`, `Pending`, and `Paid`
- **Delete Bills** — Remove a bill along with all related participant records and uploaded files
- **Payment Settings** — Save bank name, account number, and QR code image shown to participants when paying
- **Organiser Dashboard** — Overview of all bills with status badges, due dates, and quick actions (view/delete)

### Participant (Public Payment Page)
- **View Bill Details** — See bill title, description, total amount, due date, and amount owed
- **View Organiser Payment Info** — Bank name, account number, and QR code (tap to download)
- **Confirm Payment** — Upload receipt image and mark status as pending for organiser review
- **Status Indicator** — Visual feedback for `Unpaid` (action required), `Pending` (awaiting confirmation), and `Paid` (settled)

### General
- **Authentication** — Register and login with Sanctum-based API auth
- **Mobile-Friendly** — Responsive UI designed for mobile-first usage (participants typically open links from WhatsApp)
- **Dark Mode** — Full dark theme support via shadcn/ui design tokens
