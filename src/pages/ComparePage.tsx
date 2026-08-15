import React from 'react';
import { Scale } from 'lucide-react';

export const ComparePage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Scale className="w-5 h-5 text-teal-400" /> Medicine Comparison
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Comparison matrix tool will connect in Phase 6.
    </div>
  </div>
);
