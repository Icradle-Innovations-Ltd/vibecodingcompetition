/**
 * LangChain RAG-powered Chat API for Odd Shoes Marketing Agent.
 * 
 * Architecture:
 * 1. On first load, embed all brand knowledge chunks using Google GenAI Embeddings.
 * 2. On each user message, compute similarity to find the most relevant chunks.
 * 3. Pass retrieved context + conversation history to Gemini via LangChain LCEL chain.
 */
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { brandDocuments, systemPrompt } from "./brandKnowledge";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ── Initialize LLM ──
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: apiKey || "MOCK_KEY",
    maxOutputTokens: 300,
    temperature: 0.7,
    maxRetries: 2,
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

// ── Build LCEL prompt template ──
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt + "\n\n---\nRetrieved Context:\n{context}\n---"],
    new MessagesPlaceholder("history"),
    ["human", "{question}"],
]);

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

        // 2. Convert chat history to LangChain message format
        const langchainHistory = history.map(msg =>
            msg.role === "assistant"
                ? new AIMessage(msg.content)
                : new HumanMessage(msg.content)
        );

        // 3. Build the LCEL chain: prompt → LLM → parse
        const chain = promptTemplate.pipe(llm).pipe(new StringOutputParser());

        // 4. Invoke the chain with context, history, and question
        const response = await chain.invoke({
            context,
            history: langchainHistory,
            question: newMessage,
        });

        return response;
    } catch (error) {
        console.error("[RAG] Error:", error);
        return "I'm sorry, I'm having trouble connecting right now. You can reach us directly at buildit@oddshoes.dev or WhatsApp +31 97 010 209 759.";
    }
}
