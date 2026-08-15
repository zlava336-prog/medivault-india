import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

// Read .env file manually
const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.error('❌ Error: Please check your .env file. VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const medicines = [
  {
    id: "44444444-0000-0000-0000-000000000001",
    generic_name: "Paracetamol",
    display_name: "Paracetamol (Acetaminophen)",
    active_ingredient: "Paracetamol",
    salt: "N-acetyl-p-aminophenol",
    description: "First-line antipyretic and mild-to-moderate analgesic with minimal peripheral anti-inflammatory action.",
    strength: "500 mg, 650 mg",
    dosage_forms: ["Tablet", "Syrup", "IV Infusion"],
    routes: ["Oral", "Intravenous"],
    mechanism_of_action: "Centrally inhibits prostaglandin synthesis and activates descending serotonergic pathways.",
    pharmacodynamics: "Reduces fever via hypothalamic thermoregulatory center and elevates pain threshold.",
    absorption: "Rapid absorption from GI tract.",
    distribution: "Widely distributed in body tissues.",
    metabolism: "Hepatic (90-95%) via glucuronidation and sulfation.",
    excretion: "Renal (>90% as conjugates).",
    bioavailability: "~88%",
    half_life: "1.5 to 2.5 hours",
    indications: ["Fever", "Mild to moderate pain", "Headache", "Dental pain"],
    contraindications: ["Severe acute hepatic failure"],
    warnings: ["Do not exceed 4000 mg/day (risk of liver damage)"],
    common_adverse_effects: ["Nausea", "Epigastric discomfort"],
    pregnancy: "Generally considered safe at standard doses.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "Para = Pure Antipyretic; Acetylcysteine is antidote.",
    key_suffix: "-mol",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000002",
    generic_name: "Ibuprofen",
    display_name: "Ibuprofen",
    active_ingredient: "Ibuprofen",
    salt: "2-(4-isobutylphenyl)propionic acid",
    description: "Widely used non-selective NSAID providing analgesic, antipyretic, and anti-inflammatory relief.",
    strength: "200 mg, 400 mg",
    dosage_forms: ["Tablet", "Suspension"],
    routes: ["Oral"],
    mechanism_of_action: "Non-selectively inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis.",
    pharmacodynamics: "Suppresses inflammatory erythema, edema, hyperalgesia, and pain mediator sensitization.",
    absorption: "Rapidly absorbed from gastrointestinal tract.",
    distribution: "Highly bound to albumin (99%).",
    metabolism: "Hepatic oxidation via CYP2C9 and CYP2C8.",
    excretion: "Renal (90% as metabolites).",
    bioavailability: "~80-90%",
    half_life: "1.8 to 2.0 hours",
    indications: ["Arthritis", "Dental pain", "Musculoskeletal injury", "Fever"],
    contraindications: ["Active peptic ulcer disease", "Severe heart failure", "Third trimester pregnancy"],
    warnings: ["GI ulceration and bleeding risk; cardiovascular risk at high sustained doses"],
    common_adverse_effects: ["Dyspepsia", "Nausea", "Abdominal pain"],
    pregnancy: "Avoid in 3rd trimester (premature ductus arteriosus closure).",
    lactation: "Compatible; low levels in milk.",
    memory_trick: "Ibu-PRO-fen = PROstaglandin inhibitor.",
    key_suffix: "-profen",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000003",
    generic_name: "Pantoprazole",
    display_name: "Pantoprazole Sodium",
    active_ingredient: "Pantoprazole",
    salt: "Substituted benzimidazole",
    description: "Proton pump inhibitor for GERD and peptic ulcer disease.",
    strength: "40 mg",
    dosage_forms: ["Tablet", "IV Injection"],
    routes: ["Oral", "Intravenous"],
    mechanism_of_action: "Irreversibly inhibits H+/K+ ATPase enzyme in gastric parietal cells.",
    pharmacodynamics: "Profound suppression of basal and stimulated gastric acid.",
    absorption: "Rapidly absorbed from enteric coated tablet.",
    distribution: "Extracellular fluid distribution.",
    metabolism: "Extensively metabolized in liver (CYP2C19).",
    excretion: "Renal (80%) and biliary (20%).",
    bioavailability: "~77%",
    half_life: "1 to 1.5 hours (action lasts >24h)",
    indications: ["GERD", "Gastric ulcers", "Acidity"],
    contraindications: ["Hypersensitivity to benzimidazoles"],
    warnings: ["Long term use risks hypomagnesemia"],
    common_adverse_effects: ["Headache", "Diarrhea", "Abdominal pain"],
    pregnancy: "Category B / Preferred PPI in pregnancy.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "PANTO = Pure Acid Neutralizer.",
    key_suffix: "-prazole",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000004",
    generic_name: "Losartan",
    display_name: "Losartan Potassium",
    active_ingredient: "Losartan",
    salt: "Imidazol-5-yl derivative",
    description: "First-line Angiotensin II Receptor Blocker (ARB) for hypertension.",
    strength: "25 mg, 50 mg",
    dosage_forms: ["Tablet"],
    routes: ["Oral"],
    mechanism_of_action: "Selectively blocks AT1 receptor, preventing angiotensin II vasoconstriction.",
    pharmacodynamics: "Relaxes vascular smooth muscle and lowers blood pressure.",
    absorption: "Well absorbed, active metabolite E-3174 formed.",
    distribution: "Extensively protein bound (98%).",
    metabolism: "Hepatic (CYP2C9/CYP3A4).",
    excretion: "Biliary (60%) and renal (35%).",
    bioavailability: "~33%",
    half_life: "2 hours (metabolite 6-9h)",
    indications: ["Hypertension", "Diabetic nephropathy"],
    contraindications: ["Pregnancy (2nd & 3rd trimester)"],
    warnings: ["Contraindicated in pregnancy; causes fetal harm"],
    common_adverse_effects: ["Dizziness", "Hyperkalemia"],
    pregnancy: "Contraindicated in pregnancy.",
    lactation: "Avoid during lactation.",
    memory_trick: "SARTAN = Stops Angiotensin II.",
    key_suffix: "-sartan",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000005",
    generic_name: "Amlodipine",
    display_name: "Amlodipine Besylate",
    active_ingredient: "Amlodipine",
    salt: "Dihydropyridine derivative",
    description: "Third-generation calcium channel blocker with long 24-hour duration.",
    strength: "5 mg, 10 mg",
    dosage_forms: ["Tablet"],
    routes: ["Oral"],
    mechanism_of_action: "Inhibits calcium entry through L-type calcium channels in vascular smooth muscle.",
    pharmacodynamics: "Causes peripheral vasodilation and lowers systemic vascular resistance.",
    absorption: "Slowly absorbed with prolonged bioavailability.",
    distribution: "Extensive tissue binding.",
    metabolism: "Hepatic (CYP3A4).",
    excretion: "Renal (60%) and biliary (25%).",
    bioavailability: "~64-90%",
    half_life: "35 to 50 hours",
    indications: ["Hypertension", "Chronic stable angina"],
    contraindications: ["Severe hypotension", "Cardiogenic shock"],
    warnings: ["Dose-dependent pedal edema (peripheral swelling)"],
    common_adverse_effects: ["Ankle edema", "Flushing", "Dizziness"],
    pregnancy: "Category C / Use with specialist supervision.",
    lactation: "Excreted in low levels in milk.",
    memory_trick: "AMLO = Ankle edema, Morning dose, Long Acting.",
    key_suffix: "-dipine",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000006",
    generic_name: "Atorvastatin",
    display_name: "Atorvastatin Calcium",
    active_ingredient: "Atorvastatin",
    salt: "Synthetic statin",
    description: "High-intensity HMG-CoA reductase inhibitor for dyslipidemia and CV prevention.",
    strength: "10 mg, 20 mg, 40 mg",
    dosage_forms: ["Tablet"],
    routes: ["Oral"],
    mechanism_of_action: "Inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol synthesis.",
    pharmacodynamics: "Dose-dependently lowers LDL cholesterol and triglycerides; stabilizes plaques.",
    absorption: "Rapidly absorbed; undergoes first-pass metabolism.",
    distribution: "High plasma protein binding (>98%).",
    metabolism: "Extensively metabolized in liver (CYP3A4).",
    excretion: "Biliary elimination (>98%).",
    bioavailability: "~14%",
    half_life: "14 hours (active metabolites 20-30 hours)",
    indications: ["Hypercholesterolemia", "Coronary artery disease prevention", "Post-MI"],
    contraindications: ["Active liver disease", "Pregnancy and lactation"],
    warnings: ["Myopathy and rare rhabdomyolysis; check unexplained muscle pain"],
    common_adverse_effects: ["Myalgia", "Headache", "Dyspepsia"],
    pregnancy: "Category X / Contraindicated in pregnancy.",
    lactation: "Contraindicated in breastfeeding.",
    memory_trick: "STATIN = Stops Total Arterial Thrombosis.",
    key_suffix: "-statin",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000007",
    generic_name: "Amoxicillin",
    display_name: "Amoxicillin",
    active_ingredient: "Amoxicillin Trihydrate",
    salt: "Aminopenicillin",
    description: "Moderate-spectrum bactericidal penicillin antibiotic for bacterial infections.",
    strength: "250 mg, 500 mg",
    dosage_forms: ["Capsule", "Syrup"],
    routes: ["Oral"],
    mechanism_of_action: "Inhibits bacterial cell wall synthesis by binding penicillin-binding proteins.",
    pharmacodynamics: "Bactericidal against Streptococcus, Enterococcus, and susceptible Gram-negatives.",
    absorption: "Rapidly absorbed independent of food.",
    distribution: "Well distributed into tissues.",
    metabolism: "Limited hepatic metabolism.",
    excretion: "Renal clearance (>70%).",
    bioavailability: "~80%",
    half_life: "1 to 1.5 hours",
    indications: ["Otitis media", "Throat infection", "Pneumonia", "UTI"],
    contraindications: ["Penicillin hypersensitivity / Anaphylaxis"],
    warnings: ["Risk of severe allergic reaction; finish full course"],
    common_adverse_effects: ["Diarrhea", "Nausea", "Rash"],
    pregnancy: "Category B / Generally safe in pregnancy.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "AMOX = Active against Mobile bacteria.",
    key_suffix: "-cillin",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000008",
    generic_name: "Azithromycin",
    display_name: "Azithromycin",
    active_ingredient: "Azithromycin Dihydrate",
    salt: "Macrolide / Azalide",
    description: "Broad-spectrum macrolide antibiotic with long tissue half-life.",
    strength: "250 mg, 500 mg",
    dosage_forms: ["Tablet", "Suspension"],
    routes: ["Oral"],
    mechanism_of_action: "Binds reversibly to 50S ribosomal subunit, inhibiting bacterial protein synthesis.",
    pharmacodynamics: "Bacteriostatic coverage of atypicals and respiratory pathogens.",
    absorption: "Extensive tissue distribution.",
    distribution: "High tissue concentrations.",
    metabolism: "Hepatic demethylation.",
    excretion: "Biliary elimination (>50%).",
    bioavailability: "~37%",
    half_life: "68 to 72 hours",
    indications: ["Atypical pneumonia", "Bronchitis", "Typhoid fever", "Chlamydia"],
    contraindications: ["Hypersensitivity to macrolides", "Severe liver impairment"],
    warnings: ["Risk of QT prolongation and cardiac arrhythmias"],
    common_adverse_effects: ["Nausea", "Diarrhea", "Abdominal cramps"],
    pregnancy: "Category B / Safe when clinically indicated.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "AZITHRO = A-Z Coverage of Atypicals + 72h half-life.",
    key_suffix: "-thromycin",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000009",
    generic_name: "Cetirizine",
    display_name: "Cetirizine Hydrochloride",
    active_ingredient: "Cetirizine",
    salt: "Second-generation piperazine",
    description: "Second-generation H1 antihistamine for allergic rhinitis and urticaria.",
    strength: "10 mg",
    dosage_forms: ["Tablet", "Syrup"],
    routes: ["Oral"],
    mechanism_of_action: "Selectively antagonizes peripheral histamine H1 receptors.",
    pharmacodynamics: "Blocks allergic sneezing, rhinorrhea, and skin itching with minimal sedation.",
    absorption: "Rapidly absorbed within 1 hour.",
    distribution: "Low volume of distribution.",
    metabolism: "Minimal hepatic metabolism.",
    excretion: "Renal excretion (70% unchanged).",
    bioavailability: "~70%",
    half_life: "7 to 10 hours",
    indications: ["Allergic rhinitis", "Urticaria (hives)", "Allergic conjunctivitis"],
    contraindications: ["Severe renal failure (CrCl < 10 mL/min)"],
    warnings: ["May cause mild drowsiness; avoid driving until tolerated"],
    common_adverse_effects: ["Mild somnolence", "Dry mouth", "Fatigue"],
    pregnancy: "Category B / Preferred antihistamine in pregnancy.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "CET = Clean Elimination, Ten mg once daily.",
    key_suffix: "-irizine",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000010",
    generic_name: "Metformin",
    display_name: "Metformin Hydrochloride",
    active_ingredient: "Metformin",
    salt: "Biguanide",
    description: "First-line oral antihyperglycemic medicine for type 2 diabetes mellitus.",
    strength: "500 mg, 850 mg, 1000 mg",
    dosage_forms: ["Tablet"],
    routes: ["Oral"],
    mechanism_of_action: "Activates AMPK, decreasing hepatic gluconeogenesis and improving insulin sensitivity.",
    pharmacodynamics: "Lowers fasting and postprandial glucose without causing hypoglycemia as monotherapy.",
    absorption: "Incompletely absorbed from small intestine.",
    distribution: "Negligible protein binding.",
    metabolism: "Not metabolized by liver.",
    excretion: "Renal excretion unchanged.",
    bioavailability: "~50-60%",
    half_life: "4 to 6.5 hours",
    indications: ["Type 2 Diabetes Mellitus", "PCOS"],
    contraindications: ["Severe renal impairment (eGFR < 30 mL/min)", "Metabolic acidosis"],
    warnings: ["Hold 48h before iodinated contrast; risk of lactic acidosis if eGFR < 30"],
    common_adverse_effects: ["Diarrhea", "Nausea", "Metallic taste", "Abdominal bloating"],
    pregnancy: "Category B / Safe in pregnancy and gestational diabetes.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "MET = First-line Metabolic Miracle.",
    key_suffix: "-formin",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000011",
    generic_name: "Telmisartan",
    display_name: "Telmisartan",
    active_ingredient: "Telmisartan",
    salt: "Benzimidazole derivative",
    description: "Longest-acting ARB providing smooth 24-hour blood pressure control.",
    strength: "20 mg, 40 mg, 80 mg",
    dosage_forms: ["Tablet"],
    routes: ["Oral"],
    mechanism_of_action: "High affinity AT1 receptor antagonist with partial PPAR-gamma agonism.",
    pharmacodynamics: "Lowers peripheral resistance and improves metabolic parameters.",
    absorption: "Rapidly absorbed.",
    distribution: "Highly lipophilic; large volume of distribution.",
    metabolism: "Hepatic glucuronidation.",
    excretion: "Fecal/biliary excretion (>98%).",
    bioavailability: "~42-58%",
    half_life: "~24 hours",
    indications: ["Hypertension", "Cardiovascular risk reduction"],
    contraindications: ["Pregnancy (2nd and 3rd trimesters)", "Biliary obstruction"],
    warnings: ["Contraindicated in pregnancy; causes fetal toxicity"],
    common_adverse_effects: ["Dizziness", "Hyperkalemia"],
    pregnancy: "Contraindicated in pregnancy.",
    lactation: "Avoid during lactation.",
    memory_trick: "TELMI = Twenty-four hour Elimination half-life.",
    key_suffix: "-sartan",
    verification_status: "verified"
  },
  {
    id: "44444444-0000-0000-0000-000000000012",
    generic_name: "Ondansetron",
    display_name: "Ondansetron Hydrochloride",
    active_ingredient: "Ondansetron",
    salt: "Carbazolone derivative",
    description: "Potent 5-HT3 receptor antagonist antiemetic for nausea and vomiting.",
    strength: "4 mg, 8 mg",
    dosage_forms: ["Tablet", "Syrup", "Injection"],
    routes: ["Oral", "Intravenous"],
    mechanism_of_action: "Blocks serotonin 5-HT3 receptors in CTZ and vagal gut nerve terminals.",
    pharmacodynamics: "Suppresses emetic reflex from chemotherapy, gastroenteritis, or surgery.",
    absorption: "Rapidly absorbed from GI tract.",
    distribution: "Extensively distributed in tissues.",
    metabolism: "Extensively metabolized in liver.",
    excretion: "Renal and fecal excretion.",
    bioavailability: "~60%",
    half_life: "3 to 4 hours",
    indications: ["Nausea and vomiting", "Chemotherapy-induced emesis", "Post-operative vomiting"],
    contraindications: ["Concurrent apomorphine use", "Congenital Long QT syndrome"],
    warnings: ["Dose-dependent QT interval prolongation"],
    common_adverse_effects: ["Headache", "Constipation", "Flushing"],
    pregnancy: "Category B / Commonly used under specialist care.",
    lactation: "Compatible with breastfeeding.",
    memory_trick: "ONDAN = Out with Nausea, Direct Antagonist of 5-HT3.",
    key_suffix: "-setron",
    verification_status: "verified"
  }
];

