import ChatBot from './components/ChatBot'
import { ExternalLink, Zap, Users, Heart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-300px] left-[-200px] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Column: Brand Hero */}
      <div className="w-full lg:w-[45%] p-8 lg:p-16 flex flex-col justify-center gap-8 relative z-10">
        {/* Logo */}
        <a href="https://oddshoes.dev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mb-6 group w-fit">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg glow-orange-sm group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-lg">O</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            ODD<span className="gradient-text">SHOES</span>
          </span>
        </a>

        <div className="space-y-6">
          <h1 className="text-4xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.1]">
            A higher calling.
            <br />
            <span className="text-zinc-500">A better startup.</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
            We build MVPs, craft brands, and accelerate growth for founders who want to
            <span className="text-orange-400 font-medium"> honour God </span>
            with their business.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href="https://oddshoes.dev/services"
            target="_blank" rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg glow-orange-sm hover:glow-orange hover:scale-[1.02]"
          >
            Our Services
          </a>
          <a
            href="https://oddshoes.dev/work"
            target="_blank" rel="noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700/50 hover:border-orange-500/30 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-300 hover:bg-zinc-800/50"
          >
            View Portfolio
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-8 pt-8 border-t border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">5 Days</p>
              <p className="text-xs text-zinc-500">to launch MVP</p>
            </div>
          </div>
          <div className="w-px h-12 bg-zinc-800" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">100+</p>
              <p className="text-xs text-zinc-500">Products shipped</p>
            </div>
          </div>
          <div className="w-px h-12 bg-zinc-800" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">50%</p>
              <p className="text-xs text-zinc-500">Profits to missions</p>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <p className="text-[11px] text-zinc-600 mt-4 italic">
          "For we are God's handiwork, created in Christ Jesus to do good works." — Ephesians 2:10
        </p>
      </div>

      {/* Right Column: Chatbot Container */}
      <div className="w-full lg:w-[55%] p-4 lg:p-8 flex items-center justify-center relative z-10">
        <div className="w-full max-w-xl h-[600px] lg:h-[780px] slide-up">
          <ChatBot />
        </div>
      </div>
    </div>
  )
}

export default App
