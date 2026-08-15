import React, { useState, useEffect } from 'react';
import { Layers, Loader2, AlertCircle } from 'lucide-react';
import { medicineService } from '../services/medicineService';
import { Medicine } from '../types/database';
import { MedicineCard } from '../features/medicines/components/MedicineCard';

export const CommonDrugsPage: React.FC = () => {
  const [categories, setCategories] = useState<{ category: string; medicines: Medicine[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommon = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await medicineService.getCommonMedicines();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load common drugs.');
      } finally {
        setLoading(false);
      }
    };
    fetchCommon();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-teal-400" />
          Common Medicines by Therapeutic Group
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Starter database catalog structured by clinical therapeutic indications
        </p>
      </div>

      {loading && (
        <div className="py-16 text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading common drug categories...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-8">
          {categories.map((group) => (
            <div key={group.category} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <h2 className="text-base font-bold text-teal-300">{group.category}</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {group.medicines.length} medicines
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.medicines.map((med) => (
                  <MedicineCard key={med.id} medicine={med} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
