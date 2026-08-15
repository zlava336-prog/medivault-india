import React from 'react';
import { Activity } from 'lucide-react';

export const DoseResponseGraph: React.FC = () => {
  return (
    <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" />
          <h4 className="font-bold text-xs sm:text-sm text-white">
            Log Dose-Response Curve (Sigmoidal Pharmacodynamics)
          </h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Illustrative educational graph</span>
      </div>

      {/* SVG Sigmoidal Curve */}
      <div className="w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 500 240" className="w-full h-full text-slate-400">
          {/* Grid lines */}
          <line x1="50" y1="30" x2="470" y2="30" stroke="#334155" strokeDasharray="3 3" />
          <line x1="50" y1="115" x2="470" y2="115" stroke="#334155" strokeDasharray="3 3" />
          <line x1="50" y1="200" x2="470" y2="200" stroke="#475569" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="1.5" />

          {/* Axes labels */}
          <text x="260" y="232" fill="#94a3b8" fontSize="11" textAnchor="middle">Log Drug Dose / Concentration [log C]</text>
          <text x="18" y="115" fill="#94a3b8" fontSize="11" transform="rotate(-90 18,115)" textAnchor="middle">% Biological Response</text>

          {/* Emax Marker */}
          <text x="40" y="34" fill="#2dd4bf" fontSize="10" fontWeight="bold" textAnchor="end">100% (Emax)</text>
          {/* 50% Marker */}
          <text x="40" y="118" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="end">50% (EC50)</text>

          {/* Sigmoid Curve (Full Agonist) */}
          <path
            d="M 60 198 C 160 198, 200 115, 260 115 C 320 115, 360 32, 450 32"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="3.5"
          />

          {/* EC50 Drop line */}
          <line x1="260" y1="115" x2="260" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="260" cy="115" r="5" fill="#f59e0b" />
          <text x="260" y="215" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">EC50 (Potency)</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
          <strong className="text-teal-300 block font-semibold">Emax (Maximal Efficacy):</strong>
          Peak upper plateau indicating maximal receptor activation.
        </div>
        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
          <strong className="text-amber-300 block font-semibold">EC50 (Potency Indicator):</strong>
          Concentration producing 50% of Emax; lower EC50 = higher potency.
        </div>
      </div>
    </div>
  );
};
