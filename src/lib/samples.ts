import { analyse } from "./analysis";
import type { Passport, Endorsement } from "./store";

const mk = (p: Parameters<typeof analyse>[0], id: string, date: string): Passport => ({ ...analyse(p, id), createdAt: date });

export const SAMPLE_PASSPORTS: Passport[] = [
  mk({ fullName: "Jean-Paul Mugisha", country: "DR Congo", location: "Nairobi", role: "Software/AI Associate",
    experience: "Diploma in Computer Science from Université de Goma. 3 years building web apps with JavaScript and Python for local NGOs; completed PLP Software Engineering programme; contributes to open-source React projects and trained 40 youth in coding at Kakuma.",
    paperwork: "Foreign Unrecognized", portfolio: "https://github.com/jpmugisha", workAuth: true, taxPin: true, mobileMoney: true }, "SBP-2026-884", "2026-10-02T09:00:00Z"),
  mk({ fullName: "Hodan Abdi Warsame", country: "Somalia", location: "Dadaab, Garissa", role: "Livestock Health Specialist",
    experience: "8 years managing camel and goat herd health in Gedo region; administered vaccinations for 3,000+ animals with an FAO programme; trained pastoralist groups on disease surveillance. Certificate lost.",
    paperwork: "Missing", portfolio: "https://drive.example.org/hodan-field-records", workAuth: true, taxPin: false, mobileMoney: true }, "SBP-2026-412", "2026-10-18T09:00:00Z"),
  mk({ fullName: "Tesfaye Bekele", country: "Ethiopia", location: "Nairobi", role: "Accountant",
    experience: "BA Accounting, Addis Ababa University. 5 years as accountant for a manufacturing firm: IFRS reporting, payroll, reconciliations in Excel and Peachtree.",
    paperwork: "Partial", portfolio: "", workAuth: true, taxPin: true, mobileMoney: true }, "SBP-2026-237", "2026-09-12T09:00:00Z"),
  mk({ fullName: "Nyakuoth Gatluak", country: "South Sudan", location: "Kakuma, Turkana", role: "Healthcare Technician",
    experience: "Clinical lab assistant 4 years at Juba Teaching Hospital; malaria and TB microscopy; now MSF community health volunteer.",
    paperwork: "Foreign Unrecognized", portfolio: "", workAuth: false, taxPin: false, mobileMoney: true }, "SBP-2026-519", "2026-11-01T09:00:00Z"),
  mk({ fullName: "Aline Uwase", country: "Burundi", location: "Nairobi", role: "Tailor",
    experience: "12 years running a tailoring studio in Bujumbura; pattern-making, bridal wear, training apprentices.",
    paperwork: "Missing", portfolio: "https://instagram.com/aline.couture", workAuth: true, taxPin: false, mobileMoney: true }, "SBP-2026-655", "2026-11-09T09:00:00Z"),
  mk({ fullName: "Omar Farah", country: "Somalia", location: "Dadaab, Garissa", role: "Logistics Coordinator",
    experience: "Warehouse and fleet coordinator for WFP food distribution, 6 years; inventory in Excel and LMIS.",
    paperwork: "Partial", portfolio: "", workAuth: true, taxPin: true, mobileMoney: false }, "SBP-2026-301", "2026-08-21T09:00:00Z"),
];

export const SAMPLE_ENDORSEMENTS: Endorsement[] = [
  { passportId: "SBP-2026-884", employer: "Andela Kenya", contact: "talent@andela.example", type: "Interview", note: "Strong React portfolio.", at: "2026-10-05T10:00:00Z" },
  { passportId: "SBP-2026-412", employer: "FAO Kenya", contact: "hr@fao.example", type: "Endorse", note: "Field experience verified.", at: "2026-10-20T10:00:00Z" },
  { passportId: "SBP-2026-237", employer: "KCB Group", contact: "careers@kcb.example", type: "Interview", note: "", at: "2026-09-15T10:00:00Z" },
];
