import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dzrijcqmcylpgihfeziw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6cmlqY3FtY3lscGdpaGZleml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODAxNzAsImV4cCI6MjA3NzU1NjE3MH0.f4WhKdxus8Bp8n6RxPCiJ7alVelWMTOgyFnR6kbc0pw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)