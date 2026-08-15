import React from 'react';
import { Volume2 } from 'lucide-react';

export const PronunciationPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Volume2 className="w-5 h-5 text-cyan-400" /> Pronunciation Center
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Pronunciation audio synthesizer will connect in Phase 4.
    </div>
  </div>
);
