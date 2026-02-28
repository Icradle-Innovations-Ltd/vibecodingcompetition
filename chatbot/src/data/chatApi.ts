import { GoogleGenerativeAI } from "@google/generative-ai";
import { brandKnowledge } from "./brandKnowledge";

// Initialize the API with the key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "MOCK_KEY");

// Use Gemini 1.5 Flash - fast and capable for chat
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: brandKnowledge,
});

export async function getChatResponse(history: { role: string; content: string }[], newMessage: string) {
    if (!apiKey) {
        // Fallback for local testing without API key
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve("I am the Odd Shoes AI agent. You haven't configured a Gemini API key yet, so I'm running in mock mode. Add `VITE_GEMINI_API_KEY` to your `.env` file to enable real AI responses about our Genesis Build, Kingdom Builder, and Give Him 50 mission!");
            }, 1000);
        });
    }

    try {
        // Format history for Gemini
        const formattedHistory = history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        // Start a chat session with the previous history
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 250, // Keep responses concise
                temperature: 0.7, // Professional but slightly creative
            },
        });

        const result = await chat.sendMessage(newMessage);
        return result.response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please email us at buildit@oddshoes.dev or launch the project planner to get in touch.";
    }
}
