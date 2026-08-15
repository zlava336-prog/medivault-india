export interface ConceptData {
  id: string;
  title: string;
  category: 'adme' | 'pk' | 'pd' | 'parameters' | 'receptors';
  definition: string;
  simpleExplanation: string;
  studentExplanation: string;
  hinglishExplanation: string;
  formula?: {
    expression: string;
    meaning: string;
    variables: { symbol: string; meaning: string }[];
    assumptions?: string;
  };
  importantPoints: string[];
  memoryTrick?: string;
  relatedConcepts: { name: string; link: string }[];
  source: string;
  lastVerified: string;
}

export const PHARMACOLOGY_CONCEPTS: Record<string, ConceptData> = {
  absorption: {
    id: 'absorption',
    title: 'Absorption',
    category: 'adme',
    definition: 'The process by which unchanged drug proceeds from the site of administration to the systemic circulation.',
    simpleExplanation: 'Dawa administration site (jaise pet ya skin) se blood stream me kitni aur kis speed se enter hoti hai.',
    studentExplanation: 'Transport of drug across biological membranes into systemic blood. Governed by Fick’s Law, ionization (Henderson-Hasselbalch), lipid solubility, surface area, and gastrointestinal transit.',
    hinglishExplanation: 'Absorption ka matlab dawa ka shareer ke blood circulation me dakhil hona. IV injection me absorption 100% (instant) hota hai, jabki oral tablets me solubility aur gastric emptying par depend karta hai.',
    importantPoints: [
      'Passive diffusion is the primary absorption mechanism for most uncharged lipophilic drugs.',
      'Only un-ionized (uncharged) drug molecules readily cross lipid bilayer membranes.',
      'First-pass metabolism in gut wall and liver directly reduces oral absorption efficiency.',
    ],
    memoryTrick: 'A = Arrival into the bloodstream.',
    relatedConcepts: [
      { name: 'Bioavailability (F)', link: '/learning/pharmacokinetics' },
      { name: 'First-Pass Metabolism', link: '/learning/adme' },
      { name: 'Distribution', link: '/learning/adme' },
    ],
    source: 'Goodman & Gilman’s Pharmacological Basis of Therapeutics',
    lastVerified: 'August 2026',
  },
  bioavailability: {
    id: 'bioavailability',
    title: 'Bioavailability (F)',
    category: 'parameters',
    definition: 'The fraction of an administered dose of unchanged drug that reaches the systemic circulation.',
    simpleExplanation: 'Khaayi gayi dawa ka kitna percent hissa actually blood me bina destroy hue pahunchta hai.',
    studentExplanation: 'A quantitative pharmacokinetic parameter denoting systemic drug exposure. Intravenous administration yields F = 1.0 (100%). Oral bioavailability is attenuated by incomplete dissolution, GI degradation, and hepatic first-pass extraction.',
    hinglishExplanation: 'Bioavailability batata hai ki kitni dawa blood tak pahunchi. Agar 500mg tablet lene ke baad 400mg blood me pahunche, to oral bioavailability 80% (F = 0.8) hogi.',
    formula: {
      expression: 'F = (AUC_oral / Dose_oral) / (AUC_iv / Dose_iv)',
      meaning: 'Fraction of drug reaching systemic circulation relative to complete intravenous availability.',
      variables: [
        { symbol: 'F', meaning: 'Bioavailability fraction (0 to 1.0)' },
        { symbol: 'AUC', meaning: 'Area under the plasma concentration-time curve' },
        { symbol: 'Dose', meaning: 'Administered dose quantity' },
      ],
      assumptions: 'Assumes linear first-order elimination kinetics between comparative oral and IV doses.',
    },
    importantPoints: [
      'For IV injections, F = 1.0 by definition.',
      'Determined experimentally by comparing oral AUC with intravenous AUC.',
      'Critical metric for establishing bioequivalence between Generic and Brand-name formulations.',
    ],
    memoryTrick: 'F = Fraction of Full dose reaching Free circulation.',
    relatedConcepts: [
      { name: 'AUC', link: '/learning/pharmacokinetics' },
      { name: 'Clearance', link: '/learning/pharmacokinetics' },
      { name: 'Absorption', link: '/learning/adme' },
    ],
    source: 'Katzung Basic & Clinical Pharmacology',
    lastVerified: 'August 2026',
  },
  volumeOfDistribution: {
    id: 'volumeOfDistribution',
    title: 'Volume of Distribution (Vd)',
    category: 'parameters',
    definition: 'The theoretical volume of fluid into which the total amount of drug in the body would need to be dissolved to equal the plasma concentration.',
    simpleExplanation: 'Yeh ek theoretical number hai jo batata hai ki dawa blood ke andar hai ya body ke tissues (cells, fats) me gehraayi tak fail chuki hai.',
    studentExplanation: 'Apparent volume quantifying extravascular distribution. Drugs restricted to vascular compartment (heparin, warfarin) exhibit small Vd (~3-5 L in humans), whereas lipophilic tissue-bound drugs (chloroquine, amiodarone) have huge Vd exceeding total body water (>1000 L).',
    hinglishExplanation: 'Vd koi real physical body volume nahi hai. Agar Vd chhota hai to dawa blood me zyada rehti hai; agar Vd bohot bada hai to dawa body ke tissues aur organs me store ho chuki hai.',
    formula: {
      expression: 'V_d = Amount of Drug in Body (Dose) / Plasma Drug Concentration (C_p)',
      meaning: 'Apparent distribution space relative to measured intravascular concentration.',
      variables: [
        { symbol: 'V_d', meaning: 'Volume of distribution (Litres or L/kg)' },
        { symbol: 'Dose', meaning: 'Total mass of drug present in body' },
        { symbol: 'C_p', meaning: 'Drug concentration measured in blood plasma' },
      ],
      assumptions: 'Assumes instantaneous equilibrium in single compartment model.',
    },
    importantPoints: [
      'Vd is an apparent, theoretical volume — not a real anatomical fluid volume.',
      'High plasma protein binding produces low Vd (drug remains inside blood vessels).',
      'High tissue binding and high lipophilicity produce high Vd.',
    ],
    memoryTrick: 'Vd = Vastness of Distribution across tissues.',
    relatedConcepts: [
      { name: 'Half-life (t1/2)', link: '/learning/pharmacokinetics' },
      { name: 'Protein Binding', link: '/learning/adme' },
      { name: 'Clearance', link: '/learning/pharmacokinetics' },
    ],
    source: 'Applied Biopharmaceutics & Pharmacokinetics (Shargel)',
    lastVerified: 'August 2026',
  },
  halfLife: {
    id: 'halfLife',
    title: 'Elimination Half-Life (t½)',
    category: 'parameters',
    definition: 'The time required for the concentration of a drug in plasma to decrease by 50%.',
    simpleExplanation: 'Blood me dawa ki concentration aadhi (50%) rehne me lagne wala samay.',
    studentExplanation: 'Time required for plasma concentration to drop by half in first-order elimination. It takes approximately 4 to 5 half-lives for a drug to reach steady state during continuous dosing, and ~5 half-lives for complete elimination upon cessation.',
    hinglishExplanation: 'Agar kisi medicine ka half-life 2 ghante hai, to 100mg se 50mg hone me 2 ghante lagenge, aur agle 2 ghante me 25mg bachegi. Lagbhag 5 half-lives me dawa body se 97% clear ho jati hai.',
    formula: {
      expression: 't_{1/2} = (0.693 × V_d) / Clearance',
      meaning: 'Mathematical relationship linking half-life directly to volume of distribution and inversely to clearance.',
      variables: [
        { symbol: 't_{1/2}', meaning: 'Elimination half-life (hours/minutes)' },
        { symbol: '0.693', meaning: 'Natural logarithm of 2 (ln 2)' },
        { symbol: 'V_d', meaning: 'Volume of distribution' },
        { symbol: 'Clearance', meaning: 'Total systemic clearance' },
      ],
      assumptions: 'Applies to first-order linear elimination kinetics.',
    },
    importantPoints: [
      'Takes 4 to 5 half-lives to reach steady-state concentration (Css) with repeated dosing.',
      'Takes 4 to 5 half-lives to eliminate >95% of the drug from the body.',
      'Determines the necessary dosing frequency (e.g. once daily vs every 6 hours).',
    ],
    memoryTrick: 't1/2 = Time to Half-concentration; 5 half-lives = Clean Out.',
    relatedConcepts: [
      { name: 'Clearance', link: '/learning/pharmacokinetics' },
      { name: 'Volume of Distribution', link: '/learning/pharmacokinetics' },
      { name: 'Steady State', link: '/learning/pharmacokinetics' },
    ],
    source: 'Rang & Dale’s Pharmacology',
    lastVerified: 'August 2026',
  },
  clearance: {
    id: 'clearance',
    title: 'Total Body Clearance (CL)',
    category: 'parameters',
    definition: 'The volume of blood or plasma completely cleared of drug per unit time.',
    simpleExplanation: 'Shareer ke organs (kidney aur liver) per minute kitna blood dawa se completely saaf karte hain.',
    studentExplanation: 'Intrinsic elimination parameter representing the proportionality factor between rate of drug elimination and plasma concentration. Total CL = CL_renal + CL_hepatic + CL_other.',
    hinglishExplanation: 'Clearance speed batati hai ki per minute kitna blood volume clean ho raha hai (e.g. mL/min). Renal failure ya liver disease me clearance kam ho jati hai, jisse dawa body me accumulate hone lagti hai.',
    formula: {
      expression: 'Clearance = Rate of Elimination / C_p = (Dose × F) / AUC',
      meaning: 'Volume of biological fluid completely purged of drug per unit time.',
      variables: [
        { symbol: 'CL', meaning: 'Systemic clearance (mL/min or L/hr)' },
        { symbol: 'Rate of Elimination', meaning: 'Mass of drug cleared per unit time (mg/hr)' },
        { symbol: 'C_p', meaning: 'Plasma drug concentration' },
      ],
      assumptions: 'Assumes first-order elimination and uniform systemic perfusion.',
    },
    importantPoints: [
      'Clearance is additive: Total CL = Renal CL + Hepatic CL + Pulmonary/Biliary CL.',
      'Remains constant in first-order elimination, regardless of drug concentration.',
      'Determines the maintenance dose required to sustain steady-state concentration.',
    ],
    memoryTrick: 'CL = Cleansing Liter rate per hour.',
    relatedConcepts: [
      { name: 'Half-life', link: '/learning/pharmacokinetics' },
      { name: 'AUC', link: '/learning/pharmacokinetics' },
      { name: 'Excretion', link: '/learning/adme' },
    ],
    source: 'Goodman & Gilman’s Pharmacological Basis of Therapeutics',
    lastVerified: 'August 2026',
  },
  potencyVsEfficacy: {
    id: 'potencyVsEfficacy',
    title: 'Potency vs Efficacy',
    category: 'pd',
    definition: 'Potency is the concentration (EC50) required to produce 50% of maximum effect. Efficacy (Emax) is the maximum ceiling response a drug can produce.',
    simpleExplanation: 'Potency ka matlab hai dawa ki dose (kitne mg me asar hua). Efficacy ka matlab hai dawa ka maximum effect (kitna zabardast asar hua).',
    studentExplanation: 'Potency is inversely proportional to EC50 (shifts curve left or right). Efficacy is the intrinsic ability to produce maximal biological response (shifts curve up or down). Clinically, Efficacy is far more important than Potency.',
    hinglishExplanation: 'Potency batati hai ki kam dose me asar hua ya zyada dose me. Efficacy batati hai ki dawa ka maximum peak effect kitna strong hai. Fentanyl morphine se zyada POTENT hai (micrograms me kaam karta hai), lekin dono ki maximum pain relief EFFICACY barabar hai.',
    importantPoints: [
      'Potency is dictated by drug-receptor affinity and measured by EC50.',
      'Efficacy (Emax) reflects intrinsic activity after binding.',
      'A more potent drug is NOT necessarily a better or more effective clinical agent.',
    ],
    memoryTrick: 'Potency = Pill weight (dose); Efficacy = Effect ceiling.',
    relatedConcepts: [
      { name: 'Dose-Response Curve', link: '/learning/pharmacodynamics' },
      { name: 'Agonists & Antagonists', link: '/learning/pharmacodynamics' },
      { name: 'Receptors', link: '/learning/pharmacodynamics' },
    ],
    source: 'Katzung Basic & Clinical Pharmacology',
    lastVerified: 'August 2026',
  },
  therapeuticIndex: {
    id: 'therapeuticIndex',
    title: 'Therapeutic Index (TI)',
    category: 'pd',
    definition: 'The ratio between the toxic median dose (TD50) and the therapeutic median effective dose (ED50), reflecting drug safety margin.',
    simpleExplanation: 'Dawa ka safety margin. Jitna bada ratio, dawa utni zyada safe; jitna chhota ratio, utna poisoning ka khatra.',
    studentExplanation: 'A quantitative indicator of drug safety window. Narrow Therapeutic Index (NTI) drugs (e.g. Digoxin, Lithium, Warfarin, Theophylline) require Therapeutic Drug Monitoring (TDM) to prevent toxicity.',
    hinglishExplanation: 'TI = TD50 / ED50. Agar kisi dawa ka TI bohot kam hai (narrow window), to halki si bhi extra dose patient ke liye toxic ho sakti hai. Isliye blood tests se monitoring zaroori hoti hai.',
    formula: {
      expression: 'TI = TD_{50} / ED_{50}',
      meaning: 'Ratio of toxic median dose to therapeutic median effective dose in population trials.',
      variables: [
        { symbol: 'TI', meaning: 'Therapeutic Index (Unitless ratio)' },
        { symbol: 'TD_{50}', meaning: 'Median toxic dose producing adverse effect in 50% subjects' },
        { symbol: 'ED_{50}', meaning: 'Median effective dose producing desired therapeutic effect in 50% subjects' },
      ],
      assumptions: 'Derived from standardized animal/clinical dose-response quantile curves.',
    },
    importantPoints: [
      'High TI (e.g., Penicillin, Paracetamol) indicates a wide, forgiving safety margin.',
      'Narrow TI (e.g., Digoxin, Phenytoin, Lithium) carries high risk of accidental toxicity.',
      'Does not eliminate the need for clinical vigilance and organ function checks.',
    ],
    memoryTrick: 'TI = Tolerability / Toxic Interval.',
    relatedConcepts: [
      { name: 'Dose-Response Curve', link: '/learning/pharmacodynamics' },
      { name: 'Potency & Efficacy', link: '/learning/pharmacodynamics' },
      { name: 'Clearance', link: '/learning/pharmacokinetics' },
    ],
    source: 'Goodman & Gilman’s Pharmacological Basis of Therapeutics',
    lastVerified: 'August 2026',
  },
};
