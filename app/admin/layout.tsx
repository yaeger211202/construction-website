export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="container-tight py-4 flex items-center justify-between">
          <div className="font-extrabold text-slate-900">Ocean Infra Admin</div>
          <a className="text-sm text-slate-600 hover:text-slate-900" href="/">Back to site</a>
        </div>
      </header>
      {children}
    </div>
  );
}

