// @ts-nocheck
import Login from "./attendance/pages/Login";
import AdminDashboard from "./attendance/pages/AdminDashboard";
import StudentDashboard from "./attendance/pages/StudentDashboard";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./attendance/attendance.css";


// Local flower video (used as bg for all non-home tabs)
// Using new URL for Vite-compatible asset resolution
const FLOWER_VIDEO = new URL(
  "./assets/Video_Generation_Without_Text_Audio-ezremove.mp4",
  import.meta.url
).href;

// Landing page video
const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

type Tab = "Home" | "Achievers" | "Events" | "Attendance" | "Reach Us";

// ─── Page-specific content ───────────────────────────────────────────────────

function AchieversPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 md:pb-0">
      <h1
        className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Our <em className="not-italic text-muted-foreground">Achievers</em>
      </h1>
      <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
        Celebrating the minds that push limits, win battles, and inspire the
        rest. Each name here is proof that the grind is worth it.
      </p>
      <div className="animate-fade-rise-delay-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-14 w-full max-w-4xl">
        {["Rank #1 · Alice C.", "Rank #2 · Bob M.", "Rank #3 · Clara T.", "Rank #4 · Dev S.", "Rank #5 · Eva R.", "Rank #6 · Finn A."].map(
          (name) => (
            <div
              key={name}
              className="liquid-glass rounded-2xl px-6 py-5 text-left flex flex-col gap-1"
            >
              <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
                {name.split("·")[0].trim()}
              </span>
              <span
                className="text-xl text-foreground font-normal"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {name.split("·")[1].trim()}
              </span>
            </div>
          )
        )}
      </div>
    </main>
  );
}

