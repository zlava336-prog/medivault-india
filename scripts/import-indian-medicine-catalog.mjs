import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SOURCE_URL = 'https://raw.githubusercontent.com/junioralive/Indian-Medicine-Dataset/main/DATA/indian_medicine_data.csv';
const SOURCE_PAGE = 'https://github.com/junioralive/Indian-Medicine-Dataset';
const SOURCE_LICENSE = 'MIT';
const DEFAULT_LIMIT = 10000;
const BATCH_SIZE = 500;

function loadEnv() {
  const env = { ...process.env };
  const file = path.resolve('.env');
  if (fs.existsSync(file)) {
    for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const i = line.indexOf('=');
      if (i === -1) continue;
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!(key in env)) env[key] = value;
    }
  }
  return env;
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])));
}

function money(value) {
  if (!value) return null;
  const n = Number(String(value).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function bool(value) {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (['true', '1', 'yes'].includes(v)) return true;
  if (['false', '0', 'no'].includes(v)) return false;
  return null;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env. The bulk importer requires the service-role key and must only be run locally.');

const limitArg = Number(process.argv[2] || DEFAULT_LIMIT);
const limit = Number.isFinite(limitArg) && limitArg > 0 ? Math.floor(limitArg) : DEFAULT_LIMIT;
const supabase = createClient(url, key);

console.log(`Downloading source catalog...`);
const response = await fetch(SOURCE_URL);
if (!response.ok) throw new Error(`Source download failed: HTTP ${response.status}`);
const csv = await response.text();
const rows = parseCsv(csv).slice(0, limit);
console.log(`Parsed ${rows.length} source records; importing up to ${limit}.`);

let imported = 0;
for (let i = 0; i < rows.length; i += BATCH_SIZE) {
  const batch = rows.slice(i, i + BATCH_SIZE).map(r => ({
    source_record_id: String(r.id || '').trim(),
    product_name: r.name || 'Unnamed product',
    price_inr: money(r['price(₹)']),
    is_discontinued: bool(r.Is_discontinued),
    manufacturer_name: r.manufacturer_name || null,
    medicine_type: r.type || null,
    pack_size_label: r.pack_size_label || null,
    composition_1: r.short_composition1 || null,
    composition_2: r.short_composition2 || null,
    source_name: 'Indian Medicine Dataset',
    source_url: SOURCE_PAGE,
    source_license: SOURCE_LICENSE,
    updated_at: new Date().toISOString(),
  })).filter(x => x.source_record_id && x.product_name);

  const { error } = await supabase
    .from('market_medicine_products')
    .upsert(batch, { onConflict: 'source_name,source_record_id' });
  if (error) throw new Error(`Batch ${i}-${i + batch.length - 1} failed: ${error.message}`);
  imported += batch.length;
  console.log(`Imported ${imported}/${rows.length}`);
}

console.log(`DONE: ${imported} market medicine products imported.`);
console.log(`Source: ${SOURCE_PAGE}`);
console.log(`License: MIT`);
