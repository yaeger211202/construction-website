import { createClient } from '@supabase/supabase-js';

export type Lead = {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  city?: string;
  budget?: string;
  notes?: string;
  source?: string;
};

const memoryLeads: Lead[] = [];

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function saveLead(lead: Lead): Promise<Lead> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('leads').insert(lead).select('*').single();
    if (error) throw error;
    return data as Lead;
  }
  const stored: Lead = { ...lead, id: String(Date.now()), created_at: new Date().toISOString() };
  memoryLeads.push(stored);
  return stored;
}

export async function listLeads(): Promise<Lead[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data as Lead[];
  }
  return [...memoryLeads].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || '')).reverse();
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = ['id','created_at','name','phone','city','budget','notes','source'];
  const rows = leads.map((l) => headers.map((h) => {
    const v = (l as any)[h] ?? '';
    const s = String(v).replace(/"/g, '""');
    return `"${s}"`;
  }).join(','));
  return [headers.join(','), ...rows].join('\n');
}

