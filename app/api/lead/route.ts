import { NextRequest, NextResponse } from 'next/server';
import { listLeads, saveLead } from '@/lib/leads';

export async function GET() {
  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, city, budget, notes, source } = body || {};
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    await saveLead({ name, phone, city, budget, notes, source });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save lead' }, { status: 500 });
  }
}

