import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Loader2, AlertCircle, ArrowLeft, Pill } from 'lucide-react';
import { medicalTermService, MedicalTermDetail } from '../services/medicalTermService';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MedicineCard } from '../features/medicines/components/MedicineCard';

export const MedicalTermDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [termDetail, setTermDetail] = useState<MedicalTermDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerm = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await medicalTermService.getTermById(id);
        if (!data) setError('Medical term not found.');
        else setTermDetail(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching term details.');
      } finally {
        setLoading(false);
      }
    };
    fetchTerm();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading dictionary definition...</p>
      </div>
    );
  }

  if (error || !termDetail) {
    return (
      <div className="py-16 text-center space-y-3 max-w-md mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Term Not Found</h2>
        <p className="text-xs text-slate-400">{error || 'Requested dictionary entry is unavailable.'}</p>
        <Link to="/medical-terms" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Terms
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs items={[{ label: 'Medical Terms', path: '/medical-terms' }, { label: termDetail.term }]} />

      <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-700 flex items-center justify-center text-teal-400 flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{termDetail.term}</h1>
            {termDetail.pronunciation && (
              <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-0.5">
                [{termDetail.pronunciation}]
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/60 text-xs">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-slate-400 block font-bold mb-1">Simple Definition:</span>
            <p className="text-slate-200">{termDetail.simple_definition || 'Not verified'}</p>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-indigo-300 block font-bold mb-1">Clinical Pharmacological Definition:</span>
            <p className="text-slate-200">{termDetail.clinical_definition || 'Not verified'}</p>
          </div>
        </div>

        {termDetail.hinglish_explanation && (
          <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs">
            <span className="text-amber-300 block font-bold mb-1">💡 Hinglish Explanation:</span>
            <p className="text-slate-200">{termDetail.hinglish_explanation}</p>
          </div>
        )}
      </div>

      {termDetail.relatedMedicines && termDetail.relatedMedicines.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-400" />
            Related Medicines ({termDetail.relatedMedicines.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {termDetail.relatedMedicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
