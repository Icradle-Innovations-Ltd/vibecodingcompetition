/**
 * Odd Shoes Brand Knowledge Base — Chunked for RAG retrieval.
 * Each chunk is a semantically meaningful document that gets embedded
 * into a vector store for retrieval-augmented generation.
 */

export const brandDocuments = [
   // ── ABOUT & MISSION ──
   {
      content: `Odd Shoes is a tech startup studio based in Kampala, Uganda. We wear odd shoes on purpose. We build tech products for Christian founders who believe business can be a vehicle for Kingdom impact. We are the complete technical team Kingdom builders don't have. Built from a calling, not a business plan. Our mission: Build production-grade apps for Christian founders without technical teams. 50% of profits go to Kingdom work. We are worshippers, musicians, and pastors blessed by God to be engineers.`,
      metadata: { source: "about", topic: "company_overview" }
   },
   {
      content: `Odd Shoes core values: 1) Faith First — Every decision starts with prayer. We build for an audience of One. 2) Radical Generosity — We give 50% of our profits to Kingdom work. 3) Ship It — Ideas are cheap, execution is everything. We move fast. 4) Excellence — If it has our name on it, it's world-class. 5) Africa Rising — Proudly Ugandan, fiercely Pan-African. 6) Odd is Good — We don't fit the mould.`,
      metadata: { source: "about", topic: "values" }
   },

   // ── TEAM ──
   {
      content: `Meet the Odd Shoes team — a small but mighty crew of designers, developers, and dreamers based in Kampala: Obed Edom Mugisha (Team Lead, Asst. Pastor, Lead Guitarist); Edwin Nahabwe (Lead Guitarist, Youth Pastor, Full Stack Dev); Daniel Lunyelele (Artist, Back-end & Systems Engineer); Ian Abenaitwe (Saxophone Student, AI & Agentic AI, Basketball Enthusiast); Opakrwoth Jonathan (Motion Graphics, Moving Ads, AI Content Creator).`,
      metadata: { source: "about", topic: "team" }
   },
   {
      content: `Odd Shoes by the numbers (The fun stats): 247,832 Lines of code written. 1,847 Cups of Ugandan coffee. 12 Laptops that survived. Infinite (∞) Worship songs played during sprints. 27 is the average age of the team. We rest on Sundays — worship first.`,
      metadata: { source: "about", topic: "stats" }
   },

   // ── TIMELINE ──
   {
      content: `Odd Shoes Journey Timeline: 2021: Started freelancing in Kampala, tithing 50%. 2022: Launched "Odd Shoes" officially, 1st Christian client, team of 3, 1st MVP in 6 weeks. 2023: 10 MVPs launched, 1st client got $250K seed, "Give Him 50" officially named, team of 5. 2024: 25+ products shipped, expanded across East Africa, 1st church planted. 2025: 40+ projects, team of 8, multiple clients got VC funding, supporting 5 missionaries and 3 church plants. 2026: The year of scale, new office in Kampala, launching first accelerator cohort. God is faithful.`,
      metadata: { source: "about", topic: "timeline" }
   },

   // ── CONTACT ──
   {
      content: `Contact Odd Shoes: Email: buildit@oddshoes.dev | WhatsApp: +31 97 010 209 759 | Location: Kampala, Uganda. Working Hours: Mon-Fri, 9am-6pm EAT. Project Planner: Take our planner to share your vision and budget so we can draft a tailored proposal. Book a discovery call if you prefer to chat first. Email or WhatsApp us anytime.`,
      metadata: { source: "contact", topic: "contact_info" }
   },

   // ── SERVICES ──
   {
      content: `Billy Pods — Vetted intern Pods. Get 1–3 interns + coordinator to help your team ship. Request a Pod to scale your development capacity.`,
      metadata: { source: "services", topic: "billy_pods" }
   },
   {
      content: `Genesis Build — The Fast-Track MVP for Kingdom Builders. 5-day delivery. Single-feature production-ready MVP. Day 1: Vision Lock (scope locked, 2-hour call). Days 2-4: Build (React, Django/Laravel/FastAPI, PostgreSQL, Auth). Day 5: Launch (deployed, landing page, QA). For pre-revenue founders (<$10k/yr) needing one clear core feature. Not for complex payments or multi-sided marketplaces. Budget customized via Project Planner.`,
      metadata: { source: "services", topic: "genesis_build" }
   },
   {
      content: `Kingdom Builder — Complete Dev Team. 14 days build + 6 months fractional CTO support. Days 1-3: Brand & Strategy (visual identity, blueprint, site design). Days 4-12: Build (Multi-feature app, Stripe/M-Pesa, email/SMS, OpenClaw AI deployment, Admin dashboard). Days 13-14: Polish, QA, Deploy. Months 1-6: CTO Support (calls, bugs, design hours). For post-revenue founders with 3-5 features needed. Capacity: 3 projects/month.`,
      metadata: { source: "services", topic: "kingdom_builder" }
   },
   {
      content: `AI & Automation Services. Option A (DIY): Instant one-click setup via open-clawbot.com for basic messaging app integration. Option B (Custom Skills, 2-5 days): Deployment + 1-3 custom skills (e.g., Stripe to Slack reports, draft customer emails) + training. Option C (Full Integration): Included in Kingdom Builder, features deployment, 2-3 skills, security, monitoring, and 6 months support.`,
      metadata: { source: "services", topic: "ai_automation" }
   },
   {
      content: `Tech Stack: Backend (Django+PostgreSQL, Laravel+MySQL, FastAPI). Frontend (React, React Native, Framer, Webflow). CMS (Directus, Strapi). AI (Custom agents, OpenClaw, LLM integration OpenAI/Anthropic). Tools (Cursor, Claude Code, GitHub Copilot). We don't do: Gambling, adult content, MLMs, crypto scams, equity-for-work, long payment plans, unlimited revisions, or free spec work.`,
      metadata: { source: "services", topic: "tech_stack" }
   },

   // ── ODD SHOES WEBSITE TECH STACK ──
   {
      content: `If someone asks how the official Odd Shoes website (oddshoes.dev) was built: It is built on a modern, high-performance tech stack using Next.js (14.2.35) and React for the frontend and static site generation. It is hosted on Vercel (PaaS) and utilizes Calendly for appointment scheduling. For performance and SEO, it implements PWA (Progressive Web App) capabilities, Open Graph metadata, and Priority Hints. For security, it uses HSTS (HTTP Strict Transport Security).`,
      metadata: { source: "website", topic: "oddshoes_website_tech_stack" }
   },

   // ── GIVE HIM 50 ──
   {
      content: `Give Him 50 — 50% of every dollar Odd Shoes earns goes directly to Kingdom work. This is the engine of everything we do. It supports four pillars: 1) Church Planting (Uganda, Kenya, Rwanda). 2) Missions Support (5 missionaries in East Africa/Middle East). 3) Child Sponsorship (120+ children). 4) Clean Water (boreholes for 500+ people). Also supports Bibles in local languages and Tech Scholarships for young believers. Full transparency provided.`,
      metadata: { source: "give-him-50", topic: "mission" }
   },

   // ── PORTFOLIO ──
   {
      content: `Odd Shoes Portfolio / Our Work: We build MVPs, SaaS platforms, and mobile apps. Projects include InstantUGC, Glo SACCO, School Manager, Openclaw, NextGen Hims, DaVinci Analytics, Lightbeam Media, DevFest QA, BlueOx Business, HeadshotCam, PicFlair, Post Once, Workflowe, Expenseum. We've shipped 100+ products for Christian founders.`,
      metadata: { source: "work", topic: "portfolio" }
   },

   // ── PARTNERS ──
   {
      content: `Odd Shoes partners include: GIGI Foundation, GIGI Global, Haiven, GravityJack, Dig In Vision, BlueOx Kampus, Kingdom Broker, GLP Software, CornTech, Zerke, and MATS.`,
      metadata: { source: "about", topic: "partners" }
   },

   // ── PROJECT PLANNER ──
   {
      content: `The Odd Shoes Project Planner asks for: Project Type (MVP, Web App, Mobile App, Brand & Identity, Full Startup). Needs (Strategy, UI/UX, Web/Mobile Dev, Growth, Pitch Deck). Budget ranges ($2k-5k, $5k-15k, $15k-30k, $30k-50k, Over $50k). After submitting, we provide a tailored proposal within 24 hours.`,
      metadata: { source: "contact", topic: "project_planner" }
   }
];

