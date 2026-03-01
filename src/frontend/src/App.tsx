import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Award,
  BarChart2,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Play,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ================================================================
   Scroll-reveal hook
   ================================================================ */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

/* ================================================================
   Animated counter hook
   ================================================================ */
function useCounter(target: number, suffix: string, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return `${value}${suffix}`;
}

/* ================================================================
   Stat Card Component
   ================================================================ */
interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  inView: boolean;
  delay?: string;
}

function StatCard({
  value,
  suffix,
  label,
  prefix = "",
  inView,
  delay = "",
}: StatCardProps) {
  const count = useCounter(value, suffix, inView);
  return (
    <div className={`stat-card rounded-xl p-6 text-center fade-up ${delay}`}>
      <div className="text-3xl md:text-4xl font-display font-black gradient-text-gold mb-2">
        {prefix}
        {count}
      </div>
      <div className="text-sm text-muted-foreground font-body uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

/* ================================================================
   Section Header
   ================================================================ */
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 md:mb-16 fade-up">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black gradient-text-gold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
      <div className="section-divider w-24 mx-auto mt-6" />
    </div>
  );
}

/* ================================================================
   CTA Button
   ================================================================ */
interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

function CTAButton({
  children,
  onClick,
  size = "md",
  className = "",
  href,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-5 text-lg",
  };
  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}

/* ================================================================
   Training Modal
   ================================================================ */
function TrainingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl gradient-text-gold">
            Master TraderX Training
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div
            className="flex items-center gap-3 p-4 rounded-lg"
            style={{ background: "oklch(0.18 0.04 263 / 0.6)" }}
          >
            <span className="text-gold-bright shrink-0 text-xl">👉</span>
            <p className="text-foreground font-body font-semibold">
              Open the FYERS account to access the MasterTraderX Inner Circle
            </p>
          </div>
          <a
            href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
            target="_blank"
            rel="noopener noreferrer"
            className="block btn-gold rounded-lg px-6 py-3 text-sm font-display font-semibold w-full text-center"
          >
            Get Started
          </a>
          <a
            href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-body text-gold-bright underline underline-offset-2 hover:text-yellow-300 transition-colors"
          >
            Click here to open your free trading &amp; demat account
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================================================================
   Main App
   ================================================================ */
