import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Clock, FileX2, Handshake, Users } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Bar, Card } from "@/components/ui-bits";
import { SAMPLE_ENDORSEMENTS, SAMPLE_PASSPORTS } from "@/lib/samples";
import { getEndorsements, getUserPassports, useStore, type Endorsement, type Passport } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "SDG & Cohort Impact Dashboard — SkillBridge Passport" },
      { name: "description", content: "Measurable social impact: candidates verified, onboarding time saved, interview conversion and SDG progress." },
      { property: "og:title", content: "Impact Dashboard — SkillBridge Passport" },
      { property: "og:description", content: "SDG 4, 8, 10 & 16 cohort analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const EP: Passport[] = [];
const EE: Endorsement[] = [];
// Historical cohort baseline before this browser's sessions (pilot figures).
const BASE = { candidates: 1240, interviews: 512, zeroPaper: 0.87 };

function Dashboard() {
  const user = useStore(getUserPassports, EP);
  const ends = useStore(getEndorsements, EE);
  const d = useMemo(() => {
    const all = [...user, ...SAMPLE_PASSPORTS.filter((s) => !user.some((u) => u.id === s.id))];
    const allE = [...ends, ...SAMPLE_ENDORSEMENTS];
    const total = BASE.candidates + all.length;
    const interviews = BASE.interviews + allE.filter((e) => e.type === "Interview").length;
    const zero = all.filter((p) => p.paperwork !== "Partial").length;
    const zeroRate = Math.round(((BASE.zeroPaper * BASE.candidates + zero) / total) * 100);
    const sectors = new Map<string, number>();
    all.forEach((p) => sectors.set(p.sector, (sectors.get(p.sector) ?? 0) + 1));
    const skills = new Map<string, number>();
    all.forEach((p) => p.skills.filter((s) => s.kind === "Hard").slice(0, 3).forEach((s) => skills.set(s.name, (skills.get(s.name) ?? 0) + 1)));
    const comp = all.length ? all.filter((p) => p.workAuth && p.taxPin && p.mobileMoney).length / all.length : 0;
    const waivers = all.filter((p) => p.waiver).length;
    const avgScore = all.reduce((a, p) => a + p.score, 0) / Math.max(1, all.length);
    return {
      total, interviews, zeroRate, all,
      conv: Math.round((interviews / total) * 100),
      sectors: [...sectors.entries()].sort((a, b) => b[1] - a[1]),
      skills: [...skills.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8),
      sdg: [
        { n: "SDG 4", t: "Quality Education", d: "Learners enrolled in bridging micro-credentials", v: Math.min(100, 58 + waivers * 4 + all.length) },
        { n: "SDG 8", t: "Decent Work", d: "Verified candidates with interview-ready matches", v: Math.round(Math.min(100, avgScore)) },
        { n: "SDG 10", t: "Reduced Inequalities", d: "Displaced talent assessed without paper certificates", v: zeroRate },
        { n: "SDG 16", t: "Legal Identity & Access", d: "Candidates fully cleared for work auth, tax & banking", v: Math.round(comp * 100) },
      ],
    };
  }, [user, ends]);
  const maxS = Math.max(1, ...d.sectors.map((s) => s[1]));
  const maxK = Math.max(1, ...d.skills.map((s) => s[1]));

  const kpis = [
    { i: Users, l: "Total Candidates Verified", v: d.total.toLocaleString(), s: `+${user.length} this session` },
    { i: Clock, l: "Avg. Onboarding Time", v: "24 hrs", s: "down from 45 days (−98%)" },
    { i: Handshake, l: "Interview Conversion", v: `${d.conv}%`, s: `${d.interviews.toLocaleString()} interviews requested` },
    { i: FileX2, l: "Zero-Paperwork Verification", v: `${d.zeroRate}%`, s: "verified without certificates" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader eyebrow="Step 5 · Impact Analytics" title="SDG & Cohort Scalability Dashboard" sub="Live cohort metrics — every new passport and employer endorsement in this browser updates these figures." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.l}>
            <k.i className="size-5 text-primary" />
            <p className="mt-3 font-display text-3xl font-semibold">{k.v}</p>
            <p className="text-sm font-medium">{k.l}</p>
            <p className="text-xs text-muted-foreground">{k.s}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Top Verified In-Demand Skills</h2>
          <div className="mt-5 space-y-3">
            {d.skills.map(([n, c]) => (
              <div key={n} className="grid grid-cols-[minmax(0,1fr)_2rem] items-center gap-3 text-sm sm:grid-cols-[12rem_minmax(0,1fr)_2rem]">
                <span className="truncate">{n}</span>
                <div className="hidden sm:block"><Bar value={(c / maxK) * 100} /></div>
                <span className="text-right font-semibold">{c}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Candidates by Specialty / Sector</h2>
          <div className="mt-5 flex h-56 items-end gap-3">
            {d.sectors.map(([n, c]) => (
              <div key={n} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                <span className="text-sm font-semibold">{c}</span>
                <div className="w-full rounded-t-md bg-secondary transition-all duration-700" style={{ height: `${(c / maxS) * 75}%` }} />
                <span className="line-clamp-2 h-8 text-center text-[10px] leading-tight text-muted-foreground">{n}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <h2 className="mt-10 font-display text-2xl font-semibold">SDG Progress</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {d.sdg.map((s) => (
          <Card key={s.n}>
            <div className="flex items-baseline justify-between"><span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{s.n}</span><span className="font-display text-2xl">{s.v}%</span></div>
            <p className="mt-3 font-semibold">{s.t}</p>
            <p className="mb-3 text-xs text-muted-foreground">{s.d}</p>
            <Bar value={s.v} tone="teal" />
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <h2 className="font-semibold">Recent Passports</h2>
        <div className="mt-3 divide-y divide-border">
          {d.all.slice(0, 8).map((p) => (
            <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5 text-sm">
              <div className="min-w-0"><p className="truncate font-medium">{p.fullName} · {p.role}</p><p className="text-xs text-muted-foreground">{p.id} · {p.location}</p></div>
              <span className="font-semibold text-primary">{p.score}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
