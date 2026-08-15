import React from 'react';
import { Activity, Calculator, LineChart } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AucGraph } from '../../features/learning/components/AucGraph';
import { FormulaCard } from '../../features/learning/components/FormulaCard';
import { PHARMACOLOGY_CONCEPTS } from '../../features/learning/data/learningData';
import { ConceptCard } from '../../features/learning/components/ConceptCard';

export const PharmacokineticsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Learning Hub', path: '/learning' }, { label: 'Pharmacokinetics' }]} />

      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl space-y-2 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-indigo-400" />
          Pharmacokinetics (PK): Mathematical Parameters
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Quantifying time-dependent drug absorption, plasma concentration curves, and elimination kinetics.
        </p>
      </div>

      {/* AUC Visual Graph */}
      <AucGraph />

      {/* Primary Mathematical Formulas */}
      <div className="grid sm:grid-cols-2 gap-4">
        {PHARMACOLOGY_CONCEPTS.halfLife.formula && (
          <FormulaCard
            title="Half-Life (t½) Equation"
            expression={PHARMACOLOGY_CONCEPTS.halfLife.formula.expression}
            meaning={PHARMACOLOGY_CONCEPTS.halfLife.formula.meaning}
            variables={PHARMACOLOGY_CONCEPTS.halfLife.formula.variables}
            assumptions={PHARMACOLOGY_CONCEPTS.halfLife.formula.assumptions}
          />
        )}

        {PHARMACOLOGY_CONCEPTS.volumeOfDistribution.formula && (
          <FormulaCard
            title="Volume of Distribution (Vd)"
            expression={PHARMACOLOGY_CONCEPTS.volumeOfDistribution.formula.expression}
            meaning={PHARMACOLOGY_CONCEPTS.volumeOfDistribution.formula.meaning}
            variables={PHARMACOLOGY_CONCEPTS.volumeOfDistribution.formula.variables}
            assumptions={PHARMACOLOGY_CONCEPTS.volumeOfDistribution.formula.assumptions}
          />
        )}
      </div>

      {/* Detailed Concept Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-teal-400" />
          High-Yield PK Parameters
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConceptCard concept={PHARMACOLOGY_CONCEPTS.bioavailability} />
          <ConceptCard concept={PHARMACOLOGY_CONCEPTS.halfLife} />
          <ConceptCard concept={PHARMACOLOGY_CONCEPTS.clearance} />
        </div>
      </div>
    </div>
  );
};
