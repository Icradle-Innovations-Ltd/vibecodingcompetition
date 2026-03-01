# 🚀 Odd Shoes AI Agent

*A custom AI Sales and Marketing Agent built for the Odd Shoes studio website.*

## 🔴 The Problem We Are Solving

**1. The Founder's Dilemma**
Christian founders and Kingdom-driven businesses often struggle to find technical partners who not only write excellent code but also share their values and mission. They need high-quality MVPs, SaaS platforms, and mobile apps built by a team that understands that business can be a vehicle for Kingdom impact.

**2. The Client Onboarding Bottleneck**
When potential founders visit a development studio's website, they have specific, unique questions: *"Who is on the team? What is the 'Give Him 50' mission? Can you build my specific MVP in 5 days?"*
Static FAQ pages force users to hunt for answers. If they can't find what they need quickly, they bounce before ever booking a call or launching a project planner.

**🎯 Our Solution:**
We built a highly responsive, brand-aligned **AI Sales and Marketing Agent** embedded directly into the "Odd Shoes" studio website.
Instead of searching, founders simply chat. The AI is equipped with deep, Retrieval-Augmented Generation (RAG) knowledge about the studio's team (Obed, Edwin, Daniel, etc.), services (Genesis Build, Kingdom Builder), and values. It answers questions instantly, maintains a professionally welcoming and subtly faith-inspired tone, and seamlessly guides prospects toward booking a call or launching the Project Planner.

---

## 💻 The Tech Stack

We used a modern, lightweight, and blazing-fast tech stack to ensure the UI feels premium and the AI responses are deeply contextualized.

### **Frontend & UI**
* **React 19 & Vite:** For a lightning-fast development environment and a highly reactive, component-based user interface.
* **Tailwind CSS & clsx:** For rapid, utility-first styling. We implemented a stunning design system using the Odd Shoes brand colors (off-white, terracotta/coral, deep slate) to create a premium, trustworthy aesthetic.
* **Lucide React:** For sleek, modern, and lightweight SVG iconography.

### **AI & RAG (Retrieval-Augmented Generation)**
* **Google Gemini API (`gemini-2.0-flash` / `gemini-2.0-flash-lite`):** The core intelligence engine driving the conversational capabilities. Chosen for its incredible speed and reasoning capabilities.
* **LangChain (`@langchain/google-genai`):** Used to generate high-quality vector embeddings (`gemini-embedding-001`) of the entire Odd Shoes website copy and knowledge base.
* **Custom In-Memory Vector Store:** We engineered a lightweight, client-side vector database utilizing **Cosine Similarity**. When a user asks a question, the system instantly computes the similarity between the user's query and the embedded brand documents, injecting only the most highly relevant context directly into the Gemini prompt.

### **Language & Tooling**
* **TypeScript:** Ensures enterprise-grade type safety, catching errors at compile-time and making the AI integration code highly maintainable.
* **Node.js:** Powers the local development and build processes.

---

## 🌟 Why This Matters
By combining a beautiful React/Tailwind frontend with an advanced LangChain/Gemini RAG implementation, we transformed a static studio website into an interactive sales funnel. The AI doesn't just hallucinate generic answers—it reads the firm's actual data and pitches the studio perfectly, 24/7.

---

## 🚀 Getting Started

To run the project locally, follow these steps:

### 1. Navigate to directory
```bash
cd chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the `chatbot` directory and add the necessary API keys:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GROQ_API_KEY=your_groq_api_key
```

### 4. Run the Development Server
```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser.
