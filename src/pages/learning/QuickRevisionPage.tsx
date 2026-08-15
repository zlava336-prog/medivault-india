import React from 'react';
import { Brain, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const QuickRevisionPage: React.FC = () => {
  const cards = [
    {
      title: 'ADME in 30 Seconds',
      points: [
        'A (Absorption): Un-ionized, lipophilic drugs pass fastest.',
        'D (Distribution): Vd indicates if drug is in blood or deep in tissues.',
        'M (Metabolism): Phase I oxidizes (CYP450); Phase II conjugates to make water-soluble.',
        'E (Excretion): Kidneys filter free drug; polar metabolites exit via urine.',
      ],
      tag: 'ADME',
    },
    {
      title: 'PK vs PD (Golden Rule)',
      points: [
        'PK = Body on Drug (Absorption, Distribution, Metabolism, Elimination).',
        'PD = Drug on Body (Receptors, Enzymes, Ion Channels, Therapeutic Effect).',
      ],
      tag: 'Core Concept',
    },
    {
      title: 'Potency vs Efficacy',
      points: [
        'Potency = How much dose is required (EC50).',
        'Efficacy = Maximal response ceiling (Emax).',
        'Clinical Rule: Efficacy is more important than potency.',
      ],
      tag: 'Pharmacodynamics',
    },
    {
      title: 'Agonist vs Antagonist',
      points: [
        'Agonist: Affinity + High Intrinsic Activity (activates receptor).',
        'Antagonist: Affinity + Zero Intrinsic Activity (blocks receptor).',
      ],
      tag: 'Receptors',
    },
    {
      title: '5 Half-Lives Rule',
      points: [
        'Takes ~4 to 5 half-lives to reach steady-state (Css) on regular dosing.',
        'Takes ~4 to 5 half-lives to eliminate >95% drug after stopping.',
      ],
      tag: 'Pharmacokinetics',
    },
    {
      title: 'Narrow Therapeutic Index (NTI)',
      points: [
        'NTI Drugs: Digoxin, Lithium, Warfarin, Theophylline, Phenytoin.',
        'Requires Therapeutic Drug Monitoring (TDM) to prevent fatal toxicity.',
      ],
      tag: 'Clinical Safety',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs items={[{ label: 'Learning Hub', path: '/learning' }, { label: 'High-Yield Revision' }]} />

      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800 rounded-3xl space-y-2 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          High-Yield B.Pharm & Exam Revision Cards
        </h1>
        <p className="text-xs text-slate-400">
          Rapid 30-second memory pearls and high-frequency pharmacology exam points.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-900/90 border border-slate-800 hover:border-purple-800/60 rounded-3xl space-y-3 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-white">{c.title}</h3>
                <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                  {c.tag}
                </span>
              </div>
              <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                {c.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
