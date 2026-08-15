import { supabase } from '../lib/supabase';

export interface MarketMedicineProduct {
  id: string;
  source_record_id: string;
  product_name: string;
  price_inr?: number | null;
  is_discontinued?: boolean | null;
  manufacturer_name?: string | null;
  medicine_type?: string | null;
  pack_size_label?: string | null;
  composition_1?: string | null;
  composition_2?: string | null;
  source_name: string;
  source_url?: string | null;
  source_license?: string | null;
  imported_at: string;
}

export const marketMedicineService = {
  async search(queryText = '', page = 1, pageSize = 20) {
    const q = queryText.trim();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    let query = supabase.from('market_medicine_products').select('*', { count: 'exact' });
    if (q) {
      const term = `%${q.replace(/[%_]/g, '')}%`;
      query = query.or(`product_name.ilike.${term},composition_1.ilike.${term},composition_2.ilike.${term},manufacturer_name.ilike.${term}`);
    }
    const { data, count, error } = await query.order('product_name', { ascending: true }).range(from, to);
    if (error) throw new Error('Unable to load the market medicine catalog.');
    return { data: (data || []) as MarketMedicineProduct[], count: count || 0, page, totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)) };
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('market_medicine_products').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error('Unable to load catalog product.');
    }
    return data as MarketMedicineProduct;
  },
};
