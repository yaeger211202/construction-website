import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ocean Infra – Building with Safety, Speed, Precision',
  description: 'Modern construction company website for Ocean Infra',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}

