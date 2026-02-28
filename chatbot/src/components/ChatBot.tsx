import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Link as LinkIcon, Calendar } from 'lucide-react';
import { getChatResponse } from '../data/chatApi';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm the Odd Shoes AI assistant. We build tech products for Christian founders to accelerate Kingdom impact. How can I help you today? Are you looking to launch an MVP or scale an existing product?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        // Trigger email capture after 3 messages
        if (messages.length === 3 && !showEmailCapture) {
            setTimeout(() => setShowEmailCapture(true), 2000);
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessageContent = input.trim();
        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userMessageContent };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Send the current message AND the history up to this point
            const responseText = await getChatResponse(messages, userMessageContent);

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
                content: "Oops! I encountered an error connecting to my knowledge base. Please try again or book a call directly."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[800px] bg-card rounded-2xl border border-muted shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="p-4 border-b border-muted bg-card flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-foreground">Odd Shoes Agent</h2>
                        <p className="text-xs text-muted-foreground">Typically replies instantly</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a
                        href="https://oddshoes.dev/planner"
                        target="_blank" rel="noreferrer"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
                    >
                        <LinkIcon className="w-3.5 h-3.5" />
                        Project Planner
                    </a>
                    <a
                        href="https://calendly.com/builtbyoddshoes"
                        target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        Book Call
                    </a>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                <div className="text-center space-y-2 mb-8 mt-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Welcome to Odd Shoes</h3>
                    <p className="text-sm text-muted-foreground mx-auto max-w-[250px]">
                        We turn your vision into a live MVP. How can we help you build for the Kingdom today?
                    </p>
                </div>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary' : 'bg-muted'
                            }`}>
                            {msg.role === 'user' ? (
                                <User className="w-4 h-4 text-primary-foreground" />
                            ) : (
                                <Bot className="w-4 h-4 text-foreground" />
                            )}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                : 'bg-muted text-foreground rounded-tl-sm'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 flex-row">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-foreground" />
                        </div>
                        <div className="bg-muted rounded-2xl rounded-tl-sm p-4 w-16 flex items-center justify-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Email Capture Slide-up */}
            {showEmailCapture && (
                <div className="bg-primary/10 border-t border-primary/20 p-4 animate-in slide-in-from-bottom-5">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex-1 text-sm">
                            <span className="font-semibold text-primary">Stay in the loop.</span> Subscribe to get updates on how we are building Kingdom impact.
                        </div>
                        <form
                            className="flex w-full sm:w-auto gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowEmailCapture(false);
                                // Bonus point: actual logic to save email would go here
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="px-3 py-1.5 min-w-[200px] text-sm rounded-md bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button type="submit" className="px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-muted bg-card">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me about MVP development, pricing, or our mission..."
                        className="w-full bg-muted border-none rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-1 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="text-[10px] text-muted-foreground">
                        Odd Shoes AI can make mistakes. Always verify critical information.
                    </p>
                </div>
            </div>
        </div>
    );
}
