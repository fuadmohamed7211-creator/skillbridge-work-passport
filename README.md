# Skillbridge Work Passport

Build a modern, high-trust, award-winning AI Credential & Compliance Recognition web application for the ILO x Power Learn Project (PLP) Hackathon (Track 01: Credential Recognition, SDGs 4, 8, 10 & 16) called "SkillBridge Passport".



The problem it solves: Skilled refugees, displaced talent, and informal workers often possess strong foreign qualifications, technical expertise, and real-world experience, yet face hiring rejection because paper certificates are missing, foreign credentials are unrecognized locally, and work-authorization/banking onboarding bottlenecks slow employers down.



Create an interactive, end-to-end user flow with NO login wall required, featuring 5 clean, clickable navigation tabs (plus a prominent "Try Live Demo Profile" quick-fill button at the top so evaluators can test everything in one click):



1. Landing / Overview Page:

- Clean, inspiring hero section with the mission: "Verify Real Skills & Work Readiness — Not Just Paper Certificates."

- Two bold call-to-action buttons: "Verify My Skills (Candidate)" and "Verify a Candidate Passport (Employer)", plus a "Try Live Demo Profile" button that pre-fills realistic sample data for a displaced Data Analyst & Python/SQL specialist whose foreign university transcripts were left behind.

- A crisp 3-step visual explainer showing: (1) AI Competency Extraction, (2) Compliance & Onboarding Readiness Check, and (3) Instant Employer Passport Verification.



2. Candidate Credential & Compliance Intake:

- Form fields for:

  - Full Name

  - Country of Origin

  - Current Location (e.g., Nairobi / Kakuma / Dadaab)

  - Target Job Role / Specialty: A free-text input field where candidates can type ANY custom specialty or profession (such as "Livestock Health Specialist", "Civil Engineer", "Tailor", "Data Analyst", etc.)—NOT restricted to a fixed dropdown—accompanied by optional quick-fill suggestion chips underneath (e.g., Data Analyst, Software/AI Associate, Livestock Specialist, Healthcare Technician, Accountant, Logistics Coordinator) that auto-fill the text input when clicked.

  - Foreign Qualifications / Experience Summary

  - Paperwork Status (Missing / Foreign Unrecognized / Partial)

  - Portfolio or Work Sample Link

- Compliance & Onboarding Readiness Checkboxes (directly solving onboarding bottlenecks): Work Authorization / Refugee ID Status, KRA Tax PIN Readiness, and Mobile Money (M-Pesa) / Bank Account Status.

- A "Run AI Verification & Compliance Analysis" button with a smooth, realistic AI processing animation before transitioning to the Results view.



3. AI Competency, Compliance & Market-Fit Analysis (Results View):

- Dynamically adapts to whatever custom Target Job Role / Specialty the candidate entered, displaying an AI-generated "Credential & Readiness Score" (e.g., 91/100) with a breakdown of:

  a) Verified Hard & Soft Skills extracted from the candidate's experience and mapped to equivalent local/international competency levels (KNQA / EQF aligned).

  b) Practical Market Fit: Matches the candidate against 3 real, high-demand local employer roles tailored to their custom specialty with match percentages and hiring readiness tags.

  c) Compliance & Onboarding Readiness Card: Clearly displays which legal/financial onboarding steps are cleared (Work Auth, Tax PIN, M-Pesa/Banking) and provides clear, actionable guidance for any pending step.

  d) Targeted Bridging & Micro-Certification Plan: 2–3 short bridging modules tailored to their custom specialty, with an interactive "Apply for Assessment Fee Waiver / Stipend" toggle button.

- Prominent button: "Generate Shareable Skill Passport".



4. Public Employer-Ready "Verified Skill Passport" & Lookup Portal:

- Includes a "Search by Verification ID" lookup bar (pre-populated with 2 sample IDs like "SBP-2026-884" and "SBP-2026-412", PLUS dynamically retrieving any new candidate passport created in Tab 2 via browser localStorage!).

- Displays a clean, official-looking digital credential card with: Candidate Name, Custom Specialty, Unique Verification ID, QR Code visual badge, Verified Skills Badges, Competency Level, Compliance Cleared Badge, Portfolio Proof Link, and an interactive "Employer Endorse / Request Interview" modal button so evaluators can test the hiring partner flow.



5. SDG & Cohort Scalability Analytics Dashboard (Data Analytics Showcase):

- An executive data dashboard demonstrating measurable social impact and cohort scalability with interactive charts/cards:

  - KPI Cards: Total Candidates Verified, Avg. Onboarding Time Reduced (from 45 days to 24 hours), Employer Interview Conversion Rate, and Zero-Paperwork Verification Rate.

  - Visual bar/progress charts tracking: Top Verified In-Demand Skills, Candidates by Specialty/Sector (updating dynamically when new profiles are added), and measurable progress metrics aligned with SDGs 4 (Quality Education), 8 (Decent Work), 10 (Reduced Inequalities), and 16 (Legal Identity & Access).



Design & Technical Execution Requirements:

- Use an authoritative, clean, trustworthy color palette: deep burgundy/magenta (#941748), vibrant teal (#00A895), crisp white cards, and subtle warm gray backgrounds (#F8F9FA) with clear typography and responsive mobile/desktop layout.

- Persist all newly submitted candidate profiles and employer endorsements in browser localStorage alongside rich pre-loaded sample profiles so every single button, tab, search lookup, and chart updates dynamically and works 100% offline/in-browser with zero external API failures during live judging.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://skillbridge-work-passport.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71db72b6-7117-46d3-a088-9138429ae704).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
