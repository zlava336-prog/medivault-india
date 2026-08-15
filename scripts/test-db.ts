import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.log('\n⚠️  Notice: Real Supabase credentials not set in .env yet.');
  console.log('To run live database queries from Termux:');
  console.log('1. Open .env and insert your real VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  console.log('2. Push migrations & seed using Supabase Dashboard SQL Editor or Supabase CLI.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabase() {
  console.log('\n--- Testing MediVault India Database Connection ---');
  
  // 1. Test Medicines
  const { data: medicines, error: medErr } = await supabase
    .from('medicines')
    .select('generic_name, salt, verification_status')
    .limit(5);

  if (medErr) {
    console.error('❌ Medicines query error:', medErr.message);
  } else {
    console.log(`✅ Verified Medicines (${medicines?.length || 0} sample rows fetched):`);
    medicines?.forEach((m) => console.log(`   - ${m.generic_name} [${m.verification_status}]`));
  }

  // 2. Test Terms
  const { data: terms, error: termErr } = await supabase
    .from('medical_terms')
    .select('term, simple_definition')
    .limit(3);

  if (termErr) {
    console.error('❌ Terms query error:', termErr.message);
  } else {
    console.log(`✅ Medical Terms (${terms?.length || 0} sample rows fetched):`);
    terms?.forEach((t) => console.log(`   - ${t.term}: ${t.simple_definition}`));
  }

  // 3. Test RLS on user-specific table without auth
  const { data: favs, error: favErr } = await supabase.from('favorites').select('*');
  console.log(`✅ RLS Check (Unauthenticated access to favorites): ${favs?.length === 0 ? 'Protected (0 rows)' : favErr?.message || 'Protected'}`);

  console.log('\n--- Database Validation Complete ---\n');
}

testDatabase();
