import React from 'react';
import { Brain } from 'lucide-react';

export const DrugMemoryPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Brain className="w-5 h-5 text-purple-400" /> Drug Memory & Mnemonics
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Drug suffix & mnemonic index will connect in Phase 7.
    </div>
  </div>
);
