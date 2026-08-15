import { supabase } from '../lib/supabase';
import { MedicalTerm, Medicine, DrugClass } from '../types/database';

export interface MedicalTermDetail extends MedicalTerm {
  relatedMedicines?: Medicine[];
  relatedClasses?: DrugClass[];
}

export const medicalTermService = {
  async getAllTerms(): Promise<MedicalTerm[]> {
    const { data, error } = await supabase
      .from('medical_terms')
      .select('*')
      .order('term', { ascending: true });

    if (error) throw new Error('Unable to load medical dictionary.');
    return data || [];
  },

  async getTermById(id: string): Promise<MedicalTermDetail | null> {
    const { data: term, error } = await supabase
      .from('medical_terms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error('Unable to load medical term.');
    }

    const { data: relatedMeds } = await supabase
      .from('medicines')
      .select('*')
      .or(`generic_name.ilike.%${term.term}%,description.ilike.%${term.term}%`)
      .limit(4);

    const { data: relatedClasses } = await supabase
      .from('drug_classes')
      .select('*')
      .ilike('name', `%${term.term}%`)
      .limit(4);

    return {
      ...term,
      relatedMedicines: relatedMeds || [],
      relatedClasses: relatedClasses || [],
    };
  },

  async getTermByName(termName: string): Promise<MedicalTerm | null> {
    const { data, error } = await supabase
      .from('medical_terms')
      .select('*')
      .ilike('term', termName)
      .single();

    if (error) return null;
    return data;
  },

  async searchTerms(query: string): Promise<MedicalTerm[]> {
    const q = query.trim();
    if (!q) return [];
    const { data, error } = await supabase
      .from('medical_terms')
      .select('*')
      .ilike('term', `%${q}%`)
      .limit(12);

    if (error) throw new Error('Unable to search medical terms.');
    return data || [];
  },
};
