import React from 'react';
import { Settings } from 'lucide-react';

export const SettingsPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Settings className="w-5 h-5 text-slate-400" /> App Settings
    </h1>
    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-400">
      MediVault India v1.0.0 (Termux Build)
    </div>
  </div>
);
