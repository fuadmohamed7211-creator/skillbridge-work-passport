import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BrainCircuit, Check, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { analyse } from "@/lib/analysis";
import { getDraft, setCurrent, setDraft, useStore, type CandidateInput, type PaperStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title: "Candidate Intake — SkillBridge Passport" },
      { name: "description", content: "Tell us your experience and onboarding status to get an AI credential & readiness analysis." },
      { property: "og:title", content: "Candidate Intake — SkillBridge Passport" },
      { property: "og:description", content: "Credential & compliance intake for displaced talent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Intake,
});

const EMPTY: CandidateInput = { fullName: "", country: "", location: "", role: "", experience: "", paperwork: "Missing", portfolio: "", workAuth: false, taxPin: false, mobileMoney: false };
const CHIPS = ["Data Analyst", "Software/AI Associate", "Livestock Specialist", "Healthcare Technician", "Accountant", "Logistics Coordinator"];
const STAGES = ["Parsing experience narrative", "Extracting hard & soft competencies", "Mapping to KNQA / EQF frameworks", "Checking compliance & onboarding readiness", "Matching against local employer demand", "Building bridging plan"];

const inputCls = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-hidden transition focus:border-primary focus:ring-3 focus:ring-primary/15";

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function Intake() {
  const navigate = useNavigate();
  const draft = useStore(getDraft, null);
  const [f, setF] = useState<CandidateInput>(EMPTY);
  const [stage, setStage] = useState(-1);
  useEffect(() => { if (draft) setF(draft); }, [draft]);
  const up = <K extends keyof CandidateInput>(k: K, v: CandidateInput[K]) => setF((p) => ({ ...p, [k]: v }));
  const valid = f.fullName.trim() && f.role.trim() && f.experience.trim().length > 20;

  const run = () => {
    setDraft(f);
    setStage(0);
    let i = 0;
    const tick = setInterval(() => {
      i++;
      if (i >= STAGES.length) {
        clearInterval(tick);
        setCurrent(analyse(f));
        navigate({ to: "/results" });
      } else setStage(i);
    }, 550);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader eyebrow="Step 2 · Candidate" title="Credential & Compliance Intake" sub="No login. No certificates needed. Describe what you can do and where you are with onboarding paperwork." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name"><input className={inputCls} value={f.fullName} onChange={(e) => up("fullName", e.target.value)} placeholder="e.g. Amina Yusuf Hassan" /></Field>
            <Field label="Country of Origin"><input className={inputCls} value={f.country} onChange={(e) => up("country", e.target.value)} placeholder="e.g. Sudan" /></Field>
            <Field label="Current Location"><input className={inputCls} value={f.location} onChange={(e) => up("location", e.target.value)} placeholder="Nairobi / Kakuma / Dadaab" /></Field>
            <Field label="Paperwork Status">
              <select className={inputCls} value={f.paperwork} onChange={(e) => up("paperwork", e.target.value as PaperStatus)}>
                <option>Missing</option><option>Foreign Unrecognized</option><option>Partial</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Target Job Role / Specialty" hint="Type any profession — you are not limited to the suggestions.">
                <input className={inputCls} value={f.role} onChange={(e) => up("role", e.target.value)} placeholder="e.g. Civil Engineer, Tailor, Livestock Health Specialist…" />
              </Field>
              <div className="mt-2 flex flex-wrap gap-2">
                {CHIPS.map((c) => (
                  <button key={c} type="button" onClick={() => up("role", c)} className={cn("rounded-full border px-3 py-1 text-xs font-medium transition", f.role === c ? "border-secondary bg-secondary-soft text-accent-foreground" : "border-border bg-card hover:border-secondary")}>{c}</button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <Field label="Foreign Qualifications / Experience Summary" hint="Degrees, years of work, tools used, projects, languages.">
                <textarea rows={6} className={inputCls} value={f.experience} onChange={(e) => up("experience", e.target.value)} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Portfolio or Work Sample Link"><input className={inputCls} value={f.portfolio} onChange={(e) => up("portfolio", e.target.value)} placeholder="https://" /></Field>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold">Compliance & Onboarding Readiness</h3>
            <p className="mt-1 text-xs text-muted-foreground">Tick what you already have. We'll guide you on the rest.</p>
            <div className="mt-4 space-y-3">
              {([["workAuth", "Work Authorization / Refugee ID"], ["taxPin", "KRA Tax PIN"], ["mobileMoney", "M-Pesa / Bank Account"]] as const).map(([k, l]) => (
                <button key={k} type="button" role="checkbox" aria-checked={f[k]} onClick={() => up(k, !f[k])} className={cn("flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition", f[k] ? "border-secondary bg-secondary-soft" : "border-border hover:border-secondary")}>
                  <span className={cn("grid size-5 shrink-0 place-items-center rounded border", f[k] ? "border-secondary bg-secondary text-secondary-foreground" : "border-input")}>{f[k] && <Check className="size-3.5" />}</span>
                  {l}
                </button>
              ))}
            </div>
          </Card>
          <button disabled={!valid || stage >= 0} onClick={run} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-card transition hover:brightness-110 disabled:opacity-50">
            <BrainCircuit className="size-5" /> Run AI Verification & Compliance Analysis
          </button>
          {!valid && <p className="text-center text-xs text-muted-foreground">Add a name, role and a short experience summary to continue.</p>}
        </div>
      </div>

      {stage >= 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm">
          <div className="card-surface w-full max-w-md overflow-hidden p-6">
            <div className="relative mb-5 h-24 overflow-hidden rounded-lg bg-primary-soft">
              <div className="absolute inset-x-0 top-0 h-6 animate-scan bg-linear-to-b from-transparent via-secondary/50 to-transparent" />
              <div className="grid h-full place-items-center"><BrainCircuit className="size-10 text-primary" /></div>
            </div>
            <p className="font-display text-xl">Analysing {f.fullName.split(" ")[0]}'s profile</p>
            <p className="text-sm text-muted-foreground">Specialty: {f.role}</p>
            <ul className="mt-4 space-y-2">
              {STAGES.map((s, i) => (
                <li key={s} className={cn("flex items-center gap-2 text-sm", i > stage && "text-muted-foreground/50")}>
                  {i < stage ? <Check className="size-4 text-secondary" /> : i === stage ? <Loader2 className="size-4 animate-spin text-primary" /> : <span className="size-4" />}
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
