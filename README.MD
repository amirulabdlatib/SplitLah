# SplitLah

A bill-splitting web application built with **Laravel** (backend) and **Next.js** (frontend).

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
