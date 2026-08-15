import { supabase } from '../lib/supabase';
import { Favorite, EntityType } from '../types/database';

export const favoritesService = {
  async getFavorites(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addFavorite(userId: string, entityType: EntityType, entityId: string): Promise<Favorite> {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, entity_type: entityType, entity_id: entityId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFavorite(userId: string, entityType: EntityType, entityId: string): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: userId, entity_type: entityType, entity_id: entityId });

    if (error) throw error;
  },
};
