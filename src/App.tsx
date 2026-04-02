import { Menu, X } from "lucide-react";
import { useState } from "react";

// Removed unused imports
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-foreground selection:text-background">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navigation Bar */}
        <nav className="relative flex items-start md:items-center justify-between px-6 sm:px-8 py-6 max-w-7xl w-full mx-auto gap-y-4">
          {/* Logo */}
          <div
            className="text-3xl tracking-tight text-foreground order-1 pt-1 md:pt-0"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            MAGNUS<sup className="text-xs">®</sup>
          </div>

          {/* Nav Links (Desktop Only) */}
          <div className="hidden md:block liquid-glass rounded-full order-2 overflow-hidden w-auto">
            <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-full relative">
              <a href="#" className="px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Home</a>
              <a href="#" className="px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Achievers</a>
              <a href="#" className="px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Events</a>
              <a href="#" className="px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Attendance</a>
              <a href="#" className="px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Reach Us</a>
            </div>
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex flex-col items-end gap-3 order-2 md:order-3">
            <button className="hidden md:block liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
              Begin Journey
            </button>
            {/* Mobile Menu Button  */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden liquid-glass rounded-full p-2 text-foreground cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.03] hover:bg-white/5 active:scale-95"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown Card */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-24 right-5 w-56 z-50 animate-fade-rise">
            <div className="liquid-glass rounded-2xl p-3 flex flex-col gap-1 border border-white/10 shadow-2xl overflow-hidden">
              {/* Deep Translucent Backdrop for readability */}
              <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl pointer-events-none -z-10"></div>
              
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }} className="relative block w-full px-4 py-2 rounded-full text-center text-sm text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:text-white cursor-pointer active:scale-95">Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }} className="relative block w-full px-4 py-2 rounded-full text-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:text-white cursor-pointer active:scale-95">Achievers</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }} className="relative block w-full px-4 py-2 rounded-full text-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:text-white cursor-pointer active:scale-95">Events</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }} className="relative block w-full px-4 py-2 rounded-full text-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:text-white cursor-pointer active:scale-95">Attendance</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }} className="relative block w-full px-4 py-2 rounded-full text-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:text-white cursor-pointer active:scale-95">Reach Us</a>
              
              <div className="w-full pt-3 pb-1 mt-1 border-t border-white/5 flex justify-center">
                <button onClick={() => setIsMobileMenuOpen(false)} className="relative liquid-glass rounded-full py-2.5 text-center text-sm text-foreground active:scale-95 transition-transform w-[95%] cursor-pointer">
                  Begin Journey
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-48 md:pb-0">
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Where <em className="not-italic text-muted-foreground">One-Forty* minds</em> compile <em className="not-italic text-muted-foreground">the future.</em>
          </h1>

          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
            We're shaping coders into deep thinkers, bold makers, and relentless problem-solvers. Through the grind, we build a community for sharp skills and unstoppable growth.
          </p>

          <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-16 hover:scale-[1.03] cursor-pointer transition-transform duration-300">
            Begin Journey
          </button>
        </main>

      </div>
    </div>
  );
}

export default App;
