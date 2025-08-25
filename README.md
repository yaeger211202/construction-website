## Ocean Infra – Next.js + Tailwind

### Run locally

1. Copy `.env.example` to `.env` and fill values.
2. Install and start:

```
npm install
npm run dev
```

### Features
- Home page with hero, services, projects, stats, and contact form
- Floating WhatsApp button (uses `NEXT_PUBLIC_WA_NUMBER`)
- Floating chatbot widget with fixed reply
- API route `/api/lead` with in-memory storage or Supabase (if configured)
- Admin page `/admin/leads` with CSV export at `/admin/leads.csv`

### Supabase table schema

```
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  name text not null,
  phone text not null,
  city text,
  budget text,
  notes text,
  source text
);
```

### Deployment

- Ready for Vercel.
- Set environment variables in Vercel project settings.