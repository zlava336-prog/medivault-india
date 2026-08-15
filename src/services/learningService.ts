import { supabase } from '../lib/supabase';
import { LearningProgress, EntityType } from '../types/database';

export const learningService = {
  async getUserProgress(userId: string): Promise<LearningProgress[]> {
    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async recordStudyResult(
    userId: string,
    entityType: EntityType,
    entityId: string,
    isCorrect: boolean
  ): Promise<void> {
    const { data: existing } = await supabase
      .from('learning_progress')
      .select('*')
      .match({ user_id: userId, entity_type: entityType, entity_id: entityId })
      .single();

    const now = new Date().toISOString();

    if (existing) {
      const correctCount = existing.correct_count + (isCorrect ? 1 : 0);
      const incorrectCount = existing.incorrect_count + (isCorrect ? 0 : 1);
      const reviewCount = existing.review_count + 1;
      const status = correctCount >= 4 ? 'mastered' : 'learning';

      await supabase
        .from('learning_progress')
        .update({
          correct_count: correctCount,
          incorrect_count: incorrectCount,
          review_count: reviewCount,
          status,
          last_reviewed: now,
          updated_at: now,
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('learning_progress').insert({
        user_id: userId,
        entity_type: entityType,
        entity_id: entityId,
        status: isCorrect ? 'learning' : 'new',
        score: isCorrect ? 100 : 0,
        review_count: 1,
        correct_count: isCorrect ? 1 : 0,
        incorrect_count: isCorrect ? 0 : 1,
        last_reviewed: now,
      });
    }
  },
};
