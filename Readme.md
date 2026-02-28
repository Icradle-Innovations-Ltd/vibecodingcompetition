# 🚀 Cloud-Native Fullstack Competition Platform

> A production-grade, distributed fullstack system built with modern cloud infrastructure, clean architecture, and polyglot persistence — engineered to win.

---

## 📋 Table of Contents

- [System Architecture](#️-system-architecture)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Security Features](#-security-features)
- [Database Design](#-database-design)
- [API Reference](#-api-reference)
- [Performance Strategy](#-performance-strategy)
- [Local Development Setup](#-local-development-setup)
- [Cloud Deployment Guide](#-cloud-deployment-guide)
- [Testing Checklist](#-testing-checklist)
- [Scalability Roadmap](#-scalability-roadmap)
- [Cost Estimate](#-cost-estimate)
- [Why This Wins](#-why-this-wins)
- [License](#-license)

---

## 🏗️ System Architecture

### Infrastructure Overview

```
🌐 Frontend     →  Vercel (Next.js)
🖥️ Backend      →  Railway (Node.js API)
🐘 PostgreSQL   →  Neon (relational data)
🍃 MongoDB      →  Atlas (document data)
⚡ Redis        →  Upstash (caching & rate limiting)
📦 Storage      →  Cloudflare R2 (S3-compatible)
```

### High-Level Architecture Diagram

```
Client (Browser)
      ↓
Vercel (Next.js Frontend)
      ↓
Railway (Node.js Backend API)
      ↓
 ├── Neon PostgreSQL  (users, roles, sessions, transactions)
 ├── MongoDB Atlas    (logs, analytics, activity feeds)
 ├── Upstash Redis    (cache, rate limiting, OTP, token blacklist)
 └── Cloudflare R2    (file uploads, media, backups)
```

### Architectural Principles

| Principle | Description |
|-----------|-------------|
| **Clean Architecture** | Separation of concerns across layers |
| **Modular Monolith** | Feature-based modules with clear boundaries |
| **Polyglot Persistence** | Right database for the right job |
| **Stateless Backend** | Horizontally scalable, no in-memory sessions |
| **Cache-First** | Redis-backed performance optimization |
| **Repository Pattern** | Database abstraction via interfaces |
| **Dependency Inversion** | Business logic never depends on infrastructure |

---

## 🛠️ Tech Stack

### Frontend (Vercel)

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | Framework + SSR/SSG |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling |
| React Server Components | Performance |
| Suspense + Error Boundaries | UX resilience |

### Backend (Railway)

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express / Next.js Standalone | API server |
| TypeScript (strict) | Type safety |
| Zod | Input/output validation |
| Prisma ORM | PostgreSQL access |
| Mongoose / Native Driver | MongoDB access |

---

## 📁 Project Structure

```
src/
 ├── app/                        # Next.js App Router
 │     ├── api/v1/
 │     │     ├── auth/           # Auth endpoints
 │     │     ├── users/          # User endpoints
 │     │     └── health/         # Health check
 │
 ├── modules/                    # Feature modules
 │     ├── auth/
 │     │     ├── auth.service.ts
 │     │     ├── auth.repository.ts
 │     │     ├── auth.schema.ts
 │     │     └── auth.types.ts
 │     ├── users/
 │     └── logs/
 │
 ├── repositories/               # Data access layer
 │     ├── postgres/
 │     ├── mongo/
 │     └── redis/
 │
 ├── services/                   # Business logic
 ├── middleware/                  # Auth, rate limiting, error handling
 ├── lib/                        # Shared utilities
 │     ├── prisma.ts
 │     ├── jwt.ts
 │     ├── env.ts
 │     └── logger.ts
 │
 ├── config/                     # App configuration
 ├── utils/                      # Helper functions
 └── server.ts                   # Entry point
```

**Layer enforcement:**

- **Controllers** → Handle HTTP requests/responses only
- **Services** → Contain all business logic
- **Repositories** → Abstract all database access
- **DTOs** → Validate input/output with Zod schemas
- ❌ No direct DB calls in route handlers
- ❌ No business logic in routes

---

## 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcrypt (saltRounds ≥ 12) |
| Access Tokens | JWT with short expiry |
| Refresh Tokens | Rotation strategy |
| Cookie Security | HTTP-only, Secure, SameSite |
| Authorization | Role-based access control (RBAC) |
| Rate Limiting | Redis-backed (Upstash) |
| CSRF Protection | Token-based (when using cookies) |
| Input Validation | Zod schemas on all endpoints |
| Error Handling | Centralized, no stack leaks |
| Logging | Structured (no sensitive data) |
| Secrets | Environment variables, validated at boot |
| CORS | Strict origin whitelist |

---

## 📦 Database Design

### PostgreSQL (Neon) — Relational Data

**Core Models:** `User`, `Role`, `Session` (refresh tokens), `Transaction`

| Feature | Status |
|---------|--------|
| Soft delete support | ✅ |
| Indexed frequently queried fields | ✅ |
| Prisma ORM | ✅ |
| Migration-based schema management | ✅ |

**Repository abstractions:**

- `PrismaUserRepository` — production
- `InMemoryUserRepository` — testing (swap without changing business logic)

### MongoDB (Atlas) — Document Data

Used for: **Logs**, **Analytics**, **Activity Feeds**, **Event Tracking**, **Flexible Schema Data**

### Redis (Upstash) — Ephemeral Data

Used for: **Rate Limiting**, **Caching**, **Session Blacklist**, **OTP Storage**, **API Throttling**

### Cloudflare R2 — Object Storage

Used for: **User Uploads**, **Documents**, **Media Assets**, **Backup Storage** (S3-compatible API)

---

## 📡 API Reference

All endpoints are versioned under `/api/v1/`.

### Standard Response Format

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/v1/auth/register` | Register a new user | ❌ |
| `POST` | `/api/v1/auth/login` | Login & receive tokens | ❌ |
| `POST` | `/api/v1/auth/refresh` | Refresh access token | 🔑 Refresh |
| `GET` | `/api/v1/users/me` | Get current user profile | 🔒 JWT |
| `GET` | `/api/v1/health` | Health check | ❌ |

---

## ⚡ Performance Strategy

| Strategy | Details |
|----------|---------|
| Redis Caching | Cache frequent reads, invalidate on writes |
| Field Selection | Prisma `select` to avoid overfetching |
| DB Indexing | Indexes on frequently queried fields |
| Pagination | Cursor-based (not offset-based) |
| Frontend Rendering | Lazy loading + Suspense boundaries |
| Stateless Backend | Horizontal scaling ready |
| Connection Pooling | Neon pooler for PostgreSQL |
| Time Complexity | Enforced in service layer design |

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- PostgreSQL (or Neon connection string)
- Git

### Step 1 — Clone Repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
REDIS_URL=redis://default:password@host:port

# Auth
JWT_SECRET=your-jwt-secret-here
REFRESH_SECRET=your-refresh-secret-here

# Storage
R2_ACCESS_KEY=your-r2-access-key
R2_SECRET_KEY=your-r2-secret-key
R2_BUCKET=your-bucket-name

# App
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

> ⚠️ Environment variables are **validated at startup** — missing values will prevent the app from booting.

### Step 4 — Setup Database

```bash
npx prisma migrate dev    # Run migrations
npx prisma generate       # Generate Prisma client
```

### Step 5 — Run Development Server

```bash
npm run dev
```

App runs at: **http://localhost:3000**

---

## 🌍 Cloud Deployment Guide

### 🌐 Frontend → Vercel

1. Push frontend repo to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
   ```
4. Deploy → `https://your-frontend.vercel.app`

---

### 🖥️ Backend → Railway

1. Create a project on [Railway](https://railway.app)
2. Connect your GitHub repo
3. Add environment variables:
   ```
   DATABASE_URL=
   MONGO_URL=
   REDIS_URL=
   JWT_SECRET=
   REFRESH_SECRET=
   R2_ACCESS_KEY=
   R2_SECRET_KEY=
   R2_BUCKET=
   ```
4. Deploy → `https://your-backend.up.railway.app`
5. Verify: `GET /api/v1/health` → should return `200 OK`

---

### 🐘 PostgreSQL → Neon

1. Create a project on [Neon](https://neon.tech)
2. Copy the connection string
3. Add to Railway as `DATABASE_URL`
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

### 🍃 MongoDB → Atlas

1. Create a free M0 cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Whitelist Railway's IP address
3. Create a database user
4. Copy connection string → add to Railway as `MONGO_URL`

---

### ⚡ Redis → Upstash

1. Create a database on [Upstash](https://upstash.com)
2. Copy the REST or TCP connection string
3. Add to Railway as `REDIS_URL`

---

### 📦 Object Storage → Cloudflare R2

1. Create a bucket on [Cloudflare R2](https://developers.cloudflare.com/r2/)
2. Generate API credentials (Access Key + Secret Key)
3. Add credentials to Railway environment
4. Use the S3-compatible SDK to integrate

---

## 🧪 Testing Checklist

Run through this before **every demo or submission**:

- [ ] User registration works end-to-end
- [ ] User login works and returns valid tokens
- [ ] Protected routes reject unauthenticated requests
- [ ] Token refresh works correctly
- [ ] Rate limiting blocks excess requests
- [ ] Redis cache reads/writes correctly
- [ ] PostgreSQL data persists across restarts
- [ ] MongoDB logs are being written
- [ ] File upload works (if implemented)
- [ ] Health endpoint returns `200 OK`
- [ ] No console errors in browser
- [ ] No unhandled promise rejections in backend
- [ ] All environment variables are set in production

---

## 📈 Scalability Roadmap

| Phase | Enhancement |
|-------|-------------|
| **Phase 1** | Horizontal backend scaling (Railway autoscaling) |
| **Phase 2** | Redis clustering for high availability |
| **Phase 3** | CDN layer expansion for static assets |
| **Phase 4** | Queue system (BullMQ) for async jobs |
| **Phase 5** | Background job workers |
| **Phase 6** | Event-driven architecture (pub/sub) |
| **Future** | Microservice extraction, multi-tenant support, audit logging |

---

## 💰 Cost Estimate

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Vercel | ✅ Free | $20/mo |
| Railway | ✅ $5 credit | $5–20/mo |
| Neon (PostgreSQL) | ✅ Free | $19/mo |
| MongoDB Atlas | ✅ Free (M0) | Pay-as-you-go |
| Upstash (Redis) | ✅ Free | $5/mo |
| Cloudflare R2 | ✅ Free tier | Pay-as-you-go |

> **Estimated total: $0 – $60/month** (competition projects can run entirely on free tiers)

---

## 🏆 Why This Wins

> *Most competitors build apps. This demonstrates **systems engineering**.*

| What Judges See | Why It Matters |
|-----------------|----------------|
| Distributed cloud architecture | Real-world infrastructure awareness |
| Polyglot persistence (SQL + NoSQL + Cache) | Right tool for the right job |
| Stateless, scalable backend | Production-grade thinking |
| Secure auth (JWT + refresh rotation) | Security-first mindset |
| Clean Architecture + Repository Pattern | Engineering maturity |
| Structured error handling & logging | Professional-grade code |
| Versioned API with standard responses | API design excellence |
| Full deployment pipeline | DevOps competency |
| Comprehensive environment validation | No "it works on my machine" |

---

## 🧾 License

MIT License

---

> **Built with production-grade engineering standards for competitive environments.** 🏆
