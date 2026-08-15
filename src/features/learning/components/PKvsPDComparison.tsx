import React from 'react';
import { ArrowLeftRight, Brain } from 'lucide-react';

export const PKvsPDComparison: React.FC = () => {
  return (
    <div className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-teal-400" />
          Pharmacokinetics (PK) vs. Pharmacodynamics (PD)
        </h3>
      </div>

      {/* Memory Tip Banner */}
      <div className="p-3 bg-gradient-to-r from-teal-950/50 via-purple-950/40 to-slate-950 border border-teal-800/60 rounded-2xl flex items-center gap-3 text-xs">
        <Brain className="w-5 h-5 text-teal-400 flex-shrink-0" />
        <div>
          <span className="font-bold text-white block">Universal Memory Rule:</span>
          <span className="text-teal-300 font-mono font-semibold">PK = Body on Drug (ADME)</span> &nbsp;|&nbsp;
          <span className="text-purple-300 font-mono font-semibold">PD = Drug on Body (Receptor Actions)</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <th className="p-3 font-bold text-white">Dimension</th>
              <th className="p-3 font-bold text-teal-300">Pharmacokinetics (PK)</th>
              <th className="p-3 font-bold text-purple-300">Pharmacodynamics (PD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            <tr>
              <td className="p-3 font-semibold text-white">Core Question</td>
              <td className="p-3 text-teal-200">What the body does to the drug?</td>
              <td className="p-3 text-purple-200">What the drug does to the body?</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">Scope & Stages</td>
              <td className="p-3">Absorption, Distribution, Metabolism, Excretion (ADME)</td>
              <td className="p-3">Receptors, Ion channels, Enzymes, Secondary messengers</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">Key Parameters</td>
              <td className="p-3 font-mono text-[11px] text-teal-300">t½, Clearance (CL), Vd, AUC, Bioavailability (F)</td>
              <td className="p-3 font-mono text-[11px] text-purple-300">Emax, EC50, Potency, Efficacy, Therapeutic Index (TI)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">Clinical Focus</td>
              <td className="p-3">Dose sizing, dosing interval (q8h, q24h), bioequivalence</td>
              <td className="p-3">Mechanism of action, therapeutic benefit, adverse effects</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
