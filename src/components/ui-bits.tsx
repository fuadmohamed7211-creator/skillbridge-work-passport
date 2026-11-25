import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("card-surface p-5 md:p-6", className)}>{children}</div>;
}
export function Pill({ tone = "muted", children }: { tone?: "primary" | "teal" | "warn" | "muted"; children: ReactNode }) {
  const t = { primary: "bg-primary-soft text-primary", teal: "bg-secondary-soft text-accent-foreground", warn: "bg-warning-soft text-foreground", muted: "bg-muted text-muted-foreground" }[tone];
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", t)}>{children}</span>;
}
export function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "teal" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all duration-700", tone === "primary" ? "bg-primary" : "bg-secondary")} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
export function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="-rotate-90" width={size} height={size}>
        <circle cx="60" cy="60" r={r} strokeWidth="10" className="fill-none stroke-muted" />
        <circle cx="60" cy="60" r={r} strokeWidth="10" strokeLinecap="round" className="fill-none stroke-secondary transition-all duration-1000" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="font-display text-4xl font-semibold">{score}</div><div className="text-xs text-muted-foreground">/ 100</div></div>
      </div>
    </div>
  );
}
