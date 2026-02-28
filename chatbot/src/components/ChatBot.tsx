import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Link as LinkIcon, Calendar, User, Sparkles } from 'lucide-react';
import { getChatResponse } from '../data/chatApi';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const QUICK_PROMPTS = [
    "What services do you offer?",
    "Tell me about Genesis Build",
    "What is Give Him 50?",
    "How much does it cost?",
];

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hey there! 👋 I'm the Odd Shoes AI assistant. We build tech products for Christian founders to accelerate Kingdom impact.\n\nHow can I help you today? Are you looking to launch an MVP or scale an existing product?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (messages.length >= 4 && !showEmailCapture && !emailSubmitted) {
            setTimeout(() => setShowEmailCapture(true), 1500);
        }
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getChatResponse(messages, text.trim());
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseText
            }]);
        } catch (error) {
            console.error("Failed to fetch response:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please reach us at buildit@oddshoes.dev or book a call directly!"
            }]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <div className="flex flex-col h-full glass rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* ── Header ── */}
            <div className="px-5 py-4 border-b border-zinc-800/60 flex justify-between items-center bg-zinc-900/80">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-900" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-white text-sm">Odd Shoes Agent</h2>
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-orange-400" />
                            <p className="text-[11px] text-zinc-400">Powered by LangChain RAG</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a
                        href="https://oddshoes.dev/planner"
                        target="_blank" rel="noreferrer"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all duration-200 border border-zinc-700/50"
                    >
                        <LinkIcon className="w-3 h-3" />
                        Planner
                    </a>
                    <a
                        href="https://calendly.com/builtbyoddshoes"
                        target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-md glow-orange-sm"
                    >
                        <Calendar className="w-3 h-3" />
                        Book Call
                    </a>
                </div>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
                {/* Welcome hero */}
                {messages.length <= 1 && (
                    <div className="text-center space-y-3 mb-6 mt-2 fade-in">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center mx-auto border border-orange-500/20">
                            <Bot className="w-7 h-7 text-orange-400" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Welcome to Odd Shoes</h3>
                        <p className="text-xs text-zinc-500 mx-auto max-w-[260px] leading-relaxed">
                            Your AI guide to building Kingdom-impact tech. Ask me anything about our services, pricing, or mission.
                        </p>
                    </div>
                )}

                {/* Message bubbles */}
                {messages.map((msg, index) => (
                    <div
                        key={msg.id}
                        className={`flex gap-2.5 fade-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-orange-500 to-amber-600'
                                : 'bg-zinc-800 border border-zinc-700/50'
                            }`}>
                            {msg.role === 'user' ? (
                                <User className="w-3.5 h-3.5 text-white" />
                            ) : (
                                <Bot className="w-3.5 h-3.5 text-orange-400" />
                            )}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-tr-md shadow-lg shadow-orange-500/10'
                                : 'bg-zinc-800/70 text-zinc-200 rounded-tl-md border border-zinc-700/30'
                            }`}>
                            <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                    <div className="flex gap-2.5 fade-in">
                        <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-3.5 h-3.5 text-orange-400" />
                        </div>
                        <div className="bg-zinc-800/70 rounded-2xl rounded-tl-md px-5 py-3 border border-zinc-700/30">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 bg-orange-400/60 rounded-full pulse-dot" />
                                <div className="w-2 h-2 bg-orange-400/60 rounded-full pulse-dot" style={{ animationDelay: '300ms' }} />
                                <div className="w-2 h-2 bg-orange-400/60 rounded-full pulse-dot" style={{ animationDelay: '600ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick prompts (only show at start) */}
                {messages.length <= 1 && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-2 fade-in" style={{ animationDelay: '300ms' }}>
                        {QUICK_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                onClick={() => sendMessage(prompt)}
                                className="px-3 py-2 text-xs rounded-xl bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 hover:border-orange-500/30 hover:text-orange-300 hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* ── Email Capture ── */}
            {showEmailCapture && !emailSubmitted && (
                <div className="mx-4 mb-3 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 slide-up">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex-1 text-sm">
                            <span className="font-semibold text-orange-400">📬 Stay in the loop.</span>
                            <span className="text-zinc-400 text-xs ml-1">Get updates on Kingdom-impact tech.</span>
                        </div>
                        <form
                            className="flex w-full sm:w-auto gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setEmailSubmitted(true);
                                setShowEmailCapture(false);
                            }}
                        >
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="px-3 py-2 min-w-[180px] text-xs rounded-lg bg-zinc-900/80 border border-zinc-700/50 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
                            />
                            <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold hover:from-orange-600 hover:to-amber-700 transition-all shadow-md">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {emailSubmitted && (
                <div className="mx-4 mb-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center slide-up">
                    <p className="text-xs text-emerald-400 font-medium">✅ You're subscribed! We'll keep you posted.</p>
                </div>
            )}

            {/* ── Input Area ── */}
            <div className="px-4 pb-4 pt-2 bg-zinc-900/50">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about our services, pricing, mission..."
                        className="w-full bg-zinc-800/70 border border-zinc-700/40 rounded-xl pl-4 pr-14 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/40 transition-all duration-200"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-md"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </form>
                <p className="text-center text-[10px] text-zinc-700 mt-2.5">
                    Powered by LangChain RAG · Google Gemini · Odd Shoes © 2026
                </p>
            </div>
        </div>
    );
}
