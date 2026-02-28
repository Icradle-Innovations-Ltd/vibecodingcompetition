/**
 * Odd Shoes Brand Knowledge Base — Chunked for RAG retrieval.
 * Each chunk is a semantically meaningful document that gets embedded
 * into a vector store for retrieval-augmented generation.
 */

export const brandDocuments = [
   // ── ABOUT ──
   {
      content: `Odd Shoes is a tech startup studio based at Innovation Village, Ntinda, Kampala, Uganda. We build tech products for Christian founders who believe business can be a vehicle for Kingdom impact. We started in a small office in Kampala with a simple conviction: the best startups are built by people who are driven by something bigger than profit. We kept meeting brilliant Christian founders with incredible ideas but they were stuck — they couldn't find developers who understood their vision, couldn't afford big agencies, and couldn't bridge the gap between their calling and a working product. So we built a studio specifically for them.`,
      metadata: { source: "about", topic: "company_overview" }
   },
   {
      content: `Odd Shoes core values: 1) Faith First — Every decision starts with prayer. We build for an audience of One. 2) Radical Generosity — We give 50% of our profits to Kingdom work. 3) Ship It — Ideas are cheap, execution is everything. We move fast and build lean. 4) Excellence — If it has our name on it, it's world-class. We don't do "good enough for a startup." 5) Africa Rising — Proudly Ugandan, fiercely Pan-African, globally minded. 6) Odd is Good — We don't fit the mould and we don't want to.`,
      metadata: { source: "about", topic: "values" }
   },
   {
      content: `Contact Odd Shoes: Email: buildit@oddshoes.dev | WhatsApp: +31 97 010 209 759 | Office: Innovation Village, Ntinda, Kampala, Uganda | Working Hours: Monday–Friday, 9am–6pm EAT. We rest on Sundays — worship first. We respond to every message within 24 hours. For urgent inquiries, WhatsApp is the fastest way to reach us. You can also book a call at calendly.com/builtbyoddshoes or fill out our project planner at oddshoes.dev/planner.`,
      metadata: { source: "contact", topic: "contact_info" }
   },

   // ── SERVICES ──
   {
      content: `Genesis Build — The Fast-Track MVP for Kingdom Builders. Perfect for pre-revenue founders who need to test a God-given idea quickly. Timeline: 5 days from kickoff to launch. What you get: Single-feature production-ready MVP, user authentication + database, clean React interface, built with Django/Laravel/FastAPI + PostgreSQL. Day 1: Vision Lock (2-hour strategy call, core feature definition, tech stack decision). Days 2-4: Build (single-feature MVP, auth + database, clean UI). Day 5: Launch (deployed to production, landing page, team walkthrough, 30-day bug fixes included).`,
      metadata: { source: "services", topic: "genesis_build" }
   },
   {
      content: `Genesis Build is for: Christian founders without technical co-founders, pre-revenue or under $10k/year, one clear core feature needed, ready to start Monday and launch Friday. Genesis Build is NOT for: Multi-sided marketplaces (day 1), complex payment flows, people still "figuring it out." Pricing is custom — budget details are discussed in the project planner. Share your vision and budget and we'll work together to make it happen.`,
      metadata: { source: "services", topic: "genesis_build_details" }
   },
   {
      content: `Kingdom Builder — The Complete Dev Team for Kingdom Builders. Perfect for post-revenue founders ready to scale God's vision. Timeline: 14 days build + 6 months fractional CTO support. What you get: Complete product system (multiple features), brand identity (logo, colors, typography, guidelines), marketing site design, admin dashboard (Directus/Strapi), OpenClaw AI deployment + 2-3 custom skills, Stripe/M-Pesa integration, email/SMS automation. Days 1-3: Brand & Strategy. Days 4-12: Build. Days 13-14: Polish & Deploy. Months 1-6: Fractional CTO Support (2 strategy calls/month, priority bug fixes, 10 design hours/month, scaling guidance). Capacity: 3 projects per month.`,
      metadata: { source: "services", topic: "kingdom_builder" }
   },
   {
      content: `Kingdom Builder is for: Founders generating revenue or with committed customers, needing 3-5 features, wanting complete brand + ongoing support, ready to move fast. NOT for: Idea-stage founders (use Genesis), teams with full-time CTO, anyone expecting unlimited revisions. Pricing is custom — discussed in the project planner.`,
      metadata: { source: "services", topic: "kingdom_builder_details" }
   },
   {
      content: `AI & Automation — Flexible AI Solutions for Kingdom Builders. OpenClaw deployment, custom AI agents, and workflow automation. Option A (DIY Deployment): Instant setup via open-clawbot.com — one-click deployment, pre-configured security, basic messaging integration (WhatsApp, Telegram, Discord). Option B (Custom Skills, 2-5 days): Everything in DIY + 1-3 custom skills built for your business + 30-day support + basic team training. Example skills: daily revenue reports, draft customer support responses, generate blog posts from meeting notes, parse invoices. Option C (Full Integration): Included in Kingdom Builder — OpenClaw deployment, 2-3 custom skills, security hardening, monitoring, 6 months support.`,
      metadata: { source: "services", topic: "ai_automation" }
   },
   {
      content: `Odd Shoes Tech Stack: Backend — Django + PostgreSQL, Laravel + MySQL, FastAPI + PostgreSQL. Frontend — React (web), React Native (mobile), Framer (marketing sites), Webflow (content sites). CMS & Admin — Directus (API-first), Strapi (content-rich). AI & Automation — Custom AI agents, OpenClaw deployment, LLM integration (OpenAI, Anthropic, local models), workflow automation. Development Tools — Cursor, Claude Code, GitHub Copilot. We deploy on Vercel, AWS, or Google Cloud.`,
      metadata: { source: "services", topic: "tech_stack" }
   },
   {
      content: `What Odd Shoes does NOT do: Projects we don't accept — Gambling/betting platforms, adult content, MLM schemes, crypto scams, anything illegal or ethically sketchy. What we don't offer — Equity-for-work arrangements, payment plans longer than 30 days, "free demo" or spec work, unlimited revisions.`,
      metadata: { source: "services", topic: "exclusions" }
   },

   // ── GIVE HIM 50 ──
   {
      content: `Give Him 50 — 50% of every dollar Odd Shoes earns goes directly to Kingdom work. Not one day, not eventually — right now, every single month. When we started, we made a promise to God before any investor: half of everything belongs to Him. Not 10%, not "when we're profitable." Our revenue has grown every year, and Give Him 50 is the engine of everything we do. It supports four Kingdom pillars: 1) Church Planting — funding new churches in unreached communities across Uganda, Kenya, Rwanda. 2) Missions Support — monthly support for 5 missionaries in East Africa and the Middle East. 3) Child Sponsorship — education, meals, and mentorship for 120+ children. 4) Clean Water — borehole wells in rural communities, each serving 500+ people.`,
      metadata: { source: "give-him-50", topic: "mission" }
   },
   {
      content: `Give Him 50 also supports: Bible Distribution — printing Bibles in local languages (Luganda, Swahili, Runyankole). Tech Scholarships — funding coding bootcamps and tech training for young believers. How it works: We earn from projects → Calculate net profit → Give 50% across Kingdom pillars → Publish quarterly impact reports publicly. Full transparency — you can see exactly where every contribution went. When you hire Odd Shoes, your startup directly funds missions, churches, and communities across East Africa.`,
      metadata: { source: "give-him-50", topic: "mission_details" }
   },

   // ── PORTFOLIO ──
   {
      content: `Odd Shoes Portfolio — MVPs, SaaS platforms, and mobile apps built for Kingdom-driven founders: NextGen Hims, DaVinci Analytics, Lightbeam Media, DevFest QA, BlueOx Business, HeadshotCam, PicFlair, InstantUGC, Glo SACCO, School Manager, Post Once, Workflowe, Expenseum, OpenClaw. Every project is a partnership and every product is a ministry. We've shipped 100+ products. See our work at oddshoes.dev/work.`,
      metadata: { source: "work", topic: "portfolio" }
   },

   // ── PARTNERS ──
   {
      content: `Odd Shoes partners include: GIGI Foundation, GIGI Global, Haiven, GravityJack, Dig In Vision, BlueOx Kampus, Kingdom Broker, GLP Software, CornTech, Zerke, and MATS. We work with founders across East Africa, the US, UK, and beyond. We're fully remote-friendly with async workflows and weekly video check-ins.`,
      metadata: { source: "about", topic: "partners" }
   },

   // ── FAQ ──
   {
      content: `Frequently Asked Questions: How long does it take? 5 days with Genesis Build, 14 days + 6 months support with Kingdom Builder. Do I need to be technical? No — that's literally why Odd Shoes exists. You bring the vision, we handle design, development, and architecture. Do you only work with Christians? We welcome everyone! Our mission is rooted in Christian values and we start sprints with prayer, but we serve founders of all backgrounds who share our values of integrity and generosity. What does "Give Him 50" mean for my project? 50% of our profit from your project goes directly to Kingdom work — missions, church planting, community development. Your startup literally funds the Gospel.`,
      metadata: { source: "faq", topic: "common_questions" }
   }
];

/**
 * System prompt that guides the AI's personality and response style.
 * This is NOT retrieved via RAG — it's always present as the system instruction.
 */
export const systemPrompt = `You are the official marketing and sales AI agent for "Odd Shoes" (oddshoes.dev).
You are helpful, professional, and subtly faith-inspired in tone.

RESPONSE RULES:
1. Keep answers CONCISE (2-4 sentences max per point). Use bullet points.
2. Maintain a welcoming, professional, faith-driven tone (e.g., "blessed to help", "Kingdom impact").
3. Always ask a follow-up question to guide the user closer to conversion.
4. Primary CTAs: "Launch the Project Planner" (oddshoes.dev/planner) or "Book a Call" (calendly.com/builtbyoddshoes).
5. Only answer about Odd Shoes, startups, MVPs, tech, and building software. Politely decline off-topic requests.
6. Do NOT invent pricing — say pricing is custom and refer them to the project planner.
7. Use the retrieved context below to give accurate, specific answers about Odd Shoes services.
`;
