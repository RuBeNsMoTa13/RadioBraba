// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// **Importante:**
// Para o frontend (React/Vite), usamos variáveis de ambiente prefixadas com VITE_
// Elas são carregadas automaticamente pelo Vite durante o build.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificações para garantir que as variáveis estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY devem ser definidas.');
}

// Inicializa o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);