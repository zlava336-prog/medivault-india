# 10,000+ Indian Medicine Product Catalog

MediVault keeps a large brand/product catalog separate from verified clinical monographs. This prevents incomplete market records from being presented as verified prescribing information.

## Source

Indian Medicine Dataset (GitHub):
https://github.com/junioralive/Indian-Medicine-Dataset

The repository currently reports 253,973 medicine products and provides CSV/JSON data fields including product name, price, discontinuation status, manufacturer, pack size and composition. It is published under an MIT license according to the repository page.

## Import 10,000 products

After configuring `.env` with Supabase URL and anon key and applying the migration:

```bash
npm run import:india-catalog
```

The default is **10,000** records.

To import more:

```bash
node scripts/import-indian-medicine-catalog.mjs 25000
```

or:

```bash
node scripts/import-indian-medicine-catalog.mjs 100000
```

## Important medical-data rule

These catalog rows contain product/market fields only. They are **not automatically verified clinical monographs**. Do not infer contraindications, pediatric guidance, ADME, interactions, dosage or other clinical information from the catalog alone.

Verified clinical information remains in `public.medicines` and should be reviewed against authoritative references before being published as a monograph.
