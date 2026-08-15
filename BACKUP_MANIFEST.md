# MediVault India — Project Backup Manifest
**Backup Date:** August 15, 2026
**Architecture:** Vite + React + TypeScript + Tailwind CSS + Supabase + Gemini 2.5 AI

---

## 1. Included Modules & Phases

### Phase 1 & 2: Core Foundation & UI System
- `src/lib/supabase.ts` — Supabase client configuration
- `src/types/database.ts` — Complete TypeScript database models & schema definitions
- `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/layouts/MainLayout.tsx` — Responsive application shell
- `src/pages/HomePage.tsx`, `src/pages/MedicinesPage.tsx`, `src/pages/CommonDrugsPage.tsx`

### Phase 3 & 4: Pharmacology Taxonomy & Terminology Engine
- `src/services/medicineService.ts`, `src/services/classService.ts`, `src/services/medicalTermService.ts`
- `src/services/pronunciationService.ts` — Web SpeechSynthesis multi-speed audio engine
- `src/features/classifications/components/ClassHierarchyTree.tsx`, `ClassCard.tsx`
- `src/features/medicalTerms/components/TermCard.tsx`
- `src/pages/ClassesPage.tsx`, `src/pages/ClassDetailPage.tsx`
- `src/pages/MedicalTermsPage.tsx`, `src/pages/MedicalTermDetailPage.tsx`
- `src/pages/DrugPatternsPage.tsx`, `src/pages/PronunciationPage.tsx`
- `src/components/Breadcrumbs.tsx`, `src/components/PronunciationButton.tsx`

### Medicine Management & Quality Admin Suite
- `src/services/adminMedicineService.ts` — Dynamic 12-step validation, duplicate scanner, and batch processor
- `src/components/AdminRouteGuard.tsx` — Role-based security guard
- `src/features/admin/components/ArrayTagInput.tsx`, `BrandListEditor.tsx`, `DuplicateWarningModal.tsx`, `AuditHistoryModal.tsx`
- `src/pages/admin/AdminDashboardPage.tsx`, `AdminMedicinesListPage.tsx`, `AdminMedicineEditorPage.tsx`, `AdminImportExportPage.tsx`

### Phase 5: Gemini AI & Universal Explain Architecture
- `supabase/functions/ai-explain/index.ts` — Server-side Deno Edge Function with prompt-injection defense & DB grounding
- `src/services/aiService.ts` — Frontend AI orchestration with local fallback synthesis
- `src/features/medicines/components/ExplainModal.tsx` — Multi-language mode switcher (Simple, Student, Roman Hinglish, Detailed)
- `src/pages/AiAssistantPage.tsx` — Grounded pharmacology conversational assistant

### Phase 6: ADME, Pharmacokinetics & Pharmacodynamics Learning System
- `src/features/learning/data/learningData.ts` — Verified pharmacology reference records & formulas
- `src/features/learning/components/ConceptCard.tsx` — Multi-tier concept card with audio & AI explainer
- `src/features/learning/components/FormulaCard.tsx` — Pharmacokinetic mathematical breakdown cards
- `src/features/learning/components/AucGraph.tsx` — SVG Plasma Concentration vs. Time model (AUC, Cmax, Tmax)
- `src/features/learning/components/DoseResponseGraph.tsx` — SVG Sigmoidal Log Dose-Response curve (Emax, EC50)
- `src/features/learning/components/PKvsPDComparison.tsx` — Side-by-side comparative matrix
- `src/pages/learning/LearningHubPage.tsx`, `AdmeLearningPage.tsx`, `PharmacokineticsPage.tsx`, `PharmacodynamicsPage.tsx`, `QuickRevisionPage.tsx`

### Supabase Database Migrations & Scripts
- `supabase/migrations/20260815000001_initial_schema.sql`
- `supabase/migrations/20260815000002_core_medicines_seed.sql`
- `supabase/migrations/20260815000003_phase4_classification_terms_seed.sql`
- `supabase/migrations/20260815000004_admin_medicine_management.sql`
- `scripts/insert-medicines.js`, `scripts/seed-complete-data.js`

---

## 2. Security Exclusions
- Strictly excluded: `.env`, `.env.*`, `node_modules/`, `.git/`, `dist/`, `.cache/`, temporary cache artifacts.
