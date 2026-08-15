import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, ShieldCheck, FileEdit, AlertTriangle, Archive, Upload, Plus, Database, Sparkles } from 'lucide-react';
import { adminMedicineService } from '../../services/adminMedicineService';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState({
    total: 0,
    verified: 0,
    drafts: 0,
    underReview: 0,
    needsUpdate: 0,
    archived: 0,
    missingAdme: 0,
    missingPk: 0,
    missingSafety: 0,
  });

  useEffect(() => {
    adminMedicineService.getQualityMetrics().then(setMetrics).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Admin Management' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-teal-400" />
            Medicine Management & Quality Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish, curate, verify, import and manage verified monographs without modifying React code
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/import"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" /> Batch CSV/JSON
          </Link>
          <Link
            to="/admin/medicines/add"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-500/20"
          >
            <Plus className="w-4 h-4" /> Add New Medicine
          </Link>
        </div>
      </div>

      {/* Primary KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium block">Total Monographs</span>
          <span className="text-2xl font-black text-white mt-1 block">{metrics.total}</span>
        </div>
        <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-800/60">
          <span className="text-xs text-teal-300 font-medium block flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
          <span className="text-2xl font-black text-teal-200 mt-1 block">{metrics.verified}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-amber-400 font-medium block flex items-center gap-1">
            <FileEdit className="w-3.5 h-3.5" /> Drafts
          </span>
          <span className="text-2xl font-black text-white mt-1 block">{metrics.drafts}</span>
        </div>
        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60">
          <span className="text-xs text-blue-300 font-medium block">Under Review</span>
          <span className="text-2xl font-black text-blue-200 mt-1 block">{metrics.underReview}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-rose-400 font-medium block flex items-center gap-1">
            <Archive className="w-3.5 h-3.5" /> Archived
          </span>
          <span className="text-2xl font-black text-slate-400 mt-1 block">{metrics.archived}</span>
        </div>
      </div>

      {/* Quality Gap Audit Alert */}
      <div className="p-5 bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-800/40 rounded-3xl space-y-3">
        <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Data Quality & Incomplete Records Audit
        </h3>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Missing ADME Profile</span>
            <span className="font-bold text-amber-300 text-base">{metrics.missingAdme} medicines</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Missing Pharmacokinetics</span>
            <span className="font-bold text-amber-300 text-base">{metrics.missingPk} medicines</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Missing Safety Warnings</span>
            <span className="font-bold text-amber-300 text-base">{metrics.missingSafety} medicines</span>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/admin/medicines"
          className="p-5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-3xl transition flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-base">Medicine Records Database</h3>
            <p className="text-xs text-slate-400 mt-1">Search, filter, bulk update status, and edit verified records</p>
          </div>
          <Pill className="w-6 h-6 text-teal-400" />
        </Link>
        <Link
          to="/admin/import"
          className="p-5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-3xl transition flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-base">CSV & JSON Batch Import Engine</h3>
            <p className="text-xs text-slate-400 mt-1">Upload files, preview diffs, detect duplicates, and commit</p>
          </div>
          <Upload className="w-6 h-6 text-blue-400" />
        </Link>
      </div>
    </div>
  );
};
