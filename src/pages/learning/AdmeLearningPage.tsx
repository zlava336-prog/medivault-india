import React, { useState } from 'react';
import { Layers, ArrowDown, ShieldCheck, Lightbulb, Brain } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ExplainModal } from '../../features/medicines/components/ExplainModal';

export const AdmeLearningPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'A' | 'D' | 'M' | 'E'>('A');
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  const stages = [
    { key: 'A', name: 'Absorption', desc: 'Entry of drug into systemic circulation', icon: '🩸' },
    { key: 'D', name: 'Distribution', desc: 'Movement from blood into body tissues & cells', icon: '🫀' },
    { key: 'M', name: 'Metabolism', desc: 'Enzymatic biotransformation (Phase I & II)', icon: '🧪' },
    { key: 'E', name: 'Excretion', desc: 'Irreversible removal of drug from the body', icon: '🚽' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs items={[{ label: 'Learning Hub', path: '/learning' }, { label: 'ADME Pathways' }]} />

      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-teal-400" />
              ADME: What the Body Does to the Drug
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              The four foundational pharmacokinetic disposition processes determining drug levels over time.
            </p>
          </div>

          <button
            onClick={() => setIsExplainOpen(true)}
            className="px-4 py-2 bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Explain ADME (AI Tutor)</span>
          </button>
        </div>

        {/* Visual Flow Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {stages.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveStage(s.key as any)}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                activeStage === s.key
                  ? 'bg-teal-950 border-teal-500 shadow-lg shadow-teal-950/50'
                  : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{s.icon}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  activeStage === s.key ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.key}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs sm:text-sm text-white">{s.name}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-1">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stage Detail Content */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-4 shadow-lg">
        {activeStage === 'A' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-teal-300">A — Absorption Mechanisms & Bioavailability</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Absorption is the transfer of drug from the site of administration to the systemic circulation.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-white block">Key Factors Affecting Absorption:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li><strong>Lipid Solubility:</strong> Non-ionized lipophilic drugs pass biological membranes rapidly.</li>
                  <li><strong>Surface Area:</strong> Small intestine has vast surface area (villi/microvilli).</li>
                  <li><strong>First-Pass Metabolism:</strong> Gut and liver enzymes eliminate a portion before blood entry.</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-white block">Transport Pathways:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li><strong>Passive Diffusion:</strong> Follows concentration gradient; no energy required.</li>
                  <li><strong>Active Transport:</strong> Carrier mediated against gradient using ATP (e.g. Levodopa).</li>
                  <li><strong>Facilitated Diffusion:</strong> Carrier mediated down concentration gradient.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeStage === 'D' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-indigo-300">D — Distribution & Biological Barriers</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Distribution is the reversible delivery of drug from the systemic circulation into extracellular fluid and tissues.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-white block">Plasma Protein Binding:</strong>
                <p className="text-[11px] text-slate-300">
                  Drugs bind reversibly to albumin (acidic drugs) and alpha-1-acid glycoprotein (basic drugs). Only <strong>free (unbound)</strong> drug molecules can cross membranes to produce pharmacological activity or undergo metabolism.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-white block">Blood-Brain Barrier (BBB):</strong>
                <p className="text-[11px] text-slate-300">
                  Continuous tight endothelial junctions with P-glycoprotein efflux pumps restrict entry of hydrophilic, polar, or ionized compounds into the central nervous system.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStage === 'M' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-amber-300">M — Metabolism (Biotransformation)</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              The chemical modification of drugs by specialized enzymes to facilitate excretion by rendering molecules more hydrophilic (water-soluble).
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-amber-300 block">Phase I Functionalization:</strong>
                <p className="text-[11px] text-slate-300">
                  Oxidation, reduction, and hydrolysis primarily mediated by Cytochrome P450 (CYP3A4, CYP2D6, CYP2C9) enzymes, exposing polar reactive functional groups (-OH, -NH2, -COOH).
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-amber-300 block">Phase II Conjugation:</strong>
                <p className="text-[11px] text-slate-300">
                  Attachment of endogenous hydrophilic moieties (Glucuronidation, Sulfation, Glutathione conjugation) producing inactive, highly water-soluble conjugates ready for renal filtration.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStage === 'E' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-rose-300">E — Excretion & Renal Clearance</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              The irreversible physical removal of unchanged drug or polar metabolites from the body, primarily via kidneys.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-white block text-[11px]">1. Glomerular Filtration:</strong>
                <p className="text-[10px] text-slate-400">Free, unbound drugs &lt;60 kDa pass through glomerular basement membrane.</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-white block text-[11px]">2. Active Tubular Secretion:</strong>
                <p className="text-[10px] text-slate-400">Carrier pumps (OAT / OCT) actively transport acids and bases into tubular lumen.</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-white block text-[11px]">3. Tubular Reabsorption:</strong>
                <p className="text-[10px] text-slate-400">Lipophilic un-ionized drugs reabsorb back into blood; influenced by urinary pH.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ExplainModal
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        title="ADME Pharmacology System"
        entityType="general"
        simpleExplanation="ADME represents Absorption, Distribution, Metabolism, and Excretion — the four disposition processes dictating drug concentration in the body over time."
        clinicalExplanation="ADME parameters determine pharmacokinetic profiles, dose sizing, bioequivalence, and therapeutic dosing intervals."
        hinglishExplanation="ADME ka matlab hai dawa body me kaise enter karti hai (Absorption), kaise failti hai (Distribution), kaise pachti hai (Metabolism), aur kaise bahar nikalti hai (Excretion)."
      />
    </div>
  );
};
