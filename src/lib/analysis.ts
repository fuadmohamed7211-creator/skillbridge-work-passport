import type { CandidateInput, Passport, Skill, RoleMatch, Module } from "./store";

interface SectorDef {
  sector: string;
  keys: string[];
  skills: string[];
  roles: [string, string][];
  modules: [string, string, number][];
}

const SECTORS: SectorDef[] = [
  {
    sector: "Data & Analytics",
    keys: ["data", "analyst", "analytics", "sql", "bi ", "statistic"],
    skills: ["Python (pandas, NumPy)", "SQL & Relational Modelling", "Data Visualisation (Power BI)", "Statistical Analysis", "Data Cleaning & ETL"],
    roles: [["Junior Data Analyst", "Safaricom PLC"], ["M&E Data Officer", "UNHCR Kenya"], ["Business Intelligence Associate", "Equity Bank"]],
    modules: [["Kenya Data Protection Act (2019) Essentials", "ODPC / PLP", 2], ["Power BI Practical Assessment", "Microsoft Learn", 3], ["Cloud SQL Micro-Credential", "PLP Academy", 4]],
  },
  {
    sector: "Software & AI",
    keys: ["software", "developer", " ai ", "ai/", "/ai", "programmer", "web", "machine learning"],
    skills: ["JavaScript / TypeScript", "Python & REST APIs", "Git & Version Control", "Prompt Engineering & LLM Tools", "Agile Delivery"],
    roles: [["Associate Software Engineer", "Andela"], ["AI Data Labelling Lead", "Sama"], ["Junior Full-Stack Developer", "Cellulant"]],
    modules: [["PLP Software Engineering Bridging", "Power Learn Project", 6], ["AI Ethics & Responsible AI", "ILO / PLP", 2], ["Cloud Fundamentals Assessment", "AWS Educate", 3]],
  },
  {
    sector: "Agriculture & Livestock",
    keys: ["livestock", "veterin", "animal", "agri", "farm", "crop"],
    skills: ["Animal Health Diagnostics", "Vaccination & Disease Control", "Pasture & Herd Management", "Record Keeping (Digital)", "Community Extension Training"],
    roles: [["Animal Health Assistant", "Kenya Veterinary Board (County Programs)"], ["Livestock Extension Officer", "FAO Kenya"], ["Field Officer – Pastoral Resilience", "Mercy Corps"]],
    modules: [["KVB Para-Vet Registration Bridging", "Kenya Veterinary Board", 4], ["Digital Livestock Records (iCow)", "PLP Agri-Tech", 2], ["One Health Disease Surveillance", "ILRI", 3]],
  },
  {
    sector: "Healthcare",
    keys: ["health", "nurse", "medical", "clinic", "pharma", "lab", "technician"],
    skills: ["Patient Care & Triage", "Infection Prevention & Control", "Lab / Diagnostic Equipment Use", "Health Records (DHIS2)", "Cross-Cultural Communication"],
    roles: [["Community Health Technician", "Amref Health Africa"], ["Lab Assistant", "Aga Khan University Hospital"], ["Health Records Officer", "MSF Kenya"]],
    modules: [["KMLTTB / NCK Licensing Prep", "Kenya Medical Boards", 4], ["DHIS2 Data Entry Certification", "HISP / PLP", 2], ["IPC Refresher Assessment", "WHO Academy", 1]],
  },
  {
    sector: "Finance & Accounting",
    keys: ["account", "finance", "audit", "bookkeep", "tax"],
    skills: ["Financial Reporting (IFRS)", "Bookkeeping & Reconciliation", "Excel Financial Modelling", "Kenyan Tax Compliance (iTax)", "Integrity & Attention to Detail"],
    roles: [["Accounts Assistant", "KCB Group"], ["Finance Officer", "Norwegian Refugee Council"], ["Junior Auditor", "PwC Kenya"]],
    modules: [["ICPAK Foreign Qualification Bridging", "ICPAK", 6], ["iTax & KRA Compliance", "KRA / PLP", 1], ["QuickBooks Certified User", "Intuit", 2]],
  },
  {
    sector: "Logistics & Supply Chain",
    keys: ["logistic", "supply", "warehouse", "driver", "procure", "transport"],
    skills: ["Inventory & Warehouse Management", "Procurement Processes", "Fleet & Route Planning", "ERP Systems (SAP basics)", "Team Coordination"],
    roles: [["Logistics Coordinator", "WFP Kenya"], ["Supply Chain Assistant", "Twiga Foods"], ["Warehouse Supervisor", "Glovo / Sendy"]],
    modules: [["KISM Procurement Bridging", "KISM", 4], ["Humanitarian Logistics Certificate", "Kuehne Foundation", 3], ["Digital Inventory Tools", "PLP", 2]],
  },
  {
    sector: "Construction & Engineering",
    keys: ["civil", "construct", "mason", "electric", "plumb", "weld", "mechanic", "engineer"],
    skills: ["Technical Drawing & AutoCAD", "Site Safety (OSHA)", "Structural / Materials Knowledge", "Project Estimation & BOQ", "Team Leadership on Site"],
    roles: [["Site Engineer (Graduate)", "China Wu Yi / Local Contractors"], ["Technical Officer", "Kenya Rural Roads Authority Partners"], ["Quantity Surveying Assistant", "Bamburi Cement Projects"]],
    modules: [["EBK / NCA Registration Bridging", "Engineers Board of Kenya", 6], ["OSHA Site Safety Certificate", "DOSHS", 1], ["AutoCAD Practical Assessment", "Autodesk", 2]],
  },
  {
    sector: "Creative & Trades",
    keys: ["tailor", "fashion", "design", "craft", "cook", "chef", "hair", "beaut", "carpent"],
    skills: ["Garment Construction & Pattern Making", "Quality Finishing", "Client Measurement & Fitting", "Small Business Costing", "Customer Service"],
    roles: [["Production Tailor", "EPZ Apparel Manufacturers"], ["Fashion Studio Assistant", "Nairobi Design Collectives"], ["Enterprise Trainer", "Kakuma Kalobeyei Initiative"]],
    modules: [["NITA Trade Test (Grade III→I)", "NITA", 2], ["Digital Marketing for Artisans", "PLP / Jumia", 2], ["Micro-Enterprise Finance", "KIVA / ILO SIYB", 3]],
  },
];

