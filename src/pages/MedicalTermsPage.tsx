import React from 'react';
import { BookOpen } from 'lucide-react';

export const MedicalTermsPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <BookOpen className="w-5 h-5 text-teal-400" /> Medical Terminology Dictionary
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Medical dictionary engine will connect in Phase 4.
    </div>
  </div>
);