const brands = [
  { id: "55555555-0000-0000-0000-000000000001", brand_name: "Dolo-650", medicine_id: "44444444-0000-0000-0000-000000000001", strength: "650 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000002", brand_name: "Crocin 650", medicine_id: "44444444-0000-0000-0000-000000000001", strength: "650 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000003", brand_name: "Brufen 400", medicine_id: "44444444-0000-0000-0000-000000000002", strength: "400 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000010", brand_name: "Pantocid 40", medicine_id: "44444444-0000-0000-0000-000000000003", strength: "40 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000016", brand_name: "Losacar 50", medicine_id: "44444444-0000-0000-0000-000000000004", strength: "50 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000015", brand_name: "Amlopres 5", medicine_id: "44444444-0000-0000-0000-000000000005", strength: "5 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000018", brand_name: "Atorva 10", medicine_id: "44444444-0000-0000-0000-000000000006", strength: "10 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000005", brand_name: "Novamox 500", medicine_id: "44444444-0000-0000-0000-000000000007", strength: "500 mg", dosage_form: "Capsule", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000007", brand_name: "Azithral 500", medicine_id: "44444444-0000-0000-0000-000000000008", strength: "500 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000012", brand_name: "Cetzine 10", medicine_id: "44444444-0000-0000-0000-000000000009", strength: "10 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000014", brand_name: "Glycomet 500", medicine_id: "44444444-0000-0000-0000-000000000010", strength: "500 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000017", brand_name: "Telma 40", medicine_id: "44444444-0000-0000-0000-000000000011", strength: "40 mg", dosage_form: "Tablet", route: "Oral", verified: true },
  { id: "55555555-0000-0000-0000-000000000011", brand_name: "Emeset 4", medicine_id: "44444444-0000-0000-0000-000000000012", strength: "4 mg", dosage_form: "Tablet", route: "Oral", verified: true }
];

async function insertAll() {
  console.log('⏳ Inserting medicines into Supabase...');
  
  const { data: medData, error: medError } = await supabase
    .from('medicines')
    .upsert(medicines, { onConflict: 'id' });

  if (medError) {
    console.error('❌ Medicines Insert Error:', medError.message);
    return;
  }
  console.log(`✅ Successfully added ${medicines.length} verified medicines!`);

  console.log('⏳ Inserting brand associations...');
  const { error: brandError } = await supabase
    .from('brands')
    .upsert(brands, { onConflict: 'id' });

  if (brandError) {
    console.error('❌ Brands Insert Error:', brandError.message);
    return;
  }
  console.log(`✅ Successfully added ${brands.length} Indian brands!`);
  console.log('🎉 Medicine database is ready! Open http://localhost:5173/medicines');
}

insertAll();
