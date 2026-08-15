-- MediVault India integrity/security fixes
-- 1) Align database verification states with the application state machine.
ALTER TABLE public.medicines
  DROP CONSTRAINT IF EXISTS medicines_verification_status_check;

ALTER TABLE public.medicines
  ADD CONSTRAINT medicines_verification_status_check
  CHECK (verification_status IN ('draft', 'under_review', 'verified', 'needs_update', 'archived'));

-- 2) Recently viewed uses upsert in the app; enforce the required uniqueness.
DELETE FROM public.recently_viewed a
USING public.recently_viewed b
WHERE a.id < b.id
  AND a.user_id = b.user_id
  AND a.entity_type = b.entity_type
  AND a.entity_id = b.entity_id;

ALTER TABLE public.recently_viewed
  ADD CONSTRAINT recently_viewed_user_entity_unique
  UNIQUE (user_id, entity_type, entity_id);

-- 3) Secure helper functions: never allow an unauthenticated caller to become admin.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'editor')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 4) Create a profile automatically when a new Supabase Auth user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    'user'
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
        updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5) Users may create/update only their own profile's safe fields.
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 6) Admins can manage the supporting reference tables used by the admin editor.
DROP POLICY IF EXISTS "Admin write active ingredients" ON public.active_ingredients;
CREATE POLICY "Admin write active ingredients" ON public.active_ingredients
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write manufacturers" ON public.manufacturers;
CREATE POLICY "Admin write manufacturers" ON public.manufacturers
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write medicine ingredients" ON public.medicine_ingredients;
CREATE POLICY "Admin write medicine ingredients" ON public.medicine_ingredients
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write pronunciations" ON public.pronunciations;
CREATE POLICY "Admin write pronunciations" ON public.pronunciations
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write references" ON public.references;
CREATE POLICY "Admin write references" ON public.references
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write medicine references" ON public.medicine_references;
CREATE POLICY "Admin write medicine references" ON public.medicine_references
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write interactions" ON public.drug_interactions;
CREATE POLICY "Admin write interactions" ON public.drug_interactions
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write mnemonics" ON public.mnemonics;
CREATE POLICY "Admin write mnemonics" ON public.mnemonics
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write flashcards" ON public.flashcards;
CREATE POLICY "Admin write flashcards" ON public.flashcards
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin write quiz questions" ON public.quiz_questions;
CREATE POLICY "Admin write quiz questions" ON public.quiz_questions
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 7) Useful indexes for the growing medicine directory.
CREATE INDEX IF NOT EXISTS idx_medicines_verification_status ON public.medicines(verification_status);
CREATE INDEX IF NOT EXISTS idx_medicine_classifications_class ON public.medicine_classifications(class_id);
CREATE INDEX IF NOT EXISTS idx_brands_medicine ON public.brands(medicine_id);
CREATE INDEX IF NOT EXISTS idx_pronunciations_entity ON public.pronunciations(entity_type, entity_id);
