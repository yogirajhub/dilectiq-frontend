"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  PhoneCall, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Headset,
  Banknote,
  Building2,
  Stethoscope,
  ShoppingCart,
  GraduationCap,
  Car
} from "lucide-react";

// --- Mock Data ---

const HINGLISH_TRANSCRIPT = [
  "Agent: Namaste, kya main Rahul se baat kar rahi hoon?",
  "Customer: Haan, boliye. Kaun?",
  "Agent: Main DilectIQ se call kar rahi hoon. Aapka recent EMI payment pending hai.",
  "Customer: Oh acha, main kal tak pay kar dunga.",
  "Agent: Theek hai, main system mein note kar leti hoon. Link SMS kar diya hai.",
  "Customer: Thank you, mil gaya link.",
  "Agent: Great. Agar koi issue ho toh isi number par wapas call kar sakte hain. Have a good day!"
];

const USE_CASES = [
  { icon: Banknote, title: "Debt Collection", desc: "Automate EMI reminders and payment follow-ups with high recovery rates." },
  { icon: Headset, title: "Customer Support", desc: "24/7 Level 1 support answering FAQs, tracking orders, and resolving issues." },
  { icon: PhoneCall, title: "Lead Qualification", desc: "Instantly call new signups, qualify intent, and book meetings for sales." },
  { icon: Building2, title: "Real Estate", desc: "Verify property inquiries, schedule site visits, and nurture cold leads." },
  { icon: Stethoscope, title: "Healthcare", desc: "Confirm appointments, send health checkup reminders, and collect feedback." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Reduce RTO by confirming COD orders and addressing delivery issues." },
  { icon: GraduationCap, title: "Education", desc: "Counsel prospective students, verify applications, and handle fee reminders." },
  { icon: Car, title: "Automotive", desc: "Schedule service appointments, send insurance renewal alerts." },
  { icon: Globe2, title: "Travel & Hospitality", desc: "Confirm bookings, handle itinerary queries, and upsell packages." },
];

export default function MarketingPage() {
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  // Animate transcript lines
  useEffect(() => {
    const interval = setInterval(() => {
      setTranscriptIndex((prev) => (prev < HINGLISH_TRANSCRIPT.length - 1 ? prev + 1 : 0));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:flex-row lg:gap-16 lg:px-8 lg:pb-28">
        <div className="pointer-events-none absolute -left-40 top-12 h-80 w-80 rounded-full bg-primary/8 blur-[100px]" />
        
        <div className="z-10 flex-1 space-y-7 text-center lg:text-left">
          <Badge className="border-primary/25 bg-primary/10 px-3 py-1.5 text-primary">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" /> Hindi, English & Hinglish
          </Badge>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.65rem]">
            Calls that sound like <span className="text-primary">real conversations.</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
            Follow up with leads, send payment reminders and answer common questions—in the language your customers are comfortable speaking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 text-base rounded-xl gap-2 w-full sm:w-auto">
                Try DilectIQ
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl w-full sm:w-auto bg-card">
                Talk to our team
              </Button>
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">No card details needed to get started.</p>
        </div>

        {/* Hero Visual: Transcript & Waveform */}
        <div className="flex-1 w-full max-w-lg relative z-10">
          <div className="rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
            {/* Fake header */}
            <div className="border-b border-border bg-muted/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Recovery Agent</p>
                  <p className="text-xs text-primary flex items-center gap-1">
                    <span className="pulse-dot" style={{ width: 6, height: 6 }} /> Connected
                  </p>
                </div>
              </div>
              {/* Waveform */}
              <div className="flex items-end gap-1 h-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
            {/* Transcript Area */}
            <div className="p-6 h-[280px] overflow-hidden flex flex-col justify-end relative bg-background/50">
              <div className="space-y-4 w-full relative z-10">
                {HINGLISH_TRANSCRIPT.slice(0, transcriptIndex + 1).map((line, idx) => {
                  const isAgent = line.startsWith("Agent:");
                  const text = line.replace(/^(Agent|Customer):\s*/, "");
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isAgent ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm ${
                        isAgent 
                          ? "bg-secondary text-secondary-foreground rounded-tl-sm" 
                          : "bg-primary text-primary-foreground rounded-tr-sm"
                      }`}>
                        {text}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {/* Fade out top */}
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[var(--card)] to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="w-full py-24 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">How DilectIQ Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From creating an agent to making thousands of concurrent calls in minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Define the Agent",
                desc: "Choose a template or write a custom prompt. Upload your knowledge base PDFs to ground the agent in facts.",
                icon: Bot
              },
              {
                step: "02",
                title: "Test & Refine",
                desc: "Call the agent from your own phone to test its conversational skills, latency, and knowledge retrieval.",
                icon: PhoneCall
              },
              {
                step: "03",
                title: "Launch Campaigns",
                desc: "Upload a CSV of leads. DilectIQ dials them concurrently, records audio, and extracts actionable insights.",
                icon: Zap
              }
            ].map((s) => (
              <div key={s.step} className="relative p-8 rounded-3xl border border-border bg-card overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="text-6xl font-black text-muted/30 absolute -top-4 -right-2 z-0 group-hover:text-primary/10 transition-colors">{s.step}</div>
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                    <s.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. USE CASE GRID */}
      <section className="w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="industry">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Built for Every Industry</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Deploy specialized voice agents tailored to your specific business workflows.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc) => (
            <div key={uc.title} className="p-6 rounded-2xl border border-border bg-card hover:border-border-strong transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <uc.icon className="text-primary" size={20} />
              </div>
              <h3 className="text-lg font-semibold">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRUST & COMPLIANCE */}
      <section className="w-full py-24 bg-muted/30 border-y border-border" id="product">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Enterprise-Grade Security & Compliance</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We take data security seriously. DilectIQ is built to comply with strict Indian telemarketing and data protection regulations.
            </p>
            <ul className="space-y-4">
              {[
                "TRAI DND (Do Not Disturb) scrubbing built-in",
                "DPDP Act compliant data handling",
                "End-to-end encryption for call recordings & transcripts",
                "Strict role-based access control (RBAC)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square max-w-md mx-auto rounded-full bg-gradient-to-tr from-primary/20 to-transparent flex items-center justify-center border border-primary/20">
              <ShieldCheck size={120} className="text-primary/80" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING TEASER */}
      <section className="w-full py-32 max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Simple, transparent pricing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pay only for the minutes your agents spend talking. No hidden fees, no complex tiers.
        </p>
        <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-xl max-w-lg mx-auto space-y-6">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Pay as you go</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-black">₹3</span>
            <span className="text-xl text-muted-foreground">/ minute</span>
          </div>
          <p className="text-sm text-muted-foreground pb-4 border-b border-border">Billed per second. Telecom charges included.</p>
          <ul className="space-y-3 text-sm text-left mx-auto max-w-xs">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Unlimited Agents</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Unlimited Concurrent Calls</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Full API Access</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" /> Call Recordings & Transcripts</li>
          </ul>
          <Link href="/signup" className="block pt-6">
            <Button size="lg" className="w-full rounded-xl h-12 text-base">Get Started Now</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

// Small missing badge component mock since we didn't import shadcn Badge 
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className || ""}`}>
      {children}
    </div>
  );
}
