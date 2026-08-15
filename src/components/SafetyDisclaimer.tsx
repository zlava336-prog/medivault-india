import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SafetyDisclaimer: React.FC = () => {
  return (
    <div className="bg-amber-950/40 border-b border-amber-800/40 px-4 py-2 text-xs text-amber-300">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <p className="leading-tight">
          <strong className="font-semibold">Educational Reference Only:</strong> MediVault India does not provide medical advice or prescriptions. Always consult a licensed healthcare professional.
        </p>
      </div>
    </div>
  );
};
