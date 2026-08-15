import { supabase } from '../lib/supabase';

export const studyService = {
  async saveQuizAttempt(userId: string, category: string, total: number, correct: number) {
    const score = total ? Math.round((correct / total) * 100) : 0;
    const { error } = await supabase.from('quiz_attempts').insert({ user_id: userId, category, total_questions: total, correct_answers: correct, score_percent: score });
    if (error) throw error;
    return score;
  },
  async reviewFlashcard(userId: string, flashcardId: string, rating: 'again'|'hard'|'good'|'easy') {
    const { error } = await supabase.from('flashcard_reviews').insert({ user_id: userId, flashcard_id: flashcardId, rating });
    if (error) throw error;
  },
  async getQuizHistory(userId: string) {
    const { data, error } = await supabase.from('quiz_attempts').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20);
    if (error) throw error;
    return data ?? [];
  }
};
