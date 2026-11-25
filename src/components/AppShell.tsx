import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { DEMO_INPUT } from "@/lib/analysis";
import { setDraft } from "@/lib/store";

const TABS = [
  { to: "/", label: "Overview" },
  { to: "/intake", label: "Candidate Intake" },
  { to: "/results", label: "AI Analysis" },
  { to: "/passport", label: "Skill Passport" },
  { to: "/dashboard", label: "Impact Dashboard" },
] as const;

export function useDemo() {
  const navigate = useNavigate();
  return () => {
    setDraft(DEMO_INPUT);
    navigate({ to: "/intake" });
  };
}

export function AppShell({ children }: { children: ReactNode }) {
  const demo = useDemo();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-semibold leading-tight">SkillBridge Passport</span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">ILO × Power Learn Project · Track 01</span>
            </span>
          </Link>
          <button onClick={demo} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-card transition hover:brightness-110">
            <Sparkles className="size-4" /> <span className="hidden sm:inline">Try Live Demo Profile</span><span className="sm:hidden">Demo</span>
          </button>
        </div>
        <nav className="mx-auto max-w-7xl overflow-x-auto px-4">
          <ul className="flex gap-1 pb-2">
            {TABS.map((t, i) => (
              <li key={t.to}>
                <Link
                  to={t.to}
                  activeOptions={{ exact: true, includeSearch: false }}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "!bg-primary-soft !text-primary" }}
                >
                  <span className="grid size-5 place-items-center rounded-full border border-current text-[10px]">{i + 1}</span>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-border py-8 text-center text-xs text-muted-foreground">
        SkillBridge Passport · Supporting SDG 4 · 8 · 10 · 16 · Works fully offline — data stays in this browser.
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
    </div>
  );
}
