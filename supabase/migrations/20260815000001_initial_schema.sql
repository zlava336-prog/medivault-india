-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Profiles Table (RBAC)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'reviewer', 'user')),
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Manufacturers
CREATE TABLE IF NOT EXISTS public.manufacturers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  country TEXT DEFAULT 'India',
  website TEXT,
  source TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Active Ingredients
CREATE TABLE IF NOT EXISTS public.active_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  synonyms TEXT[] DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Drug Classes (Hierarchical)
CREATE TABLE IF NOT EXISTS public.drug_classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.drug_classes(id) ON DELETE SET NULL,
  classification_type TEXT NOT NULL CHECK (classification_type IN ('therapeutic', 'pharmacological', 'mechanism', 'chemical', 'ATC')),
  pronunciation TEXT,
  simple_definition TEXT,
  hindi_explanation TEXT,
  hinglish_explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Medicines (Scalable Reference Core)
CREATE TABLE IF NOT EXISTS public.medicines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  generic_name TEXT NOT NULL UNIQUE,
  display_name TEXT,
  active_ingredient TEXT,
  salt TEXT,
  description TEXT,
  strength TEXT,
  dosage_forms TEXT[] DEFAULT '{}',
  routes TEXT[] DEFAULT '{}',
  mechanism_of_action TEXT,
  pharmacodynamics TEXT,
  absorption TEXT,
  distribution TEXT,
  metabolism TEXT,
  excretion TEXT,
  bioavailability TEXT,
  half_life TEXT,
  protein_binding TEXT,
  volume_of_distribution TEXT,
  clearance TEXT,
  onset TEXT,
  duration TEXT,
  indications TEXT[] DEFAULT '{}',
  contraindications TEXT[] DEFAULT '{}',
  warnings TEXT[] DEFAULT '{}',
  precautions TEXT[] DEFAULT '{}',
  common_adverse_effects TEXT[] DEFAULT '{}',
  serious_adverse_effects TEXT[] DEFAULT '{}',
  food_interactions TEXT[] DEFAULT '{}',
  monitoring TEXT[] DEFAULT '{}',
  storage TEXT,
  patient_counselling TEXT,
  pregnancy TEXT,
  lactation TEXT,
  pediatric TEXT,
  geriatric TEXT,
  renal TEXT,
  hepatic TEXT,
  advantages TEXT[] DEFAULT '{}',
  disadvantages TEXT[] DEFAULT '{}',
  key_points TEXT[] DEFAULT '{}',
  memory_trick TEXT,
  key_suffix TEXT,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'unverified', 'pending_review')),
  source TEXT,
  source_url TEXT,
  last_verified DATE,
  data_version TEXT DEFAULT '1.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Medicine Active Ingredients Junction
CREATE TABLE IF NOT EXISTS public.medicine_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.active_ingredients(id) ON DELETE RESTRICT,
  strength TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(medicine_id, ingredient_id)
);

-- 7. Brands
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL,
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  manufacturer_id UUID REFERENCES public.manufacturers(id) ON DELETE SET NULL,
  composition TEXT,
  strength TEXT,
  dosage_form TEXT,
  route TEXT,
  source TEXT,
  source_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT true,
  last_verified DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(brand_name, medicine_id, strength)
);

-- 8. Medicine Classifications Junction
CREATE TABLE IF NOT EXISTS public.medicine_classifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.drug_classes(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(medicine_id, class_id)
);

-- 9. Medical Terms
CREATE TABLE IF NOT EXISTS public.medical_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term TEXT NOT NULL UNIQUE,
  simple_definition TEXT,
  clinical_definition TEXT,
  hindi_explanation TEXT,
  hinglish_explanation TEXT,
  pronunciation TEXT,
  ipa TEXT,
  related_terms TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Pronunciations
CREATE TABLE IF NOT EXISTS public.pronunciations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('medicine', 'medical_term', 'drug_class')),
  entity_id UUID NOT NULL,
  english_pronunciation TEXT,
  phonetic_pronunciation TEXT,
  hindi_friendly_pronunciation TEXT,
  ipa TEXT,
  audio_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT true,
  last_verified DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. References
CREATE TABLE IF NOT EXISTS public.references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name TEXT NOT NULL,
  source_type TEXT,
  title TEXT NOT NULL,
  url TEXT,
  publication_date DATE,
  accessed_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Medicine References Junction
CREATE TABLE IF NOT EXISTS public.medicine_references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  reference_id UUID NOT NULL REFERENCES public.references(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(medicine_id, reference_id)
);

-- 13. Drug Interactions
CREATE TABLE IF NOT EXISTS public.drug_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medicine_a_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  medicine_b_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('minor', 'moderate', 'major', 'contraindicated')),
  interaction TEXT NOT NULL,
  mechanism TEXT,
  clinical_significance TEXT,
  professional_consideration TEXT,
  reference_id UUID REFERENCES public.references(id) ON DELETE SET NULL,
  verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_different_medicines CHECK (medicine_a_id <> medicine_b_id)
);

-- 14. Mnemonics
CREATE TABLE IF NOT EXISTS public.mnemonics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('medicine', 'drug_class', 'medical_term')),
  entity_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  explanation TEXT,
  warning TEXT DEFAULT 'Mnemonic is a learning aid. Always verify actual pharmacology in the medicine record.',
  verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Flashcards
CREATE TABLE IF NOT EXISTS public.flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('medicine', 'drug_class', 'medical_term')),
  entity_id UUID NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Quiz Questions
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'true_false', 'matching', 'fill_blank')),
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE SET NULL,
  class_id UUID REFERENCES public.drug_classes(id) ON DELETE SET NULL,
  term_id UUID REFERENCES public.medical_terms(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. User Favorites
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('medicine', 'drug_class', 'medical_term', 'flashcard')),
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- 18. Recently Viewed
CREATE TABLE IF NOT EXISTS public.recently_viewed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('medicine', 'drug_class', 'medical_term')),
  entity_id UUID NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. Learning Progress
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('medicine', 'drug_class', 'medical_term', 'flashcard')),
  entity_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered')),
  score INTEGER NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  incorrect_count INTEGER NOT NULL DEFAULT 0,
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- 20. Review Schedule (Spaced Repetition Intervals)
CREATE TABLE IF NOT EXISTS public.review_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL,
  ease_factor NUMERIC(3,2) DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  repetition_number INTEGER DEFAULT 0,
  due_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. Admin Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Search Indexes
CREATE INDEX IF NOT EXISTS idx_medicines_generic_name ON public.medicines USING gin (generic_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_medicines_salt ON public.medicines USING gin (salt gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_medicines_active_ingredient ON public.medicines USING gin (active_ingredient gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_brands_brand_name ON public.brands USING gin (brand_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_drug_classes_name ON public.drug_classes (name);
CREATE INDEX IF NOT EXISTS idx_medical_terms_term ON public.medical_terms USING gin (term gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_recent_user ON public.recently_viewed(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON public.learning_progress(user_id);
