import React from 'react';
import { GraduationCap } from 'lucide-react';

export const MyLearningPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <GraduationCap className="w-5 h-5 text-teal-400" /> Learning Dashboard
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Progress analytics & streak metrics will connect in Phase 8.
    </div>
  </div>
);
