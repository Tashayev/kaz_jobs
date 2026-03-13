# KazJobs

A full stack job board platform built for the Kazakhstan market.

## Overview

KazJobs connects employers and job seekers in Kazakhstan. Employers can post and manage job listings, while seekers can browse, filter, and apply — all with a clean role-based experience.

## Monorepo Structure

```
kazjobs/
├── back/    — Node.js + Express + MongoDB REST API
└── front/   — Next.js 14 + TypeScript + Redux frontend
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Redux Toolkit, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JWT (access + refresh tokens) |
| Styling | Tailwind CSS v3, shadcn/ui |

## Features

- Role based auth — Employer and Job Seeker accounts
- JWT authentication with silent token refresh
- Job listings with filters (location, type, salary)
- One-click apply for seekers
- Employer dashboard — post, edit, delete jobs, manage applicants
- Seeker dashboard — track applications with status updates
- Protected routes with role based access control
- Favorites — save jobs locally

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/kazjobs.git
cd kazjobs
```

### 2. Setup backend

```bash
cd back
npm install
cp .env.example .env
# Fill in your MongoDB URI and JWT secrets
npm run dev
```

### 3. Setup frontend

```bash
cd front
npm install
cp .env.example .env.local
# Add: NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm run dev
```

### 4. Open in browser

```
Frontend → http://localhost:3000
Backend  → http://localhost:4000/api/v1
```

## Documentation

- [Backend README](./back/README.md) — API endpoints, models, auth flow
- [Frontend README](./front/README.md) — Architecture, structure, state management
- [API Docs](./back/api-docs.html) — Open in browser for interactive API reference

## Author

Built as a fullstack portfolio project targeting the Kazakhstan job market 🇰🇿