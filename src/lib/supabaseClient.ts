import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = (supabaseUrl: string, supabaseKey: string) => {
  if (!supabaseUrl || !supabaseKey) {
    // This check is now a safeguard in case empty strings are passed.
    throw new Error("Supabase URL or Service Key was not provided to getSupabaseClient");
  }
  
  return createClient(supabaseUrl, supabaseKey);
};