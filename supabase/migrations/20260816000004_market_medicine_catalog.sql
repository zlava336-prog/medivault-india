-- Market/catalog layer for large Indian brand-product datasets.
-- This intentionally stays separate from the verified clinical monograph table.
CREATE TABLE IF NOT EXISTS public.market_medicine_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_record_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price_inr NUMERIC(12,2),
  is_discontinued BOOLEAN,
  manufacturer_name TEXT,
  medicine_type TEXT,
  pack_size_label TEXT,
  composition_1 TEXT,
  composition_2 TEXT,
  source_name TEXT NOT NULL DEFAULT 'Indian Medicine Dataset',
  source_url TEXT,
  source_license TEXT,
  imported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(source_name, source_record_id)
);

CREATE INDEX IF NOT EXISTS idx_market_medicine_products_name
  ON public.market_medicine_products USING gin (product_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_market_medicine_products_composition1
  ON public.market_medicine_products USING gin (composition_1 gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_market_medicine_products_composition2
  ON public.market_medicine_products USING gin (composition_2 gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_market_medicine_products_manufacturer
  ON public.market_medicine_products USING gin (manufacturer_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_market_medicine_products_discontinued
  ON public.market_medicine_products (is_discontinued);

ALTER TABLE public.market_medicine_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read market catalog" ON public.market_medicine_products;
CREATE POLICY "Public can read market catalog"
  ON public.market_medicine_products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage market catalog" ON public.market_medicine_products;
CREATE POLICY "Admins can manage market catalog"
  ON public.market_medicine_products FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
