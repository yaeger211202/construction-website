"use client";
import Link from 'next/link';

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WA_NUMBER || '';
  const encoded = encodeURIComponent('Hello Ocean Infra! I would like to discuss a project.');
  const href = number 
    ? `https://wa.me/${number}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
  return (
    <Link
      href={href}
      target="_blank"
      className="fixed left-4 bottom-4 z-40 rounded-full bg-green-500 text-white shadow-lg hover:brightness-95 transition"
      aria-label="Chat on WhatsApp"
    >
      <span className="block px-4 py-3 font-semibold">WhatsApp</span>
    </Link>
  );
}

