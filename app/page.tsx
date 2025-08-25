import Link from 'next/link';
import Image from 'next/image';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { ContactForm } from '@/components/ContactForm';

export default function HomePage() {
  return (
    <main className="relative">
      {/* Success Alert */}
      {/* This uses a URL param (?success=1) after form submission */}
      <SuccessAlert />
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] w-full">
        <Image
          src="/hero.jpg"
          alt="Ocean Infra hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-tight">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
              Ocean Infra – Building with Safety, Speed, Precision
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl">
              We deliver high‑quality infrastructure projects on time, every time.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="#contact" className="btn-primary">Get a Quote</Link>
              <Link href="#services" className="inline-flex items-center rounded-md px-4 py-2 font-semibold border border-white/70 text-white hover:bg-white/10 transition">Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-tight py-16">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-2 text-slate-600">End‑to‑end solutions for residential, commercial, and industrial projects.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'General Contracting', desc: 'Full‑scope project execution with strict safety and quality control.' },
            { title: 'Design & Build', desc: 'Integrated design, engineering, and construction for faster delivery.' },
            { title: 'Project Management', desc: 'Planning, scheduling, and site management to keep everything on track.' },
          ].map((s) => (
            <div key={s.title} className="card p-6">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="container-tight">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="mt-2 text-slate-600">A snapshot of our recent work.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/p1.jpg', title: 'Residential Tower' },
              { src: '/p2.jpg', title: 'Industrial Complex' },
              { src: '/p3.jpg', title: 'Corporate Office' },
            ].map((p) => (
              <div key={p.title} className="card overflow-hidden">
                <div className="relative h-56">
                  <Image src={p.src} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-tight py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Years Experience', value: '12+' },
            { label: 'Projects', value: '180+' },
            { label: 'Engineers', value: '40+' },
            { label: 'Awards', value: '8' },
          ].map((stat) => (
            <div key={stat.label} className="card p-6 text-center">
              <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
              <div className="mt-1 text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold">Request a Quote</h2>
              <p className="mt-2 text-slate-600">Share your details and our team will contact you shortly.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold">Why Ocean Infra?</h3>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc list-inside">
                <li>Safety‑first culture</li>
                <li>On‑time delivery with rigorous project controls</li>
                <li>Transparent pricing and reporting</li>
                <li>Experienced, certified engineers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <ChatbotWidget />
    </main>
  );
}

function SuccessAlert() {
  if (typeof window === 'undefined') return null;
  const url = new URL(window.location.href);
  const ok = url.searchParams.get('success') === '1';
  if (!ok) return null;
  return (
    <div className="container-tight mt-4">
      <div className="rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-3">
        Thank you! Your details have been received. We will contact you shortly.
      </div>
    </div>
  );
}

