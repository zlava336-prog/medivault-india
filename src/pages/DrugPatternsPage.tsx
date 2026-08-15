import React, { useState } from 'react';
import { Brain, AlertTriangle, Search } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const DrugPatternsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const patterns = [
    {
      suffix: '-pril',
      drugClass: 'ACE Inhibitors',
      examples: 'Enalapril, Ramipril, Lisinopril, Captopril',
      trick: 'PRIL = Pressure Reducing Inhibitor of L-angiotensin converting enzyme.',
      exceptions: 'Note: Enalaprilat is the active metabolite. Suffix pattern does not guarantee identical metabolic clearance.',
    },
    {
      suffix: '-sartan',
      drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
      examples: 'Losartan, Telmisartan, Valsartan, Candesartan',
      trick: 'SARTAN = Stops Angiotensin Receptor Type 1 Action.',
      exceptions: 'All share absolute contraindication in pregnancy (fetotoxicity).',
    },
    {
      suffix: '-olol',
      drugClass: 'Beta-Adrenergic Blockers',
      examples: 'Atenolol, Metoprolol, Propranolol, Bisoprolol',
      trick: 'OLOL = Slows the heart (Lowers heart rate and BP).',
      exceptions: 'Carvedilol and Labetalol have dual alpha + beta blocking mechanisms.',
    },
    {
      suffix: '-statin',
      drugClass: 'HMG-CoA Reductase Inhibitors (Lipid Lowering)',
      examples: 'Atorvastatin, Rosuvastatin, Simvastatin, Pravastatin',
      trick: 'STATIN = Stops Total Arterial Thrombosis, Inhibits Next MI.',
      exceptions: 'Short-acting statins (simvastatin) require evening dosing; atorvastatin can be taken anytime.',
    },
    {
      suffix: '-prazole',
      drugClass: 'Proton Pump Inhibitors (PPIs)',
      examples: 'Omeprazole, Pantoprazole, Rabeprazole, Esomeprazole',
      trick: 'PRAZOLE = Proton Razor (Cuts H+/K+ ATPase pump acid production).',
      exceptions: 'Aripiprazole is an antipsychotic (NOT a PPI - verify class carefully!).',
    },
    {
      suffix: '-cillin',
      drugClass: 'Penicillin-derived Antibiotics',
      examples: 'Amoxicillin, Ampicillin, Piperacillin',
      trick: 'CILLIN = Cell wall synthesis Inhibition and Lysis.',
      exceptions: 'Vulnerable to beta-lactamase degradation unless combined with inhibitor (e.g. clavulanate).',
    },
    {
      suffix: '-floxacin',
      drugClass: 'Fluoroquinolones (Antibiotics)',
      examples: 'Ciprofloxacin, Levofloxacin, Moxifloxacin',
      trick: 'FLOXACIN = Flips DNA Gyrase off.',
      exceptions: 'Risk of tendonitis/tendon rupture and QT prolongation; restricted in pediatric growth plates.',
    },
    {
      suffix: '-tidine',
      drugClass: 'H2 Receptor Antagonists',
      examples: 'Ranitidine, Famotidine, Cimetidine',
      trick: 'TIDINE = Two (H2) Inhibition Decreases Ingestion of acid.',
      exceptions: 'Cimetidine is a potent inhibitor of multiple CYP450 enzymes causing severe interactions.',
    },
    {
      suffix: '-caine',
      drugClass: 'Local Anesthetics',
      examples: 'Lidocaine, Bupivacaine, Procaine, Benzocaine',
      trick: 'CAINE = Cuts Axon Ionic Nerve Entrances (Sodium Channel Blocker).',
      exceptions: 'Cocaine is also in this chemical lineage but has unique central sympathomimetic actions.',
    },
  ];

  const filtered = patterns.filter((p) =>
    p.suffix.toLowerCase().includes(search.toLowerCase()) ||
    p.drugClass.toLowerCase().includes(search.toLowerCase()) ||
    p.examples.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs items={[{ label: 'Drug Patterns' }]} />

      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          Drug Name Suffix Patterns & Mnemonics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          High-yield pharmacological naming stems and memory associations for healthcare students
        </p>
      </div>

      <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block text-amber-300">Educational Learning Aid:</strong>
          Drug-name patterns are memory aids. They are not absolute classification rules and exceptions exist. Always verify actual pharmacology in the monograph record.
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search suffix stem (e.g., -pril, -sartan, -statin)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs sm:text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.suffix}
            className="p-5 bg-slate-900/90 border border-slate-800 hover:border-purple-800/60 rounded-3xl space-y-3 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold text-sm rounded-xl">
                {item.suffix}
              </span>
              <div>
                <h3 className="font-bold text-sm text-white">{item.drugClass}</h3>
                <span className="text-[10px] text-slate-400">Suffix Stem</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold">Representative Drugs:</span>
                <span className="text-slate-200 font-mono">{item.examples}</span>
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl">
                <span className="text-purple-300 block font-bold mb-0.5">🧠 Memory Association:</span>
                <p className="text-purple-200">{item.trick}</p>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                {item.exceptions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
