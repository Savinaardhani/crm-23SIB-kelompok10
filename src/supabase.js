import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yuezbuifztcwyflouwhv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZXpidWlmenRjd3lmbG91d2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MzUxNTAsImV4cCI6MjA2NjQxMTE1MH0.-C6g5iOdiq3AL29K4cgO70YfPnARVfHZOFKO9NgJycw'
export const supabase = createClient(supabaseUrl, supabaseKey)