import { supabase } from '../lib/supabase';
import { DrugClass, Medicine } from '../types/database';

export interface ClassDetail extends DrugClass {
  parent?: DrugClass | null;
  children?: DrugClass[];
  medicines?: Medicine[];
}

export const classService = {
  async getAllClasses(): Promise<DrugClass[]> {
    const { data, error } = await supabase
      .from('drug_classes')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error('Unable to load drug classes.');
    return data || [];
  },

  async getClassHierarchy(): Promise<DrugClass[]> {
    const { data, error } = await supabase
      .from('drug_classes')
      .select('*')
      .order('classification_type', { ascending: true });

    if (error) throw new Error('Unable to load class hierarchy.');
    return data || [];
  },

  async getClassById(id: string): Promise<ClassDetail | null> {
    const { data: cls, error } = await supabase
      .from('drug_classes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error('Unable to load class details.');
    }

    let parent: DrugClass | null = null;
    if (cls.parent_id) {
      const { data: p } = await supabase
        .from('drug_classes')
        .select('*')
        .eq('id', cls.parent_id)
        .single();
      parent = p;
    }

    const { data: children } = await supabase
      .from('drug_classes')
      .select('*')
      .eq('parent_id', id);

    const { data: junctions } = await supabase
      .from('medicine_classifications')
      .select('medicines(*)')
      .eq('class_id', id);

    const medicines = (junctions || [])
      .map((j: any) => j.medicines)
      .filter((m: Medicine) => m && m.verification_status === 'verified');

    return {
      ...cls,
      parent,
      children: children || [],
      medicines: medicines || [],
    };
  },

  async getMedicinesByClassId(classId: string): Promise<Medicine[]> {
    const { data, error } = await supabase
      .from('medicine_classifications')
      .select('medicines(*)')
      .eq('class_id', classId);

    if (error) throw new Error('Unable to retrieve medicines for this class.');
    return (data || [])
      .map((j: any) => j.medicines)
      .filter((m: Medicine) => m && m.verification_status === 'verified');
  },
};
