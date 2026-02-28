# 🏆 Vibe Coding Competition — Battle Plan

> **Format:** 40 minutes to vibe-code a fully functional, deployed app that solves a real problem.
> Instructions will be given at the start.

---

## 📋 Table of Contents

- [Pre-Competition Checklist](#-pre-competition-checklist)
- [Speed Stack](#-speed-stack)
- [🔐 Neon Auth Quickstart](#-neon-auth-quickstart-copy-paste-ready)
- [Pre-Built Templates Ready](#-pre-built-templates-ready)
- [40-Minute Execution Timeline](#-40-minute-execution-timeline)
- [Deployment Strategy](#-deployment-strategy)
- [AI Vibe-Coding Tips](#-ai-vibe-coding-tips)
- [Common Problem Categories & Solutions](#-common-problem-categories--solutions)
- [Judging Criteria & How to Win](#-judging-criteria--how-to-win)
- [Emergency Fallbacks](#-emergency-fallbacks)

---

## ✅ Pre-Competition Checklist

**Do ALL of this BEFORE competition day:**

### Accounts Ready (Logged In)
- [ ] **Vercel** account → [vercel.com](https://vercel.com) (for instant deployment)
- [ ] **GitHub** account → repo ready to push
- [ ] **Neon** database → [neon.tech](https://neon.tech) (serverless PostgreSQL, instant setup)
- [ ] **Supabase** account → [supabase.com](https://supabase.com) (alternative: DB + Auth + Storage in one)
- [ ] AI coding tool ready (Cursor / GitHub Copilot / Gemini)

### Local Environment Ready
- [ ] Node.js ≥ 18 installed
- [ ] npm / pnpm installed
- [ ] Git configured (`git config` set)
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Editor open and ready
- [ ] Terminal open and ready
- [ ] Browser tabs pre-loaded (Vercel dashboard, Neon/Supabase dashboard, GitHub)

### Pre-Created Resources
- [ ] Empty GitHub repo created (just clone and start coding)
- [ ] Neon database created with connection string copied
- [ ] Vercel project linked to GitHub repo
- [ ] `.env` template ready (this repo has one)
- [ ] `.gitignore` ready (this repo has one)

---

## ⚡ Speed Stack

**Optimized for maximum speed in 40 minutes:**

| Layer | Tool | Why |
|-------|------|-----|
| **Framework** | Next.js 14+ (App Router) | Fullstack in one project, instant Vercel deploy |
| **Language** | TypeScript | Type safety + better AI completions |
| **Styling** | Tailwind CSS | No CSS files, style inline, fast iteration |
| **UI Components** | shadcn/ui | Beautiful, copy-paste components |
| **Database** | Neon (PostgreSQL) | Serverless, instant setup, free tier |
| **ORM** | Prisma | Schema → DB in one command |
| **Auth** | NextAuth.js / Clerk | Auth in minutes, not hours |
| **Deployment** | Vercel | `git push` = deployed |
| **AI Coding** | Cursor / Copilot / Gemini | Vibe code at max speed |

> ⚠️ **DO NOT** use complex multi-service setups (MongoDB + Redis + R2 + Railway). There's no time. Keep it simple: **Next.js + Neon + Vercel**.

---

## 🔐 Neon Auth Quickstart (Copy-Paste Ready)

> Your Neon Auth is already configured. These are the exact code snippets to drop in on competition day.

### Step 1 — Install the SDK

```bash
npm install @neondatabase/neon-js@latest react-router-dom
```

### Step 2 — Environment Variable

Already in your `.env`:

```env
VITE_NEON_AUTH_URL=https://ep-steep-cherry-ai289h4e.neonauth.c-4.us-east-1.aws.neon.tech/neondb/auth
```

### Step 3 — Initialize the Auth Client

Create `src/lib/auth.ts`:

```ts
import { createAuthClient } from "@neondatabase/neon-js/auth";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_NEON_AUTH_URL,
});
```

### Step 4 — Wrap Your App with the Auth Provider

Update `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@neondatabase/neon-js/ui/css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Update `src/App.tsx`:

```tsx
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { authClient } from "./lib/auth";
import Home from "./pages/home";
import AuthPage from "./pages/auth";
import AccountPage from "./pages/account";

function App() {
  const navigate = useNavigate();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={Link}
      social={{ providers: ["google"] }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </NeonAuthUIProvider>
  );
}

export default App;
```

### Step 5 — Create Auth Pages

**`src/pages/home.tsx`** — Landing page with sign-in/out state:

```tsx
import { SignedIn, SignedOut, UserButton } from "@neondatabase/neon-js/auth/react/ui";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <h1>Welcome back!</h1>
        <UserButton />
        <Link to="/account">Account Settings</Link>
      </SignedIn>
      <SignedOut>
        <h1>Welcome</h1>
        <Link to="/auth">Sign In</Link>
      </SignedOut>
    </div>
  );
}
```

**`src/pages/auth.tsx`** — Sign in / Sign up page:

```tsx
import { AuthView } from "@neondatabase/neon-js/auth/react/ui";

export default function AuthPage() {
  return <AuthView pathname="sign-in" />;
}
```

**`src/pages/account.tsx`** — Account management:

```tsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@neondatabase/neon-js/auth/react/ui";

export default function AccountPage() {
  return (
    <>
      <SignedIn>
        <h1>Account Settings</h1>
        {/* Account management UI */}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
```

### Available Auth Components (Cheat Sheet)

| Component | Purpose |
|-----------|---------|
| `<AuthView pathname="sign-in" />` | Full sign-in/sign-up form with OAuth |
| `<SignInForm />` | Standalone sign-in form |
| `<SignUpForm />` | Standalone sign-up form |
| `<ForgotPasswordForm />` | Password reset request |
| `<UserButton />` | User avatar dropdown with menu |
| `<UserAvatar />` | Just the avatar image |
| `<SignedIn>` | Render children only when logged in |
| `<SignedOut>` | Render children only when logged out |
| `<RedirectToSignIn />` | Auto-redirect to sign-in page |

### Get Current User (in any component)

```ts
import { authClient } from "./lib/auth";

// Get the current session
const session = await authClient.getSession();
const user = session?.user;
```

---

## 🧰 Pre-Built Templates Ready

### Quick-Start Command (Day of Competition)

```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --use-npm
```

### Then immediately install essentials:

```bash
npm install prisma @prisma/client
npm install next-auth  # if auth needed
npx shadcn@latest init  # for beautiful UI components
npx prisma init
```

### Pre-Made Prisma Schema Patterns

Save these — copy-paste during competition based on the problem:

<details>
<summary>📋 Task/Todo App Schema</summary>

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    String   @default("medium")
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

</details>

<details>
<summary>🛒 Marketplace/E-Commerce Schema</summary>

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  products  Product[]
  orders    Order[]
  createdAt DateTime  @default(now())
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  image       String?
  category    String?
  sellerId    String
  seller      User     @relation(fields: [sellerId], references: [id])
  orders      Order[]
  createdAt   DateTime @default(now())
}

model Order {
  id        String   @id @default(cuid())
  quantity  Int
  total     Float
  status    String   @default("pending")
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
}
```

</details>

<details>
<summary>📊 Dashboard/Analytics Schema</summary>

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  role      String   @default("user")
  entries   Entry[]
  createdAt DateTime @default(now())
}

model Entry {
  id        String   @id @default(cuid())
  title     String
  value     Float
  category  String
  date      DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

</details>

<details>
<summary>💬 Social/Community Schema</summary>

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  avatar    String?
  posts     Post[]
  comments  Comment[]
  createdAt DateTime  @default(now())
}

model Post {
  id        String    @id @default(cuid())
  title     String
  content   String
  likes     Int       @default(0)
  authorId  String
  author    User      @relation(fields: [authorId], references: [id])
  comments  Comment[]
  createdAt DateTime  @default(now())
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  createdAt DateTime @default(now())
}
```

</details>

---

## ⏱️ 40-Minute Execution Timeline

| Time | Phase | Action |
|------|-------|--------|
| **0:00 – 2:00** | 📖 Read | Read the problem carefully. Identify the core feature. |
| **2:00 – 5:00** | 🧠 Plan | Decide: What's the MVP? Pick the closest schema template. |
| **5:00 – 7:00** | 🏗️ Setup | `create-next-app`, install deps, init Prisma, paste schema |
| **7:00 – 8:00** | 🗄️ Database | `npx prisma db push` → database ready |
| **8:00 – 25:00** | 💻 Build | Vibe-code the core feature (AI-assisted). Focus on: |
| | | → API routes (`app/api/`) |
| | | → Main page UI |
| | | → CRUD operations |
| | | → One "wow" feature |
| **25:00 – 30:00** | 💅 Polish | Tailwind styling, responsive, loading states |
| **30:00 – 35:00** | 🚀 Deploy | `git push` → Vercel auto-deploys. Set env vars. |
| **35:00 – 40:00** | ✅ Test | Click through everything on the live URL. Fix any breaks. |

### Golden Rules

> 🎯 **Build ONE thing that works perfectly, not five things that are broken.**
>
> 🚫 **Don't over-engineer.** No auth unless required. No complex state management.
>
> ✨ **Spend 5 minutes on polish.** Beautiful > functional in judges' first impression.

---

## 🚀 Deployment Strategy

### Fastest Path: Vercel (30 seconds to deploy)

```bash
# Option A: Git-based (recommended)
git add .
git commit -m "competition submission"
git push origin main
# Vercel auto-deploys from GitHub

# Option B: CLI (if GitHub isn't linked)
vercel --prod
```

### Set Environment Variables on Vercel

Go to **Vercel Dashboard → Project → Settings → Environment Variables** and add:

```
DATABASE_URL=your-neon-connection-string
```

That's it. One env var for a Prisma + Neon setup.

### Verify Deployment

- [ ] Visit the live URL
- [ ] Test all CRUD operations
- [ ] Check mobile responsiveness
- [ ] No console errors

---

## 🤖 AI Vibe-Coding Tips

### Prompting Strategy

**Be specific with your AI assistant:**

```
❌ "Build me a task manager"
✅ "Create a Next.js API route at /api/tasks that handles GET (list all)
   and POST (create new) for a Task model with title, description,
   completed, and priority fields using Prisma"
```

### Speed Workflow

1. **Schema first** → Define your Prisma schema, push to DB
2. **API routes next** → CRUD endpoints (AI can generate these fast)
3. **UI last** → Use shadcn/ui components, let AI wire them up
4. **Don't debug long** → If stuck for > 2 min, pivot or simplify

### Useful AI Prompts to Have Ready

- *"Create a Prisma schema for [problem domain] with these models: ..."*
- *"Create Next.js API routes for CRUD operations on the [Model] table"*
- *"Build a responsive dashboard page using shadcn/ui that displays [data]"*
- *"Add form validation with error messages for this form"*
- *"Make this page mobile-responsive with Tailwind"*
- *"Add loading states and error handling to this component"*

---

## 🎯 Common Problem Categories & Solutions

| Category | Approach | Key Features |
|----------|----------|--------------|
| **Task/Project Manager** | CRUD + status tracking | Create, update, filter, complete tasks |
| **Marketplace** | Products + orders | List items, search, place orders |
| **Dashboard/Analytics** | Data visualization | Charts (use recharts), filters, summary cards |
| **Social Platform** | Posts + comments | Create posts, comment, like |
| **Booking System** | Slots + reservations | Calendar view, book/cancel slots |
| **Inventory Tracker** | Items + quantities | Add/remove stock, alerts, categories |
| **Survey/Quiz** | Questions + responses | Create surveys, collect answers, show results |
| **Budget Tracker** | Income/expenses | Add entries, charts, category breakdown |

---

## 🏆 Judging Criteria & How to Win

| Criteria | How to Score High |
|----------|-------------------|
| **Functionality** | App works end-to-end. No broken features. |
| **Real Problem** | Clearly solves an identifiable problem. State it on the landing page. |
| **UI/UX** | Clean, modern design. Use shadcn/ui + Tailwind. Dark mode is a bonus. |
| **Deployment** | Live URL that judges can visit and test. |
| **Code Quality** | TypeScript, clean structure, proper error handling. |
| **Wow Factor** | One standout feature (real-time updates, charts, animations, AI integration). |

### What Separates Winners

1. **It actually works** — most competitors have broken deployments
2. **It looks professional** — spend 5 minutes on Tailwind polish
3. **It solves a clear problem** — add a hero section explaining what it does
4. **It has a wow moment** — one feature that makes judges go "nice"

---

## 🆘 Emergency Fallbacks

| Problem | Solution |
|---------|----------|
| Database won't connect | Use local SQLite (`datasource db { provider = "sqlite" }`) |
| Vercel deploy fails | Use `vercel --prod` CLI directly |
| Auth takes too long | Skip auth, use a simple name input |
| Too many features | Cut scope to ONE core feature |
| Styling looks bad | Add `className="max-w-4xl mx-auto p-8"` to container and use shadcn/ui |
| Time running out | Stop building, deploy what you have, polish the UI |

---

## 📁 Project Structure (Keep It Simple)

```
src/
 ├── app/
 │     ├── layout.tsx          # Root layout
 │     ├── page.tsx            # Main page (landing/dashboard)
 │     ├── api/
 │     │     └── [resource]/
 │     │           └── route.ts  # API CRUD endpoints
 │     └── [feature]/
 │           └── page.tsx      # Feature pages
 │
 ├── components/               # Reusable UI components
 ├── lib/
 │     └── prisma.ts           # Prisma client singleton
 └── prisma/
       └── schema.prisma       # Database schema
```

> **Keep it flat. Keep it simple. Ship it.**

---

## 🧾 License

MIT License

---

> **Remember: The winner is the person who ships a working, beautiful, deployed app — not the one with the most complex architecture.** 🏆
