import React from 'react';
import { Info } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="space-y-4 max-w-2xl">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Info className="w-5 h-5 text-teal-400" /> About MediVault India
    </h1>
    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
      <p>
        MediVault India is an educational pharmacology reference platform engineered to structure medicine knowledge, therapeutic classifications, and mechanism insights for students, healthcare learners, and medical enthusiasts.
      </p>
      <p className="text-slate-500">
        Disclaimer: Information is sourced from verified pharmacopoeial and pharmacological references for educational purposes only.
      </p>
    </div>
  </div>
);
