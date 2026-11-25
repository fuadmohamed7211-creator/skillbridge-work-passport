import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, Briefcase, CircleAlert, CircleCheck, GraduationCap, QrCode } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/AppShell";
import { Bar, Card, Pill, ScoreRing } from "@/components/ui-bits";
import { getCurrent, savePassport, setCurrent, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "AI Competency & Market-Fit Analysis — SkillBridge Passport" },
      { name: "description", content: "Credential & readiness score, verified skills, employer matches, compliance status and bridging plan." },
      { property: "og:title", content: "AI Analysis — SkillBridge Passport" },
      { property: "og:description", content: "Competency, compliance and market-fit analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

const COMPLIANCE = [
  { k: "workAuth", t: "Work Authorization / Refugee ID", ok: "Refugee ID / Class M permit on file — eligible for formal employment.", todo: "Visit the Department of Refugee Services (DRS) office or Huduma Centre to apply for a Refugee ID and Class M work permit. Employers can sponsor under the Refugees Act 2021." },
  { k: "taxPin", t: "KRA Tax PIN", ok: "KRA PIN ready — payroll onboarding can start on day one.", todo: "Register free on itax.kra.go.ke using your Refugee ID number (takes ~10 minutes). SkillBridge partners at Kakuma & Dadaab help desks can assist." },
  { k: "mobileMoney", t: "M-Pesa / Bank Account", ok: "Salary payment channel verified.", todo: "Open an M-Pesa line at any Safaricom shop with your Refugee ID, or an Equity Bank refugee account — both accept the Refugee ID as KYC." },
] as const;

function Results() {
  const p = useStore(getCurrent, null);
  const navigate = useNavigate();
  if (!p)
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">No analysis yet</h1>
        <p className="mt-2 text-muted-foreground">Complete the candidate intake (or try the demo profile) to see the AI analysis.</p>
        <Link to="/intake" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Go to Candidate Intake</Link>
      </div>
    );
  const cleared = COMPLIANCE.filter((c) => p[c.k]).length;
  const generate = () => {
    savePassport(p);
    toast.success(`Passport ${p.id} generated and saved`);
    navigate({ to: "/passport", search: { id: p.id } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader eyebrow="Step 3 · AI Analysis" title={`${p.fullName} — ${p.role}`} sub={`${p.country} → ${p.location} · Paperwork: ${p.paperwork} · Sector: ${p.sector}`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <p className="text-sm font-semibold text-muted-foreground">Credential & Readiness Score</p>
          <div className="my-4"><ScoreRing score={p.score} /></div>
          <Pill tone="primary">{p.competency}</Pill>
          <div className="mt-5 w-full space-y-3 text-left text-sm">
            {[["Competency evidence", Math.min(100, p.score + 4)], ["Market fit", p.matches[0]?.match ?? 0], ["Onboarding readiness", Math.round((cleared / 3) * 100)]].map(([l, v]) => (
              <div key={l}><div className="mb-1 flex justify-between"><span>{l}</span><span className="font-semibold">{v}%</span></div><Bar value={Number(v)} tone="teal" /></div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="flex items-center gap-2 font-semibold"><BadgeCheck className="size-5 text-secondary" /> Verified Hard & Soft Skills <span className="text-xs font-normal text-muted-foreground">KNQA / EQF aligned</span></h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {p.skills.map((s) => (
              <div key={s.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border border-border p-3">
                <div className="min-w-0"><p className="truncate text-sm font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.level}</p></div>
                <Pill tone={s.kind === "Hard" ? "primary" : "teal"}>{s.kind}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="flex items-center gap-2 font-semibold"><Briefcase className="size-5 text-primary" /> Practical Market Fit — Kenya</h2>
          <div className="mt-4 space-y-4">
            {p.matches.map((m) => (
              <div key={m.title} className="rounded-lg border border-border p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                  <div className="min-w-0"><p className="font-semibold">{m.title}</p><p className="text-sm text-muted-foreground">{m.employer}</p></div>
                  <p className="font-display text-2xl text-primary">{m.match}%</p>
                </div>
                <div className="mt-3 flex items-center gap-3"><Bar value={m.match} /><Pill tone={m.match >= 85 ? "teal" : "warn"}>{m.tag}</Pill></div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold">Compliance & Onboarding</h2>
          <p className="text-xs text-muted-foreground">{cleared}/3 steps cleared</p>
          <div className="mt-4 space-y-3">
            {COMPLIANCE.map((c) => {
              const ok = p[c.k];
              return (
                <div key={c.k} className={cn("rounded-lg p-3", ok ? "bg-secondary-soft" : "bg-warning-soft")}>
                  <p className="flex items-center gap-2 text-sm font-semibold">{ok ? <CircleCheck className="size-4 text-secondary" /> : <CircleAlert className="size-4 text-warning" />}{c.t} <span className="ml-auto text-xs">{ok ? "Cleared" : "Pending"}</span></p>
                  <p className="mt-1 text-xs text-muted-foreground">{ok ? c.ok : c.todo}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
            <div className="min-w-0">
              <h2 className="flex items-center gap-2 font-semibold"><GraduationCap className="size-5 text-primary" /> Targeted Bridging & Micro-Certification Plan</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {p.modules.map((m, i) => (
                  <div key={m.title} className="rounded-lg border border-border p-4">
                    <p className="text-xs font-semibold text-secondary">Module {i + 1} · {m.weeks} wk{m.weeks > 1 ? "s" : ""}</p>
                    <p className="mt-1 font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.provider}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              role="switch"
              aria-checked={p.waiver}
              onClick={() => { setCurrent({ ...p, waiver: !p.waiver }); toast(p.waiver ? "Waiver application withdrawn" : "Fee waiver / stipend application submitted"); }}
              className={cn("flex items-center gap-3 rounded-xl border-2 p-4 text-left transition md:w-64", p.waiver ? "border-secondary bg-secondary-soft" : "border-border")}
            >
              <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition", p.waiver ? "bg-secondary" : "bg-input")}>
                <span className={cn("absolute top-0.5 size-5 rounded-full bg-card shadow transition-all", p.waiver ? "left-5.5" : "left-0.5")} />
              </span>
              <span className="text-sm"><span className="block font-semibold">Apply for Assessment Fee Waiver / Stipend</span><span className="text-xs text-muted-foreground">{p.waiver ? "Application submitted ✓" : "Covers assessment fees for eligible candidates"}</span></span>
            </button>
          </div>
        </Card>
      </div>
      <div className="mt-8 flex justify-center">
        <button onClick={generate} className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-semibold text-primary-foreground shadow-card transition hover:brightness-110">
          <QrCode className="size-5" /> Generate Shareable Skill Passport
        </button>
      </div>
    </div>
  );
}
