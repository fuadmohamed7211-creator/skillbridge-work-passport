import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, ExternalLink, Handshake, Search, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/AppShell";
import { QrBadge } from "@/components/QrBadge";
import { Card, Pill } from "@/components/ui-bits";
import { SAMPLE_ENDORSEMENTS, SAMPLE_PASSPORTS } from "@/lib/samples";
import { addEndorsement, getEndorsements, getUserPassports, useStore, type Endorsement, type Passport } from "@/lib/store";

export const Route = createFileRoute("/passport")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => (typeof s["id"] === "string" ? { id: s["id"] } : {}),
  head: () => ({
    meta: [
      { title: "Verified Skill Passport Lookup — SkillBridge Passport" },
      { name: "description", content: "Employers: look up a candidate's verified skill passport by ID, endorse or request an interview." },
      { property: "og:title", content: "Verified Skill Passport — SkillBridge" },
      { property: "og:description", content: "Instant employer verification of candidate skills and compliance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PassportPage,
});

const EMPTY_P: Passport[] = [];
const EMPTY_E: Endorsement[] = [];

function PassportPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/passport" });
  const user = useStore(getUserPassports, EMPTY_P);
  const ends = useStore(getEndorsements, EMPTY_E);
  const all = useMemo(() => [...user, ...SAMPLE_PASSPORTS.filter((s) => !user.some((u) => u.id === s.id))], [user]);
  const [q, setQ] = useState(id ?? "");
  const [modal, setModal] = useState(false);
  const active = id ? all.find((p) => p.id.toLowerCase() === id.toLowerCase()) : undefined;
  const pEnds = active ? [...ends, ...SAMPLE_ENDORSEMENTS].filter((e) => e.passportId === active.id) : [];
  const go = (v: string) => { setQ(v); navigate({ search: { id: v.trim().toUpperCase() } }); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader eyebrow="Step 4 · Employer Portal" title="Verified Skill Passport Lookup" sub="Enter a Verification ID to confirm a candidate's skills, competency level and onboarding compliance." />
      <form onSubmit={(e) => { e.preventDefault(); go(q); }} className="card-surface flex items-center gap-2 p-2">
        <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by Verification ID, e.g. SBP-2026-884" aria-label="Verification ID" className="min-w-0 flex-1 bg-transparent py-2 font-mono text-sm outline-hidden" />
        <button className="shrink-0 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Verify</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="py-1 text-muted-foreground">Available IDs:</span>
        {all.map((p) => (
          <button key={p.id} onClick={() => go(p.id)} className={`rounded-full border px-2.5 py-1 font-mono transition hover:border-primary ${user.some((u) => u.id === p.id) ? "border-secondary bg-secondary-soft" : "border-border bg-card"}`}>{p.id}</button>
        ))}
      </div>

      {id && !active && <Card className="mt-8 text-center"><p className="font-semibold">No passport found for “{id}”.</p><p className="text-sm text-muted-foreground">Check the ID and try again.</p></Card>}

      {active && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="card-surface overflow-hidden p-0">
            <div className="relative bg-brand p-6 text-primary-foreground">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] opacity-85"><ShieldCheck className="size-3.5" /> Verified Skill Passport</p>
                  <h2 className="mt-2 font-display text-3xl">{active.fullName}</h2>
                  <p className="opacity-90">{active.role}</p>
                  <p className="mt-3 font-mono text-sm">ID · {active.id}</p>
                </div>
                <div className="shrink-0 rounded-lg bg-card p-1.5"><QrBadge value={active.id} size={104} /></div>
              </div>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex flex-wrap gap-2">
                <Pill tone="primary">{active.competency}</Pill>
                <Pill tone="muted">Score {active.score}/100</Pill>
                {active.workAuth && active.taxPin && active.mobileMoney ? <Pill tone="teal">✓ Compliance Cleared</Pill> : <Pill tone="warn">Compliance {[active.workAuth, active.taxPin, active.mobileMoney].filter(Boolean).length}/3 — in progress</Pill>}
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Verified Skills</p>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((s) => <span key={s.name} className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs"><BadgeCheck className="size-3.5 text-secondary" />{s.name}</span>)}
                </div>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                {[["Work Auth", active.workAuth], ["KRA PIN", active.taxPin], ["M-Pesa / Bank", active.mobileMoney]].map(([l, ok]) => (
                  <div key={String(l)} className={`rounded-lg p-3 ${ok ? "bg-secondary-soft" : "bg-warning-soft"}`}><p className="text-xs text-muted-foreground">{l}</p><p className="font-semibold">{ok ? "Cleared" : "Pending"}</p></div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                {active.portfolio ? <a href={active.portfolio} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline">Portfolio proof <ExternalLink className="size-3.5" /></a> : <span className="text-sm text-muted-foreground">No portfolio link</span>}
                <span className="text-xs text-muted-foreground">Issued {new Date(active.createdAt).toLocaleDateString()} · {active.location}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <button onClick={() => setModal(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-card hover:brightness-110">
              <Handshake className="size-5" /> Employer Endorse / Request Interview
            </button>
            <Card>
              <p className="font-semibold">Employer activity ({pEnds.length})</p>
              {pEnds.length === 0 && <p className="mt-2 text-sm text-muted-foreground">No endorsements yet — be the first.</p>}
              <ul className="mt-3 space-y-3">
                {pEnds.map((e, i) => (
                  <li key={i} className="rounded-lg bg-muted p-3 text-sm">
                    <div className="flex items-center justify-between gap-2"><span className="font-semibold">{e.employer}</span><Pill tone={e.type === "Interview" ? "primary" : "teal"}>{e.type === "Interview" ? "Interview requested" : "Endorsed"}</Pill></div>
                    {e.note && <p className="mt-1 text-muted-foreground">“{e.note}”</p>}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
      {modal && active && <EndorseModal p={active} onClose={() => setModal(false)} />}
    </div>
  );
}

function EndorseModal({ p, onClose }: { p: Passport; onClose: () => void }) {
  const [type, setType] = useState<Endorsement["type"]>("Interview");
  const [employer, setEmployer] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const cls = "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-hidden focus:border-primary";
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <form role="dialog" aria-label="Employer action" onClick={(e) => e.stopPropagation()} onSubmit={(e) => {
        e.preventDefault();
        addEndorsement({ passportId: p.id, employer, contact, type, note, at: new Date().toISOString() });
        toast.success(type === "Interview" ? `Interview request sent to ${p.fullName}` : `${p.fullName} endorsed`);
        onClose();
      }} className="card-surface w-full max-w-md space-y-4 p-6">
        <div className="flex items-center justify-between"><h3 className="font-display text-xl">Hiring partner action</h3><button type="button" onClick={onClose} aria-label="Close"><X className="size-5" /></button></div>
        <p className="text-sm text-muted-foreground">For {p.fullName} · {p.id}</p>
        <div className="grid grid-cols-2 gap-2">
          {(["Interview", "Endorse"] as const).map((t) => (
            <button type="button" key={t} onClick={() => setType(t)} className={`rounded-lg border-2 p-2 text-sm font-semibold ${type === t ? "border-primary bg-primary-soft text-primary" : "border-border"}`}>{t === "Interview" ? "Request Interview" : "Endorse Skills"}</button>
          ))}
        </div>
        <input required placeholder="Company / organisation" value={employer} onChange={(e) => setEmployer(e.target.value)} className={cls} />
        <input required placeholder="Contact email or phone" value={contact} onChange={(e) => setContact(e.target.value)} className={cls} />
        <textarea rows={3} placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} className={cls} />
        <button className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground">Submit</button>
      </form>
    </div>
  );
}
