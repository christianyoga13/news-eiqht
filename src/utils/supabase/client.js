import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function fetchNews() {
  const supabase = createClient();
  const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching news:', error.message, error.details);
    return [];
  }
  return data;
}