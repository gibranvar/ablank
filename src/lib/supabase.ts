import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export interface LeadData {
  nombre?: string;
  email: string;
  puesto: string;
  fuga_mensual: string;
  ticket: string;
  cotizaciones: string;
  dias: string;
  status?: string;
}

export async function insertLead(data: LeadData) {
  const payload: any = {
    ...data,
    status: data.status || 'NUEVO',
  };

  const { data: result, error } = await supabase
    .from('leads_b2b')
    .insert([payload]);

  // Si la columna nombre aún no ha sido agregada a la tabla leads_b2b en Supabase (error 42703)
  if (error && (error as any).code === '42703' && payload.nombre !== undefined) {
    const { nombre: _n, ...fallbackPayload } = payload;
    const fallback = await supabase.from('leads_b2b').insert([fallbackPayload]);
    if (fallback.error) {
      throw fallback.error;
    }
    return fallback.data;
  }

  if (error) {
    throw error;
  }

  return result;
}
