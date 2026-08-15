import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pill, Save, Eye, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { medicineService } from '../../services/medicineService';
import { classService } from '../../services/classService';
import { adminMedicineService, MedicineFormData } from '../../services/adminMedicineService';
import { DrugClass, Medicine, VerificationStatus } from '../../types/database';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ArrayTagInput } from '../../features/admin/components/ArrayTagInput';
import { BrandListEditor } from '../../features/admin/components/BrandListEditor';
import { DuplicateWarningModal } from '../../features/admin/components/DuplicateWarningModal';

export const AdminMedicineEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [activeStep, setActiveStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [classes, setClasses] = useState<DrugClass[]>([]);
  const [duplicates, setDuplicates] = useState<Medicine[]>([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<MedicineFormData>({
    generic_name: '',
    display_name: '',
    active_ingredient: '',
    salt: '',
    strength: '',
    dosage_forms: ['Tablet'],
    routes: ['Oral'],
    mechanism_of_action: '',
    pharmacodynamics: '',
    absorption: '',
    distribution: '',
    metabolism: '',
    excretion: '',
    bioavailability: '',
    half_life: '',
    protein_binding: '',
    volume_of_distribution: '',
    indications: [],
    contraindications: [],
    warnings: [],
    precautions: [],
    common_adverse_effects: [],
    serious_adverse_effects: [],
    pregnancy: '',
    lactation: '',
    pediatric: '',
    geriatric: '',
    renal: '',
    hepatic: '',
    memory_trick: '',
    key_suffix: '',
    verification_status: 'draft',
    selectedClassIds: [],
    brandsList: [],
  });

  useEffect(() => {
    classService.getAllClasses().then(setClasses).catch(console.error);
    if (id) {
      medicineService.getMedicineById(id).then((med) => {
        if (med) {
          setFormData({
            ...med,
            selectedClassIds: med.classes?.map((c) => c.id) || [],
            brandsList: med.brands || [],
          });
        }
      });
    }
  }, [id]);

  const updateField = (field: keyof MedicineFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (statusOverride?: VerificationStatus) => {
    setSaving(true);
    try {
      const dataToSave = statusOverride
        ? { ...formData, verification_status: statusOverride }
        : formData;

      // Duplicate check if adding
      if (!isEdit && !statusOverride) {
        const foundDups = await adminMedicineService.checkDuplicates(formData.generic_name || '', formData.salt);
        if (foundDups.length > 0) {
          setDuplicates(foundDups);
          setSaving(false);
          return;
        }
      }

      await adminMedicineService.saveMedicine(dataToSave, isEdit);
      navigate('/admin/medicines');
    } catch (err: any) {
      alert(err.message || 'Failed to save medicine');
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { num: 1, title: 'Basic' },
    { num: 2, title: 'Class' },
    { num: 3, title: 'Brands' },
    { num: 4, title: 'MoA' },
    { num: 5, title: 'ADME' },
    { num: 6, title: 'Kinetics' },
    { num: 7, title: 'Safety' },
    { num: 8, title: 'Populations' },
    { num: 9, title: 'Memory' },
    { num: 10, title: 'Verify' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin', path: '/admin' },
          { label: 'Medicines', path: '/admin/medicines' },
          { label: isEdit ? `Edit: ${formData.generic_name || 'Monograph'}` : 'New Medicine' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Pill className="w-6 h-6 text-teal-400" />
          {isEdit ? `Editing: ${formData.generic_name}` : 'Create Pharmacological Monograph'}
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" /> {showPreview ? 'Hide Preview' : 'Live Preview'}
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-500/20"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </div>

      {/* Step Navigator Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
        {steps.map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setActiveStep(s.num)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeStep === s.num
                ? 'bg-teal-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {s.num}. {s.title}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="grid sm:grid-cols-1 gap-6">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          {/* STEP 1: Basic Info */}
          {activeStep === 1 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 1 — Basic Identification</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Generic Name *</label>
                  <input
                    type="text"
                    value={formData.generic_name || ''}
                    onChange={(e) => updateField('generic_name', e.target.value)}
                    placeholder="e.g., Paracetamol"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Active Ingredient / Salt *</label>
                  <input
                    type="text"
                    value={formData.salt || ''}
                    onChange={(e) => updateField('salt', e.target.value)}
                    placeholder="e.g., N-acetyl-p-aminophenol"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
              <ArrayTagInput
                label="Dosage Forms"
                placeholder="Type form (e.g. Tablet, Syrup) and press Enter"
                values={formData.dosage_forms || []}
                onChange={(v) => updateField('dosage_forms', v)}
              />
              <ArrayTagInput
                label="Routes"
                placeholder="Type route (e.g. Oral, IV)"
                values={formData.routes || []}
                onChange={(v) => updateField('routes', v)}
              />
            </div>
          )}

          {/* STEP 2: Classification */}
          {activeStep === 2 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 2 — Pharmacological Classification</h2>
              <p className="text-xs text-slate-400">Select which drug classes this medicine belongs to:</p>
              <div className="grid sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {classes.map((cls) => {
                  const isSelected = formData.selectedClassIds?.includes(cls.id);
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => {
                        const current = formData.selectedClassIds || [];
                        updateField(
                          'selectedClassIds',
                          isSelected ? current.filter((id) => id !== cls.id) : [...current, cls.id]
                        );
                      }}
                      className={`p-2.5 rounded-xl text-left border text-xs transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-teal-950 border-teal-600 text-teal-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{cls.name}</span>
                      <span className="text-[10px] uppercase font-mono">{cls.classification_type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Brands */}
          {activeStep === 3 && (
            <BrandListEditor
              brands={formData.brandsList || []}
              onChange={(b) => updateField('brandsList', b)}
            />
          )}

          {/* STEP 4: MoA */}
          {activeStep === 4 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 4 — Pharmacology & Mechanism</h2>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Mechanism of Action</label>
                <textarea
                  rows={3}
                  value={formData.mechanism_of_action || ''}
                  onChange={(e) => updateField('mechanism_of_action', e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Pharmacodynamics</label>
                <textarea
                  rows={3}
                  value={formData.pharmacodynamics || ''}
                  onChange={(e) => updateField('pharmacodynamics', e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 5: ADME */}
          {activeStep === 5 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 5 — ADME Profile</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Absorption</label>
                  <input
                    type="text"
                    value={formData.absorption || ''}
                    onChange={(e) => updateField('absorption', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Distribution</label>
                  <input
                    type="text"
                    value={formData.distribution || ''}
                    onChange={(e) => updateField('distribution', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Metabolism</label>
                  <input
                    type="text"
                    value={formData.metabolism || ''}
                    onChange={(e) => updateField('metabolism', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Excretion</label>
                  <input
                    type="text"
                    value={formData.excretion || ''}
                    onChange={(e) => updateField('excretion', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Kinetics */}
          {activeStep === 6 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 6 — Pharmacokinetics Constants</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Half-life (T½)</label>
                  <input
                    type="text"
                    value={formData.half_life || ''}
                    onChange={(e) => updateField('half_life', e.target.value)}
                    placeholder="e.g. 2 hours"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Bioavailability</label>
                  <input
                    type="text"
                    value={formData.bioavailability || ''}
                    onChange={(e) => updateField('bioavailability', e.target.value)}
                    placeholder="e.g. ~88%"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Protein Binding</label>
                  <input
                    type="text"
                    value={formData.protein_binding || ''}
                    onChange={(e) => updateField('protein_binding', e.target.value)}
                    placeholder="e.g. 98%"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Safety */}
          {activeStep === 7 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 7 — Clinical Indications & Safety</h2>
              <ArrayTagInput
                label="Therapeutic Indications"
                placeholder="Add indication and press Enter"
                values={formData.indications || []}
                onChange={(v) => updateField('indications', v)}
              />
              <ArrayTagInput
                label="Contraindications"
                placeholder="Add contraindication and press Enter"
                values={formData.contraindications || []}
                onChange={(v) => updateField('contraindications', v)}
              />
              <ArrayTagInput
                label="Common Adverse Effects"
                placeholder="Add common effect"
                values={formData.common_adverse_effects || []}
                onChange={(v) => updateField('common_adverse_effects', v)}
              />
            </div>
          )}

          {/* STEP 8: Populations */}
          {activeStep === 8 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 8 — Special Populations</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Pregnancy Risk / Category</label>
                  <input
                    type="text"
                    value={formData.pregnancy || ''}
                    onChange={(e) => updateField('pregnancy', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Lactation / Breastfeeding</label>
                  <input
                    type="text"
                    value={formData.lactation || ''}
                    onChange={(e) => updateField('lactation', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Memory */}
          {activeStep === 9 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 9 — Drug Memory & Suffixes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Suffix Pattern</label>
                  <input
                    type="text"
                    value={formData.key_suffix || ''}
                    onChange={(e) => updateField('key_suffix', e.target.value)}
                    placeholder="e.g. -sartan"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Memory Trick / Mnemonic</label>
                  <input
                    type="text"
                    value={formData.memory_trick || ''}
                    onChange={(e) => updateField('memory_trick', e.target.value)}
                    placeholder="e.g. SARTAN = Stops Angiotensin..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: Verification */}
          {activeStep === 10 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 10 — Verification & Publishing Workflow</h2>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Select Monograph Status</label>
                <select
                  value={formData.verification_status}
                  onChange={(e) => updateField('verification_status', e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="draft">Draft (Private / Work in progress)</option>
                  <option value="under_review">Under Review (Pending clinical check)</option>
                  <option value="verified">Verified (Published to public directory)</option>
                  <option value="needs_update">Needs Update</option>
                  <option value="archived">Archived (Hidden from search)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSave('verified')}
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Publish as Verified
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('draft')}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {duplicates.length > 0 && (
        <DuplicateWarningModal
          duplicates={duplicates}
          onProceed={() => {
            setDuplicates([]);
            handleSave('draft');
          }}
          onCancel={() => setDuplicates([])}
        />
      )}
    </div>
  );
};
