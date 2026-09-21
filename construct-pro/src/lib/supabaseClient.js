import { createClient } from "@supabase/supabase-js";

// This is the public anon key for the Mahalaxmi website's own Supabase
// project — safe to ship in the client bundle. Row Level Security on the
// `enquiries` table only allows this key to INSERT new rows; it cannot
// read, edit or delete anything, including the enquiry it just submitted.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://sgpvwroisjuynlorlsty.supabase.co";
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncHZ3cm9pc2p1eW5sb3Jsc3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzA3MDgsImV4cCI6MjEwNTU0NjcwOH0.zh6CBzR67GFfXTeoyz9U8kJokgF0Cd_x-WY-6n8SPyw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
