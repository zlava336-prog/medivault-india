-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pronunciations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mnemonics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles: Users can view own, admins can view all
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Public Read Policies for Verified Medical Reference Data
CREATE POLICY "Public read verified medicines" ON public.medicines
  FOR SELECT USING (verification_status = 'verified' OR public.is_admin());

CREATE POLICY "Public read active ingredients" ON public.active_ingredients
  FOR SELECT USING (true);

CREATE POLICY "Public read medicine ingredients" ON public.medicine_ingredients
  FOR SELECT USING (true);

CREATE POLICY "Public read manufacturers" ON public.manufacturers
  FOR SELECT USING (true);

CREATE POLICY "Public read brands" ON public.brands
  FOR SELECT USING (verified = true OR public.is_admin());

CREATE POLICY "Public read drug classes" ON public.drug_classes
  FOR SELECT USING (true);

CREATE POLICY "Public read medicine classifications" ON public.medicine_classifications
  FOR SELECT USING (true);

CREATE POLICY "Public read medical terms" ON public.medical_terms
  FOR SELECT USING (true);

CREATE POLICY "Public read pronunciations" ON public.pronunciations
  FOR SELECT USING (verified = true OR public.is_admin());

CREATE POLICY "Public read references" ON public.references
  FOR SELECT USING (true);

CREATE POLICY "Public read medicine references" ON public.medicine_references
  FOR SELECT USING (true);

CREATE POLICY "Public read drug interactions" ON public.drug_interactions
  FOR SELECT USING (verified = true OR public.is_admin());

CREATE POLICY "Public read mnemonics" ON public.mnemonics
  FOR SELECT USING (verified = true OR public.is_admin());

CREATE POLICY "Public read flashcards" ON public.flashcards
  FOR SELECT USING (true);

CREATE POLICY "Public read quiz questions" ON public.quiz_questions
  FOR SELECT USING (true);

-- 3. Private User Policies (Favorites, Recent, Progress, Schedule)
CREATE POLICY "User favorites own select" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User favorites own insert" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User favorites own delete" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "User recent own select" ON public.recently_viewed
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User recent own insert" ON public.recently_viewed
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User progress own select" ON public.learning_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User progress own insert" ON public.learning_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User progress own update" ON public.learning_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "User schedule own select" ON public.review_schedule
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User schedule own mutate" ON public.review_schedule
  FOR ALL USING (auth.uid() = user_id);

-- 4. Admin-Only Mutation Policies on Medical Knowledge Tables
CREATE POLICY "Admin write medicines" ON public.medicines
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admin write brands" ON public.brands
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admin write drug classes" ON public.drug_classes
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admin write medical terms" ON public.medical_terms
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admin write audit logs" ON public.admin_audit_logs
  FOR ALL USING (public.is_admin());
