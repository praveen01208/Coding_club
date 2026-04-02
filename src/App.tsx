// Removed unused imports

function App() {
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
        <nav className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 sm:px-8 py-6 max-w-7xl w-full mx-auto gap-y-4">
          {/* Logo */}
          <div
            className="text-3xl tracking-tight text-foreground order-1"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            MAGNUS<sup className="text-xs">®</sup>
          </div>

          {/* Nav Links */}
          <div className="liquid-glass rounded-full order-3 md:order-2 w-full md:w-auto overflow-hidden">
            <div className="flex flex-row items-center justify-start md:justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden relative after:content-[''] after:w-2 after:shrink-0 md:after:hidden">
              <a href="#" className="px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Home</a>
              <a href="#" className="px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Achievers</a>
              <a href="#" className="px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Events</a>
              <a href="#" className="px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Attendance</a>
              <a href="#" className="px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]">Reach Us</a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer order-2 md:order-3">
            Begin Journey
          </button>
        </nav>

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
