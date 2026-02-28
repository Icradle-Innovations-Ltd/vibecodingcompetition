import ChatBot from './components/ChatBot'
import { ExternalLink } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Column: Brand Hero */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center gap-6 relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10">
          <a href="https://oddshoes.dev" className="inline-block mb-10 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            ODD<span className="text-primary">SHOES</span>
          </a>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            A higher calling.<br />
            <span className="text-muted-foreground">A better startup.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
            We build MVPs, craft brands, and accelerate growth for founders who want to honour God with their business. 50% of our profits fund Kingdom work.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://oddshoes.dev/services"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              Our Services
            </a>
            <a
              href="https://oddshoes.dev/work"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-muted hover:border-primary/50 text-foreground font-medium transition-colors"
            >
              Portfolio
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          <div className="mt-16 sm:mt-24 text-sm text-muted-foreground flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-xl">5 Days</span>
              <span>to launch MVP</span>
            </div>
            <div className="w-px h-8 bg-muted" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-xl">100+</span>
              <span>Products shipped</span>
            </div>
            <div className="w-px h-8 bg-muted" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-xl">50%</span>
              <span>Profits to missions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Chatbot Container */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-lg h-[600px] lg:h-[800px]">
          <ChatBot />
        </div>
      </div>
    </div>
  )
}

export default App