export const systemPrompt = `You are "Genesis Bot", the official marketing and sales AI agent for "Odd Shoes" (oddshoes.dev).
You are extremely polite, highly intelligent, empathetic, and subtly faith-inspired in your tone. You act as a technical co-founder and a top-tier marketing professional brainstorming with the user.

Your primary goal is to provide exceptional customer service, help the user understand how Odd Shoes can bring their vision to life, and gently but proactively guide them toward booking a discovery call or launching a project planner.

RESPONSE RULES:
1. Be Extremely Polite & Empathetic: Always start by warmly acknowledging their needs. Make them feel valued and heard. Use phrases like "I'd be delighted to help," "That's a wonderful vision," or "I completely understand."
2. Ask for Their Name: If the user hasn't introduced themselves, politely ask for their name early in the conversation so you can address them personally. (e.g., "May I ask your name so I know who I have the pleasure of speaking with?")
3. Keep answers CONCISE (2-4 sentences max per point). Use bullet points when helpful, but favor natural dialogue.
4. Maintain a welcoming, professional, faith-driven tone (e.g., "blessed to help", "building for Kingdom impact").
5. Proactively Arrange Calls: Actively look for opportunities to invite them to a discovery call. Explain that a call with our team (Obed, Edwin, or Daniel) is the best way to tailor a solution to their exact needs.
6. Primary CTAs: Lead them naturally to "Book a Call" or "Launch the Project Planner". For direct questions, mention WhatsApp (+31 97 010 209 759) or email (buildit@oddshoes.dev).
7. Scope: Only answer questions related to Odd Shoes, its team members, startups, MVPs, tech, and building software. Politely redirect off-topic requests.
8. Do NOT invent pricing — explain that pricing is custom based on the project scope and refer them to the project planner.
9. Grounded Knowledge: Use the retrieved context below to confidently answer specific questions about Odd Shoes team, our services (Genesis Build, Kingdom Builder), our timeline, technical stack, and the 'Give Him 50' mission.

Remember: You are the face of Odd Shoes. Your goal is to build deep trust, qualify leads, and smoothly transition the user from chatting with an AI to booking a call with our human team.
`;
