/**
 * LangChain RAG-powered Chat API for Odd Shoes Marketing Agent.
 * 
 * Architecture:
 * 1. On first load, embed all brand knowledge chunks using Google GenAI Embeddings.
 * 2. On each user message, compute similarity to find the most relevant chunks.
 * 3. Pass retrieved context + conversation history to Gemini via LangChain LCEL chain.
 */
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { brandDocuments, systemPrompt } from "./brandKnowledge";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ── Initialize Native Gemini Client ──
const genAI = new GoogleGenerativeAI(apiKey || "MOCK_KEY");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
    }
});

// ── Initialize Embeddings ──
const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: apiKey || "MOCK_KEY",
});

// ── Custom In-Memory Vector Store ──
interface EmbeddedDoc {
    content: string;
    metadata: Record<string, string>;
    embedding: number[];
}

let embeddedDocs: EmbeddedDoc[] | null = null;
let initializationPromise: Promise<EmbeddedDoc[]> | null = null;

function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function initializeVectorStore(): Promise<EmbeddedDoc[]> {
    if (embeddedDocs) return embeddedDocs;
    if (initializationPromise) return initializationPromise;

    initializationPromise = (async () => {
        try {
            console.log("[RAG] Embedding brand knowledge...");
            const texts = brandDocuments.map(d => d.content);
            const vectors = await embeddings.embedDocuments(texts);

            embeddedDocs = brandDocuments.map((doc, i) => ({
                content: doc.content,
                metadata: doc.metadata,
                embedding: vectors[i],
            }));

            console.log(`[RAG] Vector store initialized with ${embeddedDocs.length} documents.`);
            return embeddedDocs;
        } catch (error) {
            initializationPromise = null;
            throw error;
        }
    })();

    return initializationPromise;
}

async function similaritySearch(query: string, k: number = 3): Promise<EmbeddedDoc[]> {
    const store = await initializeVectorStore();
    const queryEmbedding = await embeddings.embedQuery(query);

    const scored = store.map(doc => ({
        doc,
        score: cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k).map(s => s.doc);
}

// ── Main chat function ──
export async function getChatResponse(
    history: { role: string; content: string }[],
    newMessage: string
): Promise<string> {
    if (!apiKey) {
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        "I'm the Odd Shoes AI agent running in demo mode. Add your `VITE_GEMINI_API_KEY` to `.env` to unlock real AI responses powered by LangChain RAG! Ask me about our Genesis Build (5-day MVP), Kingdom Builder, or Give Him 50 mission."
                    ),
                800
            )
        );
    }

    try {
        // 1. Retrieve relevant context via cosine similarity
        const relevantDocs = await similaritySearch(newMessage, 3);
        const context = relevantDocs.map(doc => doc.content).join("\n\n");

        console.log(
            `[RAG] Retrieved ${relevantDocs.length} chunks:`,
            relevantDocs.map(d => d.metadata.topic)
        );

        // 2. Format history for Google AI SDK
        // We inject the previous interaction into the prompt instead of startChat history constraints.
        const stringifiedHistory = history.map(msg =>
            `${msg.role === 'assistant' ? 'Odd Shoes Agent' : 'User'}: ${msg.content}`
        ).join('\n\n');

        // 3. Prepare the final prompt with context and history
        const promptWithContext = `
Retrieved Context from Odd Shoes Knowledge Base:
${context}

---
Recent Conversation History:
${stringifiedHistory || 'No previous history.'}

---
User Question:
${newMessage}
`;

        // 4. Start chat and send message using native SDK
        const chat = model.startChat({
            history: [], // Keep history empty to avoid strict role ordering bugs, we pass it in prompt
        });

        const result = await chat.sendMessage(promptWithContext);
        const response = result.response.text();

        return response || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("[RAG] Error:", error);
        return "I'm sorry, I'm having trouble connecting right now. You can reach us directly at buildit@oddshoes.dev or WhatsApp +31 97 010 209 759.";
    }
}
