import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
  if (typeof window !== 'undefined') {
    console.warn('⚠️ Supabase credentials are missing or using placeholder values. Please check your .env.local file.');
  }
}

// createClient will throw if url/key are missing. During builds without .env variables,
// we provide dummy ones to allow the build to succeed.
const safeUrl = supabaseUrl || 'http://localhost:8000';
const safeKey = supabaseAnonKey || 'placeholder';

export const supabase = createClient(safeUrl, safeKey);
