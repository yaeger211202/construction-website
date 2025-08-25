"use client";
import { useState } from 'react';

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    {
      role: 'bot',
      text: 'Hi! I\'m the Ocean Infra assistant. Ask me anything about your project.',
    },
  ]);
  const [input, setInput] = useState('');

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input.trim() };
    const botMsg = {
      role: 'bot' as const,
      text:
        'Thanks! Please share your name, WhatsApp number, city, project type and budget so we can prepare a quote.',
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  }

  return (
    <div className="fixed right-4 bottom-4 z-40">
      {open && (
        <div className="mb-3 w-80 max-w-[90vw] card overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 font-semibold">Ocean Infra Chat</div>
          <div className="p-3 h-64 overflow-y-auto space-y-2 bg-white">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block rounded-lg px-3 py-2 text-sm ${
                  m.role === 'user' ? 'bg-brand-yellow text-slate-900' : 'bg-slate-100 text-slate-800'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="border-t border-slate-200 flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 outline-none"
              placeholder="Type your message..."
            />
            <button className="px-4 py-2 font-semibold">Send</button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-slate-900 text-white shadow-lg hover:brightness-110 transition px-4 py-3 font-semibold"
        aria-expanded={open}
        aria-controls="chatbot"
      >
        {open ? 'Close Chat' : 'Chat with us'}
      </button>
    </div>
  );
}

