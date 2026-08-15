import { supabase } from '../lib/supabase';
import { Medicine, Brand, DrugClass, Reference, DrugInteraction, Pronunciation, MedicineFilterOptions } from '../types/database';

export interface MedicineDetail extends Medicine {
  brands?: Brand[];
  classes?: DrugClass[];
  references?: Reference[];
  pronunciations?: Pronunciation[];
  interactions?: DrugInteraction[];
}

export const medicineService = {
  async getMedicines(options: MedicineFilterOptions = {}): Promise<{ data: Medicine[]; count: number; page: number; totalPages: number }> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 12;
    const offset = (page - 1) * pageSize;

    let query = supabase.from('medicines').select('*', { count: 'exact' });

    if (options.verificationStatus) {
      query = query.eq('verification_status', options.verificationStatus);
    } else {
      query = query.eq('verification_status', 'verified');
    }

    if (options.search?.trim()) {
      const term = `%${options.search.trim()}%`;
      query = query.or(`generic_name.ilike.${term},salt.ilike.${term},active_ingredient.ilike.${term},display_name.ilike.${term}`);
    }

    if (options.dosageForm && options.dosageForm !== 'All') {
      query = query.contains('dosage_forms', [options.dosageForm]);
    }

    if (options.route && options.route !== 'All') {
      query = query.contains('routes', [options.route]);
    }

    switch (options.sortBy) {
      case 'name_desc':
        query = query.order('generic_name', { ascending: false });
        break;
      case 'recently_added':
        query = query.order('created_at', { ascending: false });
        break;
      case 'recently_updated':
        query = query.order('updated_at', { ascending: false });
        break;
      case 'name_asc':
      default:
        query = query.order('generic_name', { ascending: true });
        break;
    }

    query = query.range(offset, offset + pageSize - 1);

    const { data, count, error } = await query;
    if (error) throw new Error('Unable to load medicine directory. Please try again.');

    const total = count || 0;
    return {
      data: data || [],
      count: total,
      page,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async getMedicineById(id: string): Promise<MedicineDetail | null> {
    const { data: medicine, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error('Unable to load medicine information.');
    }

    // Query brands directly by medicine_id
    const { data: brands } = await supabase
      .from('brands')
      .select('*')
      .eq('medicine_id', id);

    // Query classes
    const { data: classJunctions } = await supabase
      .from('medicine_classifications')
      .select('class_id, drug_classes(*)')
      .eq('medicine_id', id);

    const classes = classJunctions
      ? (classJunctions.map((j: any) => j.drug_classes).filter(Boolean) as DrugClass[])
      : [];

    // Query pronunciations
    const { data: pronunciations } = await supabase
      .from('pronunciations')
      .select('*')
      .eq('entity_type', 'medicine')
      .eq('entity_id', id);

    return {
      ...medicine,
      brands: brands || [],
      classes,
      pronunciations: pronunciations || [],
      references: [],
      interactions: [],
    };
  },

  async searchMedicines(queryText: string): Promise<Medicine[]> {
    const q = queryText.trim();
    if (!q) return [];

    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('verification_status', 'verified')
      .or(`generic_name.ilike.%${q}%,salt.ilike.%${q}%,active_ingredient.ilike.%${q}%,display_name.ilike.%${q}%`)
      .limit(10);

    if (error) throw new Error('Unable to complete medicine search.');
    return data || [];
  },

  async getCommonMedicines(): Promise<{ category: string; medicines: Medicine[] }[]> {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('verification_status', 'verified')
      .order('generic_name', { ascending: true });

    if (error) throw new Error('Unable to load common medicine categories.');

    const categoryMap: Record<string, string[]> = {
      'Pain & Fever': ['Paracetamol', 'Ibuprofen'],
      'Acidity & GERD': ['Pantoprazole'],
      'Blood Pressure': ['Amlodipine', 'Losartan', 'Telmisartan'],
      'Cholesterol': ['Atorvastatin'],
      'Antibiotics': ['Amoxicillin', 'Azithromycin'],
      'Allergy': ['Cetirizine'],
      'Diabetes': ['Metformin'],
      'Nausea & Vomiting': ['Ondansetron'],
    };

    const result: { category: string; medicines: Medicine[] }[] = [];
    const allMeds = data || [];

    for (const [catName, names] of Object.entries(categoryMap)) {
      const matched = allMeds.filter((m) =>
        names.some((n) => m.generic_name.toLowerCase().includes(n.toLowerCase()))
      );
      if (matched.length > 0) {
        result.push({ category: catName, medicines: matched });
      }
    }

    return result;
  },

  async recordRecentlyViewed(medicineId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      await supabase.from('recently_viewed').upsert(
        {
          user_id: user.id,
          entity_type: 'medicine',
          entity_id: medicineId,
          viewed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,entity_type,entity_id' }
      );
    } catch {}
  },
};
