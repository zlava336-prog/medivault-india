import React from 'react';
import { Plus, Trash2, Building } from 'lucide-react';
import { Brand } from '../../../types/database';

interface BrandListEditorProps {
  brands: Partial<Brand>[];
  onChange: (brands: Partial<Brand>[]) => void;
}

export const BrandListEditor: React.FC<BrandListEditorProps> = ({ brands, onChange }) => {
  const handleAddBrand = () => {
    onChange([
      ...brands,
      { brand_name: '', strength: '', dosage_form: 'Tablet', route: 'Oral', verified: true },
    ]);
  };

  const handleUpdate = (index: number, field: keyof Brand, value: any) => {
    const updated = [...brands];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(brands.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-400" />
          Indian Brand Formulations ({brands.length})
        </h3>
        <button
          type="button"
          onClick={handleAddBrand}
          className="px-2.5 py-1 bg-teal-950 text-teal-300 border border-teal-800 hover:bg-teal-900 rounded-lg text-xs font-semibold flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Brand
        </button>
      </div>

      <div className="space-y-2">
        {brands.map((b, idx) => (
          <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={b.brand_name || ''}
                onChange={(e) => handleUpdate(idx, 'brand_name', e.target.value)}
                placeholder="Brand Name (e.g., Dolo-650)"
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500"
              />
              <input
                type="text"
                value={b.strength || ''}
                onChange={(e) => handleUpdate(idx, 'strength', e.target.value)}
                placeholder="Strength (e.g., 650 mg)"
                className="w-28 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={b.dosage_form || ''}
                onChange={(e) => handleUpdate(idx, 'dosage_form', e.target.value)}
                placeholder="Dosage Form (Tablet, Syrup)"
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
              <input
                type="text"
                value={b.route || ''}
                onChange={(e) => handleUpdate(idx, 'route', e.target.value)}
                placeholder="Route (Oral, IV)"
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
