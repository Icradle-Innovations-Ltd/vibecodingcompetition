import ChatBot from './components/ChatBot'
import { ExternalLink, Zap, Users, Heart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col lg:flex-row relative overflow-hidden">
      {/* Decorative background blobs - Adjusted for mobile */}
      <div className="absolute top-[-200px] -left-20 lg:left-[-150px] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-brand-coral/5 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 lg:bottom-[-150px] -right-10 lg:right-[-100px] w-[200px] lg:w-[350px] h-[200px] lg:h-[350px] bg-brand-coral/3 rounded-full blur-[60px] lg:blur-[100px] pointer-events-none" />

      {/* Left Column: Brand Hero */}
      <div className="w-full lg:w-[45%] p-6 pt-10 lg:px-16 lg:py-12 flex flex-col justify-center gap-6 relative z-10 shrink-0 lg:shrink">
        {/* Logo */}
        <a href="https://oddshoes.dev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 mb-2 lg:mb-4 group w-fit">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-brand-charcoal flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white text-lg lg:text-xl">🐧</span>
          </div>
          <span className="text-xl lg:text-2xl tracking-wide">
            <span className="font-light text-brand-dark">Odd</span>{' '}
            <span className="font-semibold text-brand-dark">shoes</span>
            <span className="text-brand-coral font-bold ml-[1px]">|</span>
          </span>
        </a>

        <div className="space-y-4 lg:space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-serif font-normal text-brand-dark leading-[1.15] tracking-tight">
            A higher calling.
            <br />
            <span className="text-brand-gray">A better startup.</span>
          </h1>

          <p className="text-sm xl:text-base text-brand-gray max-w-md leading-relaxed">
            We build MVPs, craft brands, and accelerate growth for founders who want to
            <span className="text-brand-coral font-medium"> honour God </span>
            with their business.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href="https://oddshoes.dev/services"
            target="_blank" rel="noreferrer"
            className="px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg bg-brand-coral text-white font-semibold text-xs lg:text-sm tracking-wide uppercase hover:bg-brand-coral-dark transition-all duration-300 glow-coral-sm hover:glow-coral hover:scale-[1.02] text-center w-full sm:w-auto"
          >
            Our Services
          </a>
          <a
            href="https://oddshoes.dev/work"
            target="_blank" rel="noreferrer"
            className="group flex justify-center items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg border border-brand-dark/15 text-brand-dark hover:border-brand-coral/40 font-medium text-xs lg:text-sm tracking-wide uppercase transition-all duration-300 hover:bg-white w-full sm:w-auto"
          >
            Portfolio
            <ExternalLink className="w-3.5 h-3.5 text-brand-gray group-hover:text-brand-coral transition-colors" />
          </a>
        </div>

        {/* Stats - Scrollable on mobile if needed, but flex-wrap is safer */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-brand-dark/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-brand-coral/10 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-brand-coral" />
            </div>
            <div>
              <p className="font-bold text-brand-dark text-base lg:text-lg leading-tight">5 Days</p>
              <p className="text-[10px] lg:text-xs text-brand-gray">to launch MVP</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 lg:h-10 bg-brand-dark/8" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-brand-coral/10 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 lg:w-5 lg:h-5 text-brand-coral" />
            </div>
            <div>
              <p className="font-bold text-brand-dark text-base lg:text-lg leading-tight">100+</p>
              <p className="text-[10px] lg:text-xs text-brand-gray">Products shipped</p>
            </div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-brand-dark/8" />
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-brand-coral/10 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-brand-coral" />
            </div>
            <div>
              <p className="font-bold text-brand-dark text-base lg:text-lg leading-tight">50%</p>
              <p className="text-[10px] lg:text-xs text-brand-gray">Profits to missions</p>
            </div>
          </div>
        </div>

        {/* Scripture */}
        <p className="text-[10px] lg:text-[11px] text-brand-gray/60 mt-4 italic font-serif leading-relaxed">
          "For we are God's handiwork, created in Christ Jesus to do good works." — Ephesians 2:10
        </p>
      </div>

      {/* Right Column: Chatbot Container */}
      <div className="w-full lg:w-[55%] p-4 sm:p-6 lg:p-4 flex items-center justify-center relative z-10 flex-1">
        <div className="w-full max-w-xl h-[550px] sm:h-[600px] lg:h-[700px] max-h-[85vh] lg:max-h-[90vh] slide-up">
          <ChatBot />
        </div>
      </div>
    </div>
  )
}

export default App
