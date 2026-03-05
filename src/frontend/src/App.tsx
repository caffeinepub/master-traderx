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
  Lock,
  Play,
  Shield,
  Star,
  Target,
  TrendingUp,
  Unlock,
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
      <div
        className="text-sm font-body uppercase tracking-widest"
        style={{ color: "oklch(0.45 0.06 265)" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ================================================================
   Section Header — light variant (white bg, dark text)
   ================================================================ */
function SectionHeader({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12 md:mb-16 fade-up">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black gradient-text-gold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto font-body ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
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
      <DialogContent
        className="bg-white border border-border max-w-md"
        data-ocid="training.modal"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl gradient-text-gold">
            Master TraderX Training
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div
            className="flex items-center gap-3 p-4 rounded-lg"
            style={{
              background: "oklch(0.93 0.04 245 / 0.8)",
              border: "1px solid oklch(0.75 0.12 245 / 0.4)",
              color: "oklch(0.22 0.09 265)",
            }}
          >
            <span className="shrink-0 text-xl">👉</span>
            <p
              className="font-body font-semibold"
              style={{ color: "oklch(0.22 0.09 265)" }}
            >
              Open the FYERS account to access the MasterTraderX Inner Circle
            </p>
          </div>
          <a
            href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
            target="_blank"
            rel="noopener noreferrer"
            className="block btn-gold rounded-lg px-6 py-3 text-sm font-display font-semibold w-full text-center"
            data-ocid="training.primary_button"
          >
            Get Started
          </a>
          <a
            href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-body underline underline-offset-2 transition-colors"
            style={{ color: "oklch(0.45 0.22 245)" }}
            data-ocid="training.secondary_button"
          >
            Click here to open your free trading &amp; demat account
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================================================================
   Company Logo Component
   ================================================================ */
function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="flex items-center justify-center px-3 py-2 rounded-xl"
      style={{
        background: "oklch(0.97 0.005 255 / 0.95)",
        border: "1px solid oklch(0.88 0.04 265 / 0.5)",
        minWidth: "120px",
        height: "52px",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="object-contain"
        style={{ maxHeight: "36px", maxWidth: "110px" }}
        loading="lazy"
      />
    </div>
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

  // Module 1 is FREE; modules 2-5 are locked until account is opened
  const modules = [
    {
      num: "01",
      title: "Module 1: Trading Mindset & Market Reality",
      free: true,
    },
    {
      num: "02",
      title: "Module 2: Market Structure & Price Reading",
      free: false,
    },
    {
      num: "03",
      title: "Module 3: Risk Management & Trade Planning",
      free: false,
    },
    {
      num: "04",
      title: "Module 4: Price Action Setups & PAT Framework",
      free: false,
    },
    {
      num: "05",
      title: "Module 5: Discipline, Consistency & Trader Maturity",
      free: false,
    },
  ];

  // Featured on logos
  const featuredLogos = [
    {
      src: "/assets/generated/logo-zee-business-transparent.dim_200x80.png",
      alt: "Zee Business",
    },
    {
      src: "/assets/generated/logo-et-now-transparent.dim_200x80.png",
      alt: "ET Now",
    },
    {
      src: "/assets/generated/logo-cnbc-awaaz-transparent.dim_200x80.png",
      alt: "CNBC Awaaz",
    },
    {
      src: "/assets/generated/logo-bloomberg-quint-transparent.dim_200x80.png",
      alt: "Bloomberg Quint",
    },
    {
      src: "/assets/generated/logo-moneycontrol-transparent.dim_200x80.png",
      alt: "MoneyControl",
    },
  ];

  // Worked with logos
  const workedWithLogos = [
    {
      src: "/assets/generated/logo-zerodha-transparent.dim_200x80.png",
      alt: "Zerodha",
    },
    {
      src: "/assets/generated/logo-upstox-transparent.dim_200x80.png",
      alt: "Upstox",
    },
    {
      src: "/assets/generated/logo-angel-one-transparent.dim_200x80.png",
      alt: "Angel One",
    },
    {
      src: "/assets/generated/logo-sensibull-transparent.dim_200x80.png",
      alt: "Sensibull",
    },
    {
      src: "/assets/generated/logo-finlearn-transparent.dim_200x80.png",
      alt: "Finlearn Academy",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      <TrainingModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ============================================================
          STICKY HEADER
          ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "oklch(0.99 0.002 250 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.88 0.04 265 / 0.3)",
          boxShadow: "0 1px 16px oklch(0.4 0.08 265 / 0.06)",
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <TrendingUp
                size={18}
                style={{ color: "oklch(0.99 0.002 250)" }}
              />
            </div>
            <span className="font-display font-black text-xl text-foreground">
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
                data-ocid="nav.about.link"
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
                data-ocid="nav.curriculum.link"
              >
                Curriculum
              </button>
              <button
                type="button"
                className="hover:text-gold transition-colors"
                onClick={() =>
                  document
                    .getElementById("start")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="nav.program.link"
              >
                Program
              </button>
            </nav>
            <button
              type="button"
              onClick={openModal}
              className="btn-gold rounded-lg px-5 py-2.5 text-sm font-display font-bold"
              data-ocid="header.primary_button"
            >
              Begin Training
            </button>
          </div>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden btn-gold rounded-lg px-4 py-2 text-sm font-display font-bold"
            data-ocid="header.mobile.primary_button"
          >
            Begin Training
          </button>
        </div>
      </header>

      <main>
        {/* ============================================================
            HERO SECTION — White background
            ============================================================ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
          {/* Subtle gold grid pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.72 0.17 65 / 0.07) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.17 65 / 0.07) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            {/* Soft gold radial glow top-right */}
            <div
              className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "oklch(0.72 0.17 65 / 0.06)" }}
            />
            {/* Soft blue glow bottom-left */}
            <div
              className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "oklch(0.55 0.22 245 / 0.05)" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 pt-24 pb-16 md:pt-28 md:pb-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* FREE INITIATIVE — Prominent hero badge */}
              <div className="fade-up mb-6">
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-display font-bold uppercase tracking-wider"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.17 65 / 0.18), oklch(0.55 0.22 245 / 0.12))",
                    border: "2px solid oklch(0.72 0.17 65 / 0.5)",
                    color: "oklch(0.45 0.16 60)",
                    boxShadow: "0 4px 20px oklch(0.72 0.17 65 / 0.15)",
                  }}
                >
                  <Award size={18} className="text-gold shrink-0" />
                  <span>
                    India's Free Signature Trading Education Initiative
                  </span>
                </div>
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
                className="fade-up delay-3 w-full max-w-3xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: "1px solid oklch(0.72 0.17 65 / 0.4)" }}
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

              {/* Video prompt */}
              <p className="fade-up delay-4 text-sm text-muted-foreground font-body mb-6 italic">
                Please watch this message fully to understand the purpose and
                structure of Master TraderX
              </p>

              {/* CTA */}
              <div className="fade-up delay-5">
                <CTAButton
                  size="lg"
                  onClick={openModal}
                  data-ocid="hero.primary_button"
                >
                  <Play size={20} />
                  Begin the Master TraderX Training
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            STATS BAR — Deep Blue
            ============================================================ */}
        <section ref={statsRef} className="py-16 relative bg-white">
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
            WHY MASTER TRADERX EXISTS — White background
            ============================================================ */}
        <section className="py-20 md:py-28 bg-background">
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
                  className={`rounded-2xl p-8 fade-up ${card.delay} group hover:border-gold/30 transition-all duration-300`}
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.97 0.008 260 / 0.9), oklch(0.94 0.015 255 / 0.7))",
                    border: "1px solid oklch(0.72 0.17 65 / 0.2)",
                    boxShadow: "0 4px 20px oklch(0.4 0.08 265 / 0.07)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "oklch(0.72 0.17 65 / 0.12)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p
                    className="font-body leading-relaxed"
                    style={{ color: "oklch(0.35 0.06 265)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="fade-up rounded-2xl p-8 text-center max-w-3xl mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.25 0.09 265), oklch(0.30 0.12 255))",
                border: "1px solid oklch(0.72 0.17 65 / 0.25)",
                boxShadow: "0 8px 32px oklch(0.22 0.09 265 / 0.15)",
              }}
            >
              <p className="text-white font-body text-lg leading-relaxed">
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
            ABOUT KIRTI AGRAWAL — Deep Blue
            ============================================================ */}
        <section
          id="about"
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 265), oklch(0.28 0.12 255))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="About Kirti Agrawal" light />

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
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: "white",
                        border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                        boxShadow: "0 2px 12px oklch(0.4 0.08 265 / 0.1)",
                      }}
                    >
                      <div className="text-gold flex items-center justify-center mb-2">
                        {item.icon}
                      </div>
                      <div className="text-xl font-display font-black gradient-text-gold">
                        {item.value}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.45 0.06 265)" }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured on — with logos */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "oklch(0.30 0.08 265 / 0.7)",
                    border: "1px solid oklch(0.40 0.10 265 / 0.5)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-widest font-body font-semibold mb-4"
                    style={{ color: "oklch(0.82 0.19 75)" }}
                  >
                    Featured on
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {featuredLogos.map((logo) => (
                      <CompanyLogo
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                      />
                    ))}
                  </div>
                </div>

                {/* Also worked with — with logos */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "oklch(0.30 0.08 265 / 0.7)",
                    border: "1px solid oklch(0.40 0.10 265 / 0.5)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-widest font-body font-semibold mb-4"
                    style={{ color: "oklch(0.82 0.19 75)" }}
                  >
                    Also worked with
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {workedWithLogos.map((logo) => (
                      <CompanyLogo
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                      />
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
                      background: "oklch(0.72 0.17 65 / 0.2)",
                      color: "oklch(0.82 0.19 75)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.4)",
                    }}
                  >
                    Full-Time Trader & Educator
                  </Badge>
                  <p className="text-white font-body text-lg leading-relaxed mb-4">
                    Kirti Agrawal is a full-time trader, trading educator, and
                    market mentor with over{" "}
                    <strong className="text-gold">
                      15 years of experience
                    </strong>{" "}
                    in Indian equity markets.
                  </p>
                  <p className="text-white/80 font-body leading-relaxed">
                    After struggling for nearly eight years and experiencing
                    losses of close to{" "}
                    <strong className="text-white">₹20 lakhs</strong>, Kirti
                    rebuilt her trading approach through discipline, psychology,
                    and structured systems.
                  </p>
                </div>

                <div className="section-divider" />

                <div className="space-y-4">
                  {aboutHighlights.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-start gap-4 p-4 rounded-xl"
                      style={{ background: "oklch(0.32 0.1 265 / 0.6)" }}
                    >
                      <div className="text-gold shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <p className="text-white font-body">{item.text}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="border-l-4 border-gold pl-6 py-2">
                  <p className="text-white font-serif italic text-lg leading-relaxed">
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
            WHAT YOU WILL LEARN — White background
            ============================================================ */}
        <section id="learn" className="py-20 md:py-28 bg-background">
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
                    className={`flex items-start gap-4 p-5 rounded-xl fade-up delay-${(i % 4) + 1}`}
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.97 0.008 260), oklch(0.94 0.015 255))",
                      border: "1px solid oklch(0.72 0.17 65 / 0.18)",
                      boxShadow: "0 2px 12px oklch(0.4 0.08 265 / 0.06)",
                    }}
                  >
                    <CheckCircle2
                      size={22}
                      className="text-gold shrink-0 mt-0.5"
                    />
                    <p
                      className="font-body leading-relaxed"
                      style={{ color: "oklch(0.2 0.06 265)" }}
                    >
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
            THREE PILLARS — Deep Blue
            ============================================================ */}
        <section
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 265), oklch(0.28 0.12 255))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="The Three Pillars of Master TraderX" light />

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
                  className={`rounded-2xl p-8 text-center fade-up ${pillar.delay} group transition-all duration-300`}
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.30 0.10 265 / 0.7), oklch(0.25 0.08 265 / 0.9))",
                    border: "1px solid oklch(0.72 0.17 65 / 0.25)",
                    boxShadow: "0 4px 24px oklch(0.15 0.06 265 / 0.3)",
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "oklch(0.72 0.17 65 / 0.15)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl gradient-text-gold mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-white/80 font-body leading-relaxed">
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
            PAT FRAMEWORK — White background
            ============================================================ */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="rounded-3xl p-10 md:p-14 relative overflow-hidden fade-up"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.97 0.008 260), oklch(0.95 0.015 255))",
                  border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                  boxShadow: "0 8px 40px oklch(0.72 0.17 65 / 0.08)",
                }}
              >
                {/* Decorative glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                  style={{ background: "oklch(0.72 0.17 65 / 0.06)" }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="px-4 py-1.5 rounded-full text-sm font-display font-bold"
                      style={{
                        background: "oklch(0.72 0.17 65 / 0.12)",
                        border: "1px solid oklch(0.72 0.17 65 / 0.35)",
                        color: "oklch(0.55 0.14 60)",
                      }}
                    >
                      Framework
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-display font-black gradient-text-gold mb-4">
                    The PAT Framework
                  </h2>

                  <p
                    className="font-body text-lg leading-relaxed mb-8"
                    style={{ color: "oklch(0.28 0.07 265)" }}
                  >
                    Inside Master TraderX, learners are introduced to the{" "}
                    <strong className="text-gold">PAT Framework</strong>, which
                    focuses on:
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 mb-8">
                    {patItems.map((item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 p-4 rounded-xl fade-up delay-${(i % 4) + 1}`}
                        style={{
                          background: "oklch(0.24 0.09 265 / 0.06)",
                          border: "1px solid oklch(0.72 0.17 65 / 0.12)",
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        <span
                          className="font-body"
                          style={{ color: "oklch(0.22 0.07 265)" }}
                        >
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
            PROGRAM STRUCTURE — Deep Blue (Module 1 FREE, 2-5 locked)
            ============================================================ */}
        <section
          id="start"
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 265), oklch(0.28 0.12 255))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="Program Structure" light />

            <div className="text-center mb-6 fade-up">
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                style={{
                  background: "oklch(0.30 0.08 265 / 0.8)",
                  border: "1px solid oklch(0.42 0.10 265 / 0.5)",
                }}
              >
                <span className="text-white/70 font-body text-sm">
                  ⏱ ~8 Hours Total
                </span>
                <span
                  className="w-px h-4"
                  style={{ background: "oklch(0.45 0.10 265)" }}
                />
                <span className="text-white/70 font-body text-sm">
                  🎓 Self-paced recorded learning
                </span>
              </div>
            </div>

            {/* Unlock banner */}
            <div
              className="max-w-3xl mx-auto mb-6 fade-up rounded-xl px-5 py-4 flex items-center gap-3"
              style={{
                background: "oklch(0.72 0.17 65 / 0.12)",
                border: "1px solid oklch(0.72 0.17 65 / 0.35)",
              }}
            >
              <Unlock size={18} className="text-gold shrink-0" />
              <p className="text-white/90 font-body text-sm">
                <strong className="text-gold">Module 1 is free.</strong> Open a
                FYERS account to unlock the remaining 4 modules instantly.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {modules.map((mod, i) => (
                <div
                  key={mod.num}
                  className={`rounded-xl p-5 md:p-6 flex items-center justify-between gap-4 fade-up delay-${i + 1}`}
                  style={{
                    background: mod.free
                      ? "linear-gradient(135deg, oklch(0.72 0.17 65 / 0.18), oklch(0.55 0.22 245 / 0.1))"
                      : "oklch(0.30 0.08 265 / 0.8)",
                    border: mod.free
                      ? "1px solid oklch(0.72 0.17 65 / 0.5)"
                      : "1px solid oklch(0.42 0.10 265 / 0.5)",
                    transition: "all 0.3s ease",
                  }}
                  data-ocid={`program.item.${i + 1}`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className="text-3xl font-display font-black shrink-0 w-10"
                      style={{
                        color: mod.free
                          ? "oklch(0.82 0.19 75)"
                          : "oklch(0.72 0.17 65 / 0.6)",
                      }}
                    >
                      {mod.num}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className="font-display font-bold"
                          style={{
                            color: mod.free ? "white" : "oklch(0.85 0.04 265)",
                          }}
                        >
                          {mod.title}
                        </h3>
                      </div>
                      {mod.free ? (
                        <span
                          className="text-xs font-display font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.72 0.17 65 / 0.25)",
                            color: "oklch(0.82 0.19 75)",
                            border: "1px solid oklch(0.72 0.17 65 / 0.4)",
                          }}
                        >
                          FREE
                        </span>
                      ) : (
                        <span
                          className="text-xs font-body flex items-center gap-1"
                          style={{ color: "oklch(0.65 0.05 265)" }}
                        >
                          <Lock size={10} /> Unlock by opening FYERS account
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-gold-outline rounded-lg px-4 py-2 text-sm font-display font-semibold shrink-0 whitespace-nowrap flex items-center gap-1.5"
                    style={
                      mod.free
                        ? {
                            background: "oklch(0.72 0.17 65)",
                            color: "white",
                            border: "none",
                          }
                        : {
                            color: "oklch(0.82 0.19 75)",
                            borderColor: "oklch(0.72 0.17 65 / 0.6)",
                          }
                    }
                    data-ocid={`program.button.${i + 1}`}
                  >
                    {mod.free ? (
                      <>
                        <Play size={13} /> Start Free
                      </>
                    ) : (
                      <>
                        Unlock <Lock size={12} />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom CTA after modules */}
            <div className="max-w-3xl mx-auto mt-8 fade-up">
              <div
                className="rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
                style={{
                  background: "oklch(0.30 0.08 265 / 0.8)",
                  border: "1px solid oklch(0.45 0.12 265 / 0.4)",
                }}
              >
                <p className="text-white/80 font-body text-sm text-center sm:text-left">
                  Open a free FYERS account to get instant access to all 5
                  modules.
                </p>
                <CTAButton onClick={openModal} size="sm">
                  <Unlock size={14} />
                  Unlock All Modules
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FOR / NOT FOR — White background
            ============================================================ */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader title="Is This Initiative For You?" />

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* FOR */}
              <div
                className="rounded-2xl p-8 fade-up delay-1"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.97 0.01 255), oklch(0.94 0.018 250))",
                  border: "1px solid oklch(0.55 0.22 245 / 0.3)",
                  boxShadow: "0 4px 20px oklch(0.55 0.22 245 / 0.07)",
                }}
              >
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.55 0.22 245 / 0.15)" }}
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
                      className="flex items-center gap-3 font-body"
                      style={{ color: "oklch(0.2 0.06 265)" }}
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
                className="rounded-2xl p-8 fade-up delay-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.97 0.005 30), oklch(0.94 0.012 25))",
                  border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                  boxShadow: "0 4px 20px oklch(0.55 0.22 25 / 0.07)",
                }}
              >
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.55 0.22 25 / 0.15)" }}
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
                      className="flex items-center gap-3 font-body"
                      style={{ color: "oklch(0.2 0.06 265)" }}
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
            TESTIMONIALS — Deep Blue
            ============================================================ */}
        <section
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 265), oklch(0.28 0.12 255))",
          }}
        >
          <div className="container mx-auto px-4">
            <SectionHeader
              title="What Traders Say"
              subtitle="About the Master TraderX Approach"
              light
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`rounded-2xl p-6 fade-up delay-${(i % 4) + 1}`}
                  style={{
                    background: "oklch(0.28 0.08 265 / 0.9)",
                    border: "1px solid oklch(0.40 0.10 265 / 0.5)",
                    transition: "all 0.3s ease",
                  }}
                  data-ocid={`testimonials.item.${i + 1}`}
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
                  <p className="text-white font-body leading-relaxed mb-5 text-sm italic">
                    "{t.quote}"
                  </p>
                  {/* Name */}
                  <div
                    className="flex items-center gap-3 pt-4"
                    style={{
                      borderTop: "1px solid oklch(0.42 0.08 265 / 0.4)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold"
                      style={{
                        background: "oklch(0.72 0.17 65 / 0.8)",
                        color: "oklch(0.15 0.04 265)",
                      }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-white">
                        {t.name}
                      </p>
                      <p
                        className="text-xs font-body"
                        style={{ color: "oklch(0.75 0.05 265)" }}
                      >
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
            FINAL CTA — Deep Blue with gold glow
            ============================================================ */}
        <section
          className="py-24 md:py-36 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.07 265), oklch(0.25 0.10 265), oklch(0.18 0.07 265))",
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-96 h-96 rounded-full blur-3xl"
              style={{ background: "oklch(0.72 0.17 65 / 0.12)" }}
            />
          </div>
          {/* Yellow accent strip top */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.72 0.17 65), oklch(0.88 0.18 88), oklch(0.72 0.17 65))",
            }}
          />
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
                  background: "oklch(0.72 0.17 65 / 0.2)",
                  border: "1px solid oklch(0.72 0.17 65 / 0.4)",
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
              <p className="text-white font-body text-xl mb-10 leading-relaxed">
                Join thousands of Indian traders learning the right way.
              </p>
              <CTAButton
                size="lg"
                onClick={openModal}
                className="animate-pulse-gold"
                data-ocid="cta.primary_button"
              >
                <Play size={22} />
                Begin the Master TraderX Training
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          FOOTER — Dark Navy
          ============================================================ */}
      <footer
        className="py-12 relative"
        style={{
          background: "oklch(0.14 0.06 265)",
          borderTop: "1px solid oklch(0.28 0.08 265 / 0.6)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Logo */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 cursor-pointer"
              data-ocid="footer.link"
            >
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <TrendingUp
                  size={18}
                  style={{ color: "oklch(0.15 0.04 265)" }}
                />
              </div>
              <span className="font-display font-black text-xl text-white">
                Master<span className="text-gold">TraderX</span>
              </span>
            </button>

            {/* Disclaimer */}
            <p
              className="font-body text-sm max-w-2xl leading-relaxed"
              style={{ color: "oklch(0.65 0.04 265)" }}
            >
              Master TraderX is a free educational initiative. All content is
              for learning purposes only. This is not financial advice. Trading
              in financial markets involves risk.
            </p>

            <div className="section-divider w-full" />

            {/* Copyright */}
            <div
              className="flex flex-col sm:flex-row items-center gap-2 text-xs font-body"
              style={{ color: "oklch(0.60 0.04 265)" }}
            >
              <span>
                © {new Date().getFullYear()} Master TraderX by Kirti Agrawal.
                All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919827140374"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37, 211, 102, 0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform =
            "scale(1.12)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 8px 24px rgba(37, 211, 102, 0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 4px 16px rgba(37, 211, 102, 0.45)";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="30"
          height="30"
          role="img"
          aria-label="WhatsApp"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
