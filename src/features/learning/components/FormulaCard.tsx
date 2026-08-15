import React from 'react';
import { Calculator, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface FormulaCardProps {
  title: string;
  expression: string;
  meaning: string;
  variables: { symbol: string; meaning: string }[];
  assumptions?: string;
  safetyNote?: string;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  title,
  expression,
  meaning,
  variables,
  assumptions,
  safetyNote = 'Educational reference formula. Clinical drug regimens require professional assessment and Therapeutic Drug Monitoring (TDM).',
}) => {
  return (
    <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
            <Calculator className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
        </div>
        <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
          PK Formula
        </span>
      </div>

      {/* Formula Display Box */}
      <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-center overflow-x-auto">
        <span className="font-mono text-sm sm:text-base font-extrabold text-teal-300 tracking-wider">
          {expression}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">{meaning}</p>

      {/* Variable Definitions */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Variable Glossary:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {variables.map((v, i) => (
            <div key={i} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs flex items-center gap-2">
              <span className="font-mono font-bold text-indigo-300">{v.symbol}:</span>
              <span className="text-slate-300 text-[11px]">{v.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {assumptions && (
        <p className="text-[11px] text-slate-400 italic bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/40">
          <strong>Pharmacokinetic Assumptions:</strong> {assumptions}
        </p>
      )}

      {/* Safety Notice */}
      <div className="p-2.5 bg-amber-950/30 border border-amber-800/40 rounded-xl text-[10px] text-amber-300 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <span>{safetyNote}</span>
      </div>
    </div>
  );
};
