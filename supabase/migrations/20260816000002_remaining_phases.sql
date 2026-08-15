-- MediVault India: remaining learning, safety, analytics and PWA support
CREATE TABLE IF NOT EXISTS public.safety_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  details TEXT,
  severity TEXT NOT NULL CHECK (severity IN ('info','moderate','major','critical')),
  medicine_ids UUID[] DEFAULT '{}',
  source TEXT,
  source_url TEXT,
  issued_date DATE,
  last_verified DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','verified','archived')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN ('flashcards','quiz','learning','review')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), ended_at TIMESTAMPTZ,
  items_seen INTEGER NOT NULL DEFAULT 0, correct_count INTEGER NOT NULL DEFAULT 0,
  incorrect_count INTEGER NOT NULL DEFAULT 0, duration_seconds INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS public.flashcard_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  rating TEXT NOT NULL CHECK (rating IN ('again','hard','good','easy')),
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT, total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0, score_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.safety_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read verified safety alerts" ON public.safety_alerts;
CREATE POLICY "Public read verified safety alerts" ON public.safety_alerts FOR SELECT USING (status = 'verified' OR public.is_admin());
DROP POLICY IF EXISTS "Admin manage safety alerts" ON public.safety_alerts;
CREATE POLICY "Admin manage safety alerts" ON public.safety_alerts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "User sessions own" ON public.study_sessions;
CREATE POLICY "User sessions own" ON public.study_sessions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "User flashcard reviews own" ON public.flashcard_reviews;
CREATE POLICY "User flashcard reviews own" ON public.flashcard_reviews FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "User quiz attempts own" ON public.quiz_attempts;
CREATE POLICY "User quiz attempts own" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_safety_alerts_status_severity ON public.safety_alerts(status, severity);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_date ON public.study_sessions(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_date ON public.quiz_attempts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_flashcard_reviews_user_date ON public.flashcard_reviews(user_id, reviewed_at DESC);
DO $$ BEGIN
  ALTER TABLE public.review_schedule ADD CONSTRAINT review_schedule_user_item_unique UNIQUE (user_id, item_id, item_type);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
-- Prevent arbitrary role escalation through the profile update policy.
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles p WHERE p.id = auth.uid()));
