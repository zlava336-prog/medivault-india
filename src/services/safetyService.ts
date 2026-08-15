import { supabase } from '../lib/supabase';
export const safetyService = {
  async getAlerts() {
    const { data, error } = await supabase.from('safety_alerts').select('*').eq('status','verified').order('issued_date',{ascending:false}).limit(50);
    if (error) throw error; return data ?? [];
  },
  async getInteractions(medicineId:string) {
    const { data,error }=await supabase.from('drug_interactions').select('*').eq('verified',true).or(`medicine_a_id.eq.${medicineId},medicine_b_id.eq.${medicineId}`);
    if(error) throw error; return data ?? [];
  }
};
