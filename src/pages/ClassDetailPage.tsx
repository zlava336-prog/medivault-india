import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, Loader2, AlertCircle, ArrowLeft, Pill, ChevronRight } from 'lucide-react';
import { classService, ClassDetail } from '../services/classService';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MedicineCard } from '../features/medicines/components/MedicineCard';

export const ClassDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await classService.getClassById(id);
        if (!data) setError('Drug class not found.');
        else setClassDetail(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching class details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading classification monograph...</p>
      </div>
    );
  }

  if (error || !classDetail) {
    return (
      <div className="py-16 text-center space-y-3 max-w-md mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Class Not Found</h2>
        <p className="text-xs text-slate-400">{error || 'Requested drug class is unavailable.'}</p>
        <Link to="/classes" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Classes
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Classes', path: '/classes' },
    ...(classDetail.parent ? [{ label: classDetail.parent.name, path: `/classes/${classDetail.parent.id}` }] : []),
    { label: classDetail.name },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-700 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{classDetail.name}</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800 uppercase">
                  {classDetail.classification_type} Class
                </span>
              </div>
              {classDetail.parent && (
                <p className="text-xs text-slate-400 mt-1">
                  Parent Class: <Link to={`/classes/${classDetail.parent.id}`} className="text-teal-400 hover:underline">{classDetail.parent.name}</Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Simple Definition</span>
            <p className="text-slate-200">{classDetail.simple_definition || classDetail.description || 'Not verified'}</p>
          </div>
          {classDetail.hinglish_explanation && (
            <div>
              <span className="text-amber-400/90 block text-[11px] font-semibold">Hinglish Explanation</span>
              <p className="text-slate-300">{classDetail.hinglish_explanation}</p>
            </div>
          )}
        </div>
      </div>

      {classDetail.children && classDetail.children.length > 0 && (
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            Subclasses ({classDetail.children.length})
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {classDetail.children.map((child) => (
              <Link
                key={child.id}
                to={`/classes/${child.id}`}
                className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-teal-700 transition flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-xs text-white block">{child.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{child.classification_type}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Pill className="w-4 h-4 text-teal-400" />
          Medicines in this Class ({classDetail.medicines?.length || 0})
        </h2>

        {classDetail.medicines && classDetail.medicines.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classDetail.medicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-500">
            No medicines currently linked to this class.
          </div>
        )}
      </div>
    </div>
  );
};
