"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || ''),
          phone: String(formData.get('phone') || ''),
          city: String(formData.get('city') || ''),
          budget: String(formData.get('budget') || ''),
          notes: String(formData.get('notes') || ''),
          source: 'website',
        }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      router.push('/?success=1#contact');
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone / WhatsApp</label>
          <input name="phone" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">City</label>
          <input name="city" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Budget</label>
          <input name="budget" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Notes</label>
        <textarea name="notes" rows={4} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button disabled={loading} className="btn-primary" type="submit">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

