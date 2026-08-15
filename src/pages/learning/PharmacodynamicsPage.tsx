import React from 'react';
import { Zap, Activity } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DoseResponseGraph } from '../../features/learning/components/DoseResponseGraph';
import { FormulaCard } from '../../features/learning/components/FormulaCard';
import { PHARMACOLOGY_CONCEPTS } from '../../features/learning/data/learningData';
import { ConceptCard } from '../../features/learning/components/ConceptCard';

export const PharmacodynamicsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Learning Hub', path: '/learning' }, { label: 'Pharmacodynamics' }]} />

      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl space-y-2 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-400" />
          Pharmacodynamics (PD): Receptors & Drug Action
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Receptor binding, signal transduction, agonist/antagonist interactions, and dose-response dynamics.
        </p>
      </div>

      {/* Sigmoidal Dose Response Curve */}
      <DoseResponseGraph />

      {/* Therapeutic Index Formula */}
      {PHARMACOLOGY_CONCEPTS.therapeuticIndex.formula && (
        <FormulaCard
          title="Therapeutic Index (Safety Ratio)"
          expression={PHARMACOLOGY_CONCEPTS.therapeuticIndex.formula.expression}
          meaning={PHARMACOLOGY_CONCEPTS.therapeuticIndex.formula.meaning}
          variables={PHARMACOLOGY_CONCEPTS.therapeuticIndex.formula.variables}
          assumptions={PHARMACOLOGY_CONCEPTS.therapeuticIndex.formula.assumptions}
        />
      )}

      {/* Core PD Concepts */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Key Pharmacodynamic Distinctions
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <ConceptCard concept={PHARMACOLOGY_CONCEPTS.potencyVsEfficacy} />
          <ConceptCard concept={PHARMACOLOGY_CONCEPTS.therapeuticIndex} />
        </div>
      </div>
    </div>
  );
};
