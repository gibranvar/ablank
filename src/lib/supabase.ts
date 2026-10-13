import { createClient, SupabaseClient } from '@supabase/supabase-js';

const defaultUrl = 'https://qbcfetotepjdlywhkfol.supabase.co';
const defaultAnonKey = 'sb_publishable_ab1OQHDHzHynr-sVKWT8Ng_57iLJg09';

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || defaultUrl;
  const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || defaultAnonKey;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase]: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no configurados.');
    return null;
  }

  try {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey);
    return cachedClient;
  } catch (err) {
    console.error('[Supabase Init Error]:', err);
    return null;
  }
}

// Cliente Proxy seguro: no ejecuta createClient en tiempo de importación ni lanza excepciones fatales
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      console.warn(`[Supabase Proxy]: Tentativa de acceso a ${String(prop)} sin cliente inicializado.`);
      return () => Promise.resolve({ data: null, error: new Error('Supabase no inicializado') });
    }
    return (client as any)[prop];
  }
});

export interface LeadData {
  nombre?: string;
  email: string;
  puesto: string;
  fuga_mensual: string;
  ticket: string;
  cotizaciones: string;
  dias: string;
  status?: string;
  idioma?: string;
}

export async function insertLead(data: LeadData) {
  const client = getSupabase();
  if (!client) {
    console.warn('[Supabase]: Cliente no inicializado. Omitiendo guardado en base de datos.');
    return null;
  }

  const payload: any = {
    ...data,
    status: data.status || 'NUEVO',
  };

  try {
    const { data: result, error } = await client
      .from('leads_b2b')
      .insert([payload]);

    // Si la columna nombre aún no ha sido agregada a la tabla leads_b2b en Supabase (error 42703)
    if (error && (error as any).code === '42703' && payload.nombre !== undefined) {
      const { nombre: _n, ...fallbackPayload } = payload;
      const fallback = await client.from('leads_b2b').insert([fallbackPayload]);
      if (fallback.error) {
        throw fallback.error;
      }
      return fallback.data;
    }

    if (error) {
      throw error;
    }

    return result;
  } catch (err) {
    console.warn('[Supabase insertLead error]:', err);
    return null;
  }
}
