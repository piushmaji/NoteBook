import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://xgvqxeuzpwckxmxyihsw.supabase.co'
const supabaseAnnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndnF4ZXV6cHdja3hteHlpaHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTA4OTAsImV4cCI6MjA4ODAyNjg5MH0.rORY3PThvazlKU8Seu_N18VY5a3S5z8G641kZbczBdk"

const supabase = createClient(supabaseUrl, supabaseAnnonKey)

export default supabase