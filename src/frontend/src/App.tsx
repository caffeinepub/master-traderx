import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  TrendingUp,
  Unlock,
  Users,
  X,
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
   Training Modal (FYERS account signup)
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
            FREE MasterTraderX Trading Program
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
   Video Modal (Free Lesson — YouTube embed)
   ================================================================ */
function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl w-full p-4 md:p-6"
        style={{
          background: "oklch(0.12 0.05 265)",
          border: "1px solid oklch(0.72 0.17 65 / 0.35)",
        }}
        data-ocid="video.modal"
      >
        <DialogHeader className="flex flex-row items-center justify-between pb-3">
          <DialogTitle className="font-display text-lg gradient-text-gold">
            Module 1: The 8 Powerful Price Action Setups That Work in Any Market
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-white/10"
            data-ocid="video.close_button"
            aria-label="Close video"
          >
            <X size={18} className="text-white/70" />
          </button>
        </DialogHeader>
        {/* 16:9 responsive embed */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/fj_JGrRMIcQ?autoplay=1"
            title="FREE MasterTraderX Trading Program — Free Lesson"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
  const openVideoModal = () => setVideoModalOpen(true);

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
        "I had watched hundreds of YouTube videos but never understood market structure properly. FREE MasterTraderX Trading Program filled that gap completely.",
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

  const learnItems = [
    "How professional traders understand market structure",
    "How to read price objectively using price action",
    "Risk management before focusing on profits",
    "Emotional discipline in trading",
    "Why most traders lose money",
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
      title: "Module 1",
      subtitle: "The 8 Powerful Price Action Setups — Free 2-Hour Masterclass",
      free: true,
    },
    {
      num: "02",
      title: "Module 2",
      subtitle: "🔒 Market Structure & Price Reading",
      free: false,
    },
    {
      num: "03",
      title: "Module 3",
      subtitle: "🔒 Risk Management & Trade Planning",
      free: false,
    },
    {
      num: "04",
      title: "Module 4",
      subtitle: "🔒 Price Action Setups & PAT Framework",
      free: false,
    },
    {
      num: "05",
      title: "Module 5",
      subtitle: "🔒 Discipline & Trader Maturity",
      free: false,
    },
  ];

  // All logos unified under "Featured On"
  const allLogos = [
    { src: "/assets/uploads/tmp_b_5kfr2-1.webp", alt: "TV18" },
    { src: "/assets/uploads/tmp2ulld9by-2.jpg", alt: "ET Now" },
    { src: "/assets/uploads/tmptlyrodkx-3.webp", alt: "Zee Business" },
    { src: "/assets/uploads/tmpgmo8bqjn-4.webp", alt: "CNBC" },
    { src: "/assets/uploads/tmpifdwu8ls-2.webp", alt: "FYERS" },
    { src: "/assets/uploads/tmplxgtszf3-3.webp", alt: "eLearnMarkets" },
    {
      src: "/assets/uploads/8a2eb7ff-7b5d-4f63-a1a7-3e75c96cb945-1.png",
      alt: "Angel One",
    },
    {
      src: "/assets/uploads/d335b274-fe68-4158-bcfd-275d47bd3ff9-2.png",
      alt: "Moneycontrol",
    },
    { src: "/assets/uploads/download-11--3.png", alt: "Alice Blue" },
  ];

  const howItWorksSteps = [
    { num: 1, title: "Watch the Free Lesson", icon: <Play size={24} /> },
    {
      num: 2,
      title: "Open your FREE FYERS Trading Account",
      icon: <Unlock size={24} />,
    },
    {
      num: 3,
      title: "Unlock the MasterTraderX Inner Circle",
      icon: <Users size={24} />,
    },
    {
      num: 4,
      title: "Access all 5 modules instantly",
      icon: <BookOpen size={24} />,
    },
  ];

  const fyersbenefits = [
    "Access to MasterTraderX Inner Circle Training",
    "Complete 8-Hour Trading Program",
    "Learn the PAT Framework",
    "Structured Risk Management Training",
    "Professional trading platform",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      <TrainingModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <VideoModal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* ============================================================
          TOP ANNOUNCEMENT BANNER
          ============================================================ */}
      <div
        className="w-full text-center py-2 px-4 text-xs md:text-sm font-body font-semibold tracking-wide"
        style={{
          background: "oklch(0.18 0.09 265)",
          color: "oklch(0.82 0.19 75)",
          borderBottom: "1px solid oklch(0.72 0.17 65 / 0.25)",
          position: "relative",
          zIndex: 60,
        }}
        data-ocid="banner.section"
      >
        🚀 Mission: Train 1 Lakh Disciplined Traders in India by 2026
      </div>

      {/* ============================================================
          STICKY HEADER
          ============================================================ */}
      <header
        className="sticky top-0 left-0 right-0 z-50"
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
              onClick={openVideoModal}
              className="btn-gold rounded-lg px-5 py-2.5 text-sm font-display font-bold"
              data-ocid="header.primary_button"
            >
              Start Free Lesson
            </button>
          </div>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={openVideoModal}
            className="md:hidden btn-gold rounded-lg px-4 py-2 text-sm font-display font-bold"
            data-ocid="header.mobile.primary_button"
          >
            Start Free Lesson
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
            <div
              className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "oklch(0.72 0.17 65 / 0.06)" }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "oklch(0.55 0.22 245 / 0.05)" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 pt-16 pb-16 md:pt-20 md:pb-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Headline */}
              <div className="fade-up mb-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black gradient-text-hero leading-tight tracking-tight">
                  FREE MasterTraderX
                  <br />
                  <span className="font-serif italic">Trading Program</span>
                </h1>
              </div>

              {/* Subheadline */}
              <p className="fade-up delay-1 text-lg md:text-xl text-foreground/80 font-body max-w-2xl mx-auto mb-6 leading-relaxed">
                Learn how professional traders understand markets using price
                action, risk management, and discipline.{" "}
                <strong className="text-gold font-semibold">
                  Start with the first lesson completely FREE.
                </strong>
              </p>

              {/* Trust Indicators */}
              <div className="fade-up delay-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                  style={{
                    background: "oklch(0.97 0.04 245)",
                    border: "1.5px solid oklch(0.65 0.15 245 / 0.35)",
                  }}
                >
                  <Award
                    size={18}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.55 0.20 245)" }}
                  />
                  <span
                    className="text-sm font-body font-bold"
                    style={{ color: "oklch(0.28 0.14 245)" }}
                  >
                    15+ Years Trading Experience
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                  style={{
                    background: "oklch(0.97 0.06 65)",
                    border: "1.5px solid oklch(0.72 0.17 65 / 0.45)",
                  }}
                >
                  <TrendingUp
                    size={18}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.58 0.20 65)" }}
                  />
                  <span
                    className="text-sm font-body font-bold"
                    style={{ color: "oklch(0.35 0.15 65)" }}
                  >
                    ₹5 Cr Trading Profits
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                  style={{
                    background: "oklch(0.97 0.04 145)",
                    border: "1.5px solid oklch(0.60 0.18 145 / 0.35)",
                  }}
                >
                  <Users
                    size={18}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.45 0.18 145)" }}
                  />
                  <span
                    className="text-sm font-body font-bold"
                    style={{ color: "oklch(0.28 0.14 145)" }}
                  >
                    Mission: Train 1 Lakh Traders by 2026
                  </span>
                </div>
              </div>

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
                    src="https://www.youtube.com/embed/fj_JGrRMIcQ"
                    title="FREE MasterTraderX Trading Program Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="fade-up delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  type="button"
                  onClick={openVideoModal}
                  className="btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 px-8 py-4 text-base"
                  data-ocid="hero.primary_button"
                >
                  <Play size={18} />▶ Start Free Lesson
                </button>
                <a
                  href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg font-display font-bold inline-flex items-center gap-2 px-8 py-4 text-base transition-all duration-200 hover:bg-opacity-10"
                  style={{
                    border: "2px solid oklch(0.45 0.18 245)",
                    color: "oklch(0.35 0.18 245)",
                    background: "oklch(0.45 0.18 245 / 0.06)",
                  }}
                  data-ocid="hero.secondary_button"
                >
                  Open FREE FYERS Account &amp; Unlock Full Program
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            STATS BAR — White background
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
            FREE LESSON SECTION — White background (NEW)
            ============================================================ */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader title="Start Learning Instantly — Free First Lesson" />
            <div className="max-w-2xl mx-auto">
              <div
                className="rounded-3xl p-8 md:p-12 fade-up"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.97 0.008 260), oklch(0.94 0.015 255))",
                  border: "2px solid oklch(0.72 0.17 65 / 0.4)",
                  boxShadow: "0 8px 40px oklch(0.72 0.17 65 / 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-4 py-1.5 rounded-full text-sm font-display font-bold"
                    style={{
                      background: "oklch(0.72 0.17 65)",
                      color: "white",
                    }}
                  >
                    FREE
                  </div>
                  <div
                    className="px-4 py-1.5 rounded-full text-sm font-display font-bold"
                    style={{
                      background: "oklch(0.55 0.22 245 / 0.12)",
                      border: "1px solid oklch(0.55 0.22 245 / 0.3)",
                      color: "oklch(0.35 0.18 245)",
                    }}
                  >
                    Module 1
                  </div>
                </div>

                <h3
                  className="text-2xl md:text-3xl font-display font-black mb-3"
                  style={{ color: "oklch(0.2 0.07 265)" }}
                >
                  The 8 Powerful Price Action Setups That Work in Any Market
                </h3>

                <p
                  className="font-body text-sm mb-4"
                  style={{ color: "oklch(0.35 0.06 265)" }}
                >
                  Discover the 8 core Price Action setups that professional
                  traders use to identify high-probability opportunities —
                  designed to work in all market conditions, whether the market
                  is trending, consolidating, or volatile.
                </p>

                <p
                  className="font-body text-base mb-5 font-semibold"
                  style={{ color: "oklch(0.3 0.06 265)" }}
                >
                  In This 2-Hour Free Lesson, You Will Learn:
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "The 8 high-probability Price Action setups that work across all market conditions",
                    "How to use these setups for Intraday, Swing, and Positional trading",
                    "The exact market conditions where these setups work best",
                    "The psychology behind each setup so you understand why price moves",
                    "Real market chart examples showing how these setups played out",
                    "How to start spotting high-probability trades with confidence",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body"
                      style={{ color: "oklch(0.25 0.06 265)" }}
                    >
                      <CheckCircle2
                        size={20}
                        className="text-gold shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl p-4 mb-6"
                  style={{
                    background: "oklch(0.55 0.22 245 / 0.06)",
                    border: "1px solid oklch(0.55 0.22 245 / 0.2)",
                  }}
                >
                  <p
                    className="font-display font-bold text-sm mb-2"
                    style={{ color: "oklch(0.35 0.12 245)" }}
                  >
                    🎥 For the best learning experience:
                  </p>
                  <ul className="space-y-1">
                    {[
                      "Watch the video at 1.5× speed",
                      "Take notes while observing the live chart examples",
                      "Focus on understanding the logic behind each setup",
                    ].map((tip) => (
                      <li
                        key={tip}
                        className="font-body text-sm"
                        style={{ color: "oklch(0.4 0.08 265)" }}
                      >
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={openVideoModal}
                  className="btn-gold rounded-xl font-display font-bold inline-flex items-center gap-2 px-8 py-4 text-base w-full justify-center"
                  data-ocid="free_lesson.primary_button"
                >
                  <Play size={18} />▶ Start Free Lesson
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TRADER PROBLEM SECTION — Light blue background (NEW)
            ============================================================ */}
        <section
          className="py-20 md:py-28"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.025 245), oklch(0.92 0.030 250))",
          }}
          data-ocid="problems.section"
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="Why Most Traders Struggle" />

            <div className="max-w-2xl mx-auto">
              <p
                className="fade-up text-lg font-body text-center mb-8"
                style={{ color: "oklch(0.3 0.06 265)" }}
              >
                Most traders start with excitement but quickly face confusion.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Random strategies from YouTube",
                  "Emotional trading decisions",
                  "Poor risk management",
                  "Overtrading after losses",
                  "Following tips without understanding",
                ].map((problem, i) => (
                  <div
                    key={problem}
                    className={`flex items-center gap-4 p-5 rounded-xl fade-up delay-${i + 1}`}
                    style={{
                      background: "oklch(0.99 0.002 250 / 0.9)",
                      border: "1px solid oklch(0.70 0.22 25 / 0.25)",
                      boxShadow: "0 2px 12px oklch(0.4 0.08 265 / 0.06)",
                    }}
                  >
                    <XCircle
                      size={22}
                      style={{ color: "oklch(0.65 0.22 25)" }}
                      className="shrink-0"
                    />
                    <span
                      className="font-body"
                      style={{ color: "oklch(0.25 0.06 265)" }}
                    >
                      {problem}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="fade-up rounded-2xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.08 265), oklch(0.28 0.12 255))",
                  border: "1px solid oklch(0.72 0.17 65 / 0.3)",
                }}
              >
                <p className="text-white font-display font-bold text-xl">
                  MasterTraderX was designed to solve these exact problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ABOUT KIRTI AGRAWAL — From Losses to Consistency (MOVED UP)
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
            <SectionHeader title="From Losses to Consistency" light />

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
                    Full-Time Trader &amp; Educator
                  </Badge>

                  <p className="text-white font-body text-lg leading-relaxed mb-4">
                    Kirti Agrawal began trading at{" "}
                    <strong className="text-gold">19 years old.</strong>
                  </p>
                  <p className="text-white/80 font-body leading-relaxed mb-4">
                    After early success, she lost nearly{" "}
                    <strong className="text-white">₹20 lakhs</strong> over
                    several years.
                  </p>
                  <p className="text-white/80 font-body leading-relaxed mb-4">
                    Instead of quitting, she spent years studying:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "trading psychology",
                      "price behavior",
                      "structured trading systems",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-white/80 font-body"
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: "oklch(0.82 0.19 75)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/80 font-body leading-relaxed mb-4">
                    This journey led to the development of the{" "}
                    <strong className="text-gold">PAT Framework.</strong>
                  </p>
                  <p className="text-white font-body leading-relaxed">
                    Today she is a full-time trader and mentor with{" "}
                    <strong className="text-gold">
                      15+ years market experience.
                    </strong>
                  </p>
                </div>

                <div className="section-divider" />

                <blockquote className="border-l-4 border-gold pl-6 py-2">
                  <p className="text-white font-serif italic text-lg leading-relaxed">
                    "FREE MasterTraderX Trading Program represents the
                    distillation of her real-market experience into a structured
                    learning initiative."
                  </p>
                </blockquote>

                {/* Social Media Icons */}
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://www.linkedin.com/in/kirtiagrawaltrading/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="about.linkedin.link"
                    className="flex items-center justify-center w-11 h-11 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: "oklch(0.45 0.15 240)",
                      color: "white",
                    }}
                  >
                    <svg
                      role="img"
                      aria-label="LinkedIn"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@kirtiagrawaltrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="about.youtube.link"
                    className="flex items-center justify-center w-11 h-11 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: "oklch(0.45 0.22 25)",
                      color: "white",
                    }}
                  >
                    <svg
                      role="img"
                      aria-label="YouTube"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.7A12.94 12.94 0 0 0 12 3.5a12.94 12.94 0 0 0-3.82.49 4.83 4.83 0 0 1-3.77 2.7C3.18 7.07 2 9.18 2 12s1.18 4.93 2.41 5.31a4.83 4.83 0 0 1 3.77 2.7A12.94 12.94 0 0 0 12 20.5a12.94 12.94 0 0 0 3.82-.49 4.83 4.83 0 0 1 3.77-2.7C20.82 16.93 22 14.82 22 12s-1.18-4.93-2.41-5.31zM10 15.5v-7l6 3.5z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/kirtiagrawaltrading/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="about.instagram.link"
                    className="flex items-center justify-center w-11 h-11 rounded-full transition-transform hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.22 30), oklch(0.45 0.22 330))",
                      color: "white",
                    }}
                  >
                    <svg
                      role="img"
                      aria-label="Instagram"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/KirtiAgrawalTrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="about.telegram.link"
                    className="flex items-center justify-center w-11 h-11 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: "oklch(0.55 0.18 220)",
                      color: "white",
                    }}
                  >
                    <svg
                      role="img"
                      aria-label="Telegram"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FEATURED ON — Unified logos section
            ============================================================ */}
        <section
          className="py-16 md:py-20 bg-background"
          data-ocid="featured.section"
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="Featured On" />
            <div className="flex flex-wrap gap-4 justify-center items-center max-w-5xl mx-auto fade-up">
              {allLogos.map((logo) => (
                <CompanyLogo key={logo.alt} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            WHAT YOU WILL LEARN — White background
            ============================================================ */}
        <section id="learn" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="What You Will Learn"
              subtitle="Inside MasterTraderX you will learn:"
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
                <button
                  type="button"
                  onClick={openVideoModal}
                  className="btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 px-7 py-3.5 text-base"
                  data-ocid="learn.primary_button"
                >
                  <ChevronRight size={18} />▶ Start Free Lesson
                </button>
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
            <SectionHeader title="The Three Pillars of MasterTraderX" light />

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {[
                {
                  icon: <Brain size={36} className="text-gold-bright" />,
                  num: "1️⃣",
                  title: "Trading Psychology",
                  desc: "Discipline, patience, emotional control",
                  delay: "delay-1",
                },
                {
                  icon: <Shield size={36} className="text-gold-bright" />,
                  num: "2️⃣",
                  title: "Risk Management",
                  desc: "Capital protection and position sizing",
                  delay: "delay-2",
                },
                {
                  icon: <BarChart2 size={36} className="text-gold-bright" />,
                  num: "3️⃣",
                  title: "Structured Trading System",
                  desc: "Logical framework to understand price behavior",
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
              <button
                type="button"
                onClick={openVideoModal}
                className="btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 px-7 py-3.5 text-base"
                data-ocid="pillars.primary_button"
              >
                <ArrowRight size={18} />▶ Start Free Lesson
              </button>
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
                    Inside FREE MasterTraderX Trading Program, learners are
                    introduced to the{" "}
                    <strong className="text-gold">PAT Framework</strong>, which
                    focuses on:
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 mb-6">
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

                  {/* Educational note */}
                  <div
                    className="fade-up rounded-xl p-4 mb-8 flex items-start gap-3"
                    style={{
                      background: "oklch(0.72 0.17 65 / 0.08)",
                      border: "1px solid oklch(0.72 0.17 65 / 0.2)",
                    }}
                  >
                    <span className="text-gold text-lg shrink-0">📌</span>
                    <p
                      className="font-body text-sm italic"
                      style={{ color: "oklch(0.35 0.07 265)" }}
                    >
                      This framework is taught for educational understanding
                      only.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openVideoModal}
                    className="btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 px-7 py-3.5 text-base"
                    data-ocid="pat.primary_button"
                  >
                    <ChevronRight size={18} />▶ Start Free Lesson
                  </button>
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
                      <h3
                        className="font-display font-bold mb-1"
                        style={{
                          color: mod.free ? "white" : "oklch(0.85 0.04 265)",
                        }}
                      >
                        {mod.title}
                      </h3>
                      <p
                        className="text-sm font-body"
                        style={{
                          color: mod.free
                            ? "oklch(0.82 0.19 75)"
                            : "oklch(0.65 0.05 265)",
                        }}
                      >
                        {mod.subtitle}
                      </p>
                      {mod.free && (
                        <span
                          className="text-xs font-display font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                          style={{
                            background: "oklch(0.72 0.17 65 / 0.25)",
                            color: "oklch(0.82 0.19 75)",
                            border: "1px solid oklch(0.72 0.17 65 / 0.4)",
                          }}
                        >
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={mod.free ? openVideoModal : openModal}
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

            {/* Bottom message after modules */}
            <div className="max-w-3xl mx-auto mt-8 fade-up">
              <div
                className="rounded-xl px-6 py-5 text-center"
                style={{
                  background: "oklch(0.72 0.17 65 / 0.12)",
                  border: "1px solid oklch(0.72 0.17 65 / 0.35)",
                }}
              >
                <p className="text-white font-body text-sm">
                  To unlock Modules 2–5, open a{" "}
                  <strong className="text-gold">
                    FREE FYERS Trading &amp; Demat Account.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            HOW MASTERTRADERX WORKS — White background (NEW)
            ============================================================ */}
        <section
          className="py-20 md:py-28 bg-background"
          data-ocid="how_it_works.section"
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="How MasterTraderX Works" />

            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorksSteps.map((step, i) => (
                  <div key={step.num} className="relative">
                    <div
                      className={`rounded-2xl p-6 text-center fade-up delay-${i + 1} h-full`}
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.97 0.008 260), oklch(0.94 0.015 255))",
                        border: "1px solid oklch(0.72 0.17 65 / 0.2)",
                        boxShadow: "0 4px 20px oklch(0.4 0.08 265 / 0.06)",
                      }}
                    >
                      {/* Step number circle */}
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-display font-black text-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.25 0.09 265), oklch(0.32 0.12 255))",
                          border: "2px solid oklch(0.72 0.17 65 / 0.4)",
                        }}
                      >
                        {step.num}
                      </div>
                      {/* Icon */}
                      <div className="text-gold flex justify-center mb-3">
                        {step.icon}
                      </div>
                      <p
                        className="font-body font-semibold text-sm leading-relaxed"
                        style={{ color: "oklch(0.22 0.07 265)" }}
                      >
                        {step.title}
                      </p>
                    </div>
                    {/* Arrow connector */}
                    {i < howItWorksSteps.length - 1 && (
                      <div
                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full"
                        style={{
                          background: "oklch(0.72 0.17 65)",
                          color: "white",
                        }}
                      >
                        <ChevronRight size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ACCOUNT OPENING BENEFITS — Deep Blue (NEW)
            ============================================================ */}
        <section
          className="py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 265), oklch(0.28 0.12 255))",
          }}
          data-ocid="fyers_benefits.section"
        >
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Why Open a FREE FYERS Account Through MasterTraderX"
              light
            />

            <div className="max-w-2xl mx-auto">
              <div className="space-y-4 mb-8">
                {fyersbenefits.map((benefit, i) => (
                  <div
                    key={benefit}
                    className={`flex items-center gap-4 p-5 rounded-xl fade-up delay-${i + 1}`}
                    style={{
                      background: "oklch(0.30 0.08 265 / 0.8)",
                      border: "1px solid oklch(0.42 0.10 265 / 0.5)",
                    }}
                  >
                    <CheckCircle2 size={22} className="text-gold shrink-0" />
                    <span className="text-white font-body">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="fade-up text-center">
                <p
                  className="font-body text-sm mb-6"
                  style={{ color: "oklch(0.75 0.05 265)" }}
                >
                  Opening your account takes less than 5 minutes using Aadhaar
                  OTP.
                </p>
                <a
                  href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold rounded-xl font-display font-bold inline-flex items-center gap-2 px-10 py-5 text-lg"
                  data-ocid="fyers_benefits.primary_button"
                >
                  <Unlock size={20} />
                  Open FREE FYERS Account
                </a>
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
              subtitle="About the FREE MasterTraderX Trading Program"
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
              <button
                type="button"
                onClick={openVideoModal}
                className="btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 px-10 py-5 text-lg"
                data-ocid="testimonials.primary_button"
              >
                <Play size={20} />
                Begin Your Learning Journey
              </button>
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
          {/* Gold accent strip top */}
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
              <p className="text-white font-body text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                Start your journey with the free MasterTraderX lesson today.
                Unlock the full program by opening your FREE FYERS trading
                account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  type="button"
                  onClick={openVideoModal}
                  className="btn-gold rounded-lg font-display font-bold inline-flex items-center gap-2 px-10 py-5 text-lg animate-pulse-gold"
                  data-ocid="cta.primary_button"
                >
                  <Play size={22} />▶ Start Free Lesson
                </button>
                <a
                  href="https://signup.fyers.in/?utm_source=AP-Leads&utm_medium=AP0218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg font-display font-bold inline-flex items-center gap-2 px-10 py-5 text-lg transition-all duration-200"
                  style={{
                    border: "2px solid oklch(0.72 0.17 65 / 0.7)",
                    color: "oklch(0.82 0.19 75)",
                    background: "oklch(0.72 0.17 65 / 0.1)",
                  }}
                  data-ocid="cta.secondary_button"
                >
                  Open FYERS Account
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
          FAQ SECTION
          ============================================================ */}
        <section
          className="py-24 relative overflow-hidden"
          style={{ background: "oklch(0.97 0.01 260)" }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, oklch(0.45 0.18 265 / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.72 0.17 65 / 0.06) 0%, transparent 50%)",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-14 fade-up">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6"
                style={{
                  background: "oklch(0.45 0.18 265 / 0.08)",
                  border: "1px solid oklch(0.45 0.18 265 / 0.18)",
                  color: "oklch(0.38 0.15 265)",
                }}
              >
                <BookOpen size={14} />
                Got Questions
              </div>
              <h2
                className="text-4xl md:text-5xl font-display font-black mb-4 leading-tight"
                style={{ color: "oklch(0.22 0.08 265)" }}
              >
                Frequently Asked{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.2 265), oklch(0.72 0.17 65))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Questions
                </span>
              </h2>
              <p
                className="text-lg font-body max-w-xl mx-auto"
                style={{ color: "oklch(0.45 0.06 265)" }}
              >
                Everything you need to know about the MasterTraderX program.
              </p>
            </div>
            <div className="max-w-3xl mx-auto fade-up">
              <Accordion
                type="single"
                collapsible
                className="space-y-3"
                data-ocid="faq.panel"
              >
                {[
                  {
                    q: "Is this program promising profits or guaranteed returns?",
                    a: (
                      <>
                        <p className="mb-3">
                          No. MasterTraderX does not promise profits or
                          guaranteed returns. Trading always involves risk. The
                          purpose of this program is to help traders develop:
                        </p>
                        <ul className="space-y-1 mb-3 ml-1">
                          {[
                            "Learning a winning trading system",
                            "Risk management discipline",
                            "Structured decision making",
                            "Emotional control while trading",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span style={{ color: "oklch(0.72 0.17 65)" }}>
                                ▸
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p>
                          The goal is to build a strong trading foundation, not
                          unrealistic expectations.
                        </p>
                      </>
                    ),
                  },
                  {
                    q: "Is the MasterTraderX program really free?",
                    a: "Yes. Module 1 is completely free, and you can start learning immediately. To unlock Modules 2–5 and the full 8-hour program, you simply need to open a FREE FYERS Trading & Demat account through our link.",
                  },
                  {
                    q: "What exactly will I learn in the MasterTraderX program?",
                    a: (
                      <>
                        <p className="mb-3">
                          Inside the program you will learn:
                        </p>
                        <ul className="space-y-1 mb-3 ml-1">
                          {[
                            "How professional traders understand market structure",
                            "The PAT Framework for logical price action analysis",
                            "8 powerful price action setups",
                            "Risk management and capital protection",
                            "Trading psychology and discipline",
                            "CPR and moving averages for market context",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span style={{ color: "oklch(0.72 0.17 65)" }}>
                                ▸
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p>
                          The focus is on understanding markets logically
                          instead of guessing trades.
                        </p>
                      </>
                    ),
                  },
                  {
                    q: "What is the MasterTraderX Inner Circle?",
                    a: (
                      <>
                        <p className="mb-3">
                          The MasterTraderX Inner Circle is a dedicated learning
                          environment for traders who unlock the full program.
                          Inside the Inner Circle, members get access to:
                        </p>
                        <ul className="space-y-1 mb-3 ml-1">
                          {[
                            "Live market observations and educational market updates",
                            "Discussion around price action and market structure",
                            "Learning-based trade case studies for educational purposes",
                            "Insights on how professional traders analyze market movements",
                            "Ongoing learning focused on discipline, risk awareness, and structured thinking",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span style={{ color: "oklch(0.72 0.17 65)" }}>
                                ▸
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="mb-2">
                          The Inner Circle is designed to help traders
                          continuously improve their market understanding in a
                          structured environment.
                        </p>
                        <p
                          className="text-sm px-3 py-2 rounded-lg"
                          style={{
                            background: "oklch(0.72 0.17 65 / 0.12)",
                            color: "oklch(0.45 0.1 65)",
                          }}
                        >
                          📌 All discussions are for educational purposes only
                          and should not be considered financial or investment
                          advice.
                        </p>
                      </>
                    ),
                  },
                  {
                    q: "Do I need trading experience to join this program?",
                    a: "No. MasterTraderX is designed for both beginners and existing traders. You will learn the fundamental principles of price action, market structure, and risk management that apply to traders at all levels.",
                  },
                  {
                    q: "Why do I need to open a FYERS account to unlock the full program?",
                    a: (
                      <>
                        <p className="mb-3">
                          MasterTraderX is an educational initiative supported
                          by FYERS. Opening a free FYERS Trading & Demat account
                          allows you to unlock:
                        </p>
                        <ul className="space-y-1 mb-3 ml-1">
                          {[
                            "The complete MasterTraderX training program",
                            "Access to the MasterTraderX Inner Circle",
                            "Structured trading education resources",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span style={{ color: "oklch(0.72 0.17 65)" }}>
                                ▸
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p>
                          The account opening process takes less than 5 minutes
                          using Aadhaar OTP.
                        </p>
                      </>
                    ),
                  },
                  {
                    q: "Can these concepts be used for intraday or swing trading?",
                    a: (
                      <>
                        <p className="mb-3">
                          Yes. The concepts taught in MasterTraderX can be
                          applied to:
                        </p>
                        <ul className="space-y-1 mb-3 ml-1">
                          {[
                            "Intraday trading",
                            "Swing trading",
                            "Positional trading",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span style={{ color: "oklch(0.72 0.17 65)" }}>
                                ▸
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p>
                          Because they are based on price behavior and market
                          structure, not temporary strategies.
                        </p>
                      </>
                    ),
                  },
                  {
                    q: "How quickly can I start learning?",
                    a: "Immediately. You can start Module 1 right now for free. After opening your FYERS account, the remaining modules unlock instantly, allowing you to complete the full program at your own pace.",
                  },
                ].map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className="rounded-xl overflow-hidden border-0"
                    style={{
                      background: "white",
                      boxShadow: "0 2px 12px oklch(0.45 0.18 265 / 0.08)",
                      border: "1px solid oklch(0.45 0.18 265 / 0.1)",
                    }}
                    data-ocid={`faq.item.${i + 1}`}
                  >
                    <AccordionTrigger
                      className="px-6 py-5 text-left font-display font-bold text-base md:text-lg hover:no-underline [&[data-state=open]]:text-primary"
                      style={{ color: "oklch(0.22 0.08 265)" }}
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="px-6 pb-5 font-body text-sm md:text-base leading-relaxed"
                      style={{ color: "oklch(0.38 0.06 265)" }}
                    >
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
              MasterTraderX is a free educational initiative. All content is for
              learning purposes only. This is not financial advice. Trading
              involves risk.
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

      {/* ============================================================
          FLOATING WHATSAPP PILL BUTTON
          ============================================================ */}
      <a
        href="https://wa.me/919171166445"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "24px",
          zIndex: 9999,
          borderRadius: "9999px",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 20px",
          boxShadow: "0 4px 16px rgba(37, 211, 102, 0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          textDecoration: "none",
          color: "white",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "14px",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform =
            "scale(1.05)";
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
          width="22"
          height="22"
          role="img"
          aria-label="WhatsApp"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        💬 Chat With Us on WhatsApp
      </a>
    </div>
  );
}
