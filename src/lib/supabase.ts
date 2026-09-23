import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
  if (typeof window !== 'undefined') {
    console.warn('⚠️ Supabase credentials are missing or using placeholder values. Please check your .env.local file.');
  }
}

// Provide dummy values for server side rendering if env vars are missing so the build does not fail
export const supabase = createClient(
  supabaseUrl || 'https://dummy-url-for-build.supabase.co',
  supabaseAnonKey || 'dummy-anon-key',
);
