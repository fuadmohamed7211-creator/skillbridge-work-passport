import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, FileCheck2, QrCode, Sparkles, Building2, UserRound } from "lucide-react";
import { useDemo } from "@/components/AppShell";
import { QrBadge } from "@/components/QrBadge";
import { Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillBridge Passport — Verify Real Skills, Not Just Paper" },
      { name: "description", content: "AI competency extraction, compliance readiness and instant employer verification for refugees and displaced talent." },
      { property: "og:title", content: "SkillBridge Passport" },
      { property: "og:description", content: "Verify real skills & work readiness — not just paper certificates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  { icon: BrainCircuit, t: "AI Competency Extraction", d: "Experience narratives become verified hard & soft skills, mapped to KNQA and EQF levels." },
  { icon: FileCheck2, t: "Compliance & Onboarding Check", d: "Work authorization, KRA PIN and M-Pesa/bank readiness — with guidance for every gap." },
  { icon: QrCode, t: "Instant Employer Verification", d: "A shareable passport with a unique ID and QR badge employers can check in seconds." },
];

function Index() {
  const demo = useDemo();
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Pill tone="primary">SDG 4 · 8 · 10 · 16 &nbsp;|&nbsp; ILO × PLP Track 01</Pill>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Verify Real Skills &amp; Work Readiness — <span className="text-primary">Not Just Paper Certificates.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Skilled refugees and displaced professionals lose jobs because their certificates were left behind. SkillBridge Passport turns real experience into a trusted, employer-ready credential in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/intake" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-card transition hover:brightness-110">
                <UserRound className="size-4" /> Verify My Skills (Candidate)
              </Link>
              <Link to="/passport" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-card px-6 py-3 font-semibold text-primary transition hover:bg-primary-soft">
                <Building2 className="size-4" /> Verify a Candidate Passport (Employer)
              </Link>
            </div>
            <button onClick={demo} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">
              <Sparkles className="size-4" /> Try Live Demo Profile — a displaced Data Analyst whose transcripts were left behind <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rotate-3 rounded-3xl bg-secondary/15" />
            <div className="card-surface relative overflow-hidden p-0">
              <div className="bg-brand px-5 py-4 text-primary-foreground">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-80">Verified Skill Passport</p>
                <p className="font-display text-xl">Amina Y. Hassan</p>
                <p className="text-sm opacity-90">Data Analyst · Python / SQL</p>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="space-y-2">
                  <Pill tone="teal">✓ Compliance cleared</Pill>
                  <p className="text-xs text-muted-foreground">KNQA Level 6 · EQF 6</p>
                  <p className="font-mono text-sm font-semibold">SBP-2026-•••</p>
                </div>
                <QrBadge value="SBP-2026-demo" size={92} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-display text-3xl font-semibold">How it works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.t} className="card-surface relative p-6">
              <span className="absolute right-5 top-4 font-display text-5xl text-muted">{i + 1}</span>
              <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary"><s.icon className="size-6" /></span>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 rounded-2xl bg-brand p-6 text-primary-foreground sm:grid-cols-3">
          {[["45 days → 24 hrs", "Onboarding time"], ["0 paper", "Certificates required"], ["100% offline", "Works in any camp or office"]].map(([a, b]) => (
            <div key={b}><p className="font-display text-3xl">{a}</p><p className="text-sm opacity-85">{b}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}
