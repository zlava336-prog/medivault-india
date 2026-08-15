import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const pronunciations = [
  { id: '66666666-0000-0000-0000-000000000001', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000001', english_pronunciation: 'pa-ra-SEE-ta-mol', phonetic_pronunciation: 'pa-ra-SEE-ta-mol', hindi_friendly_pronunciation: 'पैरासिटामोल', verified: true },
  { id: '66666666-0000-0000-0000-000000000002', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000002', english_pronunciation: 'eye-byoo-PRO-fen', phonetic_pronunciation: 'eye-byoo-PRO-fen', hindi_friendly_pronunciation: 'आइबुप्रोफेन', verified: true },
  { id: '66666666-0000-0000-0000-000000000003', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000003', english_pronunciation: 'pan-TOE-pruh-zole', phonetic_pronunciation: 'pan-TOE-pruh-zole', hindi_friendly_pronunciation: 'पैंटोप्राजोल', verified: true },
  { id: '66666666-0000-0000-0000-000000000004', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000004', english_pronunciation: 'low-SAR-tan', phonetic_pronunciation: 'low-SAR-tan', hindi_friendly_pronunciation: 'लोसार्टन', verified: true },
  { id: '66666666-0000-0000-0000-000000000005', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000005', english_pronunciation: 'am-LOW-dih-peen', phonetic_pronunciation: 'am-LOW-dih-peen', hindi_friendly_pronunciation: 'एम्लोडिपिन', verified: true },
  { id: '66666666-0000-0000-0000-000000000006', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000006', english_pronunciation: 'a-TOR-va-sta-tin', phonetic_pronunciation: 'a-TOR-va-sta-tin', hindi_friendly_pronunciation: 'एटोरवास्टेटिन', verified: true },
  { id: '66666666-0000-0000-0000-000000000007', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000007', english_pronunciation: 'uh-mok-suh-SIL-in', phonetic_pronunciation: 'uh-mok-suh-SIL-in', hindi_friendly_pronunciation: 'एमोक्सिसिलिन', verified: true },
  { id: '66666666-0000-0000-0000-000000000008', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000008', english_pronunciation: 'uh-zith-row-MY-sin', phonetic_pronunciation: 'uh-zith-row-MY-sin', hindi_friendly_pronunciation: 'एजिथ्रोमाइसिन', verified: true },
  { id: '66666666-0000-0000-0000-000000000009', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000009', english_pronunciation: 'seh-TEER-ih-zeen', phonetic_pronunciation: 'seh-TEER-ih-zeen', hindi_friendly_pronunciation: 'सिट्रीजिन', verified: true },
  { id: '66666666-0000-0000-0000-000000000010', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000010', english_pronunciation: 'met-FOR-min', phonetic_pronunciation: 'met-FOR-min', hindi_friendly_pronunciation: 'मेटफॉर्मिन', verified: true },
  { id: '66666666-0000-0000-0000-000000000011', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000011', english_pronunciation: 'tel-mih-SAR-tan', phonetic_pronunciation: 'tel-mih-SAR-tan', hindi_friendly_pronunciation: 'टेलमिसार्टन', verified: true },
  { id: '66666666-0000-0000-0000-000000000012', entity_type: 'medicine', entity_id: '44444444-0000-0000-0000-000000000012', english_pronunciation: 'on-DAN-seh-tron', phonetic_pronunciation: 'on-DAN-seh-tron', hindi_friendly_pronunciation: 'ओन्डैनसेट्रॉन', verified: true },
];

const brands = [
  { id: '55555555-0000-0000-0000-000000000001', brand_name: 'Dolo-650', medicine_id: '44444444-0000-0000-0000-000000000001', strength: '650 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000002', brand_name: 'Crocin 650', medicine_id: '44444444-0000-0000-0000-000000000001', strength: '650 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000003', brand_name: 'Brufen 400', medicine_id: '44444444-0000-0000-0000-000000000002', strength: '400 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000010', brand_name: 'Pantocid 40', medicine_id: '44444444-0000-0000-0000-000000000003', strength: '40 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000016', brand_name: 'Losacar 50', medicine_id: '44444444-0000-0000-0000-000000000004', strength: '50 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000015', brand_name: 'Amlopres 5', medicine_id: '44444444-0000-0000-0000-000000000005', strength: '5 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000022', brand_name: 'Stamlo 5', medicine_id: '44444444-0000-0000-0000-000000000005', strength: '5 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000018', brand_name: 'Atorva 10', medicine_id: '44444444-0000-0000-0000-000000000006', strength: '10 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000005', brand_name: 'Novamox 500', medicine_id: '44444444-0000-0000-0000-000000000007', strength: '500 mg', dosage_form: 'Capsule', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000007', brand_name: 'Azithral 500', medicine_id: '44444444-0000-0000-0000-000000000008', strength: '500 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000012', brand_name: 'Cetzine 10', medicine_id: '44444444-0000-0000-0000-000000000009', strength: '10 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000014', brand_name: 'Glycomet 500', medicine_id: '44444444-0000-0000-0000-000000000010', strength: '500 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000017', brand_name: 'Telma 40', medicine_id: '44444444-0000-0000-0000-000000000011', strength: '40 mg', dosage_form: 'Tablet', route: 'Oral', verified: true },
  { id: '55555555-0000-0000-0000-000000000011', brand_name: 'Emeset 4', medicine_id: '44444444-0000-0000-0000-000000000012', strength: '4 mg', dosage_form: 'Tablet', route: 'Oral', verified: true }
];

async function seedData() {
  console.log('⏳ Updating accurate pronunciations...');
  await supabase.from('pronunciations').upsert(pronunciations, { onConflict: 'id' });
  console.log('✅ Pronunciations updated!');

  console.log('⏳ Updating brand associations...');
  await supabase.from('brands').upsert(brands, { onConflict: 'id' });
  console.log('✅ Indian Brands updated!');
  
  console.log('🎉 Fix complete! Refresh the page in your browser.');
}

seedData();
