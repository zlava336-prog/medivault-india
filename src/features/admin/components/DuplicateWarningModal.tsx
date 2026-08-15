import React from 'react';
import { AlertTriangle, X, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Medicine } from '../../../types/database';

interface DuplicateModalProps {
  duplicates: Medicine[];
  onProceed: () => void;
  onCancel: () => void;
}

export const DuplicateWarningModal: React.FC<DuplicateModalProps> = ({
  duplicates,
  onProceed,
  onCancel,
}) => {
  if (duplicates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-amber-800/80 rounded-3xl p-5 space-y-4 shadow-2xl animate-in fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Possible Duplicate Record Found</h3>
            <p className="text-xs text-slate-400">Medicines with matching generic or salt name already exist.</p>
          </div>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {duplicates.map((m) => (
            <div key={m.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-white block">{m.generic_name}</span>
                <span className="text-[11px] font-mono text-slate-400">Salt: {m.salt || 'N/A'}</span>
              </div>
              <Link
                to={`/admin/medicines/${m.id}/edit`}
                target="_blank"
                className="text-xs text-teal-400 hover:underline flex items-center gap-1"
              >
                Inspect <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Go Back & Review
          </button>
          <button
            type="button"
            onClick={onProceed}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl"
          >
            Proceed Anyway
          </button>
        </div>
      </div>
    </div>
  );
};