const SOFT = ["Resilience & Adaptability", "Multilingual Communication", "Problem Solving", "Teamwork in Diverse Settings"];
const LEVELS = ["KNQA Level 6 · EQF 6", "KNQA Level 5 · EQF 5", "KNQA Level 7 · EQF 7", "KNQA Level 4 · EQF 4"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

export function detectSector(role: string): SectorDef | null {
  const r = ` ${role.toLowerCase()} `;
  return SECTORS.find((s) => s.keys.some((k) => r.includes(k))) ?? null;
}

function generic(role: string): SectorDef {
  const R = role.trim() || "Specialist";
  return {
    sector: "Other / Emerging",
    keys: [],
    skills: [`Core ${R} Techniques`, `${R} Tools & Equipment`, "Quality & Safety Standards", "Digital Record Keeping", "Client / Stakeholder Service"],
    roles: [[`${R}`, "Kenya Private Sector Alliance member"], [`Assistant ${R}`, "Kalobeyei Integrated Program"], [`${R} Trainer`, "NITA Accredited Centre"]],
    modules: [[`${R} Competency Trade Test`, "NITA / TVETA", 2], ["Kenyan Workplace Standards & Labour Rights", "ILO / FKE", 1], ["Digital Skills for Work", "PLP Academy", 3]],
  };
}

export function analyse(input: CandidateInput, id?: string): Passport {
  const def = detectSector(input.role) ?? generic(input.role);
  const h = hash(input.fullName + input.role + input.experience);
  const expLen = Math.min(input.experience.trim().split(/\s+/).length, 80);
  const comp = [input.workAuth, input.taxPin, input.mobileMoney].filter(Boolean).length;
  let score = 52 + Math.round(expLen / 4) + comp * 5 + (input.portfolio.trim() ? 6 : 0) + (input.paperwork === "Partial" ? 4 : 0) + (h % 4);
  score = Math.max(40, Math.min(97, score));
  const lvl = LEVELS[score >= 88 ? 2 : score >= 78 ? 0 : score >= 65 ? 1 : 3]!;
  const skills: Skill[] = [
    ...def.skills.map((n, i) => ({ name: n, kind: "Hard" as const, level: i < 2 ? lvl : LEVELS[score >= 78 ? 1 : 3]! })),
    ...SOFT.slice(0, 3).map((n) => ({ name: n, kind: "Soft" as const, level: "Verified" })),
  ];
  const matches: RoleMatch[] = def.roles.map(([t, e], i) => {
    const m = Math.max(55, Math.min(98, score - i * 6 + ((h >> i) % 5)));
    return { title: t, employer: e, match: m, tag: m >= 85 ? "Interview-Ready" : m >= 72 ? "Ready after Bridging" : "Developing" };
  });
  const modules: Module[] = def.modules.map(([t, p, w]) => ({ title: t, provider: p, weeks: w }));
  return {
    ...input,
    id: id ?? `SBP-2026-${String(100 + (h % 900))}`,
    createdAt: new Date().toISOString(),
    score,
    sector: def.sector,
    competency: lvl,
    skills,
    matches,
    modules,
    waiver: false,
  };
}

export const DEMO_INPUT: CandidateInput = {
  fullName: "Amina Yusuf Hassan",
  country: "Sudan",
  location: "Kakuma, Turkana",
  role: "Data Analyst",
  experience:
    "BSc Statistics, University of Khartoum (2018) — transcripts lost during displacement. 4 years as a data analyst at a Khartoum telecom: built SQL reporting pipelines on 12M customer records, Python (pandas) churn models, and Power BI dashboards for executives. Volunteer M&E data clerk with an NGO in Kakuma camp for 1 year, cleaning household survey data in KoboToolbox. Fluent in Arabic and English, conversational Swahili.",
  paperwork: "Missing",
  portfolio: "https://github.com/amina-data/telecom-churn-analysis",
  workAuth: true,
  taxPin: false,
  mobileMoney: true,
};
