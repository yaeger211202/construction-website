import { NextResponse } from 'next/server';
import { leadsToCsv, listLeads } from '@/lib/leads';

export async function GET() {
  const leads = await listLeads();
  const csv = leadsToCsv(leads);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  });
}

