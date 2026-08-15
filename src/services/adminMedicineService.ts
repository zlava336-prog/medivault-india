import { supabase } from '../lib/supabase';
import { Medicine, Brand, DrugClass, AdminAuditLog, VerificationStatus } from '../types/database';

export interface MedicineFormData extends Partial<Medicine> {
  selectedClassIds?: string[];
  brandsList?: Partial<Brand>[];
}

export const adminMedicineService = {
  async getQualityMetrics() {
    const { data: meds, error } = await supabase.from('medicines').select('*');
    if (error) throw new Error('Failed to load quality metrics.');

    const total = meds.length;
    const verified = meds.filter((m) => m.verification_status === 'verified').length;
    const drafts = meds.filter((m) => m.verification_status === 'draft').length;
    const underReview = meds.filter((m) => m.verification_status === 'under_review').length;
    const needsUpdate = meds.filter((m) => m.verification_status === 'needs_update').length;
    const archived = meds.filter((m) => m.verification_status === 'archived').length;

    const missingAdme = meds.filter((m) => !m.absorption || !m.metabolism).length;
    const missingPk = meds.filter((m) => !m.half_life || !m.bioavailability).length;
    const missingSafety = meds.filter((m) => !m.contraindications || m.contraindications.length === 0).length;

    return {
      total,
      verified,
      drafts,
      underReview,
      needsUpdate,
      archived,
      missingAdme,
      missingPk,
      missingSafety,
    };
  },

  async checkDuplicates(genericName: string, salt?: string, excludeId?: string): Promise<Medicine[]> {
    if (!genericName.trim()) return [];
    let query = supabase.from('medicines').select('*').ilike('generic_name', genericName.trim());
    if (excludeId) query = query.neq('id', excludeId);

    const { data: genericMatches } = await query;

    let saltMatches: Medicine[] = [];
    if (salt && salt.trim()) {
      let sQuery = supabase.from('medicines').select('*').ilike('salt', salt.trim());
      if (excludeId) sQuery = sQuery.neq('id', excludeId);
      const { data } = await sQuery;
      saltMatches = data || [];
    }

    const combined = [...(genericMatches || []), ...saltMatches];
    return Array.from(new Map(combined.map((m) => [m.id, m])).values());
  },

  async saveMedicine(formData: MedicineFormData, isEdit = false): Promise<Medicine> {
    const { selectedClassIds, brandsList, ...medFields } = formData;

    if (!medFields.generic_name?.trim()) {
      throw new Error('Generic Name is required.');
    }

    medFields.updated_at = new Date().toISOString();

    let savedMed: Medicine;

    if (isEdit && medFields.id) {
      const { data, error } = await supabase
        .from('medicines')
        .update(medFields)
        .eq('id', medFields.id)
        .select()
        .single();
      if (error) throw error;
      savedMed = data;
    } else {
      const { data, error } = await supabase
        .from('medicines')
        .insert(medFields)
        .select()
        .single();
      if (error) throw error;
      savedMed = data;
    }

    // Save classifications
    if (selectedClassIds && selectedClassIds.length > 0) {
      await supabase.from('medicine_classifications').delete().eq('medicine_id', savedMed.id);
      const classInserts = selectedClassIds.map((cid, idx) => ({
        medicine_id: savedMed.id,
        class_id: cid,
        is_primary: idx === 0,
      }));
      await supabase.from('medicine_classifications').insert(classInserts);
    }

    // Save brands
    if (brandsList && brandsList.length > 0) {
      for (const brand of brandsList) {
        if (!brand.brand_name?.trim()) continue;
        if (brand.id) {
          await supabase.from('brands').update({
            brand_name: brand.brand_name,
            composition: brand.composition || savedMed.salt,
            strength: brand.strength,
            dosage_form: brand.dosage_form,
            route: brand.route,
            verified: true,
          }).eq('id', brand.id);
        } else {
          await supabase.from('brands').insert({
            medicine_id: savedMed.id,
            brand_name: brand.brand_name,
            composition: brand.composition || savedMed.salt,
            strength: brand.strength,
            dosage_form: brand.dosage_form,
            route: brand.route,
            verified: true,
          });
        }
      }
    }

    return savedMed;
  },

  async bulkUpdateStatus(ids: string[], status: VerificationStatus): Promise<void> {
    const { error } = await supabase
      .from('medicines')
      .update({ verification_status: status, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (error) throw error;
  },

  async getAuditLogs(medicineId: string): Promise<AdminAuditLog[]> {
    const { data, error } = await supabase
      .from('admin_audit_logs')
      .select('*')
      .eq('table_name', 'medicines')
      .eq('record_id', medicineId)
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  },
};
