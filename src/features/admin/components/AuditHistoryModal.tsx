import React, { useEffect, useState } from 'react';
import { History, X, Loader2 } from 'lucide-react';
import { adminMedicineService } from '../../../services/adminMedicineService';
import { AdminAuditLog } from '../../../types/database';

interface AuditModalProps {
  medicineId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditHistoryModal: React.FC<AuditModalProps> = ({ medicineId, isOpen, onClose }) => {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !medicineId) return;
    const fetchLogs = async () => {
      setLoading(true);
      const data = await adminMedicineService.getAuditLogs(medicineId);
      setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, [isOpen, medicineId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-white">Monograph Revision History</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {loading && (
            <div className="py-12 text-center">
              <Loader2 className="w-6 h-6 text-teal-400 animate-spin mx-auto" />
            </div>
          )}

          {!loading && logs.length === 0 && (
            <p className="text-center text-xs text-slate-500 py-8">No prior revisions logged.</p>
          )}

          {!loading && logs.map((log) => (
            <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-300">{log.action}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-slate-400 font-mono text-[11px]">
                Status changed: {log.new_data?.verification_status || 'updated'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
