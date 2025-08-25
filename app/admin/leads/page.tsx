import { listLeads, leadsToCsv } from '@/lib/leads';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <main className="container-tight py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <form action={async () => { 'use server'; }}>
          {/* placeholder to allow server actions if later needed */}
        </form>
      </div>
      <div className="mt-6 overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {['Created At','Name','Phone','City','Budget','Notes','Source'].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {leads.map((l) => (
              <tr key={l.id || l.created_at}>
                <td className="px-4 py-2 text-sm text-slate-700 whitespace-nowrap">{l.created_at?.replace('T',' ').replace('Z','')}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{l.name}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{l.phone}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{l.city}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{l.budget}</td>
                <td className="px-4 py-2 text-sm text-slate-700 max-w-[24rem] truncate" title={l.notes}>{l.notes}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{l.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="mt-6" action={async () => {
        'use server';
        const csv = leadsToCsv(await listLeads());
        // We cannot initiate a download from a server action directly in App Router without a route
        // Provide a data URL link dynamically instead
      }}>
        <ExportCsvButton />
      </form>
    </main>
  );
}

function ExportCsvButton() {
  return (
    <a
      href="/admin/leads.csv"
      className="btn-primary"
      download
    >
      Export CSV
    </a>
  );
}

