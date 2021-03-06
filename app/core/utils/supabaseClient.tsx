import { createClient } from "@supabase/supabase-js"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// @ts-ignore
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