function EventsPage() {
  const events = [
    { title: "Hackathon '26", date: "Apr 12, 2026", desc: "48-hour build sprint, open to all branches." },
    { title: "CodeWars Weekly", date: "Every Friday", desc: "Competitive programming ladder — climb the ranks." },
    { title: "DSA Bootcamp", date: "Apr 20 – May 10", desc: "Intensive 3-week data structures deep dive." },
    { title: "Open Mic Debug", date: "May 3, 2026", desc: "Bring your broken code, we fix it together." },
  ];
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 md:pb-0">
      <h1
        className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Upcoming <em className="not-italic text-muted-foreground">Events</em>
      </h1>
      <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
        Mark your calendar. These are the moments that define the club — and
        your growth as a developer.
      </p>
      <div className="animate-fade-rise-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-14 w-full max-w-3xl">
        {events.map((ev) => (
          <div
            key={ev.title}
            className="liquid-glass rounded-2xl px-6 py-5 text-left flex flex-col gap-2"
          >
            <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              {ev.date}
            </span>
            <span
              className="text-2xl text-foreground font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {ev.title}
            </span>
            <span className="text-sm text-muted-foreground">{ev.desc}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function AttendancePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 md:pb-0">
      <h1
        className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Your <em className="not-italic text-muted-foreground">Attendance</em>
      </h1>
      <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
        Consistency is the hidden edge. Track your presence, stay on the
        leaderboard.
      </p>
      <div className="animate-fade-rise-delay-2 liquid-glass rounded-3xl px-8 py-10 mt-14 w-full max-w-md flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Sessions attended</span>
          <span className="text-foreground text-2xl font-semibold" style={{ fontFamily: "'Instrument Serif', serif" }}>
            32 / 40
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/60 transition-all duration-700"
            style={{ width: "80%" }}
          />
        </div>
        <span className="text-xs text-muted-foreground text-right">80% — Keep it up!</span>
      </div>
    </main>
  );
}

// ─── Crew data (from code.html) ───────────────────────────────────────────────
const CREW_MEMBERS = [
  { name: "ELIAS VANCE",   role: "DIRECTOR OF PHOTOGRAPHY", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqDz7ucL6Lr2UiYxe7ejiIY_J8Q3MPYrsUDGMGByZ1RVZuQa8VkZlMqSQXcap0RI5dh-nF5comd-wf6JPpUTt9a1GTanTXFG6xTm9vDXoVEZabtqa7ZL--Fp-D9psHRj0z711uZ6fg6XQgCEyc7RF1fny0N2P1Hp8eYbZwdF5xaYSBJXXDAQ-c-D09JKb1K3qZraqvKfuJ2VigP_EviQkYRLOEiYLT9vhOeUuZPCM72nf1cY8N08WWWl0kRziq-8tO5DKvM5DK3pSG" },
  { name: "SARA LUND",     role: "CREATIVE DIRECTOR",        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYXwE1YD5THKiP8xtWDqV0vJo2XExBB_DIjHER-I3xhFrACzyNKyANrwVBBr5d8Shmysn3clocgySr99Zsz742uUl2seMCKHUAC1n3fhQ_EfLxytdZczXIZ3OLsPhL94YtKJ-VLvgpFw_HLJGs9zJ8r_oYP7HNqJ-G_whCKxF3DnVasjJvS6Cvf3_jdXYx6d8bJJzSN8qR10qud2sDzWaXcv_a6P0nF8FGVJaWkL6MEo8c4oB5Y7K4t6UZMfGi4yvpUs_0JTlYpcaw" },
  { name: "MARCUS THORNE", role: "EXECUTIVE PRODUCER",       img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdyaSneT8B-gHTkgSAFP7qKtsSBOIooQKo6fZBG6T-Me5OLWVgPieZG0puJ1iKXB5J25IjRezbWNhWDlMZOoKxCVRc3v6mBI_tL9jzORYI66vMqESXOOY3LN8qh_h_72skAp_Eq8CXp-mbrRTZCkJ49F93SAJDBxex9jgiJHeuZx56ajOFKJF4y_m2xM0Uze_Iqj3bd4RJtXjrCvFPqu3KPmvqfJdxU_HJ3jG7sND5FMx-72QX2uNZUK0ZOnkN7pC31qW2-hczSj3c" },
  { name: "JENA CLARKE",   role: "LEAD ARCHITECT",           img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9MiX5omYCwnrGv_UpVoMcUEAvuLhQAyAaVDStFR5zrXmkd-NQ5rBpdx75XkPWUHEeFDM_GusuYqI1ZyB5eoMMUeWo37EVfmJFXOjAMUNdjWzjQdmgygNa12-ch6hVSYK9w74XKtM_65u403R00HVT292kubyvGbRjM4Km4bgQ-vC9fTlJR4QsWSyV8EGIG96WXWijXL4yh_IUzXA4lwgZNQkniFEIlRmf38etI0nbqhkFOPNMklfQkXdPrhXLHqdNaRyWphNooD_T" },
  { name: "DAVID CHEN",    role: "SOUND DESIGNER",           img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2FYehKMWZf97FPs_845UuoxkddyPyyWBj094Eah6ZACEqt5oCIjw1UBXvCjl7vZ0CcAyLUPta6N0LokTDIUBetTpO1uqU-vDF-SV1cez4l8jBUO5meoU8yaK3P2mKaFjXfRt0ATmWHihR5Ihf-FBWXBStHXRLYYOGgjN6kqBt71L07aj05xoUXBOVbpyHH9IrePwDX9P9QFkS1AxZ8AbYOlYoe17rfJ1f89c662RK5UqTQjOtcuFq5Jo6hvkj9qSBS6a1jaAlUUr" },
  { name: "ANNA RHEE",     role: "UX STRATEGIST",            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqDz7ucL6Lr2UiYxe7ejiIY_J8Q3MPYrsUDGMGByZ1RVZuQa8VkZlMqSQXcap0RI5dh-nF5comd-wf6JPpUTt9a1GTanTXFG6xTm9vDXoVEZabtqa7ZL--Fp-D9psHRj0z711uZ6fg6XQgCEyc7RF1fny0N2P1Hp8eYbZwdF5xaYSBJXXDAQ-c-D09JKb1K3qZraqvKfuJ2VigP_EviQkYRLOEiYLT9vhOeUuZPCM72nf1cY8N08WWWl0kRziq-8tO5DKvM5DK3pSG" },
  { name: "KAI VOSS",      role: "LIGHTING ARTIST",          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYXwE1YD5THKiP8xtWDqV0vJo2XExBB_DIjHER-I3xhFrACzyNKyANrwVBBr5d8Shmysn3clocgySr99Zsz742uUl2seMCKHUAC1n3fhQ_EfLxytdZczXIZ3OLsPhL94YtKJ-VLvgpFw_HLJGs9zJ8r_oYP7HNqJ-G_whCKxF3DnVasjJvS6Cvf3_jdXYx6d8bJJzSN8qR10qud2sDzWaXcv_a6P0nF8FGVJaWkL6MEo8c4oB5Y7K4t6UZMfGi4yvpUs_0JTlYpcaw" },
];

function ReachUsPage() {
  const perspRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const velRef = useRef(0);
  const lastXRef = useRef(0);
  const rafRef = useRef(0);

  const N = CREW_MEMBERS.length;
  const STEP = 360 / N;   // degrees between each card
  const RADIUS = 240;     // px — circle radius

  function applyAngle(angle: number) {
    if (!stageRef.current) return;
    const cards = Array.from(
      stageRef.current.querySelectorAll<HTMLElement>(".reel-card")
    );
    cards.forEach((el, i) => {
      const a = i * STEP - angle;                           // card's angle in the circle
      const norm = ((a % 360) + 360) % 360;                // normalize 0-360
      const dist = Math.min(norm, 360 - norm);             // distance from front (0°)
      const isFront = dist < STEP * 0.55;
      const scale = isFront ? 1.18 : 0.75;
      // Show 5 cards: smooth fade, zero past ~118°
      const opacity = dist < 118 ? Math.pow(1 - dist / 118, 0.55) : 0;
      el.style.transform = `rotateY(${a}deg) translateZ(${RADIUS}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = isFront ? "20" : "1";
    });
  }

  function snapToNearest() {
    const target = Math.round(angleRef.current / STEP) * STEP;
    const diff = target - angleRef.current;
    if (Math.abs(diff) < 0.12) {
      angleRef.current = target;
      applyAngle(target);
      return;
    }
    angleRef.current += diff * 0.17;
    applyAngle(angleRef.current);
    rafRef.current = requestAnimationFrame(snapToNearest);
  }

  function momentum() {
    if (Math.abs(velRef.current) > 0.2) {
      angleRef.current -= velRef.current * 2.2;
      velRef.current *= 0.87;
      applyAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(momentum);
    } else {
      velRef.current = 0;
      snapToNearest();
    }
  }

  useEffect(() => {
    applyAngle(0);
    const el = perspRef.current;
    if (!el) return;

    const down = (e: PointerEvent) => {
      cancelAnimationFrame(rafRef.current);
      isDragging.current = true;
      startX.current = e.clientX;
      lastXRef.current = e.clientX;
      startAngle.current = angleRef.current;
      velRef.current = 0;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!isDragging.current) return;
      velRef.current = (e.clientX - lastXRef.current) * 0.22;
      lastXRef.current = e.clientX;
      angleRef.current = startAngle.current - (e.clientX - startX.current) * 0.42;
      applyAngle(angleRef.current);
    };
    const up = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
      momentum();
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main className="flex-1 flex flex-col w-full justify-center items-center overflow-hidden select-none">

      {/* 3-D Circular Coverflow */}
      <div
        ref={perspRef}
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 50%",
          width: "100%",
          height: "380px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
        }}
      >
        <div
          ref={stageRef}
          style={{
            position: "relative",
            width: "160px",
            height: "270px",
            transformStyle: "preserve-3d",
          }}
        >
          {CREW_MEMBERS.map((m, i) => (
            <div
              key={i}
              className="reel-card absolute inset-0"
              style={{
                willChange: "transform",
              }}
            >
              <div
                className="liquid-glass rounded-2xl overflow-hidden h-full"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 30px 70px -12px rgba(0,0,0,0.55)",
                }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "74%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="px-5 py-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="block text-sm font-extrabold tracking-tight text-foreground uppercase leading-tight"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {m.name}
                  </span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground mt-1 font-semibold">
                    {m.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </main>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────


type AttendanceUser = {
  _id: string;
  name: string;
  username: string;
  role: string;
  group?: number;
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [attendanceUser, setAttendanceUser] = useState<AttendanceUser | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("magnusUserName");
    if (storedName) {
      setUserName(storedName);
    } else if (storedName === null) {
      const timer = setTimeout(() => {
        setShowNamePrompt(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Restore attendance session on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("cc_user");
    if (storedUser) {
      try {
        setAttendanceUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("cc_user");
        localStorage.removeItem("cc_token");
      }
    }
  }, []);

  const handleAttendanceLogin = (user: AttendanceUser, token: string) => {
    localStorage.setItem("cc_token", token);
    localStorage.setItem("cc_user", JSON.stringify(user));
    setAttendanceUser(user);
  };

  const handleAttendanceLogout = () => {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    setAttendanceUser(null);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      localStorage.setItem("magnusUserName", nameInput.trim());
      setUserName(nameInput.trim());
      setShowNamePrompt(false);
    }
  };

  const handleDismissPrompt = () => {
    localStorage.setItem("magnusUserName", "");
    setShowNamePrompt(false);
  };

  const navTo = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const isHome = activeTab === "Home";
  const tabs: Tab[] = ["Home", "Achievers", "Events", "Attendance", "Reach Us"];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-foreground selection:text-background">

      {/* ── Background Video ── */}
      {/* Landing page video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`fixed z-0 pointer-events-none transition-opacity duration-700 ${
          isHome ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          transform: "translate(-50%, -50%) scale(1.15)",
          willChange: "transform",
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Inner-tabs video — centered scale, looping, muted */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`fixed z-0 pointer-events-none transition-opacity duration-700 ${
          !isHome ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          transform: "translate(-50%, -50%) scale(1.15)",
          willChange: "transform",
          filter: "blur(6px) contrast(1.08) saturate(1.15) brightness(1.03)",
        }}
      >
        <source src={FLOWER_VIDEO} type="video/mp4" />
      </video>

      {/* Dark overlay — slightly stronger on inner pages for readability */}
      <div
        className={`fixed inset-0 z-[1] pointer-events-none transition-all duration-700 ${
          isHome ? "bg-black/30" : "bg-black/50"
        }`}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Name Prompt Modal */}
        {showNamePrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md transition-opacity duration-500">
            <div className="liquid-glass rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col gap-6 animate-fade-rise relative overflow-hidden border border-white/10">
              <button
                type="button"
                onClick={handleDismissPrompt}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>

              <h2 className="text-3xl text-foreground font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Hey! Coder, your name?
              </h2>

              <form onSubmit={handleNameSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-medium tracking-wide"
                  autoFocus
                  maxLength={20}
                />
                <button
                  type="submit"
                  disabled={!nameInput.trim()}
                  className="liquid-glass rounded-xl py-3 md:py-2.5 text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer border border-white/5"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="relative flex items-start md:items-center justify-between px-6 sm:px-8 py-6 max-w-7xl w-full mx-auto gap-y-4">
          {/* Logo */}
          <div
            className="text-3xl tracking-tight text-foreground order-1 pt-1 md:pt-0 cursor-pointer"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            onClick={() => navTo("Home")}
          >
            MAGNUS<sup className="text-xs">®</sup>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:block liquid-glass rounded-full order-2 overflow-hidden w-auto">
            <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-full relative">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => navTo(tab)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-all duration-300 cursor-pointer border-0 bg-transparent ${
                    activeTab === tab
                      ? "text-foreground bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex flex-col items-end gap-3 order-2 md:order-3">
            <button className="hidden md:block liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
              {userName ? `Hii !, ${userName}` : "Begin Journey"}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden liquid-glass rounded-full p-2 text-foreground cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.03] hover:bg-white/5 active:scale-95"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-24 right-5 w-56 z-50 animate-fade-rise">
            <div className="liquid-glass rounded-2xl p-3 flex flex-col gap-1 border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl pointer-events-none -z-10" />
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => navTo(tab)}
                  className={`relative block w-full px-4 py-2 rounded-full text-center text-sm transition-all duration-300 cursor-pointer border-0 bg-transparent ${
                    activeTab === tab
                      ? "text-foreground bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <div className="w-full pt-3 pb-1 mt-1 border-t border-white/5 flex justify-center">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative liquid-glass rounded-full py-2.5 text-center text-sm text-foreground active:scale-95 transition-transform w-[95%] cursor-pointer"
                >
                  {userName ? `Hii !, ${userName}` : "Begin Journey"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Page Content ── */}
        {activeTab === "Home" && (
          <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-48 md:pb-0">
            <h1
              className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Where{" "}
              <em className="not-italic text-muted-foreground">One-Forty* minds</em>{" "}
              compile{" "}
              <em className="not-italic text-muted-foreground">the future.</em>
            </h1>

            <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
              We're shaping coders into deep thinkers, bold makers, and
              relentless problem-solvers. Through the grind, we build a
              community for sharp skills and unstoppable growth.
            </p>

            <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-16 hover:scale-[1.03] cursor-pointer transition-transform duration-300">
              {userName ? `Hii !, ${userName}` : "Begin Journey"}
            </button>
          </main>
        )}

        {activeTab === "Achievers" && <AchieversPage />}
        {activeTab === "Events" && <EventsPage />}
        {activeTab === "Attendance" && (
          !attendanceUser
            ? <Login onLogin={handleAttendanceLogin} />
            : attendanceUser.role === "admin"
              ? <AdminDashboard user={attendanceUser} onLogout={handleAttendanceLogout} />
              : <StudentDashboard user={attendanceUser} onLogout={handleAttendanceLogout} />
        )}
        {activeTab === "Reach Us" && <ReachUsPage />}
      </div>
    </div>
  );
}

export default App;
