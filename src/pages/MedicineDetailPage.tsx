import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { medicineService, MedicineDetail } from '../services/medicineService';
import { MedicineDetailHeader } from '../features/medicines/components/MedicineDetailHeader';
import { MedicineDetailAccordions } from '../features/medicines/components/MedicineDetailAccordions';
import { ExplainModal } from '../features/medicines/components/ExplainModal';

export const MedicineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<MedicineDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => {
    const fetchMedicine = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await medicineService.getMedicineById(id);
        if (!data) {
          setError('Medicine monograph not found.');
        } else {
          setMedicine(data);
          medicineService.recordRecentlyViewed(data.id);
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching medicine monograph.');
      } finally {
        setLoading(false);
      }
    };
    fetchMedicine();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading verified pharmacology monograph...</p>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="py-16 text-center space-y-3 max-w-md mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Monograph Unavailable</h2>
        <p className="text-xs text-slate-400">{error || 'Unable to locate this medicine in database.'}</p>
        <Link
          to="/medicines"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Medicines
        </Link>
      </div>
    );
  }

  const monographContext = [
    `Salt: ${medicine.salt || medicine.active_ingredient}`,
    `Mechanism: ${medicine.mechanism_of_action}`,
    `Indications: ${(medicine.indications || []).join(', ')}`,
    `Adverse Effects: ${(medicine.common_adverse_effects || []).join(', ')}`,
  ].filter(Boolean).join('. ');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link
          to="/medicines"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>

      <MedicineDetailHeader
        medicine={medicine}
        onExplainClick={() => setShowExplain(true)}
        onCompareClick={() => alert(`Comparison tool for ${medicine.generic_name} is active.`)}
      />

      <MedicineDetailAccordions
        medicine={medicine}
        onExplainMoA={() => setShowExplain(true)}
      />

      <ExplainModal
        isOpen={showExplain}
        onClose={() => setShowExplain(false)}
        title={medicine.generic_name}
        entityType="medicine"
        entityId={medicine.id}
        clinicalExplanation={monographContext}
        simpleExplanation={medicine.description}
        hinglishExplanation={medicine.memory_trick ? `Memory Trick: ${medicine.memory_trick}` : undefined}
      />
    </div>
  );
};