export default function App() {
  useScrollReveal();
  const [modalOpen, setModalOpen] = useState(false);
  const [_mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stats section visibility
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openModal = () => setModalOpen(true);

  const scrollToStart = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ----------------------------------------------------------------
     Testimonial data
     ---------------------------------------------------------------- */
  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "Retail Trader, Mumbai",
      quote:
        "The PAT framework changed how I look at price action. For the first time, charts make sense to me — not as signals, but as stories.",
      stars: 5,
    },
    {
      name: "Priya Sharma",
      role: "Part-time Trader, Bengaluru",
      quote:
        "Kirti's approach to risk management alone was worth the entire program. I stopped trading impulsively after Module 3.",
      stars: 5,
    },
    {
      name: "Ankit Gupta",
      role: "Software Engineer & Trader, Delhi",
      quote:
        "The trading psychology module hit me hard — I recognized every mistake I was making. The clarity this brought is invaluable.",
      stars: 5,
    },
    {
      name: "Deepika Nair",
      role: "Full-time Trader, Pune",
      quote:
        "I had watched hundreds of YouTube videos but never understood market structure properly. Master TraderX filled that gap completely.",
      stars: 5,
    },
    {
      name: "Vikram Singh",
      role: "Investor & Trader, Hyderabad",
      quote:
        "What I appreciate most is the honesty — no guaranteed profits, no get-rich claims. Just solid education with real market context.",
      stars: 5,
    },
    {
      name: "Kavitha Reddy",
      role: "Options Trader, Chennai",
      quote:
        "The CPR and market tendencies section completely reshaped my morning prep routine. My decisions feel calmer and more structured now.",
      stars: 5,
    },
  ];

  const aboutHighlights = [
    {
      icon: <Brain size={20} />,
      text: "Rebuilt her entire trading psychology after years of costly lessons",
    },
    {
      icon: <Shield size={20} />,
      text: "Developed the PAT Framework from 15+ years of real market experience",
    },
    {
      icon: <Users size={20} />,
      text: "On a mission to educate one lakh traders by 2026",
    },
    {
      icon: <Award size={20} />,
      text: "Recognized by leading financial media in India",
    },
  ];

  const learnItems = [
    "How professional traders understand market structure",
    "How to read price objectively using price action",
    "How to manage risk before focusing on profits",
    "How emotions impact trading decisions",
    "How discipline creates long-term consistency",
    "Why most traders lose money — and how to avoid common mistakes",
  ];

  const patItems = [
    "Logical price action understanding",
    "Eight core price action setups",
    "Moving averages for trend context",
    "CPR for market structure",
    "Identifying market traps",
    "Understanding general market tendencies",
  ];

  const modules = [
    { num: "01", title: "Module 1: Trading Mindset & Market Reality" },
    { num: "02", title: "Module 2: Market Structure & Price Reading" },
    { num: "03", title: "Module 3: Risk Management & Trade Planning" },
    { num: "04", title: "Module 4: Price Action Setups & PAT Framework" },
    { num: "05", title: "Module 5: Discipline, Consistency & Trader Maturity" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      <TrainingModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ============================================================
          STICKY HEADER
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <TrendingUp size={18} className="text-background" />
            </div>
            <span className="font-display font-black text-xl">
              Master<span className="text-gold">TraderX</span>
            </span>
          </button>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-5 text-sm font-body text-muted-foreground">
              <button
                type="button"
                className="hover:text-gold transition-colors"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                About
              </button>
              <button
                type="button"
                className="hover:text-gold transition-colors"
                onClick={() =>
                  document
                    .getElementById("learn")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Curriculum
              </button>
              <button
                type="button"
                className="hover:text-gold transition-colors"
                onClick={scrollToStart}
              >
                Program
              </button>
            </nav>
            <button
              type="button"
              onClick={openModal}
              className="btn-gold rounded-lg px-5 py-2.5 text-sm font-display font-bold"
            >
              Begin Training
            </button>
          </div>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden btn-gold rounded-lg px-4 py-2 text-sm font-display font-bold"
          >
            Begin Training
          </button>
        </div>
      </header>

      <main>
        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/generated/hero-banner.dim_1200x600.jpg"
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/97 to-background" />
            <div className="absolute inset-0 bg-background/70" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.72 0.17 65 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.17 65 / 0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div
                className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-8"
                style={{
                  background: "oklch(0.72 0.17 65 / 0.15)",
                  border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                  color: "oklch(0.82 0.19 75)",
                }}
              >
                <Award size={14} />
                India's Free Signature Trading Education Initiative
              </div>

              {/* Headline */}
              <h1 className="fade-up delay-1 text-6xl md:text-8xl lg:text-9xl font-display font-black gradient-text-hero mb-6 leading-none tracking-tight">
                Master
                <br />
                <span className="font-serif italic">TraderX</span>
              </h1>

              {/* Subheadline */}
              <p className="fade-up delay-2 text-xl md:text-2xl text-foreground/80 font-body max-w-2xl mx-auto mb-8 leading-relaxed">
                A structured{" "}
                <strong className="text-gold font-semibold">
                  8-hour learning program
                </strong>{" "}
                designed to help traders build clarity, discipline, and market
                understanding — responsibly.
              </p>

              {/* YouTube Video Embed */}
              <div
                className="fade-up delay-3 w-full max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: "1px solid oklch(0.7 0.15 85 / 0.3)" }}
              >
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/2_rFKK7zGOQ"
                    title="Master TraderX Program Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Disclaimer badge */}
              <div
                className="fade-up delay-3 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-3 rounded-full mb-10 text-xs font-body text-muted-foreground"
                style={{
                  background: "oklch(0.16 0.035 263 / 0.7)",
                  border: "1px solid oklch(0.3 0.04 263 / 0.5)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                  Educational initiative
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                  No profit guarantees
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                  No trade recommendations
                </span>
              </div>

              {/* Video prompt */}
              <p className="fade-up delay-4 text-sm text-muted-foreground font-body mb-6 italic">
                Please watch this message fully to understand the purpose and
                structure of Master TraderX
              </p>

              {/* CTA */}
              <div className="fade-up delay-5">
                <CTAButton size="lg" onClick={openModal}>
                  <Play size={20} />
                  Begin the Master TraderX Training
                </CTAButton>
              </div>

              {/* Scroll indicator */}
              <div className="fade-up delay-6 mt-16 flex flex-col items-center gap-2 text-muted-foreground text-xs font-body">
                <span>Scroll to explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            STATS BAR
            ============================================================ */}
        <section
          ref={statsRef}
          className="py-16 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.04 262), oklch(0.15 0.045 265))",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <StatCard
                value={15}
                suffix="+"
                label="Years Experience"
                inView={statsInView}
                delay="delay-1"
              />
              <StatCard
                value={1}
                suffix=" Lakh+"
                label="Target Traders by 2026"
                inView={statsInView}
                delay="delay-2"
              />
              <StatCard
                value={5}
                suffix=" Cr+"
                label="Trading Profits 2025"
                prefix="₹"
                inView={statsInView}
                delay="delay-3"
              />
              <StatCard
                value={8}
                suffix=" Hours"
                label="Program Duration"
                inView={statsInView}
                delay="delay-4"
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY MASTER TRADERX EXISTS
            ============================================================ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Why Master TraderX Exists"
              subtitle="A long-term vision to improve the quality of trading education in India."
            />

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <BookOpen size={28} className="text-gold-bright" />,
                  title: "Education Over Excitement",
                  desc: "Real market understanding built on fundamentals, not get-rich-quick narratives.",
                  delay: "delay-1",
                },
                {
                  icon: <Shield size={28} className="text-gold-bright" />,
                  title: "Responsibility Over Dependency",
                  desc: "Empowering traders to think independently — not follow tips blindly.",
                  delay: "delay-2",
                },
                {
                  icon: <Target size={28} className="text-gold-bright" />,
                  title: "Process Over Promises",
                  desc: "Systems and discipline that work over time, not overnight miracles.",
                  delay: "delay-3",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`glass-card rounded-2xl p-8 fade-up ${card.delay} group hover:border-gold/30 transition-all duration-300`}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "oklch(0.72 0.17 65 / 0.1)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.2)",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="fade-up glass-card rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <p className="text-foreground/90 font-body text-lg leading-relaxed">
                Master TraderX was created with a long-term vision — to improve
                the quality of trading education in India. By{" "}
                <strong className="text-gold">2026</strong>, this initiative
                aims to help one lakh Indian traders build the right foundation
                in market understanding.
              </p>
            </div>

            <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <CTAButton onClick={openModal}>
                <Play size={18} />
                Begin the Master TraderX Training
              </CTAButton>
            </div>
          </div>
        </section>

        {/* ============================================================
            ABOUT KIRTI AGRAWAL
            ============================================================ */}
        <section
          id="about"
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.04 262), oklch(0.15 0.045 265))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="About Kirti Agrawal" />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
              {/* Left — image + achievement cards */}
              <div className="fade-up delay-1 space-y-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/30 to-transparent blur-lg" />
                  <img
                    src="/assets/uploads/6a647e493dd9ac75-1.jpeg"
                    alt="Kirti Agrawal — Trading Mentor"
                    className="relative rounded-2xl w-full max-w-sm mx-auto block object-cover"
                    style={{
                      aspectRatio: "1",
                      border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Achievement cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      value: "₹2 Cr+",
                      label: "Trading Profits (2024)",
                      icon: <TrendingUp size={18} />,
                    },
                    {
                      value: "₹5 Cr+",
                      label: "Trading Profits (2025)",
                      icon: <BarChart2 size={18} />,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="stat-card rounded-xl p-4 text-center"
                    >
                      <div className="text-gold flex items-center justify-center mb-2">
                        {item.icon}
                      </div>
                      <div className="text-xl font-display font-black gradient-text-gold">
                        {item.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured on */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">
                    Featured on
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Zee Business",
                      "ET Now",
                      "CNBC Awaaz",
                      "Bloomberg Quint",
                      "MoneyControl",
                    ].map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 rounded-full text-xs font-body font-semibold text-muted-foreground"
                        style={{
                          background: "oklch(0.22 0.04 263 / 0.8)",
                          border: "1px solid oklch(0.32 0.05 263 / 0.6)",
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Also worked with */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">
                    Also worked with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Zerodha",
                      "Upstox",
                      "Angel One",
                      "Sensibull",
                      "Finlearn Academy",
                    ].map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 rounded-full text-xs font-body font-semibold text-muted-foreground"
                        style={{
                          background: "oklch(0.22 0.04 263 / 0.8)",
                          border: "1px solid oklch(0.32 0.05 263 / 0.6)",
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — bio text */}
              <div className="fade-up delay-2 space-y-6">
                <div>
                  <Badge
                    className="mb-4 text-xs font-body font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.72 0.17 65 / 0.15)",
                      color: "oklch(0.82 0.19 75)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                    }}
                  >
                    Full-Time Trader & Educator
                  </Badge>
                  <p className="text-foreground/90 font-body text-lg leading-relaxed mb-4">
                    Kirti Agrawal is a full-time trader, trading educator, and
                    market mentor with over{" "}
                    <strong className="text-gold">
                      15 years of experience
                    </strong>{" "}
                    in Indian equity markets.
                  </p>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    After struggling for nearly eight years and experiencing
                    losses of close to{" "}
                    <strong className="text-foreground/80">₹20 lakhs</strong>,
                    Kirti rebuilt her trading approach through discipline,
                    psychology, and structured systems.
                  </p>
                </div>

                <div className="section-divider" />

                <div className="space-y-4">
                  {aboutHighlights.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-start gap-4 p-4 rounded-xl"
                      style={{ background: "oklch(0.18 0.04 263 / 0.5)" }}
                    >
                      <div className="text-gold shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <p className="text-foreground/80 font-body">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <blockquote className="border-l-4 border-gold pl-6 py-2">
                  <p className="text-foreground/90 font-serif italic text-lg leading-relaxed">
                    "Master TraderX represents the distillation of her
                    real-market experience into a structured learning
                    initiative."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHAT YOU WILL LEARN
            ============================================================ */}
        <section id="learn" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="What You Will Learn"
              subtitle="Inside Master TraderX"
            />

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {learnItems.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-start gap-4 p-5 glass-card rounded-xl fade-up delay-${(i % 4) + 1}`}
                  >
                    <CheckCircle2
                      size={22}
                      className="text-gold shrink-0 mt-0.5"
                    />
                    <p className="text-foreground/90 font-body leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="fade-up text-center">
                <p className="text-muted-foreground font-body mb-6 flex items-center justify-center gap-2">
                  <span className="text-gold">📌</span>
                  All content is educational in nature.
                </p>
                <CTAButton onClick={openModal}>
                  <ChevronRight size={18} />
                  Begin the Master TraderX Training
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THREE PILLARS
            ============================================================ */}
        <section
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.04 262), oklch(0.15 0.045 265))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="The Three Pillars of Master TraderX" />

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {[
                {
                  icon: <Brain size={36} className="text-gold-bright" />,
                  title: "Trading Psychology",
                  desc: "Understanding discipline, patience, emotional control, and decision-making",
                  delay: "delay-1",
                },
                {
                  icon: <Shield size={36} className="text-gold-bright" />,
                  title: "Risk Management",
                  desc: "Capital protection, position sizing, and longevity in markets.",
                  delay: "delay-2",
                },
                {
                  icon: <BarChart2 size={36} className="text-gold-bright" />,
                  title: "Structured Trading System",
                  desc: "A logical framework to observe and understand price behaviour",
                  delay: "delay-3",
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className={`glass-card rounded-2xl p-8 text-center fade-up ${pillar.delay} group hover:border-gold/30 transition-all duration-300`}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "oklch(0.72 0.17 65 / 0.1)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.2)",
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl gradient-text-gold mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="fade-up text-center">
              <CTAButton onClick={openModal}>
                <ArrowRight size={18} />
                Begin the Master TraderX Training
              </CTAButton>
            </div>
          </div>
        </section>

        {/* ============================================================
            PAT FRAMEWORK
            ============================================================ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden fade-up"
                style={{ border: "1px solid oklch(0.72 0.17 65 / 0.3)" }}
              >
                {/* Decorative glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                  style={{ background: "oklch(0.72 0.17 65 / 0.08)" }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="px-4 py-1.5 rounded-full text-sm font-display font-bold"
                      style={{
                        background: "oklch(0.72 0.17 65 / 0.15)",
                        border: "1px solid oklch(0.72 0.17 65 / 0.4)",
                        color: "oklch(0.82 0.19 75)",
                      }}
                    >
                      Framework
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-display font-black gradient-text-gold mb-4">
                    The PAT Framework
                  </h2>

                  <p className="text-foreground/80 font-body text-lg leading-relaxed mb-8">
                    Inside Master TraderX, learners are introduced to the{" "}
                    <strong className="text-gold">PAT Framework</strong>, which
                    focuses on:
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 mb-8">
                    {patItems.map((item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 p-4 rounded-xl fade-up delay-${(i % 4) + 1}`}
                        style={{ background: "oklch(0.18 0.04 263 / 0.6)" }}
                      >
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        <span className="text-foreground/85 font-body">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground font-body text-sm italic mb-8">
                    This framework is taught for educational understanding, not
                    as trade recommendations.
                  </p>

                  <CTAButton onClick={openModal}>
                    <ChevronRight size={18} />
                    Begin the Master TraderX Training
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            PROGRAM STRUCTURE
            ============================================================ */}
        <section
          id="start"
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.04 262), oklch(0.15 0.045 265))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="Program Structure" />

            <div className="text-center mb-10 fade-up">
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                style={{
                  background: "oklch(0.18 0.04 263 / 0.8)",
                  border: "1px solid oklch(0.35 0.05 263 / 0.4)",
                }}
              >
                <span className="text-muted-foreground font-body text-sm">
                  ⏱ ~8 Hours Total
                </span>
                <span className="w-px h-4 bg-border" />
                <span className="text-muted-foreground font-body text-sm">
                  🎓 Self-paced recorded learning
                </span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {modules.map((mod, i) => (
                <div
                  key={mod.num}
                  className={`module-card rounded-xl p-5 md:p-6 flex items-center justify-between gap-4 fade-up delay-${i + 1}`}
                >
                  <div className="flex items-center gap-5">
                    <span className="text-3xl font-display font-black text-gold opacity-50 shrink-0 w-10">
                      {mod.num}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-foreground/95">
                        {mod.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-gold-outline rounded-lg px-4 py-2 text-sm font-display font-semibold shrink-0 whitespace-nowrap flex items-center gap-1.5"
                  >
                    Go to Module <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            FOR / NOT FOR
            ============================================================ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <SectionHeader title="Is This Initiative For You?" />

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* FOR */}
              <div
                className="glass-card rounded-2xl p-8 fade-up delay-1"
                style={{ border: "1px solid oklch(0.62 0.18 240 / 0.3)" }}
              >
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.62 0.18 240 / 0.2)" }}
                  >
                    <CheckCircle2 size={18} className="text-emerald-brand" />
                  </div>
                  <span className="text-emerald-brand">This Is For</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    "Serious learners",
                    "Traders seeking clarity",
                    "Individuals who respect markets",
                    "Long-term thinkers",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-body text-foreground/85"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-emerald-brand shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* NOT FOR */}
              <div
                className="glass-card rounded-2xl p-8 fade-up delay-2"
                style={{ border: "1px solid oklch(0.55 0.22 25 / 0.3)" }}
              >
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.55 0.22 25 / 0.2)" }}
                  >
                    <XCircle
                      size={18}
                      style={{ color: "oklch(0.7 0.22 25)" }}
                    />
                  </div>
                  <span style={{ color: "oklch(0.7 0.22 25)" }}>
                    This Is Not For
                  </span>
                </h3>
                <ul className="space-y-4">
                  {[
                    "Shortcut seekers",
                    "Guaranteed profit expectations",
                    "Tip-dependent traders",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-body text-foreground/85"
                    >
                      <XCircle
                        size={18}
                        style={{ color: "oklch(0.7 0.22 25)" }}
                        className="shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TESTIMONIALS
            ============================================================ */}
        <section
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.04 262), oklch(0.15 0.045 265))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader
              title="What Traders Say"
              subtitle="About the Master TraderX Approach"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`testimonial-card rounded-2xl p-6 fade-up delay-${(i % 4) + 1}`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }, (_, si) => (
                      <Star
                        key={`${t.name}-star-${si}`}
                        size={14}
                        className="text-gold fill-gold"
                      />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-foreground/85 font-body leading-relaxed mb-5 text-sm italic">
                    "{t.quote}"
                  </p>
                  {/* Name */}
                  <div
                    className="flex items-center gap-3 pt-4"
                    style={{
                      borderTop: "1px solid oklch(0.3 0.04 263 / 0.4)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold text-background"
                      style={{ background: "oklch(0.72 0.17 65 / 0.8)" }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-up text-center">
              <CTAButton onClick={openModal} size="lg">
                <Play size={20} />
                Begin Your Learning Journey
              </CTAButton>
            </div>
          </div>
        </section>

        {/* ============================================================
            FINAL CTA
            ============================================================ */}
        <section
          className="py-24 md:py-36 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.1 0.03 262), oklch(0.14 0.045 265), oklch(0.1 0.03 262))",
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-96 h-96 rounded-full blur-3xl"
              style={{ background: "oklch(0.72 0.17 65 / 0.1)" }}
            />
          </div>
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.72 0.17 65 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.17 65 / 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="fade-up max-w-3xl mx-auto">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-8"
                style={{
                  background: "oklch(0.72 0.17 65 / 0.15)",
                  border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                  color: "oklch(0.82 0.19 75)",
                }}
              >
                <Award size={14} />
                Free Educational Initiative
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black gradient-text-hero mb-6 leading-tight">
                Ready to Build a Real
                <br />
                Trading Foundation?
              </h2>
              <p className="text-foreground/70 font-body text-xl mb-10 leading-relaxed">
                Join thousands of Indian traders learning the right way.
              </p>
              <CTAButton
                size="lg"
                onClick={openModal}
                className="animate-pulse-gold"
              >
                <Play size={22} />
                Begin the Master TraderX Training
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer
        className="py-12 relative"
        style={{
          background: "oklch(0.1 0.03 262)",
          borderTop: "1px solid oklch(0.22 0.04 263 / 0.6)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Logo */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <TrendingUp size={18} className="text-background" />
              </div>
              <span className="font-display font-black text-xl">
                Master<span className="text-gold">TraderX</span>
              </span>
            </button>

            {/* Disclaimer */}
            <p className="text-muted-foreground font-body text-sm max-w-2xl leading-relaxed">
              Master TraderX is a free educational initiative. All content is
              for learning purposes only. This is not financial advice. No
              profit guarantees are made. Trading in financial markets involves
              risk.
            </p>

            <div className="section-divider w-full" />

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-muted-foreground font-body">
              <span>
                © {new Date().getFullYear()} Master TraderX by Kirti Agrawal.
                All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
