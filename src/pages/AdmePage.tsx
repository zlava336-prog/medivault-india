import React from 'react';
import { Activity } from 'lucide-react';

export const AdmePage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Activity className="w-5 h-5 text-indigo-400" /> ADME & Pharmacokinetics
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      ADME interactive visual model will connect in Phase 6.
    </div>
  </div>
);
