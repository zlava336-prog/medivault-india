import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pill, Search, Plus, Edit, ShieldCheck, History, Trash2, CheckSquare, Square } from 'lucide-react';
import { medicineService } from '../../services/medicineService';
import { adminMedicineService } from '../../services/adminMedicineService';
import { Medicine, VerificationStatus } from '../../types/database';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AuditHistoryModal } from '../../features/admin/components/AuditHistoryModal';

export const AdminMedicinesListPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'All'>('All');
  const [auditMedId, setAuditMedId] = useState<string | null>(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await medicineService.getMedicines({
        search,
        verificationStatus: statusFilter === 'All' ? undefined : statusFilter,
        pageSize: 50,
      });
      setMedicines(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [search, statusFilter]);

  const handleSelectAll = () => {
    if (selectedIds.length === medicines.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(medicines.map((m) => m.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkStatus = async (status: VerificationStatus) => {
    if (!confirm(`Apply status '${status}' to ${selectedIds.length} medicines?`)) return;
    await adminMedicineService.bulkUpdateStatus(selectedIds, status);
    setSelectedIds([]);
    fetchList();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Admin', path: '/admin' }, { label: 'Medicines' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Pill className="w-6 h-6 text-teal-400" />
          Monograph Directory Admin
        </h1>
        <Link
          to="/admin/medicines/add"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Medicine
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search generic, salt, active ingredient..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="draft">Draft</option>
            <option value="under_review">Under Review</option>
            <option value="needs_update">Needs Update</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Bulk Action Toolbar */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 bg-teal-950/60 border border-teal-800/80 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
            <span className="text-teal-300 font-semibold">{selectedIds.length} items selected</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatus('verified')}
                className="px-2.5 py-1 bg-teal-600 text-white rounded-lg font-semibold"
              >
                Mark Verified
              </button>
              <button
                onClick={() => handleBulkStatus('archived')}
                className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg font-semibold"
              >
                Archive
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3.5 w-10">
                <button onClick={handleSelectAll}>
                  {selectedIds.length === medicines.length && medicines.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-teal-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                </button>
              </th>
              <th className="p-3.5">Generic Name</th>
              <th className="p-3.5">Salt / Active</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {medicines.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/40 transition">
                <td className="p-3.5">
                  <button onClick={() => handleToggleSelect(m.id)}>
                    {selectedIds.includes(m.id) ? (
                      <CheckSquare className="w-4 h-4 text-teal-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                </td>
                <td className="p-3.5 font-bold text-white">{m.generic_name}</td>
                <td className="p-3.5 text-slate-400 font-mono">{m.salt || 'N/A'}</td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    m.verification_status === 'verified'
                      ? 'bg-teal-950 text-teal-300 border border-teal-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {m.verification_status}
                  </span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/medicines/${m.id}/edit`}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg"
                      title="Edit Monograph"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => setAuditMedId(m.id)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg"
                      title="Audit History"
                    >
                      <History className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {auditMedId && (
        <AuditHistoryModal
          medicineId={auditMedId}
          isOpen={true}
          onClose={() => setAuditMedId(null)}
        />
      )}
    </div>
  );
};
