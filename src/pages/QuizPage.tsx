import React from 'react';
import { HelpCircle } from 'lucide-react';

export const QuizPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <HelpCircle className="w-5 h-5 text-rose-400" /> Pharmacology Quizzes
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Quiz scoring & explanation engine will connect in Phase 7.
    </div>
  </div>
);
