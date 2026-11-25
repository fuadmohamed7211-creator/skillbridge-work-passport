import { useEffect, useState } from "react";

export type PaperStatus = "Missing" | "Foreign Unrecognized" | "Partial";

export interface CandidateInput {
  fullName: string;
  country: string;
  location: string;
  role: string;
  experience: string;
  paperwork: PaperStatus;
  portfolio: string;
  workAuth: boolean;
  taxPin: boolean;
  mobileMoney: boolean;
}

export interface Skill { name: string; kind: "Hard" | "Soft"; level: string }
export interface RoleMatch { title: string; employer: string; match: number; tag: string }
export interface Module { title: string; provider: string; weeks: number }

export interface Passport extends CandidateInput {
  id: string;
  createdAt: string;
  score: number;
  sector: string;
  competency: string;
  skills: Skill[];
  matches: RoleMatch[];
  modules: Module[];
  waiver: boolean;
}

export interface Endorsement {
  passportId: string;
  employer: string;
  contact: string;
  type: "Endorse" | "Interview";
  note: string;
  at: string;
}

const KEY = "sbp.passports.v1";
const EKEY = "sbp.endorsements.v1";
const DKEY = "sbp.draft.v1";
const CKEY = "sbp.current.v1";
const EVT = "sbp-change";

function read<T>(k: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fb;
  } catch {
    return fb;
  }
}
function write(k: string, v: unknown) {
  localStorage.setItem(k, JSON.stringify(v));
  window.dispatchEvent(new Event(EVT));
}

export const getUserPassports = () => read<Passport[]>(KEY, []);
export const getEndorsements = () => read<Endorsement[]>(EKEY, []);
export const getDraft = () => read<CandidateInput | null>(DKEY, null);
export const setDraft = (d: CandidateInput) => write(DKEY, d);
export const getCurrent = () => read<Passport | null>(CKEY, null);
export const setCurrent = (p: Passport) => write(CKEY, p);

export function savePassport(p: Passport) {
  const list = getUserPassports().filter((x) => x.id !== p.id);
  write(KEY, [p, ...list]);
  setCurrent(p);
}
export function addEndorsement(e: Endorsement) {
  write(EKEY, [e, ...getEndorsements()]);
}

/** Re-renders on any store change; returns fallback during SSR/first paint. */
export function useStore<T>(get: () => T, fallback: T): T {
  const [v, setV] = useState<T>(fallback);
  useEffect(() => {
    const u = () => setV(get());
    u();
    window.addEventListener(EVT, u);
    window.addEventListener("storage", u);
    return () => {
      window.removeEventListener(EVT, u);
      window.removeEventListener("storage", u);
    };
  }, [get]);
  return v;
}
