import React from 'react';
import { LineChart } from 'lucide-react';

export const AucGraph: React.FC = () => {
  return (
    <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-xs sm:text-sm text-white">
            Plasma Concentration vs. Time Profile (AUC, Cmax, Tmax)
          </h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Illustrative educational model</span>
      </div>

      {/* SVG Concentration Curve */}
      <div className="w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 500 240" className="w-full h-full text-slate-400">
          {/* Grid lines */}
          <line x1="50" y1="200" x2="470" y2="200" stroke="#475569" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="1.5" />

          {/* Axes labels */}
          <text x="260" y="232" fill="#94a3b8" fontSize="11" textAnchor="middle">Time after Dose (Hours) [t]</text>
          <text x="18" y="115" fill="#94a3b8" fontSize="11" transform="rotate(-90 18,115)" textAnchor="middle">Plasma Drug Conc. (Cp)</text>

          {/* Shaded AUC Area */}
          <path
            d="M 50 200 Q 150 20 200 45 T 460 200 Z"
            fill="rgba(99, 102, 241, 0.15)"
          />

          {/* Concentration Curve */}
          <path
            d="M 50 200 Q 150 20 200 45 T 460 200"
            fill="none"
            stroke="#818cf8"
            strokeWidth="3.5"
          />

          {/* Peak Cmax / Tmax Indicator */}
          <circle cx="175" cy="40" r="5" fill="#38bdf8" />
          <line x1="175" y1="40" x2="175" y2="200" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50" y1="40" x2="175" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

          <text x="180" y="32" fill="#38bdf8" fontSize="10" fontWeight="bold">Cmax (Peak)</text>
          <text x="175" y="215" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Tmax</text>
          <text x="270" y="140" fill="#a5b4fc" fontSize="12" fontWeight="bold">AUC (Exposure)</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400">
        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
          <strong className="text-cyan-300 block font-semibold">Cmax:</strong>
          Highest observed drug concentration in blood.
        </div>
        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
          <strong className="text-cyan-300 block font-semibold">Tmax:</strong>
          Time taken to reach peak concentration (absorption rate indicator).
        </div>
        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
          <strong className="text-indigo-300 block font-semibold">AUC:</strong>
          Total systemic drug exposure over entire time course.
        </div>
      </div>
    </div>
  );
};
