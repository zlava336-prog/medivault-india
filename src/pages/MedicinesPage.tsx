import React, { useState, useEffect } from 'react';
import { Pill, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { medicineService } from '../services/medicineService';
import { Medicine, VerificationStatus } from '../types/database';
import { MedicineCard } from '../features/medicines/components/MedicineCard';

export const MedicinesPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [search, setSearch] = useState('');
  const [dosageForm, setDosageForm] = useState('All');
  const [route, setRoute] = useState('All');
  const [status, setStatus] = useState<VerificationStatus>('verified');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'recently_added' | 'recently_updated'>('name_asc');

  const dosageOptions = ['All', 'Tablet', 'Capsule', 'Syrup', 'Inhaler', 'IV Infusion', 'Injection'];
  const routeOptions = ['All', 'Oral', 'Intravenous', 'Inhalation', 'Topical'];

  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await medicineService.getMedicines({
        search,
        dosageForm,
        route,
        verificationStatus: status,
        sortBy,
        page: currentPage,
        pageSize: 12,
      });
      setMedicines(res.data);
      setTotalCount(res.count);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err.message || 'Unable to load medicine directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [search, dosageForm, route, status, sortBy, currentPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMedicines();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Pill className="w-6 h-6 text-teal-400" />
          Medicines Reference Directory
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Verified generic, salt, and brand monographs for Indian healthcare learning
        </p>
      </div>

      {/* Filter and Query Toolbars */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search generic, salt, active ingredient..."
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs sm:text-sm"
          />
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">Dosage Form</label>
            <select
              value={dosageForm}
              onChange={(e) => {
                setDosageForm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
            >
              {dosageOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">Route</label>
            <select
              value={route}
              onChange={(e) => {
                setRoute(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
            >
              {routeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
            >
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
              <option value="recently_added">Recently Added</option>
              <option value="recently_updated">Recently Updated</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
            >
              <option value="verified">Verified Monograph</option>
              <option value="unverified">Needs Review</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading verified monographs...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {medicines.length} of {totalCount} verified medicines
            </span>
            <span className="text-[10px] text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {medicines.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicines.map((med) => (
                <MedicineCard key={med.id} medicine={med} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-500">
              No medicines match your search filters.
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 font-medium px-3">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
