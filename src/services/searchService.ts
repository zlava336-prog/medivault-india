import { supabase } from '../lib/supabase';
import { Medicine, Brand, DrugClass, MedicalTerm } from '../types/database';

export interface GlobalSearchResult {
  medicines: Medicine[];
  brands: Brand[];
  classes: DrugClass[];
  terms: MedicalTerm[];
}

export const searchService = {
  async searchAll(query: string): Promise<GlobalSearchResult> {
    const cleanQuery = query.trim();
    if (!cleanQuery) return { medicines: [], brands: [], classes: [], terms: [] };

    const pattern = `%${cleanQuery}%`;

    const { data: medicines } = await supabase
      .from('medicines')
      .select('*')
      .or(`generic_name.ilike.${pattern},salt.ilike.${pattern}`)
      .limit(8);

    const { data: brands } = await supabase
      .from('brands')
      .select('*, medicines(*)')
      .ilike('brand_name', pattern)
      .limit(8);

    const { data: classes } = await supabase
      .from('drug_classes')
      .select('*')
      .ilike('name', pattern)
      .limit(8);

    const { data: terms } = await supabase
      .from('medical_terms')
      .select('*')
      .ilike('term', pattern)
      .limit(8);

    return {
      medicines: medicines || [],
      brands: brands || [],
      classes: classes || [],
      terms: terms || [],
    };
  },
};
