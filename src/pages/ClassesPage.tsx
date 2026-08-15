import React from 'react';
import { Layers } from 'lucide-react';

export const ClassesPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Layers className="w-5 h-5 text-teal-400" /> Drug Classifications
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Classification taxonomy hierarchy will connect in Phase 4.
    </div>
  </div>
);
