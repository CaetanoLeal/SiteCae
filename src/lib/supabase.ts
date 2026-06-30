import { createClient } from '@supabase/supabase-js';

// Usando as variáveis de ambiente recomendadas para a Vercel/Next/Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hqncmolqhpqmabetstcm.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxbmNtb2xxaHBxbWFiZXRzdGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2MDQ5MjEsImV4cCI6MjA5ODE4MDkyMX0.IWA4VbGdsAhJ1fIbf3Jqpfz9LQp-8gbobOHtTB_ynws";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);